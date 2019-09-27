import async from "async";
import {Job} from "bull";

import {Test, TestConfigInterface, TestInterface} from "./tests/Test";
import SendMessage, {MessagePayload} from "./services/mailgun";

import TestsManifest from "./tests";

export interface TestRunnerConfigInterface {
    meta: {
        [index: string]: any
    },
    tests: TestConfigInterface[]
}

export interface TestRunnerInterface {
    tests: Test[]
    context: {
        [index: string]: any
    }
    total: number
    completed: number
    passed: number
    failed: number
    currentJob: Job
    runTests(job: Job): Promise<any>
}

export class TestRunner implements TestRunnerInterface {

    tests = [];
    context = {};
    total = 0;
    completed = 0;
    passed = 0;
    failed = 0;
    currentJob: Job;

    constructor(config: TestRunnerConfigInterface, queue: string = 'DefaultQueue') {
        this.context = Object.assign({},this.context, config.meta);
        this.tests = config.tests.map((testConfig: TestConfigInterface)=>{
           return new TestsManifest[testConfig.class](testConfig)
        });
        this.total = this.tests.length;
    }

    checkProgress(): number {
        return (this.completed/this.total)*100
    }

    markDone(): void {
        this.completed++;
        if (this.currentJob) this.currentJob.progress(this.checkProgress()).then(r => {})
    }

    markPassed(): void {
        this.passed++;
        this.markDone();
    }

    markFailed(): void {
        this.failed++;
        this.markDone();
    }

    runTests(job?: Job): Promise<any> {

        if(job) this.currentJob = job;

        let self = this;

        let testRuns = self.tests.map((test: TestInterface)=>{

            return (callback) => {

                console.log(`Running Test: ${test.id}`);
                test.run(self.context)
                    .then(result=>{

                        this.markPassed();

                        let { success, message, context } = result;

                        if ( context ) {
                            self.context = {...self.context,...context}
                        }
                        return callback(null,{
                            test: {
                                id: test.id,
                                critical: test.critical
                            },
                            result: {
                                success,
                                message
                            }
                        });

                    })
                    .catch(result=>{

                        this.markFailed();

                        if ( test.critical ) {
                            return callback({
                                ...result,
                                test: test.id
                            });
                        } else {
                            return callback(null,{
                                test: {
                                    id: test.id,
                                    critical: test.critical
                                },
                                result
                            });
                        }

                    });
            }

        });

        return new Promise((resolve, reject) => {

            async.series(testRuns,function(err, results) {

                let testStatus = {
                    total: self.total,
                    completed: self.completed,
                    passed: self.passed,
                    failed: self.failed,
                    progress: self.checkProgress()
                };

                if (err) {
                    TestRunner.sendAlert(err,results,testStatus);
                    return reject(err);
                }

                return resolve({
                    ...testStatus,
                    results,
                });

            });

        });

    }

    static sendAlert(failure: any, results: any[], status: any): void {

        let emailPayload: MessagePayload = {
            to: process.env.ALERT_RECIPIENTS,
            subject: 'PBXLink Monitoring Alert',
            results: results.filter((r)=>{
                return !!r;
            }),
            status,
            failure
        };

        SendMessage(emailPayload)
            .then((success: boolean) => console.log('MessageSentSuccess'))
            .catch((success: boolean) => console.error('MessageSentFailed'))

    }

}
