import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FiBarChart2 } from "react-icons/fi"; // ikon chart kosong

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function Chart({ data = [] }) {
  const chartData = useMemo(() => {
    if (!data.length) return { labels: [], datasets: [] };

    // Group by ticker
    const grouped = data.reduce((acc, d) => {
      if (!acc[d.ticker]) acc[d.ticker] = [];
      acc[d.ticker].push(d);
      return acc;
    }, {});

    const labels = [...new Set(data.map((d) => d.date))].sort();

    const datasets = Object.keys(grouped).map((ticker, idx) => ({
      label: ticker,
      data: labels.map((date) => {
        const match = grouped[ticker].find((r) => r.date === date);
        return match ? match.close : null;
      }),
      borderColor: `hsl(${(idx * 70) % 360}, 70%, 50%)`,
      backgroundColor: `hsla(${(idx * 70) % 360}, 70%, 50%, 0.2)`,
      fill: false,
      tension: 0.25,
    }));

    return { labels, datasets };
  }, [data]);

  // Cek apakah datasets kosong atau semua null
  const hasData =
    chartData.datasets.length > 0 &&
    chartData.datasets.some((ds) => ds.data.some((val) => val !== null));

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-start min-h-[300px]">
      {hasData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
                labels: { usePointStyle: true },
              },
              title: {
                display: true,
                text: "Stock Close Price per Day",
                font: { size: 16 },
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
            interaction: { mode: "nearest", intersect: false },
            scales: {
              x: { title: { display: true, text: "Date" } },
              y: { title: { display: true, text: "Close Price" } },
            },
          }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <FiBarChart2 className="w-16 h-16 mb-2" />
          <span className="text-lg font-medium">No data available</span>
        </div>
      )}
    </div>
  );
}