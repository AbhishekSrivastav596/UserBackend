import { prisma } from "../services/prisma.js";
import { getQuotes } from "../services/stock.js";

export const getWatchlist = async (req, res) => {
  const stocks = await prisma.watchlist.findMany({
    where: { userId: req.user.id }
  });

  if (!stocks.length) return res.json([]);

  const quotes = await getQuotes(stocks.map(s => s.symbol));

  const merged = stocks.map((s, i) => ({
    symbol: s.symbol,
    name: s.name,
    price: quotes[i].c,
    change: quotes[i].dp
  }));

  res.json(merged);
};

export const addStock = async (req, res) => {
  const { symbol, name } = req.body;

  await prisma.watchlist.create({
    data: {
      userId: req.user.id,
      symbol,
      name
    }
  });

  res.json({ ok: true });
};

export const removeStock = async (req, res) => {
  await prisma.watchlist.delete({
    where: {
      userId_symbol: {
        userId: req.user.id,
        symbol: req.params.symbol
      }
    }
  });

  res.json({ ok: true });
};
