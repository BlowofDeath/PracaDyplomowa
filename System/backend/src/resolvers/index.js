import { mergeResolvers } from "@graphql-tools/merge";
import studentResolvers from "./studentResolvers";
import practiceSuperviserResolvers from "./practiceSuperviserResolvers";

const mergedResolvers = mergeResolvers([
  studentResolvers,
  practiceSuperviserResolvers,
]);

export default mergedResolvers;
