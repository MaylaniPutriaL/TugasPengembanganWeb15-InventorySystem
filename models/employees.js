
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Employee', {
    full_name: DataTypes.STRING,
    division: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    leave_balance: DataTypes.INTEGER,
    min_leave: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_at: DataTypes.STRING,
    updated_at: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, { 
    underscored: true,
    timestamps: true 
  });
};