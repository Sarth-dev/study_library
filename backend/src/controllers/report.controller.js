const Payment = require("../models/Payment");
const Student = require("../models/Student");
const calculateDue = require("../utils/calculateDue");

exports.monthlyCollectionReport = async (req, res) => {
  const { month } = req.query; // format: YYYY-MM

  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  const payments = await Payment.find({ month })
    .populate("student", "name seatNo");

  const totalCollection = payments.reduce(
    (sum, p) => sum + p.amountPaid,
    0
  );

  res.json({
    month,
    totalCollection,
    payments,
  });
};



exports.dueStudentsReport = async (req, res) => {
  const students = await Student.find({ status: "ACTIVE" });

  const dueList = [];

  for (const student of students) {
    const dueData = await calculateDue(student);
    if (dueData.dueAmount > 0) {
      dueList.push({
        _id: student._id,
        name: student.name,
        seatNo: student.seatNo,
        phone: student.phone,
        dueAmount: dueData.dueAmount,
      });
    }
  }

  res.json(dueList);
};
