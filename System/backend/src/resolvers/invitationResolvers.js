import validator from "validator";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { signJWT, verifyJWT } from "../utility/jwtTool";
import lang from "../language";
import getRandomColor from "../utility/getRandomColor";
import capitalize from "../utility/capitalize";
import USER_TYPES from "../configs/userTypes";
import { getInvitationTemplate } from "../configs/emailTemplate";

const invitationResolvers = {
  Query: {},
  Mutation: {
    createInvite: async (
      _,
      { email, userType },
      { models, emailTransporter }
    ) => {
      const { Student, Company, Invitation, PracticeSuperviser } = models;
      if (!validator.isEmail(email)) throw new UserInputError(lang.badEmail);
      switch (userType) {
        case USER_TYPES.student:
          const student = await Student.findOne({ where: { email } });
          if (student) throw new Error(lang.userExist);
          break;
        case USER_TYPES.company:
          const company = await Company.findOne({ where: { email } });
          if (company) throw new Error(lang.userExist);
          break;
        case USER_TYPES.practiceSuperviser:
          const practiceSuperviser = await PracticeSuperviser.findOne({
            where: { email },
          });
          if (practiceSuperviser) throw new Error(lang.userExist);
          break;
        default:
          throw new Error(lang.badUserType);
      }

      const token = signJWT({ email, userType }, "30d");
      const invitation = await Invitation.create({
        token,
        used: false,
      });
      if (!invitation) throw new Error(lang.objectCreationFail);
      const template = getInvitationTemplate(token, email);
      await emailTransporter.sendMail(template).catch((err) => {
        console.log(err);
        throw new Error(lang.emailServerError);
      });

      return { userType, email };
    },
    confirmInvitationToken: async (_, { token }, { models, authObject }) => {
      const { Invitation } = models;
      const invitationToken = verifyJWT(token, (err, decoded) => {
        if (err) throw new Error(lang.invalidToken);
        if (decoded) return decoded;
      });
      const invitation = await Invitation.findOne({ where: { token } });
      if (invitation) return invitationToken;
      else throw new Error(lang.invitationExpired);
    },
  },
};

export default invitationResolvers;
