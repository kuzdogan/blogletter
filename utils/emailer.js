const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c2115f200a2e14",
    pass: "0bece99b8ad00e"
  }
});



exports.sendEmail = () => {
  const message = {
    from: 'elonmusk@tesla.com', // Sender address
    to: 'kaanuzdogan@hotmail.com',         // List of recipients
    subject: 'Design Your Model S | Tesla', // Subject line
    text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
  };

  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  });
}
