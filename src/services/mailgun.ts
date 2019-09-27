import * as Mailgun from "mailgun-js";
import RenderTemplate from "./pug";

const api_key: string = process.env.MAILGUN_SECRET;
const domain: string = process.env.MAILGUN_DOMAIN;

const params: Mailgun.ConstructorParams = {
    apiKey: api_key,
    domain: domain
};

const mailgun: Mailgun.Mailgun = require('mailgun-js')(params);

export interface MessagePayload {
    to: string;
    subject: string;
    text?: string;
    html?: string;
    results?: any;
    status?: any;
    failure?: any;
}

const SendMessage = function(payload: MessagePayload): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

        RenderTemplate('alert', {
            data: {
                results: payload.results,
                failure: payload.failure,
                status: payload.status,
            }
        }).then((html: string) => {

            let SendData: Mailgun.messages.SendData = {
                from: `FastPBX Support Team <support@${domain}>`,
                to: payload.to,
                subject: payload.subject,
                text: payload.text ? payload.text : null,
                html: html
            };

            mailgun.messages()
                .send(SendData)
                .then((data: Mailgun.messages.SendResponse) => {
                    return resolve(true);
                })
                .catch((error: Mailgun.Error) => {
                    console.error('MailGunSendError',error);
                    return reject(false)
                });

        }).catch((error: any) => {
            console.error('RenderTemplateError',error);
            return reject(false)
        });

    });

};

export default SendMessage;
