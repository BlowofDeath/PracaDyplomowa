import validator from "validator";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { signJWT, verifyJWT } from "../utility/jwtTool";
import sequelize from "sequelize";
import lang from "../language";
import getRandomColor from "../utility/getRandomColor";
import capitalize from "../utility/capitalize";
import USER_TYPES from "../configs/userTypes";

const studentResolvers = {
  Query: {
    meStudent: async (_, args, { models, authObject }) => {
      const { Student } = models;

      if (authObject.student) {
        return await Student.findOne({ where: { id: authObject.student } });
      }
      return null;
    },
    students: async (_, { year }, { models, authObject }) => {
      const { Student } = models;
      if (authObject.practiceSuperviser) {
        if (year)
          return await Student.findAll({
            where: sequelize.where(
              sequelize.fn("YEAR", sequelize.col("createdAt")),
              year
            ),
          });
        else return await Student.findAll();
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
    registerStudent: async (
      _,
      {
        token,
        first_name,
        last_name,
        password,
        confirm_password,
        index_number,
      },
      { models }
    ) => {
      const { Student, Invitation } = models;
      const invitationToken = verifyJWT(token, (err, decoded) => {
        if (err) throw new Error(lang.invalidToken);
        return decoded;
      });

      const { email, userType } = invitationToken;
      const invitation = await Invitation.findOne({ where: { token } });
      if (!invitation) throw new Error(lang.invalidToken);
      if (userType !== USER_TYPES.student)
        throw new Error(lang.invalidUserType);
      if (!validator.isEmail(email)) throw new UserInputError(lang.badEmail);
      const exist = await Student.findOne({ where: { email } });
      if (exist) throw new Error(lang.userExist);
      if (!validator.isLength(password, { min: 8, max: undefined }))
        throw new UserInputError(lang.passwordValidation);
      if (!validator.isLength(first_name, { min: 3, max: undefined }))
        throw new UserInputError(lang.firstNameValidation);
      if (!validator.isLength(last_name, { min: 3, max: undefined }))
        throw new UserInputError(lang.lastNameValidation);
      if (password !== confirm_password)
        throw new UserInputError(lang.passwordsIdentical);
      if (!index_number) throw new UserInputError(lang.indexNumberRequired);
      const indexNumberExist = await Student.findOne({
        where: { index_number },
      });
      if (indexNumberExist) throw new UserInputError(lang.indexNumberExist);

      password = bcrypt.hashSync(password, 10);
      const student = await Student.create({
        email,
        first_name: capitalize(first_name),
        last_name: capitalize(last_name),
        password,
        color: getRandomColor(),
        index_number,
      });

      const userToken = signJWT({ student: student.id });
      await invitation.destroy();
      return { token: userToken, student };
    },
    updateStudentProfile: async (
      _,
      { first_name, last_name, password, confirmPassword, index_number },
      { models, authObject }
    ) => {
      const { Student } = models;
      if (!authObject.student) throw new Error(lang.noPermission);
      const student = await Student.findOne({
        where: {
          id: authObject.student,
        },
      });

      if (!student) throw new Error(lang.userNotFound);
      if (last_name) {
        if (!validator.isLength(last_name, { min: 3, max: undefined }))
          throw new UserInputError(lang.lastNameValidation);
        student.last_name = last_name;
      }
      if (first_name) {
        if (!validator.isLength(first_name, { min: 3, max: undefined }))
          throw new UserInputError(lang.firstNameValidation);

        student.first_name = first_name;
      }

      if (index_number) student.index_number = index_number;

      if (password) {
        if (!validator.isLength(password, { min: 8, max: undefined }))
          throw new UserInputError(lang.passwordValidation);

        if (password !== confirmPassword)
          throw new UserInputError(lang.passwordsIdentical);

        password = bcrypt.hashSync(password, 10);
        student.password = password;
      }

      await student.save();

      return student;
    },
  },
};

export default studentResolvers;
