import validator from "validator";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import lang from "../language";
import capitalize from "../utility/capitalize";
import { Op } from "sequelize";
import fs from "fs";
import path from "path";
import streamToBuffer from "../utility/streamToBuffer";

const STATUS = {
  accepted: "accepted",
  rejected: "rejected",
};

const DOCUMENT_TYPE = {
  journal: "journal",
  agreement: "agreement",
  personalData: "personalData",
};

const documentFileResolvers = {
  Query: {
    getDocumentFile: async (
      _,
      { PracticeAgreementId, type },
      { models, authObject }
    ) => {
      const { DocumentFile, PracticeAgreement } = models;
      const documentFile = await DocumentFile.findOne({
        where: { PracticeAgreementId, type },
        include: PracticeAgreement,
      });
      if (!documentFile) return null;
      if (authObject.student) {
        const practiceAgreement = await PracticeAgreement.findOne({
          where: {
            id: documentFile.PracticeAgreementId,
            StudentId: authObject.student,
          },
        });
        if (!practiceAgreement) throw new Error(lang.noPermission);
      }
      if (authObject.student || authObject.practiceSuperviser)
        return documentFile;
      else throw new Error(lang.noPermission);
    },
  },
  Mutation: {
    createDocumentFile: async (
      _,
      { PracticeAgreementId, file, type },
      { models, authObject }
    ) => {
      if (!authObject.student) throw new Error(lang.noPermission);
      const { DocumentFile } = models;
      try {
        const { createReadStream } = await file;
        const stream = createReadStream();

        let documentFile = await DocumentFile.findOne({
          where: { PracticeAgreementId, type },
        });

        const buffer = await streamToBuffer(stream);

        if (documentFile) {
          if (documentFile.status === STATUS.accepted) return documentFile;
          documentFile.file = buffer;
          documentFile.status = null;
          documentFile.rejectNote = null;
          await documentFile.save();
          return documentFile;
        } else {
          documentFile = await DocumentFile.create({
            type,
            file: buffer,
            PracticeAgreementId,
          });
          return documentFile;
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    changeDocumentFileStatus: async (
      _,
      { id, status, rejectNote },
      { models, authObject }
    ) => {
      const { DocumentFile } = models;
      if (!authObject.practiceSuperviser) throw new Error(lang.noPermission);
      const documentFile = await DocumentFile.findOne({ where: { id } });
      if (!documentFile) throw new Error(lang.notFound);
      documentFile.status = STATUS[status];
      if (rejectNote) documentFile.rejectNote = rejectNote;

      documentFile.save();
      return documentFile;
    },
  },
};

export default documentFileResolvers;
