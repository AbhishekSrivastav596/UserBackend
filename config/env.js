import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  finnhubKey: process.env.FINNHUB_KEY,
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL
};
