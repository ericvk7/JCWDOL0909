const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db, query } = require("../database");
<<<<<<< HEAD
const nodemailer = require("../helpers/nodemailer");

module.exports = {
=======

module.exports = {
  fetchUser: async (req, res) => {
    try {
      const idParams = parseInt(req.params.id);

      const users = await query(
        `SELECT * FROM users WHERE id_admin = ${db.escape(idParams)}`
      );
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
>>>>>>> Features-FP-22
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      let isEmailExist = await query(
        `SELECT * FROM admins WHERE email=${db.escape(email)}`
      );
      console.log(isEmailExist);

      if (isEmailExist.length == 0) {
        return res
          .status(200)
          .send({ message: "Email or Password is Invalid", success: false });
      }
      const isValid = await bcrypt.compare(password, isEmailExist[0].password);
      if (!isValid) {
        return res
          .status(200)
          .send({ message: "Email or Password is incorrect", success: false });
      }
      let payload = {
        id: isEmailExist[0].id_admin,
      };
      const token = jwt.sign(payload, "six6", { expiresIn: "4h" });
      return res.status(200).send({
        message: "Login Success",
        token,
        data: {
          id: isEmailExist[0].id_admin,
          id_role: isEmailExist[0].id_role,
          email: isEmailExist[0].email,
          name: isEmailExist[0].name,
        },
        success: true,
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  checkLoginAdmin: async (req, res) => {
    try {
      const admins = await query(
<<<<<<< HEAD
        `SELECT * FROM admins WHERE id_admin = ${db.escape(req.user.id)}`
=======
        `SELECT * FROM admins WHERE id_admin = ${db.escape(req.admin.id)}`
>>>>>>> Features-FP-22
      );
      console.log(admins);
      return res.status(200).send({
        data: {
          id: admins[0].id_admin,
          email: admins[0].email,
          name: admins[0].name,
          id_role: admins[0].id_role,
        },
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
<<<<<<< HEAD
  fetchAllBranch: async (req, res) => {
    try {
      const branch = await query(`SELECT * FROM branches`);
      return res.status(200).send(branch);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  createAdminBranch: async (req, res) => {
    try {
      const { adminEmail, adminName, id_branches } = req.body;

      let getEmailQuery = `SELECT * FROM admins WHERE email=${db.escape(
        adminEmail
      )}`;

      let isEmailExist = await query(getEmailQuery);

      if (isEmailExist.length > 0) {
        return res.status(200).send({ message: "Email has been used" });
      }

      const randomstring = Math.random().toString(36).slice(-10);
      const hashPass = await bcrypt.hash(randomstring, 10);

      let createAdminBranchQuery = `INSERT INTO admins VALUES (null, ${db.escape(
        adminName
      )}, ${db.escape(adminEmail)}, ${db.escape(hashPass)}, 2, ${db.escape(
        id_branches
      )})`;
      let createAdminResult = await query(createAdminBranchQuery);

      let payload = { id: createAdminResult.insertId };
      const token = jwt.sign(payload, "six6", { expiresIn: "5m" });
      console.log(token);

      let mail = {
        from: `Admin <diywithicha@gmail.com>`,
        to: `${adminEmail}`,
        subject: `branch Admin created!`,
        html: `hi <b>${adminName}</b>, <br />Your auto-generated password is: ${randomstring}. Use it to login to the e-grocery app.`,
      };
      nodemailer.sendMail(mail);

      return res.status(200).send({
        data: createAdminResult,
        message: "Admin created!",
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  },
  totalProductsSoldBranch: async (req, res) => {
    try {
      const totals = await query(
        `SELECT transactions.id_branch, SUM(transaction_products.quantity) AS total_sold FROM transactions JOIN transaction_products ON transactions.id_transaction = transaction_products.id_transaction_product GROUP BY transactions.id_branch;`
      );
      return res.status(200).send(totals);
    } catch (error) {
      console.error(
        "Error occurred while calculating total transactions per branch:",
        error
      );
      res.status(500).send("Internal Server Error");
    }
  },
  totalTransactionsBranch: async (req, res) => {
    try {
      // Query to fetch the total transactions per branch
      const totals = await query(
        "SELECT id_branch, COUNT(id_transaction) AS total_transactions FROM transactions GROUP BY id_branch"
      );
      return res.status(200).send(totals);
    } catch (error) {
      console.error(
        "Error occurred while calculating total transactions per branch:",
        error
      );
      res.status(500).send("Internal Server Error");
    }
  },
  totalUsersBranch: async (req, res) => {
    try {
      const totals = await query(
        "SELECT transactions.id_branch, COUNT(transactions.id_user) AS total_user FROM transactions GROUP BY transactions.id_branch;"
      );
      return res.status(200).send(totals);
    } catch (error) {
      console.error(
        "Error occurred while calculating total transactions per branch:",
        error
      );
      res.status(500).send("Internal Server Error");
    }
  },
=======
>>>>>>> Features-FP-22
};
