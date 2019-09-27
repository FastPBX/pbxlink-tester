import * as yup from 'yup';
import {GQLTest} from "./GQLTest";

let validationSchema = yup.array(yup.object({
    id: yup.string().required(),
    extension: yup.object({
        id: yup.string().required(),
        extnum: yup.string().required(),
        label: yup.string().required()
    })
}));

export class GetMyExtensionsTest extends GQLTest {

    name = 'GetMyExtensions';
    query = `{
        GetMyExtensions {
            id
            extension {
                id
                extnum
                label
            }
        }
    }`;
    schema = validationSchema;
    message = 'Extensions Successfully Loaded & Validated';

}
