const { GraphQLScalarType, Kind } = require("graphql");

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
        return parseInt(ast.value, 10); // Convert hard-coded AST string to integer and then to Date
      }
      return parseInt(ast.value); // Invalid hard-coded value (not an integer)
    },
  }),
};

export default customScalarsResolvers;
