import Sequelize from "sequelize";
import db from "../database/sqliteDB";

const PracticeSuperviser = db.define("practice_supervisers", {
  email: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  password: Sequelize.STRING,
});

export default PracticeSuperviser;
