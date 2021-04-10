import Sequelize from "sequelize";
import db from "../database/sqliteDB";

const Company = db.define("Company", {
  name: Sequelize.STRING,
  city: Sequelize.STRING,
  address: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  password: Sequelize.STRING,
  color: Sequelize.STRING,
});

export default Company;
