// ./graphql/types/index.js
import { mergeTypeDefs } from "@graphql-tools/merge";
import studentType from "./studentType";
import practiceSuperviserType from "./practiceSuperviserType";
import practiceAnnouncementType from "./practiceAnnouncementType";
import companyType from "./companyType";
import customScalarType from "./customScalarType";
import invitationType from "./invitationType";
import practiceAgreementType from "./practiceAgreementType";
import internshipJournalType from "./internshipJournalType";

const types = [
  studentType,
  practiceSuperviserType,
  companyType,
  practiceAnnouncementType,
  customScalarType,
  invitationType,
  practiceAgreementType,
  internshipJournalType,
];

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
export default mergeTypeDefs(types, { all: true });
