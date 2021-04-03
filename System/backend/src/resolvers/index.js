import { mergeResolvers } from "@graphql-tools/merge";
import studentResolvers from "./studentResolvers";
import practiceSuperviserResolvers from "./practiceSuperviserResolvers";
import practiceAnnouncementResolvers from "./practiceAnnouncementResolvers";
import customScalarsResolvers from "./customScalarsResolvers";

const mergedResolvers = mergeResolvers([
  studentResolvers,
  practiceSuperviserResolvers,
  practiceAnnouncementResolvers,
  customScalarsResolvers,
]);

export default mergedResolvers;
