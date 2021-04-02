import PracticeSuperviser from "../models/PracticeSuperviser";
import validator from "validator";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { signJWT } from "../utility/jwtTool";
import lang from "../language";

const practiceSuperviserResolvers = {
  Query: {
    test: async (_, args, context) => {
      return "It is work!!";
    },
    mePracticeSuperviser: async (_, args, context) => {
      const id = 1; //id z token auth
      const me = await PracticeSuperviser.findOne({ id });
      return me;
    },
  },
  Mutation: {
    createPracticeSuperviser: async (
      _,
      { email, first_name, last_name, password },
      context
    ) => {
      const exist = await PracticeSuperviser.findOne({ where: { email } });
      if (exist) throw new Error(lang.userExist);
      if (!validator.isEmail(email)) throw new UserInputError(lang.badEmail);
      if (!validator.isLength(password, { min: 8, max: undefined }))
        throw new UserInputError(lang.passwordValidation);
      if (!validator.isLength(first_name, { min: 3, max: undefined }))
        throw new UserInputError(lang.firstNameValidation);
      if (!validator.isLength(last_name, { min: 3, max: undefined }))
        throw new UserInputError(lang.lastNameValidation);

      password = bcrypt.hashSync(password, 10);

      const practiceSuperviser = await PracticeSuperviser.create({
        email,
        first_name,
        last_name,
        password,
      });
      const token = signJWT({ practiceSuperviser: practiceSuperviser.id });
      return { token, practiceSuperviser };
    },
    loginPracticeSuperviser: async (_, { email, password }, context) => {
      if (!validator.isEmail(email)) throw new UserInputError(lang.badEmail);
      const practiceSuperviser = await practiceSuperviser.findOne({
        where: { email },
      });
      if (!practiceSuperviser) throw new Error(lang.userNotFound);
      const resoult = bcrypt.compareSync(password, practiceSuperviser.password);
      if (!resoult) throw new UserInputError(lang.passwordIncorrect);

      const token = signJWT({ practiceSuperviser: practiceSuperviser.id });

      return { token, practiceSuperviser };
    },
  },
};

export default practiceSuperviserResolvers;
