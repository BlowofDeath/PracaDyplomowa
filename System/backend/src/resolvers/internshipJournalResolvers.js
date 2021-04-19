import validator from "validator";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import lang from "../language";
import capitalize from "../utility/capitalize";
import { Op } from "sequelize";
import fs from "fs";
import path from "path";

const internshipJournalResolvers = {
  Query: {
    getJournal: async (_, { PracticeAgreementId }, { models, authObject }) => {
      const { InternshipJournal, PracticeAgreement } = models;
      const journal = await InternshipJournal.findOne({
        where: { PracticeAgreementId },
        include: PracticeAgreement,
      });
      if (!journal) return null;
      if (authObject.student) {
        const practiceAgreement = await PracticeAgreement.findOne({
          where: {
            id: journal.PracticeAgreementId,
            StudentId: authObject.student,
          },
        });
        if (!practiceAgreement) throw new Error(lang.noPermission);
      }
      if (authObject.student || authObject.practiceSuperviser) return journal;
      else throw new Error(lang.noPermission);
    },
  },
  Mutation: {
    createJournal: async (
      _,
      { PracticeAgreementId, file },
      { models, authObject }
    ) => {
      if (!authObject.student) throw new Error(lang.noPermission);
      const { InternshipJournal } = models;
      try {
        const { createReadStream } = await file;
        const stream = createReadStream();

        let journal = await InternshipJournal.findOne({
          where: { PracticeAgreementId },
        });
        const pathname = path.join(__dirname, "../uploads/journals/");
        if (journal) {
          fs.unlinkSync(path.join(pathname, `${journal.id}.pdf`));
          await stream.pipe(
            fs.createWriteStream(path.join(pathname, `${journal.id}.pdf`))
          );
          journal.file = path.join(pathname, `${journal.id}.pdf`);
          await journal.save();
          return journal;
        } else {
          journal = await InternshipJournal.create({
            file: null,
            accepted: false,
            PracticeAgreementId,
          });
          await stream.pipe(
            fs.createWriteStream(path.join(pathname, `${journal.id}.pdf`))
          );
          journal.file = path.join(pathname, `${journal.id}.pdf`);
          await journal.save();
          return journal;
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    confirmJournal: async (_, { id }, { models, authObject }) => {
      const { InternshipJournal } = models;
      if (!authObject.practiceSuperviser) throw new Error(lang.noPermission);
      const journal = await InternshipJournal.findOne({ where: { id } });
      if (!journal) throw new Error(lang.notFound);
      journal.accepted = true;
      journal.save();
      return journal;
    },
  },
};

export default internshipJournalResolvers;
