import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.sendStatus(401);

  try {
    const token = header.split(" ")[1];
    req.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    res.sendStatus(401);
  }
};
