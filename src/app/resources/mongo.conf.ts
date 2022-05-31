import { connect } from "mongoose";
import Logs from "../service/logger";
import config from "../../config/config";
const appConfig = config();

/**
 * Mongo database connection with mongoose
 */
class DBConnect {
  public mongoose!: typeof import("mongoose");
  private readonly logger: Logs = new Logs();

  constructor() {
    this.init();
  }

  init() {
    const db = connect(appConfig.get("db").host, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db.then((data) => {
      this.mongoose = data;
      this.logger.print("Connected to DB");
    }).catch((error) => {
      this.logger.error("DB connection error", error.reason);
    });
  }
}

export { DBConnect };
