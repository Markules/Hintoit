const nodemailer = require("nodemailer");

exports.sendEmail = (email, name, item, userName) => {

  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9319d459af6b9d",
      pass: "7bbc36cafc8e85",
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

