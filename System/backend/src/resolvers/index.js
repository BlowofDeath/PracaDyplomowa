import { composeResolvers } from "@graphql-tools/resolvers-composition";
import studentResolvers from "./studentResolvers";

const composedResolvers = composeResolvers(studentResolvers);

export default composedResolvers;
