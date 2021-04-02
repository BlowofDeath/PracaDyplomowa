import Sequelize from "sequelize";

const sqliteDB = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false, //make it true if you want sql log in console
});

export default sqliteDB;
