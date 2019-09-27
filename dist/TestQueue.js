"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = __importDefault(require("bull"));
const TestRunner_1 = require("./TestRunner");
const queueConfig = {
    redis: {
        port: parseInt(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASS
    }
};
class TestQueue {
    constructor(name = 'DefaultQueue') {
        this.queue = null;
        this.name = name;
        console.log(`Queue Initialized: ${this.name}`);
        this.queue = new bull_1.default(this.name, queueConfig);
        this.queue.process('TestRun', this.process)
            .then(r => console.log('ProcessDone', r));
    }
    process(job) {
        let testRunConfig = job.data;
        const TestRunner = new TestRunner_1.TestRunner(testRunConfig, this.name);
        return TestRunner.runTests(job);
    }
    addJob(job, options = {}) {
        this.queue.add('TestRun', job, options).then(r => console.log('JobAddedToQueue'));
    }
}
exports.TestQueue = TestQueue;
//# sourceMappingURL=TestQueue.js.map