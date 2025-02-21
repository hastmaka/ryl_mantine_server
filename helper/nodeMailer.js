const nodemailer = require("nodemailer");
const email = {
    paymentReceipt: require('../emailTemplate').paymentReceipt,
    serviceRequest: require('../emailTemplate').generateHtml,
}

const send = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_SERVER_USER,
            pass: process.env.MAIL_SERVER_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        return await transporter.sendMail(options)
    } catch(error) {
        return console.log(error)
    }
};

const sendEmail = async ({from, to, subject, emailTemplate, ...rest}) => {
    await send({
        from,
        to,
        subject,
        html: email[emailTemplate]({...rest.data})
    })
};


const sendErrorEmail = async (error) => {
    await send({
        from: 'Error Message <admin@ryl.vegas>',
        to: 'admin@ryl.vegas',
        subject: `Error`,
        html: `<span>${error}</span>`
    })
}

module.exports = {send, sendEmail, sendErrorEmail}