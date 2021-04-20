import Sequelize from "sequelize";
import db from "../database/db";

const Invitation = db.define("Invitation", {
  token: Sequelize.STRING,
  used: Sequelize.BOOLEAN,
});

export default Invitation;
