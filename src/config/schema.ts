import { appEnv } from "../app/shared/app-env.enum";

export const appSchema = {
  env: {
    doc: "Application env",
    format: ["dev", "prod", "testing"],
    default: appEnv.DEV,
    env: "NODE_ENV",
    arg: "node-env",
  },
  port: {
    doc: "application port",
    format: "port",
    default: 3000,
    env: "PORT",
    arg: "port",
  },
  db: {
    host: {
      doc: "Mongo db url",
      format: "*",
      default: "mongodb://localhost:27017/records",
      env: "MONGO_HOST",
    },
  },
};
