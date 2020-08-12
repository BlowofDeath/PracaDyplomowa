import Sequelize from "sequelize";
import db from "../database/sqliteDB";

const Student = db.define("students", {
  index_number: Sequelize.STRING,
  email: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  password: Sequelize.STRING,
});

export default Student;
