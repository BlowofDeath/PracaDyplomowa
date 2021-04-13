import validator from "validator";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import lang from "../language";
import capitalize from "../utility/capitalize";
import { Op } from "sequelize";

const practiceAgreementResolvers = {
  Query: {
    testAnnouncement: async (_, args, context) => {
      return "It is work!!";
    },
    myPracticeAgreements: async (_, args, { models, authObject }) => {
      const { PracticeAgreement } = models;
      if (authObject && authObject.student) {
        return await PracticeAgreement.findAll({
          where: {
            StudentId: authObject.student,
          },
        });
      } else {
        throw new Error(lang.noPermission);
      }
    },
  },
  Mutation: {
    createPracticeAgreement: async (
      _,
      { company_name, from, to, email, phone, city, address },
      { models, authObject }
    ) => {
      const { PracticeAgreement, Student } = models;
      if (!authObject)
        throw new AuthenticationError(lang.noAccessToCreateAgreement);

      const student = await Student.findOne({
        where: { id: authObject.student },
      });
      if (!student)
        throw new AuthenticationError(lang.noAccessToCreateAgreement);

      if (!company_name) throw new UserInputError(lang.companyNameRequired);
      if (!city) throw new UserInputError(lang.cityValidation);
      if (!address) throw new UserInputError(lang.addressValidation);
      if (!from) throw new UserInputError(lang.fromRequired);
      if (!to) throw new UserInputError(lang.toRequired);
      if (!phone) throw new UserInputError(lang.phoneIsRequired);
      if (email && !validator.isEmail(email))
        throw new UserInputError(lang.invalidEmail);

      const practiceAgreement = await PracticeAgreement.create({
        city: capitalize(city),
        address: capitalize(address),
        to,
        from,
        phone: phone,
        email: email,
        company_name: capitalize(company_name),
        StudentId: authObject.student,
        accepted: false,
      });

      return practiceAgreement;
    },
    deletePracticeAgreement: async (_, { id }, { models, authObject }) => {
      const { PracticeAgreement } = models;
      if (authObject && authObject.practiceSuperviser) {
        return await PracticeAgreement.destroy({ where: { id } });
      } else if (authObject && authObject.company) {
        return await PracticeAgreement.destroy({
          where: { id, CompanyId: authObject.company },
        });
      } else {
        throw new AuthenticationError(lang.noPermission);
      }
    },
    confirmPracticeAgreement: async (_, { id }, { models, authObject }) => {
      const { PracticeAgreement } = models;
      if (authObject && authObject.practiceSuperviser) {
        const practiceAgreement = await PracticeAgreement.findOne({
          where: { id },
        });
        if (practiceAgreement) {
          practiceAgreement.accepted = true;
          return await practiceAgreement.save();
        } else {
          throw new UserInputError(lang.objectNotFound);
        }
      } else {
        throw new AuthenticationError(lang.noPermission);
      }
    },
    editPracticeAgreement: async (
      _,
      {
        id,
        header,
        slots,
        technologies,
        description,
        from,
        to,
        phone,
        email,
        company_name,
      },
      { models, authObject }
    ) => {
      const { PracticeAgreement } = models;
      if (authObject && authObject.practiceSuperviser) {
        const practiceAgreement = await PracticeAgreement.findOne({
          where: { id },
        });
        if (practiceAgreement) {
          if (header) practiceAgreement.header = header;
          if (slots) practiceAgreement.slots = slots;
          if (technologies) practiceAgreement.technologies = technologies;
          if (description) practiceAgreement.description = description;
          if (from) practiceAgreement.from = from;
          if (to) practiceAgreement.to = to;
          if (phone) practiceAgreement.phone = phone;
          if (company_name) practiceAgreement.company_name = company_name;
          if (email) practiceAgreement.email = email;
          return await practiceAgreement.save();
        } else {
          throw new UserInputError(lang.objectNotFound);
        }
      } else if (authObject && authObject.company) {
        const practiceAgreement = await PracticeAgreement.findOne({
          where: { id, CompanyId: authObject.company },
        });
        if (practiceAgreement) {
          if (header) practiceAgreement.header = header;
          if (slots) practiceAgreement.slots = slots;
          if (technologies) practiceAgreement.technologies = technologies;
          if (description) practiceAgreement.description = description;
          if (from) practiceAgreement.from = from;
          if (to) practiceAgreement.to = to;
          return await practiceAgreement.save();
        } else {
          throw new UserInputError(lang.objectNotFound);
        }
      } else {
        throw new AuthenticationError(lang.noPermission);
      }
    },
  },
};

export default practiceAgreementResolvers;
