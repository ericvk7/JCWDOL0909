const { db, query } = require("../database");

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
    const { email, name, phone_number, gender, birthdate } = req.body;
    const idParams = parseInt(req.params.id);
    console.log(req.body);
    try {
      if (req.user.id !== idParams) {
        return res.status(400).send("Unauthorized attempt");
      }

      const user = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(idParams)}`
      );

      if (user.length === 0) {
        return res.status(404).send("User not found");
      }

      const updateQuery = `UPDATE users SET email = COALESCE(${db.escape(
        email
      )}, email),
      name = COALESCE(${db.escape(name)}, name),
      phone_number = COALESCE(${db.escape(phone_number)}, phone_number),
      gender = COALESCE(${db.escape(gender)}, gender),
      birthdate = COALESCE(STR_TO_DATE(${db.escape(
        birthdate
      )}, '%m/%d/%Y'), birthdate)
      WHERE id_user = ${db.escape(idParams)}`;

      await query(updateQuery);

      const updatedUser = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(idParams)}`
      );

      return res.status(200).send(updatedUser);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  // editProfile: async (req, res) => {
  //   const { email, name, phone_number, gender, birthday } = req.body;
  //   const idParams = parseInt(req.params.id);
  //   console.log(req.body);
  //   try {
  //     if (req.user.id !== idParams) {
  //       return res.status(400).send("Unauthorized attempt");
  //     }

  //     const user = await query(
  //       `SELECT * FROM users WHERE id_user = ${db.escape(idParams)}`
  //     );

  //     if (user.length === 0) {
  //       return res.status(404).send("User not found");
  //     }

  //     // Update the user profile with the provided data
  //     await query(
  //       `UPDATE users SET email = ${db.escape(email)}, name = ${db.escape(
  //         name
  //       )},
  //         phone_number = ${db.escape(phone_number)}, gender = ${db.escape(
  //         gender
  //       )},
  //         birthdate = ${db.escape(birthday)} WHERE id_user = ${db.escape(
  //         idParams
  //       )}`
  //     );

  //     // Fetch the updated user data
  //     const updatedUser = await query(
  //       `SELECT * FROM users WHERE id_user = ${db.escape(idParams)}`
  //     );

  //     return res.status(200).send(updatedUser);
  //   } catch (error) {
  //     res.status(error.status || 500).send(error);
  //   }
  // },

  // editProfile: async (req, res) => {
  //   try {
  //     const idParams = parseInt(req.params.id);
  //     if (req.user.id !== idParams) {
  //       return res.status(400).send("Unauthorized attempt");
  //     }
  //     const users = await query(
  //       `SELECT * FROM users WHERE id_user = ${db.escape(idParams)}`
  //     );
  //     return res.status(200).send(users);
  //   } catch (error) {
  //     res.status(error.status || 500).send(error);
  //   }
  // },
};
