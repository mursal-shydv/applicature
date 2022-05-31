import config from "./config/config";
import Server from "./app/server/server.class";
import { ServerOptionsInterface } from "./app/server/server.interface";
const appConfig = config();

/**
 * Start the server and export server itselt and value if it is up and running
 */
const serverAppOptions: ServerOptionsInterface = {
  port: appConfig.get("port") || 3000,
};
const serverApp = new Server(serverAppOptions);
const serverAppStarted = serverApp.start();

export { serverAppStarted, serverApp, serverAppOptions };
