const nodemailer = require("nodemailer");

const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const user = process.env.SMTP_USERNAME;
const pass = process.env.SMTP_PASSWORD;

let transport = nodemailer.createTransport({
    host,
    port,
    auth: {
        user,
        pass,
    },
});

async function sendWelcomeEmail(email, name) {
    const subject = "Uspješno ste se registrirali.";
    const html = `
          Poštovani <strong>${name}</strong>,
      <br>
      <br>
          Dobrodošli u Globetraveler putničku agenciju.
      <br>
      <br>
      Želimo vam ugodan dan,
          Globetraveler
      `;

    return await sendEmail(email, subject, html);
}

async function sendEmail(to, subject, html) {
    return transport.sendMail({
        from: '"GLOBETRAVELER" <admin@globetraveler.io>',
        to,
        subject,
        html,
    });
}

async function sendResetPasswordRequestEmail(email, name, url) {
    const subject = "Zahtjev za resetiranjem lozinke Globetraveler";
    const html = `
          Poštovani <strong>${name}</strong>,
      <br>
      <br>
          Slijedite ovaj link kako bi resetirali password: <a href="${url}" target="_blank"> reset password</a>
      <br>
      <br>
      Želimo vam ugodan dan,
          Globetraveler
      `;

    return await sendEmail(email, subject, html);
}

async function sendResetPasswordEmail(email, name, url) {
    const subject = "Uspješno ste resetirali svoj password";
    const html = `
          Poštovani <strong>${name}</strong>,
      <br>
      <br>
     Uspješno ste resetirali svoj password
          Slijedite ovaj link za login: <a href="${url}" target="_blank"> login</a>
      <br>
      <br>
          Želimo vam ugodan dan,
         Globetraveler
      `;

    return await sendEmail(email, subject, html);
}

module.exports = {
    sendWelcomeEmail,
    sendResetPasswordRequestEmail,
    sendResetPasswordEmail,
};