"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = require("./Test");
class ErrorTest extends Test_1.Test {
    run(context) {
        return Promise.reject({
            success: false,
            message: 'Failure Test'
        });
    }
}
exports.ErrorTest = ErrorTest;
//# sourceMappingURL=ErrorTest.js.map