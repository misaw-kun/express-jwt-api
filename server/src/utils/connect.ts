import mongoose from "mongoose";
import config from 'config';
import log from "./logger";

async function connect() {
  try {
    const dbUri = config.get<string>("dbUri");
    await mongoose.connect(dbUri);
    return log.info("Connected to DB");
  } catch (error) {
    log.error('DB connection failed', error);
    process.exit(1);
  }
}

export default connect;