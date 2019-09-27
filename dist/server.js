"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TestQueue_1 = require("./TestQueue");
const bull_arena_1 = __importDefault(require("bull-arena"));
const testConfigObjects = require("../testCases.json");
const app = express_1.default();
const port = 3000;
const DefaultQueue = new TestQueue_1.TestQueue();
DefaultQueue.addJob({
    meta: {
        device_id: process.env.TEST_DEVICE,
        email: process.env.TEST_EMAIL,
        user_id: process.env.TEST_USER,
        number_id: process.env.TEST_NUMBER,
    },
    tests: testConfigObjects,
}, {
    repeat: { cron: '* * * * *' }
});
app.get("/", (req, res) => {
    res.send("PBXLink Test Runner");
});
app.get("/job", (req, res) => {
    const OnDemandQueue = new TestQueue_1.TestQueue('OnDemand');
    OnDemandQueue.addJob({
        meta: {
            device_id: process.env.TEST_DEVICE,
            email: process.env.TEST_EMAIL,
            user_id: process.env.TEST_USER,
            number_id: process.env.TEST_NUMBER,
        },
        tests: testConfigObjects,
    });
    res.send("OnDemand JobAdded");
});
const arenaConfig = bull_arena_1.default({
    queues: [
        {
            name: "DefaultQueue",
            hostId: "Default",
            redis: {
                port: parseInt(process.env.REDIS_PORT),
                host: process.env.REDIS_HOST,
                password: process.env.REDIS_PASS
            },
        },
        {
            name: "OnDemand",
            hostId: "Default",
            redis: {
                port: parseInt(process.env.REDIS_PORT),
                host: process.env.REDIS_HOST,
                password: process.env.REDIS_PASS
            },
        }
    ],
}, {
    basePath: '/arena',
    disableListen: true
});
app.use('/', arenaConfig);
app.listen(port, (err) => {
    if (err) {
        return console.error('AppListenError', err);
    }
    return console.log(`server is listening on ${port}. testing on ${process.env.TEST_URL}`);
});
//# sourceMappingURL=server.js.map