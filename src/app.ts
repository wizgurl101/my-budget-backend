import express from "express";
import * as dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import userRoutes from "./routes/userRoutes";
import {initRollout} from "./services/featureFlagService";

dotenv.config();

const app = express();

try {
  const flags = await initRollout();
  if (flags.testingFlag.isEnabled()){
    console.log('Testing flag works!');
  }
} catch (error) {
  console.error('Testing flag did not work: ', error);
}

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Budget API Documentation",
      version: "1.0.0",
      description: "My Budget Backend API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/userRoutes.ts"], // Path to your API routes
};
const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use("/my-budget/api/v1/users", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  return console.log(
    `My Budget Backend is listening at http://localhost:${port}`
  );
});
