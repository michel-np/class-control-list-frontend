const { Sequelize } = require("sequelize");
const student = require("./student");
const studyClass = require("./studyClass");
const studentClass = require("./studentClass");


module.exports = () => {
    console.log("Running Sequelize")
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "sqlite-database/mydb.sqlite",
        logging: false
    });

    const Student = student(sequelize);
    const StudyClass = studyClass(sequelize);
    const StudentClass = studentClass(sequelize);



    Student.belongsToMany(StudyClass, { through: "StudentClass" });
    StudyClass.belongsToMany(Student, { through: "StudentClass" });



    return sequelize;

}




