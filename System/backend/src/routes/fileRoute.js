import { verifyJWT } from "../utility/jwtTool";
import models from "../models";
import fs from "fs";
import path from "path";

const fileRoute = async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).send("Missing id");
    return;
  }
  const token = req.headers?.authorization;
  if (!token) {
    res.status(400).send("Missing token");
    return;
  }

  try {
    if (token) {
      const authObject = token && verifyJWT(token);
      const documentFile = await models.DocumentFile.findOne({
        where: { id: req.params.id },
      });
      if (!documentFile) {
        res.status(404).send("Object not found");
        return;
      }
      if (authObject.student) {
        if (
          !(await models.Student.findOne({
            where: { id: authObject.student },
          }))
        ) {
          res
            .status(400)
            .send("403: You dont have permissions to view this file");
          return;
        }

        const practiceAgreement = await models.PracticeAgreement.findOne({
          where: {
            id: documentFile.PracticeAgreementId,
            StudentId: authObject.student,
          },
        });
        if (!practiceAgreement) {
          res.status(404).send("Object not found");
          return;
        }

        res.set("Content-Type", "application/pdf");
        res.send(internshipJournal.file);
      } else if (authObject.practiceSuperviser) {
        if (
          !(await models.PracticeSuperviser.findOne({
            where: { id: authObject.practiceSuperviser },
          }))
        ) {
          res
            .status(400)
            .send("403: You dont have permissions to view this file");
          return;
        }

        res.set("Content-Type", "application/pdf");
        res.send(documentFile.file);
      } else {
        res
          .status(400)
          .send("403: You dont have permissions to view this file");
        return;
      }
    } else res.status(400).send("Missing token");
  } catch (err) {
    console.log(err);
    res.status(400).send("403: You dont have permissions to view this file");
  }
};

export default fileRoute;
