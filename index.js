require("dotenv").config();
const express = require('express');
const cors = require("cors")
const sequelize = require("./models");
const studentRoutes = require("./routes/studentRoutes");
const studentClassRoutes = require("./routes/studentClassRoutes");
const studyClassRoutes = require("./routes/studyClassRoutes");


const app = express();
const db = sequelize();


app.use(express.json({ limit: "50mb" }));

app.use(cors());

app.use("/aluno", studentRoutes);
app.use("/aula", studyClassRoutes);
app.use("/aluno-aula", studentClassRoutes);

console.log(`PORT .env ${typeof (parseInt(process.env.PORT))}, hardcoded ${typeof (3001)}`)

var PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
});
