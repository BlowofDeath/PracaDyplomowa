import Sequelize from "sequelize";
import db from "../database/db";

const Student = db.define("Student", {
  index_number: Sequelize.STRING,
  email: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  password: Sequelize.STRING,
  color: Sequelize.STRING,
});

export default Student;
