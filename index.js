//const graphql = require("graphql");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const schema = require("./schemas");

app.use(
  "/graphql",
  graphqlHTTP({ schema: schema, pretty: true, graphiql: true })
);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log("Para derrubar o servidor: ctrl + c");
});
