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
    number_1: yup.string().required(),
    number_2: yup.string().required(),
    messages: yup.array(yup.object({
        number_to: yup.string().required(),
        number_from: yup.string().required(),
        body: yup.string().required(),
    }))
}));
class GetNumberConversationsTest extends GQLTest_1.GQLTest {
    constructor() {
        super(...arguments);
        this.name = 'GetNumberConversations';
        this.query = `
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
        this.params = ['number_id'];
        this.schema = validationSchema;
        this.message = 'Conversations Successfully Loaded & Validated';
    }
    extractToContext(data) {
        if (data.length) {
            return {
                conversation_id: data[0].id
            };
        }
        else {
            return {};
        }
    }
}
exports.GetNumberConversationsTest = GetNumberConversationsTest;
//# sourceMappingURL=GetNumberConversationsTest.js.map