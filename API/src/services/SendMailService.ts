import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

class SendMailService {
    // propriedade que vai salvar a variével transporte
    private client: Transporter

    // Intergrando com o sistema de envio de email Ethereal Email
    constructor() {
        nodemailer.createTestAccount().then(account => {

            // Objeto Transpotador SMTP que vai de fato enviar nosso email
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        }) 
            
    }


    // Método para enviar o nosso email
    async execute(to: string, subject: string, variables: object, path: string){ // to: para quem, subject: assunto, body: corpo do email, path: caminho do arquivo do email


    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    // Variáveis com valor para o template em html/css
    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables);

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreplay@nps.com.br>"
        })

        console.log('Message sent: %s', message.messgeId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));

    }
}

export default new SendMailService();// para criar uma instancia quando essa classe for chamada