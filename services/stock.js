import axios from "axios";
import { env } from "../config/env.js";

const base = "https://finnhub.io/api/v1";

export const searchStocks = async (q) => {
  const r = await axios.get(`${base}/search?q=${q}&token=${env.finnhubKey}`);
  return r.data.result;
};

export const getQuotes = async (symbols) => {
  const calls = symbols.map(s =>
    axios.get(`${base}/quote?symbol=${s}&token=${env.finnhubKey}`)
  );

  const r = await Promise.all(calls);

  return r.map(x => x.data);
};
