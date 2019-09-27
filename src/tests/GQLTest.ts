import {GraphQLRequest} from "../utils/GraphQLRequest";
import {Test, TestResultsInterface} from "./Test";

export interface GQLTestInterface {
    name: string
    query: string
    variables: any
    params: any[]
    schema: any
    message: string
}

export class GQLTest extends Test implements GQLTestInterface {

    name:      string = '';
    query:     string = '';
    variables: any    = {};
    params:    any[]  = [];
    schema:    any    = {};
    message:   string = '';

    run(context: any): Promise<TestResultsInterface> {

        this.context = context;

        let fromContext = this.getFromContext(this.params);

        this.variables = {
            ...this.variables,
            ...fromContext
        };

        return new Promise((resolve, reject) => {

            if (!context.auth_token) return reject({ message: 'No Auth Token Available' });
            if (!context.device_id) return reject({ message: 'No Device ID Set' });

            GraphQLRequest({
                context,
                query: this.query,
                variables: this.variables
            })
                .then(result => {

                    let data = result[this.name];

                    this.validate(data)
                        .then(isValid => {

                            if ( isValid ) {

                                return resolve({
                                    success: true,
                                    message: this.message,
                                    context: this.extractToContext(data)
                                })

                            } else {

                                return reject('GraphQL Response Failed Validation');

                            }

                        })
                        .catch(_ => {

                            return reject('GraphQL Response Failed Validation');

                        });

                })
                .catch(errors => {

                    let requestError = errors.map((m: any)=>{
                        return m.message;
                    }).join('; ');

                    return reject(`GQL Errors: ${requestError}`);

                });

        });

    }

    validate(data: any): Promise<boolean> {
        return this.schema.isValid(data);
    }

    extractToContext(data: any): any {
        return {}
    }

}
