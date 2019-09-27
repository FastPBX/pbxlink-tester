import * as yup from 'yup';
import {GQLTest} from "./GQLTest";

let validationSchema = yup.array(
    yup.object({
        id: yup.string().required(),
        number_from: yup.string().required(),
        number_to: yup.string().required(),
        body: yup.string().required(),
        type: yup.string().required(),
        direction: yup.string().required(),
    })
);

export class GetConversationMessagesTest extends GQLTest {

    name = 'GetConversationMessages';
    query = `
        query GetConversationMessages($conversation_id: String!) {
            GetConversationMessages(conversation_id: $conversation_id) {
                id
                number_from
                number_to
                body
                type
                direction
            }
        }
    `;
    params = ['conversation_id'];
    schema = validationSchema;
    message = 'Conversations Messages Successfully Loaded & Validated';

}
