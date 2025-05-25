import dotenv from "dotenv";

dotenv.config();

class Config {
  get(key: string): string {
    return process.env[key] || '';
  }
}

export const config = new Config();
