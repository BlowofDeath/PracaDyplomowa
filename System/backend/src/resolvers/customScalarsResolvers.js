import { GraphQLScalarType, Kind } from "graphql";
import { GraphQLUpload } from "graphql-upload";

const customScalarsResolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
      return value;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
      }
      return new Date(ast.value).getTime(); // Invalid hard-coded value (not an integer)
    },
  }),
  Upload: GraphQLUpload,
};

export default customScalarsResolvers;
