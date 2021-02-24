const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const sequelize = require("./models");
const studentRoutes = require("./routes/studentRoutes");
const studentClassRoutes = require("./routes/studentClassRoutes");


const app = express();
const db = sequelize();
// const db = new sqlite3.Database('./db/mydb.db', (err) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log('Conectado ao banco');
// })

db.sync();


console.log()

app.use(express.json({ limit: "50mb" }));

app.use("/student", studentRoutes);
app.use("/student-class", studentClassRoutes);


app.listen(3001, () => {
    console.log("listening to port 3001");
});
