import Student from "../models/Student";
import validator from "validator";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { signJWT } from "../utility/jwtTool";
import lang from "../language";

const studentResolvers = {
  Query: {
    test: async (_, args, context) => {
      return "It is work!!";
    },
    me: async (_, args, context) => {
      const id = 1; //id z token auth
      const me = await Student.findOne({ id });
      return me;
    },
    student: async (_, { id }, context) => {
      const student = await Student.findOne({ id });
      return student;
    },
  },
  Mutation: {
    createStudent: async (
      _,
      { index_number, email, first_name, last_name, password },
      context
    ) => {
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
        first_name,
        last_name,
        password,
      });
      const token = signJWT({ student: student.id });
      return { token, student };
    },
    loginStudent: async (_, { email, password }, context) => {
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
