const { todosModel } = require("../models");
const { DestroyType } = require("./utils");
const {
  //GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  //GraphQLNonNull,
  GraphQLString,
  //GraphQLBoolean,
  GraphQLInt,
  //GraphQLID,
  GraphQLList
} = require("graphql");

/**
 * Fields Default
 */

const fields = {
  id: {
    type: GraphQLInt,
    defaultValue: 0
  },
  description: {
    type: GraphQLString
  },
  done: {
    type: GraphQLInt,
    defaultValue: 0
  }
};

/**
 * Types Query and Input
 */
const TodoInputType = new GraphQLInputObjectType({
  name: "todoinput",
  description: "todoinput",
  fields: fields
});

const TodoType = new GraphQLObjectType({
  name: "todooutput",
  description: "todooutput",
  fields: fields
});

/**
 * Arguments
 */
const input = {
  input: { type: TodoInputType }
};

const id = {
  id: { name: "id", type: GraphQLInt }
};

/**
 * Schemas
 */
const TodosSchema = {
  name: "todosschema",
  type: new GraphQLList(TodoType),
  async resolve(root, args) {
    return await todosModel.findAll();
  }
};

const TodoFindSchema = {
  name: "todofindschema",
  type: TodoType,
  args: id,
  async resolve(root, args) {
    return await todosModel.findByPk(args.id);
  }
};

const TodoAddSchema = {
  name: "todoaddschema",
  type: TodoType,
  args: input,
  async resolve(root, args) {
    const { id, description, done } = args.input;
    return await todosModel.create({ id, description, done });
  }
};

const TodoEditSchema = {
  name: "todoeditschema",
  type: TodoType,
  args: input,
  async resolve(root, args) {
    const { id, description, done } = args.input;
    await todosModel.update({ description, done }, { where: { id } });
    return await todosModel.findByPk(id);
  }
};

const TodoDestroySchema = {
  name: "tododestroyschema",
  type: DestroyType,
  args: id,
  async resolve(root, args) {
    const { id } = args;
    const count = await todosModel.destroy({ where: { id } });
    return {
      count,
      status: count > 0,
      description:
        count > 0 ? "success" : "record deleted, unsuccessfully or no registry"
    };
  }
};

/**
 * Exports
 */
module.exports = {
  todos: TodosSchema,
  todofind: TodoFindSchema,
  todoadd: TodoAddSchema,
  todoedit: TodoEditSchema,
  tododestroy: TodoDestroySchema
};
