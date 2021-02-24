const router = require("express").Router();
const studentClassController = require("../controllers/studentClassController");



router.get("/add-class", async (req, res, next) => {
    await studentClassController.addStudentClass("");
    res.status(200).send("ok");
})

router.get("/", async (req, res, next) => {
    let classes = await studentClassController.getClasses();
    res.status(200).send(classes);
})


module.exports = router;