import Sequelize from "sequelize";
import db from "../database/sqliteDB";

const Invitation = db.define("Invitation", {
  token: Sequelize.STRING,
  used: Sequelize.BOOLEAN,
});

export default Invitation;
