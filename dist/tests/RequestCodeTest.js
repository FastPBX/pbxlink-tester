"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = require("./Test");
const axios_1 = __importDefault(require("axios"));
class RequestCodeTest extends Test_1.Test {
    run(context) {
        return new Promise((resolve, reject) => {
            axios_1.default({
                method: 'POST',
                url: `${process.env.TEST_URL}/request-auth`,
                data: {
                    device_id: context.device_id,
                    email: context.email
                },
                headers: {
                    'api-key': process.env.API_KEY,
                    'test-key': process.env.TEST_KEY
                }
            })
                .then((res) => {
                return resolve({
                    success: true,
                    message: 'Auth Code Successfully Requested',
                    context: {
                        auth_code: res.data.message
                    }
                });
            })
                .catch((e) => {
                return reject(e);
            });
        });
    }
}
exports.RequestCodeTest = RequestCodeTest;
//# sourceMappingURL=RequestCodeTest.js.map