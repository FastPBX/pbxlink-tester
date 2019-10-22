import pug from 'pug';

const RenderTemplate = function(template: string, options: object): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        let html = pug.renderFile(`/opt/app/dist/services/${template}.pug`, options);
        return resolve(html);
    });
};

export default RenderTemplate;
