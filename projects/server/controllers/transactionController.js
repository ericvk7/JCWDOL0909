const { db, query } = require("../database");

module.exports = {
  fetchTransaction: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { startDate, endDate, page = 1, pageSize = 5, status } = req.query;
      const offset = (page - 1) * pageSize;
      const limitStr = ` LIMIT ${offset}, ${pageSize}`;
      // Check if startDate and endDate are provided
      let queryWhereHead = "";
      if (startDate && endDate) {
        queryWhereHead += ` where transactions.date BETWEEN ${db.escape(
          startDate
        )} AND ${db.escape(endDate)}`;
      }

      // Apply status filter
      if (status) {
        queryWhereHead += ` ${
          queryWhereHead ? "AND" : "where"
        } transactions.id_transaction_status = ${db.escape(status)}`;
      }
      let queryStr = `
      SELECT * FROM (SELECT * from transactions ${queryWhereHead} ${limitStr}) as transactions 
          INNER JOIN shippings ON transactions.id_shipping = shippings.id_shipping
          INNER JOIN transaction_products ON transactions.id_transaction = transaction_products.id_transaction
          INNER JOIN products ON transaction_products.id_product = products.id_product
          INNER JOIN transactions_status ON transactions.id_transaction_status = transactions_status.id_transaction_status
          WHERE transactions.id_user = ${db.escape(idUser)}
          `;
      // testing
      // Add pagination
      console.log(queryStr);
      const transactions = await query(queryStr);
      let totalWhereCountQuery = "";
      if (startDate && endDate) {
        totalWhereCountQuery += ` where transactions.date BETWEEN ${db.escape(
          startDate
        )} AND ${db.escape(endDate)}`;
      }
      if (status) {
        totalWhereCountQuery += `${
          totalWhereCountQuery ? "AND" : "where"
        } transactions.id_transaction_status = ${db.escape(status)}`;
      }

      // Get total count for pagination
      let totalCountQuery = `SELECT COUNT(*) AS totalCount FROM transactions ${
        totalWhereCountQuery ? ` ${totalWhereCountQuery} AND` : "WHERE"
      } id_user = ${db.escape(idUser)}`;
      console.log(totalCountQuery);
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
      const offset = (page - 1) * pageSize;
      const limitStr = ` LIMIT ${offset}, ${pageSize}`;
      // Check if startDate and endDate are provided
      let queryWhereHead = "";
      if (startDate && endDate) {
        queryWhereHead += ` where transactions.date BETWEEN ${db.escape(
          startDate
        )} AND ${db.escape(endDate)}`;
      }

      // Apply status filter
      if (status) {
        queryWhereHead += ` ${
          queryWhereHead ? "AND" : "where"
        } transactions.id_transaction_status = ${db.escape(status)}`;
      }
      let queryStr = `
      SELECT * FROM (SELECT * from transactions ${queryWhereHead} ${limitStr}) as transactions 
          INNER JOIN shippings ON transactions.id_shipping = shippings.id_shipping
          INNER JOIN transaction_products ON transactions.id_transaction = transaction_products.id_transaction
          INNER JOIN products ON transaction_products.id_product = products.id_product
          INNER JOIN transactions_status ON transactions.id_transaction_status = transactions_status.id_transaction_status
          `;

      // Add pagination
      console.log(queryStr);
      const transactions = await query(queryStr);
      let totalWhereCountQuery = "";
      if (startDate && endDate) {
        totalWhereCountQuery += ` where transactions.date BETWEEN ${db.escape(
          startDate
        )} AND ${db.escape(endDate)}`;
      }
      if (status) {
        totalWhereCountQuery += `${
          totalWhereCountQuery ? "AND" : "where"
        } transactions.id_transaction_status = ${db.escape(status)}`;
      }

      // Get total count for pagination
      let totalCountQuery = `
          SELECT COUNT(*) AS totalCount from
          (select * FROM transactions ${totalWhereCountQuery} ) as transactions
        `;
      console.log(totalCountQuery);
      const totalCountResult = await query(totalCountQuery);
      const totalCount = totalCountResult[0].totalCount;

      res.status(200).send({ transactions, totalCount });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};
