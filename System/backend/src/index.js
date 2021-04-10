import { ApolloServer, AuthenticationError } from "apollo-server-express";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import express from "express";
import path from "path";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import db from "./database/sqliteDB";
const app = express();
import { verifyJWT } from "./utility/jwtTool";
import models from "./models";
import util from "util";
import { EMAIL_CONFIG, PORT } from "./configs/environment";

async function startServer() {
  await db
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  //This makes that tables are dropped and created on server restart
  // await db
  //   .sync({ alter: true })
  //   .then(() => {
  //     console.log(`Database & tables created!`);
  //   })
  //   .catch((err) => {
  //     console.log("Error database");
  //   });

  //This create or alter table
  //   await db.sync({ alter: true }).then(async () => {
  //     const exist = await User.findOne();
  //     const password = process.env.ADMIN_PASSWORD || "12345678";
  //     const hash = bcrypt.hashSync(password, 10);
  //     if (!exist) {
  //       const user = await User.create({
  //         email: process.env.ADMIN_EMAIL || "admin@example.com",
  //         role: "Admin",
  //         password: hash,
  //         first_name: "admin",
  //         last_name: "admin",
  //         isActive: true,
  //       });
  //       console.log("\nFirst user account \n");
  //       console.log(`email: ${user.email}`);
  //       console.log(`password: ${password} \n`);
  //     }
  //   });
  let emailTransporter = nodemailer.createTransport(EMAIL_CONFIG);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    //This makes that error display only message
    // formatError: (err) => {
    //   return err.message;
    // },
    context: ({ req }) => {
      const token = req.headers?.authorization || "";
      let authObject;
      try {
        authObject = token && verifyJWT(token);
      } catch (err) {
        throw new AuthenticationError("JWT incorrect");
      }

      return { models, authObject, emailTransporter };
    },
  });

  server.applyMiddleware({ app });

  const port = PORT || 4001;
  app.listen({ port }, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}

startServer();
