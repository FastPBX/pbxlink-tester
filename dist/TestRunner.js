"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = __importDefault(require("async"));
const mailgun_1 = __importDefault(require("./services/mailgun"));
const tests_1 = __importDefault(require("./tests"));
class TestRunner {
    constructor(config, queue = 'DefaultQueue') {
        this.tests = [];
        this.context = {};
        this.total = 0;
        this.completed = 0;
        this.passed = 0;
        this.failed = 0;
        this.context = Object.assign({}, this.context, config.meta);
        this.tests = config.tests.map((testConfig) => {
            return new tests_1.default[testConfig.class](testConfig);
        });
        this.total = this.tests.length;
    }
    checkProgress() {
        return (this.completed / this.total) * 100;
    }
    markDone() {
        this.completed++;
        if (this.currentJob)
            this.currentJob.progress(this.checkProgress()).then(r => { });
    }
    markPassed() {
        this.passed++;
        this.markDone();
    }
    markFailed() {
        this.failed++;
        this.markDone();
    }
    runTests(job) {
        if (job)
            this.currentJob = job;
        let self = this;
        let testRuns = self.tests.map((test) => {
            return (callback) => {
                console.log(`Running Test: ${test.id}`);
                test.run(self.context)
                    .then(result => {
                    this.markPassed();
                    let { success, message, context } = result;
                    if (context) {
                        self.context = Object.assign(Object.assign({}, self.context), context);
                    }
                    return callback(null, {
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
                    .catch(result => {
                    this.markFailed();
                    if (test.critical) {
                        return callback(Object.assign(Object.assign({}, result), { test: test.id }));
                    }
                    else {
                        return callback(null, {
                            test: {
                                id: test.id,
                                critical: test.critical
                            },
                            result
                        });
                    }
                });
            };
        });
        return new Promise((resolve, reject) => {
            async_1.default.series(testRuns, function (err, results) {
                let testStatus = {
                    total: self.total,
                    completed: self.completed,
                    passed: self.passed,
                    failed: self.failed,
                    progress: self.checkProgress()
                };
                if (err) {
                    TestRunner.sendAlert(err, results, testStatus);
                    return reject(err);
                }
                return resolve(Object.assign(Object.assign({}, testStatus), { results }));
            });
        });
    }
    static sendAlert(failure, results, status) {
        let emailPayload = {
            to: process.env.ALERT_RECIPIENTS,
            subject: 'PBXLink Monitoring Alert',
            results: results.filter((r) => {
                return !!r;
            }),
            status,
            failure
        };
        mailgun_1.default(emailPayload)
            .then((success) => console.log('MessageSentSuccess'))
            .catch((success) => console.error('MessageSentFailed'));
    }
}
exports.TestRunner = TestRunner;
//# sourceMappingURL=TestRunner.js.map