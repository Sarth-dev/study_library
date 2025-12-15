const Payment = require('../models/Payment');
const Student = require('../models/Student');

/**
 * Make a payment
 */
exports.makePayment = async (req, res) => {
  try {
    const { studentId, amountPaid, paymentMode, month, remarks } = req.body;

    const student = await Student.findById(studentId);
    if (!student || student.status !== 'ACTIVE') {
      return res.status(400).json({ message: 'Invalid or inactive student' });
    }

    const monthlyFee = student.monthlyFee;

    let status = 'PAID';
    if (amountPaid < monthlyFee) {
      status = 'PARTIAL';
    }

    const payment = await Payment.create({
      student: studentId,
      amountPaid,
      paymentMode,
      month,
      status,
      remarks,
    });

    res.status(201).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentPayments = async (req, res) => {
  const payments = await Payment.find({
    student: req.params.studentId,
  }).sort({ paymentDate: -1 });

  res.json(payments);
};
