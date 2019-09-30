import * as yup from 'yup';
import {GQLTest} from "./GQLTest";

let validationSchema = yup.array(
    yup.object({
        id: yup.string().required(),
        number_1: yup.string().required(),
        number_2: yup.string().required(),
        messages: yup.array(
            yup.object({
                number_to: yup.string().required(),
                number_from: yup.string().required(),
                body: yup.string(),
            })
        )
    })
);

export class GetNumberConversationsTest extends GQLTest {

    name = 'GetNumberConversations';
    query = `
        query GetNumberConversations($number_id: String!) {
            GetNumberConversations(number_id: $number_id) {
                id
                number_1
                number_2
                messages {
                    number_to
                    number_from
                    body
                }
            }
        }
    `;
    params = ['number_id'];
    schema = validationSchema;
    message = 'Conversations Successfully Loaded & Validated';

    extractToContext(data: any): any {
        if (data.length) {
            return {
                conversation_id: data[0].id
            }
        } else {
            return {}
        }
    }

}
