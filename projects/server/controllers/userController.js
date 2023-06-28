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
      await query(updateQuery);

      const updatedUser = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(idUser)}`
      );

      return res.status(200).send(updatedUser);
    } catch (error) {
      console.error(error); // Tambahkan ini untuk melihat kesalahan pada server
      res.status(500).send(error.message || "Internal Server Error");
    }
  },
  uploadProfilePic: async (req, res) => {
    try {
      const { file } = req;
      const filepath = file ? "/" + file.filename : null;

      await query(
        `UPDATE users SET profilePicture = ${db.escape(
          filepath
        )} WHERE id_user = ${db.escape(req.user.id)}`
      );

      res
        .status(200)
        .send({ filepath, message: "Profile picture uploaded successfully." });
    } catch (error) {
      console.log(error);
    }
  },
  addAddress: async (req, res) => {
    try {
      const { address, city, province, postalCode, district } = req.body;
      const idUser = req.user.id;

      let addAddressQuery = `INSERT INTO addresses VALUES (null, 
        ${db.escape(idUser)}, 
        ${db.escape(address)}, 
        ${db.escape(city)}, 
        ${db.escape(province)}, 
        ${db.escape(postalCode)},
        ${db.escape(district)}
      )`;

      console.log(addAddressQuery);

      let addAddressResult = await query(addAddressQuery);

      // Check if the address column is null in the user table
      let checkUserQuery = `SELECT id_address FROM users WHERE id_user = ${db.escape(
        idUser
      )}`;
      let checkUserResult = await query(checkUserQuery);

      if (checkUserResult.length <= 0) {
        // Update the address column with addAddressResult.insertId
        let updateAddressQuery = `UPDATE users SET id_address = ${db.escape(
          addAddressResult.insertId
        )} WHERE id_user = ${db.escape(idUser)}`;
        await query(updateAddressQuery);
      }

      res
        .status(200)
        .send({ data: addAddressResult, message: "Add Address Success" });
    } catch (error) {
      console.log(error);
    }
  },
};
