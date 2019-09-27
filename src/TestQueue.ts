import Bull, {QueueOptions, Queue, Job, JobOptions} from "bull";
import {TestRunner as Tester, TestRunnerConfigInterface} from "./TestRunner";

const queueConfig: QueueOptions = {
    redis: {
        port: parseInt(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASS
    }
};

export class TestQueue {

    name: string;
    queue: Queue = null;

    constructor(name: string = 'DefaultQueue') {
        this.name = name;
        console.log(`Queue Initialized: ${this.name}`);
        this.queue = new Bull(this.name, queueConfig);
        this.queue.process('TestRun', this.process)
            .then(r => console.log('ProcessDone',r))
    }

    process(job: Job) {
        let testRunConfig: TestRunnerConfigInterface = job.data;
        const TestRunner = new Tester(testRunConfig, this.name);
        return TestRunner.runTests(job);
    }

    addJob(job: TestRunnerConfigInterface, options: JobOptions = {}) {
        this.queue.add('TestRun', job, options).then(r => console.log('JobAddedToQueue'));
    }

}
