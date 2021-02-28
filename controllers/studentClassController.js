const sequelize = require("../models");
const models = sequelize().models;



const getClasses = async () => {
    try {
        const classes = await models.Student.findAll({
            where: {
                id: 1,
                StudyClassId: 1
            },
            include: models.StudyClass
        });
        return classes;
    } catch (error) {
        return error
    }
}

const updateStudentStatus = async (payload) => {
    try {
        const { classId, studentId, isPresent } = payload;
        await models.StudentClass.update({ isPresent: isPresent },
            {
                where: {
                    StudentId: studentId,
                    StudyClassId: parseInt(classId)
                }
            }
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getClasses,
    updateStudentStatus
};