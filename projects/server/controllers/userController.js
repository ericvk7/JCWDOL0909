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
  addMainAddress: async (req, res) => {
    try {
      const idUser = req.user.id;
      const idAddress = req.query.id_address;
      const user = await query(
        `SELECT * FROM users WHERE id_user = ${db.escape(idUser)}`
      );

      // Check if the user exists
      if (user.length > 0) {
        // Update the address column with the provided idAddress
        const updateAddressQuery = `UPDATE users SET id_address = ${db.escape(
          idAddress
        )} WHERE id_user = ${db.escape(idUser)}`;
        await query(updateAddressQuery);

        res.status(200).send({
          data: idAddress,
          message: "Update main address success",
        });
      } else {
        res.status(404).send({
          message: "User not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  editAddress: async (req, res) => {
    try {
      const { address, city, province, postalCode, district } = req.body;
      const idAddress = req.query.id_address;

      let editAddressQuery = `UPDATE addresses SET 
        address = ${db.escape(address)},
        city = ${db.escape(city)},
        province = ${db.escape(province)},
        postalCode = ${db.escape(postalCode)},
        district = ${db.escape(district)}
        WHERE id_address = ${db.escape(idAddress)}`;

      let editAddressResult = await query(editAddressQuery);

      res
        .status(200)
        .send({ data: editAddressQuery, message: "Edit Address Success" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  },
  deleteAddress: async (req, res) => {
    try {
      const idAddress = req.query.id_address;

      let deleteAddressQuery = `DELETE FROM addresses WHERE id_address = ${db.escape(
        idAddress
      )}`;

      let deleteAddressResult = await query(deleteAddressQuery);

      if (deleteAddressResult.affectedRows > 0) {
        res.status(200).send({
          message: "Delete Address Success",
        });
      } else {
        res.status(404).send({
          message: "Address not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  fetchAddress: async (req, res) => {
    try {
      const id = req.user.id;
      const getAddresses = await query(
        `SELECT * FROM addresses WHERE id_user = ${db.escape(id)}`
      );
      return res.status(200).send(getAddresses);
    } catch (error) {
      console.log(error);
    }
  },
  fetchMainAddress: async (req, res) => {
    try {
      const idUser = req.user.id;

      const getAddresses = await query(`
        SELECT a.*, u.id_address
        FROM addresses a
        INNER JOIN users u ON a.id_address = u.id_address
        WHERE u.id_user = ${db.escape(idUser)}
      `);

      return res.status(200).send(getAddresses);
    } catch (error) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
};
