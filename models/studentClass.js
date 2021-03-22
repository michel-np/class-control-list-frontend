const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const StudentClass = sequelize.define("StudentClass", {
        isPresent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return StudentClass;

}