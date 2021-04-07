import validator from "validator";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { signJWT } from "../utility/jwtTool";
import lang from "../language";
import getRandomColor from "../utility/getRandomColor";
import capitalize from "../utility/capitalize";

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
  },
  Mutation: {
    createCompany: async (
      _,
      { email, first_name, last_name, password },
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

      password = bcrypt.hashSync(password, 10);

      const company = await Company.create({
        email,
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
  },
};

export default companyResolvers;
