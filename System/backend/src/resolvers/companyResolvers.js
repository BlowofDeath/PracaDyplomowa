import validator from "validator";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import sequelize from "sequelize";

import { signJWT, verifyJWT } from "../utility/jwtTool";
import lang from "../language";
import getRandomColor from "../utility/getRandomColor";
import capitalize from "../utility/capitalize";
import USER_TYPES from "../configs/userTypes";

const companyResolvers = {
  Query: {
    test: async (_, args, context) => {
      return "It is work!!";
    },
    meCompany: async (_, args, { models, authObject }) => {
      const { Company } = models;
      if (authObject.company) {
        return await Company.findOne({ where: { id: authObject.company } });
      }
      return null;
    },
    companies: async (_, { year }, { models, authObject }) => {
      const { Company } = models;
      if (authObject.practiceSuperviser) {
        if (year)
          return await Company.findAll({
            where: sequelize.where(
              sequelize.fn("YEAR", sequelize.col("createdAt")),
              year
            ),
          });
        else return await Company.findAll();
      } else throw new AuthenticationError(lang.noPermission);
    },
  },
  Mutation: {
    createCompany: async (
      _,
      { email, first_name, last_name, password, name, city, address },
      { models }
    ) => {
      const { Company } = models;
      const exist = await Company.findOne({ where: { email } });
      if (exist) throw new Error(lang.userExist);

      if (!validator.isEmail(email)) throw new UserInputError(lang.badEmail);
      if (!validator.isLength(password, { min: 8, max: undefined }))
        throw new UserInputError(lang.passwordValidation);
      if (!validator.isLength(first_name, { min: 3, max: undefined }))
        throw new UserInputError(lang.firstNameValidation);
      if (!validator.isLength(last_name, { min: 3, max: undefined }))
        throw new UserInputError(lang.lastNameValidation);
      if (!validator.isLength(name, { min: 3, max: undefined }))
        throw new UserInputError(lang.nameValidation);
      if (!validator.isLength(city, { min: 3, max: undefined }))
        throw new UserInputError(lang.cityValidation);
      if (!validator.isLength(address, { min: 3, max: undefined }))
        throw new UserInputError(lang.addressValidation);

      password = bcrypt.hashSync(password, 10);

      const company = await Company.create({
        email,
        name: capitalize(name),
        city: capitalize(city),
        address: capitalize(address),
        first_name: capitalize(first_name),
        last_name: capitalize(last_name),
        password,
        color: getRandomColor(),
      });
      const token = signJWT({ company: company.id });
      if (!token) throw new Error("JWT error");

      return { token, company };
    },
    loginCompany: async (_, { email, password }, { models }) => {
      const { Company } = models;
      if (!validator.isEmail(email)) throw new UserInputError(lang.badEmail);
      const company = await Company.findOne({
        where: { email },
      });
      if (!company) throw new Error(lang.userNotFound);
      const resoult = bcrypt.compareSync(password, company.password);
      if (!resoult) throw new UserInputError(lang.passwordIncorrect);

      const token = signJWT({ company: company.id });

      return { token, company };
    },
    registerCompany: async (
      _,
      {
        token,
        name,
        city,
        address,
        first_name,
        last_name,
        phone,
        password,
        confirm_password,
      },
      { models }
    ) => {
      const { Company, Invitation } = models;
      const invitationToken = verifyJWT(token, (err, decoded) => {
        if (err) throw new Error(lang.invalidToken);
        return decoded;
      });

      const { email, userType } = invitationToken;
      const invitation = await Invitation.findOne({ where: { token } });
      if (!invitation) throw new Error(lang.invalidToken);
      if (userType !== USER_TYPES.company)
        throw new Error(lang.invalidUserType);

      if (!validator.isEmail(email)) throw new UserInputError(lang.badEmail);
      const exist = await Company.findOne({ where: { email } });
      if (exist) throw new Error(lang.userExist);
      if (!validator.isLength(password, { min: 8, max: undefined }))
        throw new UserInputError(lang.passwordValidation);
      if (!validator.isLength(first_name, { min: 3, max: undefined }))
        throw new UserInputError(lang.firstNameValidation);
      if (!validator.isLength(last_name, { min: 3, max: undefined }))
        throw new UserInputError(lang.lastNameValidation);
      if (!validator.isLength(name, { min: 3, max: undefined }))
        throw new UserInputError(lang.nameValidation);
      if (!validator.isLength(city, { min: 3, max: undefined }))
        throw new UserInputError(lang.cityValidation);
      if (!validator.isLength(address, { min: 3, max: undefined }))
        throw new UserInputError(lang.addressValidation);
      if (password !== confirm_password)
        throw new UserInputError(lang.passwordsIdentical);

      password = bcrypt.hashSync(password, 10);
      const company = await Company.create({
        email,
        name: capitalize(name),
        city: capitalize(city),
        address: capitalize(address),
        first_name: capitalize(first_name),
        last_name: capitalize(last_name),
        password,
        phone: phone ?? null,
        color: getRandomColor(),
      });

      const userToken = signJWT({ company: company.id });
      await invitation.destroy();
      return { token: userToken, company };
    },
    updateCompanyProfile: async (
      _,
      {
        name,
        first_name,
        last_name,
        password,
        confirmPassword,
        phone,
        city,
        addres,
      },
      { authObject, models }
    ) => {
      const { Company } = models;
      if (!authObject.company) throw new Error(lang.noPermission);
      const company = await Company.findOne({
        where: { id: authObject.company },
      });
      if (!company) throw new Error(lang.userNotFound);

      if (password) {
        if (!validator.isLength(password, { min: 8, max: undefined }))
          throw new UserInputError(lang.passwordValidation);
        if (password !== confirmPassword)
          throw new UserInputError(lang.passwordsIdentical);
        password = bcrypt.hashSync(password, 10);
        company.password = password;
      }
      if (first_name) {
        if (!validator.isLength(first_name, { min: 3, max: undefined }))
          throw new UserInputError(lang.firstNameValidation);
        company.first_name = first_name;
      }
      if (last_name) {
        if (!validator.isLength(last_name, { min: 3, max: undefined }))
          throw new UserInputError(lang.lastNameValidation);
        company.last_name = last_name;
      }
      if (name) {
        if (!validator.isLength(name, { min: 3, max: undefined }))
          throw new UserInputError(lang.nameValidation);
        company.name = name;
      }
      if (city) {
        if (!validator.isLength(city, { min: 3, max: undefined }))
          throw new UserInputError(lang.cityValidation);
        company.city = city;
      }
      if (addres) {
        if (!validator.isLength(address, { min: 3, max: undefined }))
          throw new UserInputError(lang.addressValidation);
        company.addres = addres;
      }

      if (phone) {
        company.phone = phone;
      }

      await company.save();

      return company;
    },
  },
};

export default companyResolvers;
