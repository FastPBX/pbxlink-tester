"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pug_1 = __importDefault(require("./pug"));
const api_key = process.env.MAILGUN_SECRET;
const domain = process.env.MAILGUN_DOMAIN;
const params = {
    apiKey: api_key,
    domain: domain
};
const mailgun = require('mailgun-js')(params);
const SendMessage = function (payload) {
    return new Promise((resolve, reject) => {
        pug_1.default('alert', {
            data: {
                results: payload.results,
                failure: payload.failure,
                status: payload.status,
            }
        }).then((html) => {
            let SendData = {
                from: `FastPBX Support Team <support@${domain}>`,
                to: payload.to,
                subject: payload.subject,
                text: payload.text ? payload.text : null,
                html: html
            };
            mailgun.messages()
                .send(SendData)
                .then((data) => {
                return resolve(true);
            })
                .catch((error) => {
                console.error('MailGunSendError', error);
                return reject(false);
            });
        }).catch((error) => {
            console.error('RenderTemplateError', error);
            return reject(false);
        });
    });
};
exports.default = SendMessage;
//# sourceMappingURL=mailgun.js.map