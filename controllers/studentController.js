const sequelize = require("../models");
const models = sequelize().models;


const getAllStudents = async () => {
    try {
        let students = models.Student.findAll();
        if (students) {
            return students;
        }
    } catch (error) {
        return error
    }

}


module.exports = {
    getAllStudents
};