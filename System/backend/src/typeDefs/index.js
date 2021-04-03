// ./graphql/types/index.js
import { mergeTypeDefs } from "@graphql-tools/merge";
import studentType from "./studentType";
import practiceSuperviserType from "./practiceSuperviserType";
import practiceAnnouncementType from "./practiceAnnouncementType";
import customScalarType from "./customScalarType";

const types = [
  studentType,
  practiceSuperviserType,
  practiceAnnouncementType,
  customScalarType,
];

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
export default mergeTypeDefs(types, { all: true });
