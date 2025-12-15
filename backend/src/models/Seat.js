const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema(
  {
    seatNo: {
      type: Number,
      required: true,
      unique: true,
    },

    isOccupied: {
      type: Boolean,
      default: false,
    },

    currentStudent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      default: null,
    },

    history: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student',
        },
        from: Date,
        to: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Seat', seatSchema);
