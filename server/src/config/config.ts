import dotenv from "dotenv";

dotenv.config();

interface ServerScheme {
  hostname: string;
  port: string | number;
}

const SERVER: ServerScheme = {
  hostname: process.env.HOSTNAME || "localhost",
  port: process.env.SERVER_PORT || 1338,
};

export const API_PREFIX: string = "/api/v1";

export default SERVER;
