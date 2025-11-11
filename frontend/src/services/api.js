import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

// === STOCK ENDPOINTS ===
export const getAllStocks = () => API.get("/stocks");
export const getTickers = () => API.get("/stocks/tickers");

// Support filter (multi-ticker + date range)
export const getFilteredStocks = ({ tickersSelected = [], start = "", end = "" }) =>
  API.get("/stocks", {
    params: {
      ticker: tickersSelected.join(","),
      start,
      end,
    },
  });

// Optional: kalau nanti kamu mau nambah fitur sektor/subsektor
export const getSectors = () => API.get("/stocks/sectors");
export const getSubsectors = () => API.get("/stocks/subsectors");