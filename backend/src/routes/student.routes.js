const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const { getStudentDue } = require('../controllers/student.controller');
const { createStudent } = require('../controllers/student.controller');
const { getAllStudents } = require('../controllers/student.controller');
const { getStudentProfile, getStudentById } = require("../controllers/student.controller");
const { exitStudent, changeStudentPlan, renewSeat } = require('../controllers/student.controller')
const {
  holdStudent,
} = require("../controllers/student.controller");
const { approveStudent } = require('../controllers/student.controller')


router.post('/admission', upload.single('photo'), createStudent);
router.get('/:id/due', getStudentDue);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.get("/:id/profile", getStudentProfile);
router.put("/:id/hold", holdStudent);
router.put("/:id/approve", approveStudent);
router.put("/:id/exit", exitStudent);
router.put("/:id/plan", changeStudentPlan);
router.put("/:id/renew", renewSeat);



module.exports = router;
