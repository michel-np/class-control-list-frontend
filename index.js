const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const sequelize = require("./models");
const studentRoutes = require("./routes/studentRoutes");
const studentClassRoutes = require("./routes/studentClassRoutes");
const studyClassRoutes = require("./routes/studyClassRoutes");


const app = express();
const db = sequelize();







app.use(express.json({ limit: "50mb" }));

// app.get("/getstudentclasses", async (req, res, next) => {
//     let response = await db.models.StudyClass.findAll({
//         where: {
//             discipline: "Inglês"
//         },
//         include: {
//             model: db.models.Student,
//             through: {
//                 where: {
//                     isPresent: true
//                 }
//             }
//         }

//     });
//     res.status(200).send(response)
// })

app.use(require("cors")())

app.use("/aluno", studentRoutes);
app.use("/aula", studyClassRoutes);
app.use("/aluno-aula", studentClassRoutes);


app.listen(3001, () => {
    console.log("listening to port 3001");
});
