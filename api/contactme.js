const nodemailer = require('nodemailer');

const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // another option
  // res.setHeader('Access-Control-Allow-Origin', req.header.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res)
}

const handler = (req, res) => {
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
          user: '{process.env.API_MAIL}',
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

  module.exports = allowCors(handler);
