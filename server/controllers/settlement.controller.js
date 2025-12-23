const Settlement = require("../models/Settlement");

exports.settleUp = async (req, res) => {
  const { from, to, amount, group } = req.body;
  if (amount <= 0) {
  throw new Error("Settlement amount must be positive");
}


  const settlement = await Settlement.create({
    from:req.user,
    to,
    amount,
    group
  });

  res.json(settlement);
};
// GET all settlements involving logged-in user
exports.getMySettlements = async (req, res) => {
  const userId = req.user;
console.log(userId);
  const settlements = await Settlement.find({
    $or: [{ from: userId }, { to: userId }]
  })
    .populate("from", "name")
    .populate("to", "name")
    .populate("group", "name");
console.log(settlements);
  res.json(settlements);
};
