import validator from "validator";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { signJWT, verifyJWT } from "../utility/jwtTool";
import lang from "../language";
import getRandomColor from "../utility/getRandomColor";
import capitalize from "../utility/capitalize";
import USER_TYPES from "../configs/userTypes";

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
    registerPracticeSuperviser: async (
      _,
      { token, first_name, last_name, password, confirm_password },
      { models }
    ) => {
      const { PracticeSuperviser, Invitation } = models;
      const invitationToken = verifyJWT(token, (err, decoded) => {
        if (err) throw new Error(lang.invalidToken);
        return decoded;
      });

      const { email, userType } = invitationToken;
      const invitation = await Invitation.findOne({ where: { token } });
      if (userType !== USER_TYPES.practiceSuperviser)
        throw new Error(lang.invalidUserType);
      if (!invitation) throw new Error(lang.invalidToken);
      if (!validator.isEmail(email)) throw new UserInputError(lang.badEmail);
      const exist = await PracticeSuperviser.findOne({ where: { email } });
      if (exist) throw new Error(lang.userExist);
      if (!validator.isLength(password, { min: 8, max: undefined }))
        throw new UserInputError(lang.passwordValidation);
      if (!validator.isLength(first_name, { min: 3, max: undefined }))
        throw new UserInputError(lang.firstNameValidation);
      if (!validator.isLength(last_name, { min: 3, max: undefined }))
        throw new UserInputError(lang.lastNameValidation);
      if (password !== confirm_password)
        throw new UserInputError(lang.passwordsIdentical);

      password = bcrypt.hashSync(password, 10);
      const practiceSuperviser = await PracticeSuperviser.create({
        email,
        first_name: capitalize(first_name),
        last_name: capitalize(last_name),
        password,
        color: getRandomColor(),
      });

      const userToken = signJWT({ practiceSuperviser: practiceSuperviser.id });
      await invitation.destroy();
      return { token: userToken, practiceSuperviser };
    },
  },
};

export default practiceSuperviserResolvers;
