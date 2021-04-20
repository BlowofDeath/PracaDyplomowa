import Sequelize from "sequelize";
import db from "../database/db";

const InternshipJournal = db.define("InternshipJournal", {
  accepted: Sequelize.BOOLEAN,
  file: Sequelize.BLOB,
});

export default InternshipJournal;
