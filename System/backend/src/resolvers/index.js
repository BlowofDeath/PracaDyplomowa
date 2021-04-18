import { mergeResolvers } from "@graphql-tools/merge";
import studentResolvers from "./studentResolvers";
import practiceSuperviserResolvers from "./practiceSuperviserResolvers";
import practiceAnnouncementResolvers from "./practiceAnnouncementResolvers";
import companyResolvers from "./companyResolvers";
import customScalarsResolvers from "./customScalarsResolvers";
import invitationResolvers from "./invitationResolvers";
import practiceAgreementResolvers from "./practiceAgreementResolvers";
import internshipJournalResolvers from "./internshipJournalResolvers";

const mergedResolvers = mergeResolvers([
  studentResolvers,
  companyResolvers,
  practiceSuperviserResolvers,
  practiceAnnouncementResolvers,
  customScalarsResolvers,
  invitationResolvers,
  practiceAgreementResolvers,
  internshipJournalResolvers,
]);

export default mergedResolvers;
