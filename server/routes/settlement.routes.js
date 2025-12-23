const express = require("express");
const router = express.Router();
const { settleUp } = require("../controllers/settlement.controller");
const authHeader = require("../middleware/auth.middleware");
const { getMySettlements } = require("../controllers/settlement.controller");   
router.post("/",authHeader, settleUp);
router.get("/my-settlements", authHeader, getMySettlements);

const { deleteSettlement } = require("../controllers/settlement.controller");

router.delete("/:settlementId", authHeader, deleteSettlement);

module.exports = router;
