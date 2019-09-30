"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const GQLTest_1 = require("./GQLTest");
let validationSchema = yup.array(yup.object({
    id: yup.string().required(),
    number_from: yup.string().required(),
    number_to: yup.string().required(),
    body: yup.string(),
    type: yup.string().required(),
    direction: yup.string().required(),
}));
class GetConversationMessagesTest extends GQLTest_1.GQLTest {
    constructor() {
        super(...arguments);
        this.name = 'GetConversationMessages';
        this.query = `
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
        this.params = ['conversation_id'];
        this.schema = validationSchema;
        this.message = 'Conversations Messages Successfully Loaded & Validated';
    }
}
exports.GetConversationMessagesTest = GetConversationMessagesTest;
//# sourceMappingURL=GetConversationMessagesTest.js.map