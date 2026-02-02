import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import stockRoutes from "./routes/stock.js";
import watchlistRoutes from "./routes/watchlist.js";

const app = express();

app.use(cors({ origin: env.clientUrl }));
app.use(express.json());
const requireUser = (req, res, next) => {
  const email = req.headers["x-user-email"];
  if (!email) return res.sendStatus(401);

  req.email = email;
  console.log("Authenticated user:", email);
  next();
};


app.use("/api/stocks", requireUser, stockRoutes);
app.use("/api/watchlist", requireUser, watchlistRoutes);

export default app;
