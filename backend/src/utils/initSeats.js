const Seat = require('../models/Seat');

const initSeats = async (totalSeats = 100) => {
  const existing = await Seat.countDocuments();
  if (existing > 0) return;

  const seats = [];
  for (let i = 1; i <= totalSeats; i++) {
    seats.push({ seatNo: i });
  }

  await Seat.insertMany(seats);
  console.log('Seats initialized');
};

module.exports = initSeats;
