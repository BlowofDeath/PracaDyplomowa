import validator from "validator";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import lang from "../language";
import capitalize from "../utility/capitalize";
import sequelize, { Op } from "sequelize";

const practiceAgreementResolvers = {
  Query: {
    myPracticeAgreements: async (_, args, { models, authObject }) => {
      const { PracticeAgreement, DocumentFile, Company } = models;
      if (authObject && authObject.student) {
        return await PracticeAgreement.findAll({
          include: [
            { model: DocumentFile, attributes: { exclude: ["file"] } },
            Company,
          ],
          where: {
            StudentId: authObject.student,
          },
        });
      } else {
        throw new Error(lang.noPermission);
      }
    },
    agreements: async (_, { year }, { models, authObject }) => {
      const { PracticeAgreement, DocumentFile, Student, Company } = models;
      if (authObject && authObject.practiceSuperviser) {
        if (year)
          return await PracticeAgreement.findAll({
            where: sequelize.where(
              sequelize.fn(
                "YEAR",
                sequelize.col("PracticeAgreement.createdAt")
              ),
              year
            ),
            include: [
              Student,
              { model: DocumentFile, attributes: { exclude: ["file"] } },
              Company,
            ],
          });
        else {
          return await PracticeAgreement.findAll({
            include: [
              Student,
              { model: DocumentFile, attributes: { exclude: ["file"] } },
              Company,
            ],
          });
        }
      } else if (authObject && authObject.company) {
        if (year)
          return await PracticeAgreement.findAll({
            where: {
              [Op.and]: [
                sequelize.where(
                  sequelize.fn(
                    "YEAR",
                    sequelize.col("PracticeAgreement.createdAt")
                  ),
                  year
                ),
                { CompanyId: authObject.company },
              ],
            },
            include: [
              Student,
              { model: DocumentFile, attributes: { exclude: ["file"] } },
              Company,
            ],
          });
        else {
          return await PracticeAgreement.findAll({
            where: { CompanyId: authObject.company },
            include: [
              Student,
              { model: DocumentFile, attributes: { exclude: ["file"] } },
              Company,
            ],
          });
        }
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
    createApplication: async (
      _,
      { CompanyId, to, from },
      { models, authObject }
    ) => {
      const { Company, Student, PracticeAgreement } = models;
      if (!authObject.student) throw new Error(lang.noPermission);
      const student = await Student.findOne({
        where: { id: authObject.student },
      });
      if (!student) throw new Error(lang.userNotFound);
      const company = await Company.findOne({ where: { id: CompanyId } });
      if (!company) throw new Error(lang.companyNotFound);
      if (!id) throw new Error(lang.idNotFound);
      let practiceAgreement = await PracticeAgreement.findOne({
        where: {
          PracticeAnnouncementId: id,
          CompanyId: company.id,
          StudentId: authObject.student,
        },
      });
      if (practiceAgreement)
        throw new UserInputError(lang.agreementAlreadyExists);

      practiceAgreement = await PracticeAgreement.create({
        city: capitalize(company.city),
        address: capitalize(company.address),
        to,
        from,
        phone: company.phone,
        email: company.email,
        company_name: capitalize(company.name),
        StudentId: authObject.student,
        accepted: false,
        CompanyId: company.id,
        PracticeAnnouncementId: id,
      });
      return practiceAgreement;
    },
    deletePracticeAgreement: async (_, { id }, { models, authObject }) => {
      const { PracticeAgreement } = models;
      if (authObject && authObject.practiceSuperviser) {
        return await PracticeAgreement.destroy({ where: { id } });
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
      } else if (authObject && authObject.company) {
        const practiceAgreement = await PracticeAgreement.findOne({
          where: { id, CompanyId: authObject.company },
        });
        if (practiceAgreement) {
          practiceAgreement.company_accepted = true;
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
    rejectCompanyAgreement: async (_, { id }, { models, authObject }) => {
      const { PracticeAgreement, Company } = models;
      if (authObject && authObject.company) {
        const company = await Company.findOne({
          where: { id: authObject.company },
        });
        if (!company) throw new Error(lang.noPermission);
        const practiceAgreement = await PracticeAgreement.findOne({
          where: { id, CompanyId: authObject.company },
        });
        if (!practiceAgreement) throw new Error(lang.objectNotFound);
        practiceAgreement.company_accepted = false;
        await practiceAgreement.save();
        return practiceAgreement;
      } else {
        throw new AuthenticationError(lang.noPermission);
      }
    },
  },
};

export default practiceAgreementResolvers;
