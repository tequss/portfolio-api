const nodemailer = require('nodemailer');

module.exports = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: "teqqus@gmail.com",
      subject: "Contact Form Message",
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };

    const contactEmail = nodemailer.createTransport({
        service: "gmail",
        host: "smtp-relay.gmail.com",
        port: 587,
        auth: {
          user: "wkdeveloper123",
          pass: "@password123",
        },
      });
      
    contactEmail.verify((error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Ready to Send");
        }
    });

    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.status(400).json({ status: "failed" });
      } else {
        res.status(200).json({ status: "sent" });
      }
    });
  }
