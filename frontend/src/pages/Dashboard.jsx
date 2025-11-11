import { useEffect, useState } from "react";
import { getTickers, getAllStocks, getFilteredStocks } from "../services/api.js";
import Chart from "../components/Chart.jsx";
import StockTable from "../components/StockTable.jsx";
import FilterBar from "../components/FilterBar.jsx";

export default function Dashboard() {
  const [tickers, setTickers] = useState([]);
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({ tickersSelected: [], start: "", end: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([getTickers(), getAllStocks()])
      .then(([tickersRes, dataRes]) => {
        setTickers(tickersRes.data || []);
        setData(dataRes.data || []);
        setFiltered(dataRes.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load data from backend.");
        setLoading(false);
      });
  }, []);

  const handleChange = (key, value) => {
    setFilter((s) => ({ ...s, [key]: value }));
  };

  const applyFilter = () => {
    setLoading(true);
    getFilteredStocks(filter)
      .then((res) => {
        setFiltered(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to apply filter.");
        setLoading(false);
      });
  };

  const resetFilter = () => {
    setFilter({ tickersSelected: [], start: "", end: "" });
    setFiltered(data.slice());
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <div className="flex gap-3 items-center mb-6">
          <img src="/market.png" alt="market stock" className="h-[60px]"/>
          <h1 className="text-[30px] font-bold text-gray-800"> Stock Dashboard</h1>
        </div>
        <FilterBar
          tickers={tickers}
          filter={filter}
          onChange={handleChange}
          onApply={applyFilter}
          onReset={resetFilter}
        />

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {loading && <p className="text-gray-600 mb-4">Loading data...</p>}

        <div id="dashboard-content">
          <Chart data={filtered} />
          <StockTable data={filtered} />
        </div>
      </div>
    </div>
  );
}