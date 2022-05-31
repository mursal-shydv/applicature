import path from "path";
import convict from "convict";
import { appSchema } from "./schema";

export default () => {
  const config = convict(appSchema);
  const env = config.get("env");
  config.loadFile([path.join(__dirname, `../../config/${env}.conf.json`)]);
  config.validate({ allowed: "warn" });
  return config;
};
