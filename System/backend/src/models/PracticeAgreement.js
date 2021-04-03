import Sequelize from "sequelize";
import db from "../database/sqliteDB";

const PracticeAgreement = db.define("PracticeAgreement", {
  company_assent: Sequelize.BOOLEAN,
  ps_assent: Sequelize.BOOLEAN,
  from: Sequelize.DATE,
  to: Sequelize.DATE,
  hours: Sequelize.INTEGER,
});

export default PracticeAgreement;
