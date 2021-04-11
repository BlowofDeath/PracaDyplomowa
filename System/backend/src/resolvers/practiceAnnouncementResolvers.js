import validator from "validator";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import lang from "../language";
import capitalize from "../utility/capitalize";

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
      {
        header,
        slots,
        description,
        technologies,
        from,
        to,
        email,
        phone,
        company_name,
      },
      { models, authObject }
    ) => {
      const { PracticeAnnouncement, Company } = models;
      if (!authObject)
        throw new AuthenticationError(lang.noAccessToCreateAnnouncement);
      if (
        (authObject.student || authObject.practiceSuperviser) &&
        !company_name
      ) {
        throw new UserInputError(lang.companyNameRequired);
      } else if (authObject.company) {
        const company = await Company.findOne({
          where: { id: authObject.company },
        });
        if (company) {
          phone = company.phone;
          email = company.email;
          company_name = company.name;
        } else throw new Error(lang.companyNotFound);
      }

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
        company_name: capitalize(company_name),
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
