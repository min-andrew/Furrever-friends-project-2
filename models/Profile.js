const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Profile extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Profile.init({
  id: {
    type: DataTypes.Integer,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  display_name: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },
  dog_name: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hobbies: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id",
    },
  },
});
