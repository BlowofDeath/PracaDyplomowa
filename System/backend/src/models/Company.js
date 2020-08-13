import Sequelize from "sequelize";
import db from "../database/sqliteDB";
import PracticeAdvertisement from "./PracticeAdvertisement";
import PracticeAgreement from "./PracticeAgreement";

const Company = db.define("companies", {
  name: Sequelize.STRING,
  city: Sequelize.STRING,
  adress: Sequelize.STRING,
  email: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  password: Sequelize.STRING,
});

Company.hasMany(PracticeAdvertisement);
PracticeAdvertisement.belongsTo(Company);

export default Company;
