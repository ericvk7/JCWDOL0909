const { db, query } = require("../database");

module.exports = {
  fetchTransaction: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { startDate, endDate, page = 1, pageSize = 5, status } = req.query;

      let queryStr = `
        SELECT *
        FROM transactions
        INNER JOIN shippings ON transactions.id_shipping = shippings.id_shipping
        INNER JOIN transaction_products ON transactions.id_transaction = transaction_products.id_transaction
        INNER JOIN products ON transaction_products.id_product = products.id_product
        INNER JOIN transactions_status ON transactions.id_transaction_status = transactions_status.id_transaction_status
        WHERE transactions.id_user = ${db.escape(idUser)}
      `;

      // Check if startDate and endDate are provided
      if (startDate && endDate) {
        queryStr += ` AND transactions.date BETWEEN ${db.escape(
          startDate
        )} AND ${db.escape(endDate)}`;
      }

      // Apply status filter
      if (status) {
        queryStr += ` AND transactions.id_transaction_status = ${db.escape(
          status
        )}`;
      }

      // Add pagination
      const offset = (page - 1) * pageSize;
      queryStr += ` LIMIT ${offset}, ${pageSize}`;

      const transactions = await query(queryStr);

      // Get total count for pagination
      let totalCountQuery = `
        SELECT COUNT(*) AS totalCount
        FROM transactions
        WHERE transactions.id_user = ${db.escape(idUser)}
      `;
      if (status) {
        totalCountQuery += ` AND transactions.id_transaction_status = ${db.escape(
          status
        )}`;
      }

      const totalCountResult = await query(totalCountQuery);
      const totalCount = totalCountResult[0].totalCount;

      res.status(200).send({ transactions, totalCount });
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

  fetchTransactions: async (req, res) => {
    try {
      const { startDate, endDate, page = 1, pageSize = 5, status } = req.query;

      let queryStr = `
          SELECT *
          FROM transactions
          INNER JOIN shippings ON transactions.id_shipping = shippings.id_shipping
          INNER JOIN transaction_products ON transactions.id_transaction = transaction_products.id_transaction
          INNER JOIN products ON transaction_products.id_product = products.id_product
          INNER JOIN transactions_status ON transactions.id_transaction_status = transactions_status.id_transaction_status
        `;

      // Check if startDate and endDate are provided
      if (startDate && endDate) {
        queryStr += ` AND transactions.date BETWEEN ${db.escape(
          startDate
        )} AND ${db.escape(endDate)}`;
      }

      // Apply status filter
      if (status) {
        queryStr += ` AND transactions.id_transaction_status = ${db.escape(
          status
        )}`;
      }

      // Add pagination
      const offset = (page - 1) * pageSize;
      queryStr += ` LIMIT ${offset}, ${pageSize}`;

      const transactions = await query(queryStr);

      // Get total count for pagination
      let totalCountQuery = `
          SELECT COUNT(*) AS totalCount
          FROM transactions
        `;
      if (startDate && endDate) {
        totalCountQuery += ` WHERE transactions.date BETWEEN ${db.escape(
          startDate
        )} AND ${db.escape(endDate)}`;
      } else if (status) {
        totalCountQuery += ` WHERE transactions.id_transaction_status = ${db.escape(
          status
        )}`;
      }

      const totalCountResult = await query(totalCountQuery);
      const totalCount = totalCountResult[0].totalCount;

      res.status(200).send({ transactions, totalCount });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};
