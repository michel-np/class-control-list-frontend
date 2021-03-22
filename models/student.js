const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Student = sequelize.define("Student", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    })

    return Student;
}