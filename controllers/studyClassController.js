const sequelize = require("../models");
const models = sequelize().models;

const getAllClasses = async () => {
    try {
        let classes = await models.StudyClass.findAll();
        return classes;
    } catch (error) {
        throw new Error(error);
    }

}

const getClassesById = async (classId) => {
    try {
        let classes = await models.StudyClass.findByPk(parseInt(classId))
        return classes;
    } catch (error) {
        throw new Error(error);
    }
}

const getStudentsFromClass = async (classId) => {
    try {
        let queryData = await models.StudyClass.findAll({
            attributes: ["discipline", "date"],
            where: {
                id: parseInt(classId)
            },
            include: {
                model: models.Student,
                attributes: ["name", "age"],
                through: {
                    attributes: ["isPresent"]
                }
            }
        })
        let classData = queryData[0].dataValues;
        let attendanceList = classData.Students.map(student => ({
            name: student.name,
            age: student.age,
            isPresent: student.StudentClass.isPresent
        }))
        return {
            discipline: classData.discipline,
            date: classData.date,
            list: attendanceList
        }
    } catch (error) {

    }
}

module.exports = {
    getAllClasses,
    getClassesById,
    getStudentsFromClass
}