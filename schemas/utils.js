const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} = require("graphql");

const DestroyType = new GraphQLObjectType({
  name: "destroy",
  description: "destroy",
  fields: {
    count: {
      type: GraphQLInt
    },
    description: {
      type: GraphQLString
    },
    status: {
      type: GraphQLBoolean
    }
  }
});

module.exports = { DestroyType };
