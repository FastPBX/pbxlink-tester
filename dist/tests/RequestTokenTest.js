"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = require("./Test");
const axios_1 = __importDefault(require("axios"));
class RequestTokenTest extends Test_1.Test {
    run(context) {
        return new Promise((resolve, reject) => {
            if (!context.auth_code)
                return reject({ message: 'No Auth Code Available' });
            axios_1.default({
                method: 'POST',
                url: `${process.env.TEST_URL}/link-auth/${context.auth_code}`,
                data: {
                    device_id: context.device_id
                },
                headers: {
                    'api-key': process.env.API_KEY
                }
            })
                .then((res) => {
                return resolve({
                    success: true,
                    message: 'Token Successfully Claimed',
                    context: {
                        auth_token: res.data.token
                    }
                });
            })
                .catch((e) => {
                return reject(e);
            });
        });
    }
}
exports.RequestTokenTest = RequestTokenTest;
//# sourceMappingURL=RequestTokenTest.js.map