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
      if (!header) throw new UserInputError(lang.headerRequired);
      if (!slots) throw new UserInputError(lang.slotsRequired);
      if (!technologies) throw new UserInputError(lang.technologiesRequired);
      if (!from) throw new UserInputError(lang.fromRequired);
      if (!to) throw new UserInputError(lang.toRequired);

      const practiceAnnouncementr = await PracticeAnnouncement.create({
        header,
        slots,
        description: description ?? "",
        technologies,
        from,
        to,
        accepted: authObject.practiceSuperviser ? true : false,
      });

      return practiceAnnouncementr;
    },
  },
};

export default practiceAnnouncementResolvers;
