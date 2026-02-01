import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  id: string,
  symbol: string,
  name: string,
  price: number,
  changePercent: number
});

const watchlistSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    stocks: [stockSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Watchlist", watchlistSchema);
