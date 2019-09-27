"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Test {
    constructor(config) {
        this.id = 'BasicTest';
        this.critical = false;
        this.context = {};
        this.id = config.class || 'New Test';
        this.critical = config.critical || false;
    }
    run(context) {
        this.context = context;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve({
                    success: true,
                    message: 'Success Test'
                });
            }, 500);
        });
    }
    validate(date) {
        return Promise.resolve(true);
    }
    getFromContext(keys) {
        return keys.map((key) => {
            if (this.context[key]) {
                return {
                    [key]: this.context[key]
                };
            }
        }).reduce((a, b) => (Object.assign(Object.assign({}, a), b)));
    }
}
exports.Test = Test;
//# sourceMappingURL=Test.js.map