import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import stockRoutes from "./routes/stock.js";
import watchlistRoutes from "./routes/watchlist.js";

const app = express();

app.use(cors({ origin: env.clientUrl }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/stocks", stockRoutes);
app.use("/api/watchlist", watchlistRoutes);

export default app;
