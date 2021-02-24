const sequelize = require("../models");
const models = sequelize().models;


const addStudentClass = async (payload) => {
    await models.StudentClass.create({
        StudentId: 1,
        StudyClass: 1,
    })
    return "Ok";
}

const getClasses = async () => {
    const classes = await models.Student.findAll({
        where: {
            id: 1,
            StudyClassId: 1
        },
        include: models.StudyClass
    });
    return classes;
}

module.exports = {
    addStudentClass,
    getClasses
};