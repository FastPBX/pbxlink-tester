"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pug_1 = __importDefault(require("pug"));
const RenderTemplate = function (template, options) {
    return new Promise((resolve, reject) => {
        let html = pug_1.default.renderFile(`/opt/app/dist/services/${template}.pug`, options);
        return resolve(html);
    });
};
exports.default = RenderTemplate;
//# sourceMappingURL=pug.js.map