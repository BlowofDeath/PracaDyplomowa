import Sequelize from "sequelize";
import db from "../database/sqliteDB";

const PracticeAnnouncement = db.define("PracticeAnnouncement", {
  header: Sequelize.STRING,
  slots: Sequelize.INTEGER,
  description: Sequelize.STRING,
  technologies: Sequelize.STRING,
  from: Sequelize.DATE,
  to: Sequelize.DATE,
  accepted: Sequelize.BOOLEAN,
});

export default PracticeAnnouncement;
