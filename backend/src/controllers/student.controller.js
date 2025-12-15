const Seat = require('../models/Seat');
const Student = require("../models/Student");
const calculateDue = require('../utils/calculateDue');
const cloudinary = require("../config/cloudinary");
const { getWhatsAppLink } = require("../utils/whatsapp");

exports.createStudent = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      education,
      planType,
      seatNo,
      whatsappConsent,
      monthlyFee,
      dueDate,
    } = req.body;

    // ✅ Validate WhatsApp consent
    if (whatsappConsent !== "true") {
      return res
        .status(400)
        .json({ message: "WhatsApp consent is required" });
    }

    // ✅ Check seat availability
    const seat = await Seat.findOne({ seatNo });
    if (!seat || seat.isOccupied) {
      return res.status(400).json({ message: "Seat not available" });
    }

    // ✅ Handle photo upload
    let photoData = {};
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "library_students",
      });

      photoData = {
        public_id: uploaded.public_id,
        url: uploaded.secure_url,
      };
    }

    // ✅ Create student
    const student = await Student.create({
      name,
      phone,
      address,
      education,
      seatNo,
      planType,
      monthlyFee,
      dueDate,
      whatsappConsent: true,
      status: "PENDING_PAYMENT",
      seatConfirmed: false,
      photo: photoData,
    });

    // ✅ Reserve seat temporarily
    seat.isOccupied = true;
    seat.currentStudent = student._id;
    seat.history.push({
      studentId: student._id,
      from: new Date(),
    });
    await seat.save();

    res.status(201).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error("Create student error:", error);
    res.status(500).json({ message: "Admission failed" });
  }
};


//change plan
exports.changeStudentPlan = async (req, res) => {
  try {
    const { planType } = req.body;

    if (!["FULL_TIME", "HALF_TIME"].includes(planType)) {
      return res.status(400).json({ message: "Invalid plan type" });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.status === "LEFT") {
      return res
        .status(400)
        .json({ message: "Cannot change plan for exited student" });
    }

    // define plan rules
    const plans = {
      FULL_TIME: { fee: 800, dueDate: 1 },
      HALF_TIME: { fee: 500, dueDate: 1 },
    };

    student.planType = planType;
    student.monthlyFee = plans[planType].fee;
    student.dueDate = plans[planType].dueDate;

    await student.save();

    res.json({
      message: "Plan updated successfully",
      student,
    });
  } catch (error) {
    console.error("Change plan error:", error);
    res.status(500).json({ message: "Failed to update plan" });
  }
};



//admin approval
exports.approveStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // update student
    student.status = "ACTIVE";
    student.seatConfirmed = true;
    await student.save();

    // whatsapp message
    const message =
      `📚 Admission Approved!\n\n` +
      `Name: ${student.name}\n` +
      `Seat No: ${student.seatNo}\n\n` +
      `Your seat is confirmed.\nHappy studying! ✨`;

    const whatsappLink = getWhatsAppLink(student.phone, message);

    res.json({
      message: "Student approved",
      whatsappLink, // 🔥 frontend will open this
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Approval failed" });
  }
};

//exist student
exports.exitStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const seat = await Seat.findOne({ seatNo: student.seatNo });
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    // Update seat history
    const lastHistory = seat.history[seat.history.length - 1];
    if (lastHistory && !lastHistory.to) {
      lastHistory.to = new Date();
    }

    seat.isOccupied = false;
    seat.currentStudent = null;
    await seat.save();

    student.status = 'LEFT';
    student.exitDate = new Date();
    await student.save();

    res.json({
      success: true,
      message: 'Student exited and seat released successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get due date
exports.getStudentDue = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });

  const due = await calculateDue(student);

  res.json({
    studentId: student._id,
    name: student.name,
    ...due,
  });
};

//hold student
exports.holdStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });

  student.status = 'HOLD';
  await student.save();

  res.json({ message: 'Student put on hold' });
};

exports.getAllStudents = async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
};
