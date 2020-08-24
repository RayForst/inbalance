module.exports = (sequelize, DataTypes) =>
  sequelize.define("Checkouts", {
    details: {
      type: DataTypes.TEXT
    },
    proceed: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    }
  });
