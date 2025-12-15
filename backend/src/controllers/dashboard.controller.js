const Student = require("../models/Student");
const Seat = require("../models/Seat");
const Payment = require("../models/Payment");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalSeats = await Seat.countDocuments();
    const occupiedSeats = await Seat.countDocuments({ isOccupied: true });
    const availableSeats = totalSeats - occupiedSeats;

    const activeStudents = await Student.countDocuments({
      status: "ACTIVE",
    });

    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const payments = await Payment.find({
      paymentDate: { $gte: startOfMonth },
    });

    const totalCollection = payments.reduce(
      (sum, p) => sum + p.amountPaid,
      0
    );

    res.json({
      totalSeats,
      occupiedSeats,
      availableSeats,
      activeStudents,
      totalCollection,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard stats error" });
  }
};
