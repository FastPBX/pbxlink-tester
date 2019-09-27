import {Test, TestResultsInterface} from "./Test";

export class ErrorTest extends Test {

    run(context: any): Promise<TestResultsInterface> {
        return Promise.reject({
            success: false,
            message: 'Failure Test'
        });
    }

}
