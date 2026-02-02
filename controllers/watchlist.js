import { prisma } from "../services/prisma.js";
import { getQuotes } from "../services/stock.js";
import { searchStocks } from "../services/stock.js";

export const search = async (req, res) => {
  const data = await searchStocks(req.query.q);
  res.json(data);
};

export const getWatchlist = async (req, res) => {
const email = req.email;

const user = await prisma.user.findUnique({
  where: { email }
});

if (!user) return res.json([]);

const stocks = await prisma.watchlist.findMany({
  where: { userId: user.id }
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
  const { symbol, name } = req.body
  const email = req.email


  let user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    user = await prisma.user.create({
      data: { email }
    })
  }

 await prisma.watchlist.upsert({
  where: {
    userId_symbol: {
      userId: user.id,
      symbol: symbol.toUpperCase()
    }
  },
  update: {},
  create: {
    userId: user.id,
    symbol: symbol.toUpperCase(),
    name
  }
})


  res.json({ ok: true })
}

export const removeStock = async (req, res) => {
  const email = req.email      
  const { symbol } = req.params

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) return res.sendStatus(404)

  await prisma.watchlist.deleteMany({
    where: {
      userId: user.id,
      symbol: symbol.toUpperCase()
    }
  })

  res.json({ ok: true })
}

