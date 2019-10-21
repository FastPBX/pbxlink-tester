import {Test, TestResultsInterface} from "./Test";
import axios, {AxiosError} from "axios";

export class RequestTokenTest extends Test {

    run(context: any): Promise<TestResultsInterface> {

        return new Promise((resolve, reject) => {

            if (!context.auth_code) return reject({ message: 'No Auth Code Available' });

            axios({
                method: 'POST',
                url: `${process.env.TEST_URL}/link-auth/${context.auth_code}`,
                data: {
                    device_id: context.device_id
                },
                headers: {
                    'api-key': process.env.API_KEY
                }
            })
                .then((res)=>{
                    return resolve({
                        success: true,
                        message: 'Token Successfully Claimed',
                        context: {
                            auth_token: res.data.token
                        }
                    })
                })
                .catch((e: AxiosError)=>{
                    return reject(e)
                });

        });

    }

}
