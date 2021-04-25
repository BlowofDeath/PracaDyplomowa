import Sequelize from "sequelize";
import db from "../database/db";

const DocumentFile = db.define("DocumentFile", {
  status: Sequelize.ENUM("accepted", "rejected"),
  rejectNote: Sequelize.STRING,
  type: Sequelize.ENUM("journal", "agreement", "personalData"),
  file: Sequelize.BLOB("medium"),
});

export default DocumentFile;
