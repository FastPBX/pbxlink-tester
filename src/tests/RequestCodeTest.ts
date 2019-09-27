import {Test, TestResultsInterface} from "./Test";
import axios, {AxiosError} from "axios";

export class RequestCodeTest extends Test {

    run(context: any): Promise<TestResultsInterface> {

        return new Promise((resolve, reject) => {

            axios({
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
                .then((res)=>{
                    return resolve({
                        success: true,
                        message: 'Auth Code Successfully Requested',
                        context: {
                            auth_code: res.data.message
                        }
                    })
                })
                .catch((e: AxiosError)=>{
                    return reject(e.response.data)
                });

        });

    }

}
