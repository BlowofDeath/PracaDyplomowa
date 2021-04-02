import { composeResolvers } from "@graphql-tools/resolvers-composition";
import studentResolvers from "./studentResolvers";
import practiceSuperviserResolvers from "./practiceSuperviserResolvers";

const composedResolvers = composeResolvers(
  studentResolvers,
  practiceSuperviserResolvers
);

export default composedResolvers;
