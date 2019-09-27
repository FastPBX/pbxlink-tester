import express from "express";
import {TestQueue} from "./TestQueue";
import {TestConfigInterface} from "./tests/Test";
import Arena from 'bull-arena';

const testConfigObjects: TestConfigInterface[] =  require("../testCases.json");

const app = express();
const port = 3000;

const DefaultQueue = new TestQueue();

DefaultQueue.addJob({
    meta: {
        device_id: process.env.TEST_DEVICE,
        email: process.env.TEST_EMAIL,
        user_id: process.env.TEST_USER,
        number_id: process.env.TEST_NUMBER,
    },
    tests: testConfigObjects,
},
{
    repeat: { cron: process.env.TEST_SCHEDULE }
});

app.get("/", (req, res) => {
    res.send("PBXLink Test Runner");
});

app.get("/job", (req, res) => {

    const OnDemandQueue = new TestQueue('OnDemand');

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

const arenaConfig = Arena({
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
},
{
    basePath: '/arena',
    disableListen: true
});

app.use('/', arenaConfig);

app.listen(port, (err) => {
    if (err) { return console.error('AppListenError',err); }
    return console.log(`server is listening on ${port}. testing on ${process.env.TEST_URL}`);
});
