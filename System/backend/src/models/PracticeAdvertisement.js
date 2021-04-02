import Sequelize from "sequelize";
import db from "../database/sqliteDB";

const PracticeAdvertisement = db.define("PracticeAdvertisement", {
  name: Sequelize.STRING,
  city: Sequelize.STRING,
  adress: Sequelize.STRING,
  email: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  password: Sequelize.STRING,
});

export default PracticeAdvertisement;
