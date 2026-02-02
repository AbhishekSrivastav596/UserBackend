import express from "express";
import { getWatchlist, addStock, removeStock } from "../controllers/watchlist.js";

const router = express.Router();


router.get("/", getWatchlist);
router.post("/", addStock);
router.delete("/:symbol", removeStock);

export default router;
