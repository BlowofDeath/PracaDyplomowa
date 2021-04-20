import Sequelize from "sequelize";
import db from "../database/db";

const PracticeAgreement = db.define("PracticeAgreement", {
  accepted: Sequelize.BOOLEAN,
  from: Sequelize.DATE,
  to: Sequelize.DATE,
  company_name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  city: Sequelize.STRING,
  address: Sequelize.STRING,
});

export default PracticeAgreement;
