import dotenv from "dotenv";
import { cleanEnv, host, num, port, str, testOnly, bool } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    devDefault: testOnly("test"),
    choices: ["development", "production", "test"],
  }),
  HOST: host({ devDefault: testOnly("localhost") }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
  MONGO_URL: str({
    devDefault: testOnly("mongodb://localhost:27017"),
  }),
  MONGO_DB_NAME: str({
    devDefault: testOnly("shopper_test"),
  }),
  MONGO_LOCAL: bool(),
});