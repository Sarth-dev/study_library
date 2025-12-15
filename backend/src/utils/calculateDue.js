const Payment = require('../models/Payment');

const calculateDue = async (student) => {
  const start = new Date(student.admissionDate);
  const now = new Date();

  const totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth()) + 1;

  const totalFee = totalMonths * student.monthlyFee;

  const payments = await Payment.find({ student: student._id });

  const paidAmount = payments.reduce(
    (sum, p) => sum + p.amountPaid,
    0
  );

  return {
    totalFee,
    paidAmount,
    dueAmount: totalFee - paidAmount,
  };
};

module.exports = calculateDue;
