const { db, query } = require("../database");
const moment = require("moment");

module.exports = {
  fetchUser: async (req, res) => {
    try {
      const idParams = parseInt(req.params.id);
      if (req.user.id !== idParams) {
        return res.status(400).send("Unauthorized attempt");
      }
      const users = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(idParams)}`
      );
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  editProfile: async (req, res) => {
    try {
      const { email, name, phone_number, gender, birthday } = req.body;
      const idUser = req.user.id;
      const user = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(idUser)}`
      );
      console.log(idUser);
      if (user.length <= 0) {
        return res.status(404).send("User not found");
      }

      const formattedBirthday = moment(birthday, "YYYY-MM-DD").format(
        "YYYY-MM-DD"
      );

      const updateQuery = `
        UPDATE users SET
          email = COALESCE(${db.escape(email)}, email),
          name = COALESCE(${db.escape(name)}, name),
          phone_number = COALESCE(${db.escape(phone_number)}, phone_number),
          gender = COALESCE(${db.escape(gender)}, gender),
          birthday = COALESCE(STR_TO_DATE(${db.escape(
            formattedBirthday
          )}, '%Y-%m-%d'), birthday)
        WHERE id_user = ${db.escape(idUser)}
      `;
      console.error(error);
      await query(updateQuery);

      const updatedUser = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(idUser)}`
      );

      return res.status(200).send(updatedUser);
    } catch (error) {
      res.status(error.status || 500).send(error.message);
    }
  },
};
