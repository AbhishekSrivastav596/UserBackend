import express from "express";
import { auth } from "../middleware/auth.js";
import { getWatchlist, addStock, removeStock } from "../controllers/watchlist.js";

const router = express.Router();

router.use(auth);

router.get("/", getWatchlist);
router.post("/", addStock);
router.delete("/:symbol", removeStock);

export default router;
