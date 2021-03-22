const nodemailer = require("nodemailer");
const keys = require("../config/keys");

exports.sendEmail = (email, name, item, userName) => {

  let transport = nodemailer.createTransport({
    host: keys.smtp,
    port: 2525,
    auth: {
      user: keys.mailerUser,
      pass: keys.mailerPassword,
    },
  });

  const message = {
    from: "mytop10watch@gmail.com", // Sender address
    to: email, // List of recipients
    subject: `Hey ${name}, ${userName} just dropped for you a hint!`, // Subject line
    text: item.url, // Plain text body
  };
  transport.sendMail(message, function (err, info) {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log(info);
    }
  });
};

