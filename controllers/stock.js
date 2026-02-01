import { searchStocks } from "../services/stock.js";

export const search = async (req, res) => {
  const data = await searchStocks(req.query.q);
  res.json(data);
};
