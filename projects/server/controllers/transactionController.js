const { db, query } = require("../database");

module.exports = {
  fetchTransaction: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { status } = req.query;

      const transaction = await query(`
        SELECT *
        FROM transactions
        INNER JOIN shippings ON transactions.id_shipping = shippings.id_shipping
        INNER JOIN transaction_products ON transactions.id_transaction = transaction_products.id_transaction
        INNER JOIN products ON transaction_products.id_product = products.id_product
        INNER JOIN transactions_status ON transactions.id_transaction_status = transactions_status.id_transaction_status
        WHERE transactions.id_user = ${db.escape(
          idUser
        )} AND transaction_products.id_transaction IN (
          SELECT id_transaction
          FROM transactions
        )
      `);

      res.status(200).send(transaction);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  fetchTransactionStatus: async (req, res) => {
    try {
      const transactionStatus = await query(
        `SELECT * FROM transactions_status`
      );
      return res.status(200).send(transactionStatus);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  createTransaction: async (req, res) => {
    try {
      const { email, password, phoneNumber } = req.body;
      const idUser = req.user.id;

      let getUserQuery = `SELECT * FROM users WHERE id_user=${db.escape(
        idUser
      )}`;
      let isUserExist = await query(getUserQuery);
      if (isUserExist.length < 0) {
        return res.status(200).send({ message: "User does not exist" });
      }
      const createTransaction = await query(
        `SELECT * FROM transactions_status`
      );
      return res.status(200).send(createTransaction);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};
