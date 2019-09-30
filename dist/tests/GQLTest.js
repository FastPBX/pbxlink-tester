"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GraphQLRequest_1 = require("../utils/GraphQLRequest");
const Test_1 = require("./Test");
class GQLTest extends Test_1.Test {
    constructor() {
        super(...arguments);
        this.name = '';
        this.query = '';
        this.variables = {};
        this.params = [];
        this.schema = {};
        this.message = '';
    }
    run(context) {
        this.context = context;
        let fromContext = this.getFromContext(this.params);
        this.variables = Object.assign(Object.assign({}, this.variables), fromContext);
        return new Promise((resolve, reject) => {
            if (!context.auth_token)
                return reject({ message: 'No Auth Token Available' });
            if (!context.device_id)
                return reject({ message: 'No Device ID Set' });
            GraphQLRequest_1.GraphQLRequest({
                context,
                query: this.query,
                variables: this.variables
            })
                .then(result => {
                let data = result[this.name];
                this.validate(data)
                    .then(isValid => {
                    if (isValid) {
                        return resolve({
                            success: true,
                            message: this.message,
                            context: this.extractToContext(data)
                        });
                    }
                    else {
                        return reject({
                            success: false,
                            message: 'GraphQL Response Failed Validation'
                        });
                    }
                })
                    .catch(_ => {
                    return reject({
                        success: false,
                        message: 'GraphQL Response Failed Validation'
                    });
                });
            })
                .catch(errors => {
                let requestError = errors.map((m) => {
                    return m.message;
                }).join('; ');
                return reject({
                    success: false,
                    message: `GQL Errors: ${requestError}`
                });
            });
        });
    }
    validate(data) {
        return this.schema.isValid(data);
    }
    extractToContext(data) {
        return {};
    }
}
exports.GQLTest = GQLTest;
//# sourceMappingURL=GQLTest.js.map