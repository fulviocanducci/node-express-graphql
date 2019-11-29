const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = require("graphql");

const { todosModel } = require("../models");

const TodoType = new GraphQLObjectType({
  name: "todo",
  description: "todo",
  fields: {
    id: {
      type: GraphQLInt
    },
    description: {
      type: GraphQLString
    },
    done: {
      type: GraphQLInt
    }
  }
});

const Todos = {
  type: new GraphQLList(TodoType),
  async resolve(root, args) {
    return await todosModel.findAll();
  }
};

const TodosSchema = {
  type: new GraphQLList(TodoType),
  async resolve(root, args) {
    return await todosModel.findAll();
  }
};

const TodoFindSchema = {
  type: TodoType,
  args: {
    id: {
      name: "id",
      type: GraphQLInt
    }
  },
  async resolve(root, args) {
    return await todosModel.findByPk(args.id);
  }
};

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: { todos: TodosSchema, todofind: TodoFindSchema }
  })
});

module.exports = schema;
