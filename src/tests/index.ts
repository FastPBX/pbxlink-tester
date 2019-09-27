import {GetConversationMessagesTest} from "./GetConversationMessagesTest";
import {GetMyExtensionsTest} from "./GetMyExtensionsTest";
import {GetNumberConversationsTest} from "./GetNumberConversationsTest";
import {RequestTokenTest} from "./RequestTokenTest";
import {Test} from "./Test";
import {ErrorTest} from "./ErrorTest";
import {RequestCodeTest} from "./RequestCodeTest";

const TestsManifest = {
    'Test': Test,
    'ErrorTest': ErrorTest,
    'RequestCodeTest': RequestCodeTest,
    'RequestTokenTest': RequestTokenTest,
    'GetMyExtensionsTest': GetMyExtensionsTest,
    'GetNumberConversationsTest': GetNumberConversationsTest,
    'GetConversationMessagesTest': GetConversationMessagesTest
};

export default TestsManifest;
