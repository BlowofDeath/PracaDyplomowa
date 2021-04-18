import Sequelize from "sequelize";
import db from "../database/sqliteDB";

const InternshipJournal = db.define("InternshipJournal", {
  accepted: Sequelize.BOOLEAN,
  file: Sequelize.BLOB,
});

export default InternshipJournal;
