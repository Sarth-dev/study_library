const Seat = require('../models/Seat');

/**
 * Get all seats
 */
exports.getAllSeats = async (req, res) => {
  const seats = await Seat.find().sort({ seatNo: 1 });
  res.json(seats);
};

/**
 * Get only available seats
 */
exports.getAvailableSeats = async (req, res) => {
  const seats = await Seat.find({ isOccupied: false }).sort({ seatNo: 1 });
  res.json(seats);
};

// old to new seat
exports.changeSeat = async (req, res) => {
  const { newSeatNo } = req.body;
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });

  const oldSeat = await Seat.findOne({ seatNo: student.seatNo });
  const newSeat = await Seat.findOne({ seatNo: newSeatNo });

  if (!newSeat || newSeat.isOccupied) {
    return res.status(400).json({ message: 'Seat not available' });
  }

  // release old seat
  const lastHistory = oldSeat.history[oldSeat.history.length - 1];
  if (lastHistory) lastHistory.to = new Date();

  oldSeat.isOccupied = false;
  oldSeat.currentStudent = null;
  await oldSeat.save();

  // assign new seat
  newSeat.isOccupied = true;
  newSeat.currentStudent = student._id;
  newSeat.history.push({
    studentId: student._id,
    from: new Date(),
  });
  await newSeat.save();

  student.seatNo = newSeatNo;
  await student.save();

  res.json({ message: 'Seat changed successfully' });
};

