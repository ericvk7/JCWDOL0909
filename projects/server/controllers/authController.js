const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../helpers/nodemailer");
const { log } = require("util");

module.exports = {
  register: async (req, res) => {
    const { email, password, phoneNumber } = req.body;

    let getEmailQuery = `SELECT * FROM users WHERE user_email=${db.escape(
      email
    )}`;

    let isEmailExist = await query(getEmailQuery);
    if (isEmailExist.length > 0) {
      return res.status(200).send({ message: "Email has been used" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let addUserQuery = `INSERT INTO users VALUES (null, ${db.escape(
      email
    )}, ${db.escape(hashPassword)}, ${db.escape(
      phoneNumber
    )}, null, null, null, null, null, null)`;
    let addUserResult = await query(addUserQuery);

    console.log(req.body);

    let payload = { id: addUserResult.insertId };
    const token = jwt.sign(payload, "six6", { expiresIn: "4h" });

    try {
      let getEmailQuery = `SELECT * FROM users WHERE user_email=${db.escape(
        email
      )}`;
      console.log(getEmailQuery);
      let isEmailExist = await query(getEmailQuery);

      if (isEmailExist.length > 0) {
        // const token = generateToken(); // Fungsi untuk menghasilkan token

        let mail = {
          from: `Admin <your_email@gmail.com>`,
          to: email,
          subject: "Verify your Email",
          html: `
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">E-Grocery</a>
            </div>
            <p>Thank you for using E-Grocery. Use the following Link to complete your Registration. <br/>
            Link is valid for 10 minutes</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"></h2>
            <p style="font-size:0.9em;">Regards,<br />Alexa</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>E-Grocery Admin</p>
              <p>1600 Amphitheatre Parkway</p>
              <p>California</p>
            </div>
          </div>
        </div>
          `,
        };

        try {
          await nodemailer.sendMail(mail);
          return res.status(200).json({
            success: true,
            message: "Link to activate your accont",
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            success: false,
            message: "Failed to send email",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "Email does not exist, please register",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }

    return res
      .status(200)
      .send({ data: addUserResult, message: "Register success" });
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      let isEmailExist = await query(
        `SELECT * FROM users WHERE user_email=${db.escape(email)}`
      );
      // console.log(isEmailExist);

      if (isEmailExist.length == 0) {
        return res
          .status(200)
          .send({ message: "Email or Password is Invalid", success: false });
      }
      const isValid = await bcrypt.compare(
        password,
        isEmailExist[0].user_password
      );
      if (!isValid) {
        return res
          .status(200)
          .send({ message: "Email or Password is incorrect", success: false });
      }
      console.log(`${isEmailExist[0].id_user}, `, isEmailExist[0].role_id);

      let payload = {
        id: isEmailExist[0].id_user,
        role: isEmailExist[0].role_id,
      };
      const token = jwt.sign(payload, "six6", { expiresIn: "2h" });
      return res.status(200).send({
        message: "Login Success",
        token,
        data: {
          id: isEmailExist[0].id_user,
          email: isEmailExist[0].user_email,
          phone: isEmailExist[0].user_phone_number,
          role: isEmailExist[0].role_id,
        },
        success: true,
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  fetchAllUser: async (req, res) => {
    try {
      const users = await query(`SELECT * FROM users`);
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  fetchUser: async (req, res) => {
    try {
      const idParams = parseInt(req.params.id);
      if (req.user.id !== idParams) {
        return res.status(400).send("Unauthorized attempt");
      }
      const users = await query(
        `SELECT * FROM users WHERE id_users = ${db.escape(idParams)}`
      );
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  checkLogin: async (req, res) => {
    try {
      const users = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(req.user.id)}`
      );
      console.log(users);
      return res.status(200).send({
        data: {
          id: users[0].id_user,
          email: users[0].user_email,
          phone: users[0].user_phone_number,
        },
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  confirmEmail: async (req, res) => {
    const { email } = req.body;

    try {
      let getEmailQuery = `SELECT * FROM users WHERE user_email=${db.escape(
        email
      )}`;
      console.log(getEmailQuery);
      let isEmailExist = await query(getEmailQuery);

      if (isEmailExist.length > 0) {
        // const token = generateToken(); // Fungsi untuk menghasilkan token

        let mail = {
          from: `Admin <your_email@gmail.com>`,
          to: email,
          subject: "Reset Password",
          html: `
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">E-Grocery</a>
            </div>
            <p>Thank you for using E-Grocery. Use the following Link to complete your Password Recovery Procedure. <br/>
            Link is valid for 10 minutes</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"></h2>
            <p style="font-size:0.9em;">Regards,<br />Alexa</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>E-Grocery Admin</p>
              <p>1600 Amphitheatre Parkway</p>
              <p>California</p>
            </div>
          </div>
        </div>
          `,
        };

        try {
          await nodemailer.sendMail(mail);
          return res.status(200).json({
            success: true,
            message: "Link to reset your password has been sent to your email",
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            success: false,
            message: "Failed to send email",
          });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },

  verifyEmail: async (req, res) => {
    const { email } = req.body;

    try {
      let getEmailQuery = `SELECT * FROM users WHERE user_email=${db.escape(
        email
      )}`;
      console.log(getEmailQuery);
      let isEmailExist = await query(getEmailQuery);

      if (isEmailExist.length > 0) {
        // const token = generateToken(); // Fungsi untuk menghasilkan token

        let mail = {
          from: `Admin <your_email@gmail.com>`,
          to: email,
          subject: "Verify your Email",
          html: `
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">E-Grocery</a>
            </div>
            <p>Thank you for using E-Grocery. Use the following Link to complete your Registration. <br/>
            Link is valid for 10 minutes</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"></h2>
            <p style="font-size:0.9em;">Regards,<br />Alexa</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>E-Grocery Admin</p>
              <p>1600 Amphitheatre Parkway</p>
              <p>California</p>
            </div>
          </div>
        </div>
          `,
        };

        try {
          await nodemailer.sendMail(mail);
          return res.status(200).json({
            success: true,
            message: "Link to activate your accont",
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            success: false,
            message: "Failed to send email",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "Email does not exist, please register",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
};
