const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eric.vianto.k7@gmail.com",
    pass: "ovvgtfsmihgjfnqw",
  },
});

module.exports = transporter;
