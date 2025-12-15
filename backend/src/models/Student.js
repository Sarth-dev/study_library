const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: String,
    education: String,

    photo: {
      public_id: String,
      url: String,
    },
    whatsappConsent: {
      type: Boolean,
      required: true,
    },

    seatNo: { type: Number, required: true },

    monthlyFee: { type: Number, required: true },
    dueDate: { type: Number, required: true },
    planType: {
      type: String,
      enum: ["FULL_TIME", "HALF_TIME"],
      required: true,
    },

    status: {
      type: String,
      enum: ['PENDING_PAYMENT', 'ACTIVE', 'HOLD', 'LEFT'],
      default: 'PENDING_PAYMENT',
    },

    seatConfirmed: {
      type: Boolean,
      default: false,
    },

    admissionDate: {
      type: Date,
      default: Date.now,
    },

    exitDate: Date,
    exitReason: String,
  },

  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);

