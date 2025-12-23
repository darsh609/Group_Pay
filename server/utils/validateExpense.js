exports.validateExpense = ({ amount, splitType, splits }) => {
  if (amount <= 0) throw new Error("Amount must be positive");

  if (splitType === "EXACT") {
    const sum = splits.reduce((a, s) => a + s.amount, 0);
    if (sum !== amount) {
      throw new Error("Exact split does not match total amount");
    }
  }

  if (splitType === "PERCENTAGE") {
    const sum = splits.reduce((a, s) => a + s.percentage, 0);
    if (sum !== 100) {
      throw new Error("Percentage split must sum to 100");
    }
  }
};
