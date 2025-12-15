const express = require('express');
const cors = require('cors');

const studentRoutes = require('./routes/student.routes');
const seatRoutes = require('./routes/seat.routes');
const paymentRoutes = require('./routes/payment.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use("/api/reports", require("./routes/report.routes"));

module.exports = app;
