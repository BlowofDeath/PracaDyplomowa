import validator from "validator";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import lang from "../language";

const practiceAnnouncementResolvers = {
  Query: {
    testAnnouncement: async (_, args, context) => {
      return "It is work!!";
    },
    practiceAnnouncements: async (_, args, { models, authObject }) => {
      const { PracticeAnnouncement } = models;
      if (authObject && authObject.practiceSuperviser) {
        return await PracticeAnnouncement.findAll();
      }
      const announcements = await PracticeAnnouncement.findAll({
        where: { accepted: true },
      });
      return announcements;
    },
  },
  Mutation: {
    createPracticeAnnouncement: async (
      _,
      { header, slots, description, technologies, from, to, email, phone },
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
      if (email && !validator.isEmail(email))
        throw new UserInputError(lang.invalidEmail);

      const practiceAnnouncementr = await PracticeAnnouncement.create({
        header,
        slots,
        description: description ?? null,
        technologies,
        from,
        to,
        accepted: authObject.practiceSuperviser ? true : false,
        phone: phone ?? null,
        email: email ?? null,
      });

      return practiceAnnouncementr;
    },
    deletePracticeAnnouncement: async (_, { id }, { models, authObject }) => {
      const { PracticeAnnouncement } = models;
      if (authObject && authObject.practiceSuperviser) {
        return await PracticeAnnouncement.destroy({ where: { id } });
      } else {
        throw new AuthenticationError(lang.noPermission);
      }
    },
    confirmPracticeAnnouncement: async (_, { id }, { models, authObject }) => {
      const { PracticeAnnouncement } = models;
      if (authObject && authObject.practiceSuperviser) {
        const practiceAnnouncement = await PracticeAnnouncement.findOne({
          where: { id },
        });
        if (practiceAnnouncement) {
          practiceAnnouncement.accepted = true;
          return await practiceAnnouncement.save();
        } else {
          throw new UserInputError(lang.objectNotFound);
        }
      } else {
        throw new AuthenticationError(lang.noPermission);
      }
    },
  },
};

export default practiceAnnouncementResolvers;
