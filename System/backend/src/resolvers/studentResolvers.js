import validator from "validator";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { signJWT } from "../utility/jwtTool";
import lang from "../language";
import getRandomColor from "../utility/getRandomColor";
import capitalize from "../utility/capitalize";

const studentResolvers = {
  Query: {
    meStudent: async (_, args, { models, authObject }) => {
      const { Student } = models;

      if (authObject.student) {
        return await Student.findOne({ where: { id: authObject.student } });
      }
      return null;
    },
    students: async (_, args, { models, authObject }) => {
      const { Student } = models;
      if (authObject.practiceSuperviser) {
        return await Student.findAll();
      } else throw new AuthenticationError(lang.noPermission);
    },
  },
  Mutation: {
    createStudent: async (
      _,
      { index_number, email, first_name, last_name, password },
      { models }
    ) => {
      const { Student } = models;
      const exist = await Student.findOne({ where: { email } });
      if (exist) throw new Error(lang.userExist);
      if (!validator.isEmail(email)) throw new UserInputError(lang.badEmail);
      if (!validator.isLength(password, { min: 8, max: undefined }))
        throw new UserInputError(lang.passwordValidation);
      if (!validator.isLength(first_name, { min: 3, max: undefined }))
        throw new UserInputError(lang.firstNameValidation);
      if (!validator.isLength(last_name, { min: 3, max: undefined }))
        throw new UserInputError(lang.lastNameValidation);

      password = bcrypt.hashSync(password, 10);

      const student = await Student.create({
        index_number,
        email,
        first_name: capitalize(first_name),
        last_name: capitalize(last_name),
        password,
        color: getRandomColor(),
      });
      const token = signJWT({ student: student.id });
      return { token, student };
    },
    loginStudent: async (_, { email, password }, { models }) => {
      const { Student } = models;
      if (!validator.isEmail(email)) throw new UserInputError(lang.badEmail);
      const student = await Student.findOne({ where: { email } });
      if (!student) throw new Error(lang.userNotFound);
      const resoult = bcrypt.compareSync(password, student.password);
      if (!resoult) throw new UserInputError(lang.passwordIncorrect);

      const token = signJWT({ student: student.id });

      return { token, student };
    },
  },
};

export default studentResolvers;
