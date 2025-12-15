const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },

    month: {
      type: String, // "2025-01"
      required: true,
    },

    amountPaid: {
      type: Number,
      required: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    paymentMode: {
      type: String,
      enum: ['CASH', 'UPI', 'CARD'],
      default: 'CASH',
    },

    status: {
      type: String,
      enum: ['PAID', 'PARTIAL'],
      default: 'PAID',
    },

    remarks: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
