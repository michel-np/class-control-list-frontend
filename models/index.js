const { Sequelize } = require("sequelize");
const student = require("./student");
const studyClass = require("./studyClass");
const studentClass = require("./studentClass");


module.exports = () => {

    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "sqlite-database/mydb.sqlite"
    });

    const Student = student(sequelize);
    const StudyClass = studyClass(sequelize);
    const StudentClass = studentClass(sequelize);



    Student.belongsToMany(StudyClass, { through: "StudentClass" });
    StudyClass.belongsToMany(Student, { through: "StudentClass" });



    return sequelize;

}




