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
  fetchTransactionShipping: async (req, res) => {
    try {
      const shippingData = await query(`SELECT * FROM shippings`);
      return res.status(200).send(shippingData);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  createTransaction: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { productData, invoice_number, date, id_shipping, total_price } =
        req.body;

      // Insert transaction into transactions table
      const createTransaction = `INSERT INTO transactions VALUES (null, ${db.escape(
        idUser
      )}, ${db.escape(total_price)}, ${db.escape(
        id_shipping
      )}, null, ${db.escape(date)}, ${db.escape(invoice_number)}, 1, null)`;

      const createTransactionResult = await query(createTransaction);
      const id_transaction = createTransactionResult.insertId;

      // Insert transaction products into transaction_products table
      const insertTransactionProducts = productData.map(
        (product) =>
          `INSERT INTO transaction_products
           VALUES (null, ${db.escape(id_transaction)}, ${db.escape(
            product.id_product
          )}, ${db.escape(product.quantity)})`
      );

      for (const queryStr of insertTransactionProducts) {
        await query(queryStr);
      }

      return res.status(200).send("Transaction created successfully");
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).send(error);
    }
  },
};
