import pug from 'pug';

const RenderTemplate = function(template: string, options: object): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        let html = pug.renderFile(`../templates/${template}.pug`, options);
        return resolve(html);
    });
};

export default RenderTemplate;
