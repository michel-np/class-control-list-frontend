const router = require("express").Router();
const studentController = require("../controllers/studentController");



router.get("/", async (req, res, next) => {
    const students = await studentController.getAllStudents();
    res.status(200).send(students);
})

router.get("/get-student-attendance-status", async (req, res, next) => {
    let student = await studentController.getStudentAttendanceStatus(req.query.studentId, req.query.classId)
    res.status(200).send(student);
})




module.exports = router;