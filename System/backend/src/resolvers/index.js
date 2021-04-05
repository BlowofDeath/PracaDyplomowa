import { mergeResolvers } from "@graphql-tools/merge";
import studentResolvers from "./studentResolvers";
import practiceSuperviserResolvers from "./practiceSuperviserResolvers";
import practiceAnnouncementResolvers from "./practiceAnnouncementResolvers";
import companyResolvers from "./companyResolvers";
import customScalarsResolvers from "./customScalarsResolvers";

const mergedResolvers = mergeResolvers([
  studentResolvers,
  companyResolvers,
  practiceSuperviserResolvers,
  practiceAnnouncementResolvers,
  customScalarsResolvers,
]);

export default mergedResolvers;
