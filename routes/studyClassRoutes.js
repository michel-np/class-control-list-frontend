const router = require("express").Router();
const studyClassController = require("../controllers/studyClassController");


router.get("/get-classes", async (req, res, next) => {
    try {
        let classes = await studyClassController.getAllClasses();
        res.status(200).send(classes);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/get-classes/:id", async (req, res, next) => {
    let classes = await studyClassController.getClassesById(req.params.id)
    res.status(200).send(classes);
})

router.get("/get-students-from-class/:id", async (req, res, next) => {
    let classes = await studyClassController.getStudentsFromClass(req.params.id)
    res.status(200).send(classes);
})


router.post("/create-class", async (req, res, next) => {
    await studyClassController.createClass(req.body.discipline, req.body.students);
    res.status(200).send("Ok");
})

module.exports = router;