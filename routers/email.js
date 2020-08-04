const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email) => {
    const msg = {
        to: email,
        from: 'goleramir@gmail.com',
        subject: 'Whisky Shop',
        text: 'Thank you for Register our shop !',
        html: '<strong>Thank you for Register our shop !</strong>',
    }

    return sgMail.send(msg);
}

module.exports = sendEmail;