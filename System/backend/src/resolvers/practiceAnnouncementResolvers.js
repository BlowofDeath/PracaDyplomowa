import validator from "validator";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import lang from "../language";

const practiceAnnouncementResolvers = {
  Query: {
    testAnnouncement: async (_, args, context) => {
      return "It is work!!";
    },
    practiceAnnouncements: async (_, args, { models }) => {
      const { PracticeAnnouncement } = models;
      const announcements = await PracticeAnnouncement.findAll();
      return announcements;
    },
  },
};

export default practiceAnnouncementResolvers;
