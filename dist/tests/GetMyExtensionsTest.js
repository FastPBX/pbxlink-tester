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
    extension: yup.object({
        id: yup.string().required(),
        extnum: yup.string().required(),
        label: yup.string().required()
    })
}));
class GetMyExtensionsTest extends GQLTest_1.GQLTest {
    constructor() {
        super(...arguments);
        this.name = 'GetMyExtensions';
        this.query = `{
        GetMyExtensions {
            id
            extension {
                id
                extnum
                label
            }
        }
    }`;
        this.schema = validationSchema;
        this.message = 'Extensions Successfully Loaded & Validated';
    }
}
exports.GetMyExtensionsTest = GetMyExtensionsTest;
//# sourceMappingURL=GetMyExtensionsTest.js.map