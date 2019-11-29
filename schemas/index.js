const { GraphQLSchema, GraphQLObjectType } = require("graphql");

/**
 * Schemas Todos
 */
const todos = require("./todo-schema");

/**
 * Schema Configuration
 */
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: { ...todos }
  })
  // mutation: new GraphQLObjectType({
  //   name: "Mutation",
  //   fields: {
  //     todoadd: TodoAddSchema
  //   }
  // })
});

/**
 * Export Schemas
 */
module.exports = schema;
