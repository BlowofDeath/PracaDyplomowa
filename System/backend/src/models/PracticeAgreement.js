import Sequelize from "sequelize";
import db from "../database/sqliteDB";
import Student from "./Student";
import Company from "./Company";

const PracticeAgreement = db.define("practice_agreements", {
  company_assent: Sequelize.BOOLEAN,
  ps_assent: Sequelize.BOOLEAN,
  from: Sequelize.DATE,
  to: Sequelize.DATE,
  hours: Sequelize.INTEGER,
});

PracticeAgreement.belongsTo(Company);
Company.hasMany(PracticeAgreement);

export default PracticeAgreement;
