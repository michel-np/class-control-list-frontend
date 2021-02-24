const router = require("express").Router();
const studentController = require("../controllers/studentController");



router.get("/", async (req, res, next) => {
    const students = await studentController.getAllStudents();
    res.status(200).send(students);
})





module.exports = router;