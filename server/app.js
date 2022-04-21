const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv").config();

// Load schema & resolvers
const typeDefs = require("./src/schema/schema");
const resolvers = require("./src/resolver/resolver");

// Load DB methods
const mongoDataMethods = require("./src/data/db");

// Connect to MongooseDB
const connectDB = async () => {
  try {
    mongoose.connect(
      `mongodb+srv://${process.env.SESSION_DB_USERNAME_DEV_PROD}:${process.env.SESSION_DB_PASSWORD_DEV_PROD}@graphql.glbvg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    console.log("MongooseDB Connect");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods }),
});

const app = express();

server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
