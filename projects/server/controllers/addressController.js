const { db, query } = require("../database");

module.exports = {
  addAddress: async (req, res) => {
    try {
      const {
        name,
        phoneNumber,
        address,
        additionalDetails,
        city,
        province,
        postalCode,
        longitude,
        latitude,
      } = req.body;
      const idUser = req.user.id;

      let addAddressQuery = `INSERT INTO addresses VALUES (null, 
        ${db.escape(idUser)}, 
        ${db.escape(name)}, 
        ${db.escape(phoneNumber)}, 
        ${db.escape(address)}, 
        ${db.escape(additionalDetails)}, 
        ${db.escape(province)}, 
        ${db.escape(city)}, 
        ${db.escape(postalCode)},
        ${db.escape(longitude)},
        ${db.escape(latitude)}
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
      const {
        address,
        city,
        province,
        postalCode,
        name,
        phoneNumber,
        additionalDetails,
        latitude,
        longitude,
      } = req.body;
      const idAddress = req.query.id_address;

      let editAddressQuery = `UPDATE addresses SET 
        name = COALESCE(${db.escape(name)}, name),
        phoneNumber = COALESCE(${db.escape(phoneNumber)}, phoneNumber),
        address = COALESCE(${db.escape(address)}, address),
        additionalDetails = COALESCE(${db.escape(
          additionalDetails
        )}, additionalDetails), 
        city = COALESCE(${db.escape(city)}, city)
        province = COALESCE(${db.escape(province)}, province),
        postalCode = COALESCE(${db.escape(postalCode)}, postalCode),
        longitude = COALESCE(${db.escape(longitude)},longitude),
        latitude = COALESCE(${db.escape(latitude)}, latitude)
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
      const getAddresses = await query(`
        SELECT *
        FROM addresses
        WHERE id_user = ${db.escape(id)} AND id_address NOT IN (
          SELECT id_address
          FROM users WHERE id_user = ${db.escape(id)}
        )
      `);
      return res.status(200).send(getAddresses);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
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

  fetchAddressById: async (req, res) => {
    try {
      const idUser = req.user.id;
      let idAddress = req.query.idAddress;

      const getAddress = await query(`
        SELECT *
        FROM addresses
        WHERE id_user = ${db.escape(idUser)} AND id_address = ${db.escape(
        idAddress
      )}`);

      return res.status(200).send(getAddress);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
};
