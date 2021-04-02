import Sequelize from "sequelize";
import db from "../database/sqliteDB";
import PracticeAgreement from "./PracticeAgreement";

const Student = db.define("Student", {
  index_number: Sequelize.STRING,
  email: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  password: Sequelize.STRING,
});

Student.hasOne(PracticeAgreement);
PracticeAgreement.belongsTo(Student);

export default Student;
