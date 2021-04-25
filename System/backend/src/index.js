import { ApolloServer, AuthenticationError } from "apollo-server-express";
import nodemailer from "nodemailer";
import fs from "fs";
import express from "express";
import path from "path";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import bcrypt from "bcrypt";
import db from "./database/db";
const app = express();
import { verifyJWT } from "./utility/jwtTool";
import models from "./models";
import util from "util";
import { EMAIL_CONFIG, PORT } from "./configs/environment";
import { graphqlUploadExpress } from "graphql-upload";
import cors from "cors";
import fileRoute from "./routes/fileRoute";

app.use(cors());

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
  //   .then(async () => {
  //     console.log(`Database & tables created!`);
  //     const exist = await models.PracticeSuperviser.findOne();
  //     const password = process.env.PS_PASSWORD || "12345678";
  //     const hash = bcrypt.hashSync(password, 10);
  //     if (!exist) {
  //       const practiceSuperviser = await models.PracticeSuperviser.create({
  //         email: process.env.PS_EMAIL || "ps@example.com",
  //         first_name: process.env.PS_FIRST_NAME || "Jan",
  //         last_name: process.env.PS_LAST_NAME || "Kowalski",
  //         password: hash,
  //         color: "#fff",
  //       });
  //       console.log("\nKonto opiekuna praktyk \n");
  //       console.log(`email: ${practiceSuperviser.email}`);
  //       console.log(`password: ${password} \n`);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("Error database");
  //     console.log(err);
  //   });

  let emailTransporter = nodemailer.createTransport(EMAIL_CONFIG);

  app.get("/uploads/:id", fileRoute);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../public")));

    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public", "index.html"));
    });
  }
  app.use(graphqlUploadExpress());

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
    uploads: false,
  });

  server.applyMiddleware({ app });

  const port = PORT || 4001;
  app.listen({ port }, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}

startServer();
