const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c2115f200a2e14",
    pass: "0bece99b8ad00e"
  }
});

exports.sendEmail = (from, to, subject, text) => {
  const message = {
    from: from, // Sender address
    to: to,         // List of recipients
    subject: subject, // Subject line
    text: text // Plain text body
  };

  return transport.sendMail(message);
}
