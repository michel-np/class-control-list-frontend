const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const StudyClass = sequelize.define("StudyClass", {
        discipline: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    return StudyClass;

}