import axios, {AxiosError} from "axios";

export interface GraphQLRequestInterface {
    context: any
    query: string
    variables: any
}

export const GraphQLRequest = function(options: GraphQLRequestInterface): Promise<any> {

    return new Promise((resolve, reject) => {

        axios({
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
            .then((res)=>{
                if ( res.data.errors ) {
                    return reject(res.data.errors);
                } else {
                    return resolve(res.data.data);
                }
            })
            .catch((e: AxiosError)=>{
                return reject(e.response.data)
            });

    });

};
