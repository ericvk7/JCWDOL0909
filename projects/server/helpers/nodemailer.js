const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "diywithicha@gmail.com",
    pass: "wvtminpzgijdxycu",
  },
  tls: { rejectUnauthorized: false },
});

module.exports = transporter;
