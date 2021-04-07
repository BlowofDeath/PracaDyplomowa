import validator from "validator";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { signJWT } from "../utility/jwtTool";
import lang from "../language";
import getRandomColor from "../utility/getRandomColor";
import capitalize from "../utility/capitalize";

const practiceSuperviserResolvers = {
  Query: {
    test: async (_, args, context) => {
      return "It is work!!";
    },
    mePracticeSuperviser: async (_, args, { models, authObject }) => {
      const { PracticeSuperviser } = models;
      if (authObject.practiceSuperviser) {
        return await PracticeSuperviser.findOne({
          where: { id: authObject.practiceSuperviser },
        });
      }

      return null;
    },
  },
  Mutation: {
    createPracticeSuperviser: async (
      _,
      { email, first_name, last_name, password },
      { models }
    ) => {
      const { PracticeSuperviser } = models;
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
        first_name: capitalize(first_name),
        last_name: capitalize(last_name),
        password,
        color: getRandomColor(),
      });
      const token = signJWT({ practiceSuperviser: practiceSuperviser.id });
      if (!token) throw new Error("JWT error");

      return { token, practiceSuperviser };
    },
    loginPracticeSuperviser: async (_, { email, password }, { models }) => {
      const { PracticeSuperviser } = models;
      if (!validator.isEmail(email)) throw new UserInputError(lang.badEmail);
      const practiceSuperviser = await PracticeSuperviser.findOne({
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
