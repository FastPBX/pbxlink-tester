"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.GraphQLRequest = function (options) {
    return new Promise((resolve, reject) => {
        axios_1.default({
            method: 'POST',
            url: `${process.env.TEST_URL}/graphql`,
            data: {
                query: options.query,
                variables: options.variables
            },
            headers: {
                'device-id': options.context.device_id,
                'Authorization': `Bearer ${options.context.auth_token}`
            }
        })
            .then((res) => {
            if (res.data.errors) {
                return reject(res.data.errors);
            }
            else {
                return resolve(res.data.data);
            }
        })
            .catch((e) => {
            return reject(e.response.data);
        });
    });
};
//# sourceMappingURL=GraphQLRequest.js.map