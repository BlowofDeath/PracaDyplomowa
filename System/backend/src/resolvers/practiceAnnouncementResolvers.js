import validator from "validator";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import lang from "../language";

const practiceAnnouncementResolvers = {
  Query: {
    testAnnouncement: async (_, args, context) => {
      return "It is work!!";
    },
    practiceAnnouncements: async (_, args, { models }) => {
      const { PracticeAnnouncement } = models;
      const announcements = await PracticeAnnouncement.findAll();
      return announcements;
    },
  },
  Mutation: {
    createPracticeAnnouncement: async (
      _,
      { header, slots, description, technologies, from, to },
      { models, authObject }
    ) => {
      if (!authObject)
        throw new AuthenticationError(lang.noAccessToCreateAnnouncement);
      const { PracticeAnnouncement } = models;
      const practiceAnnouncementr = await PracticeAnnouncement.create({
        header,
        slots,
        description: description ?? "",
        technologies,
        from,
        to,
        accepted: false,
      });

      return practiceAnnouncementr;
    },
  },
};

export default practiceAnnouncementResolvers;
