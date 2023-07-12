const express = require("express");
const { transactionController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/fetchTransaction",
  verifyToken,
  transactionController.fetchTransaction
);
router.get("/fetchTransactions", transactionController.fetchTransactions);
router.get(
  "/fetchTransactionStatus",
  transactionController.fetchTransactionStatus
);
router.delete(
  "/cancelTransaction/:id",
  transactionController.cancelTransaction
);
router.post(
  "/confirmTransaction/:id",
  transactionController.confirmTransaction
);

module.exports = router;
