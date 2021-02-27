const { Sequelize } = require("sequelize");
const student = require("./student");
const studyClass = require("./studyClass");
const studentClass = require("./studentClass");
const initialStudents = require("../mock-data/students.json")
const classes = require("../mock-data/studyClasses.json")



const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "../sqlite-database/mydb.sqlite"
});


const Student = student(sequelize);
const StudyClass = studyClass(sequelize);
const StudentClass = studentClass(sequelize);



Student.belongsToMany(StudyClass, { through: "StudentClass" });
StudyClass.belongsToMany(Student, { through: "StudentClass" });



(async () => {
    await sequelize.sync();
    Student.bulkCreate(initialStudents);
    StudyClass.bulkCreate(classes);
    fillStudyClass();
})();


const fillStudyClass = async () => {
    const studyClasses = await StudyClass.findAll();
    await Student.findAll().then((students) => {
        console.log(students.length)
        studyClasses.forEach(c => {
            students.forEach(s => {
                StudentClass.create({
                    StudentId: s.dataValues.id,
                    StudyClassId: c.dataValues.id
                })
            })
        })
    });


}













