import React, { useState, useRef, useEffect } from "react";
import ExportPDFButton from "./ExportPDFButton.jsx";
import {FaCode, FaFilter} from "react-icons/fa";

export default function FilterBar({ tickers = [], filter, onChange, onApply, onReset }) {
  const { tickersSelected = [], start = "", end = "" } = filter;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // useEffect untuk menutup dropdown jika terjadi klik di luar area dropdown
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fungsi untuk toggle pilihan ticker pada checkbox
  const toggleTicker = (ticker) => {
    let updated;
    if (tickersSelected.includes(ticker)) {
      updated = tickersSelected.filter((t) => t !== ticker);
    } else {
      updated = [...tickersSelected, ticker];
    }
    onChange("tickersSelected", updated);
  };

  // Struktur utama tampilan filter:
  return (
    <div className="bg-white shadow-lg p-5 rounded-xl mb-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Filter Data</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div className="col-span-1 sm:col-span-2 relative" ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Ticker
          </label>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full flex justify-between items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-all"
          >
            <span className="text-gray-700 text-sm">
              {tickersSelected.length > 0
                ? `${tickersSelected.length} Selected`
                : "Choose Tickers"}
            </span>
            <svg
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute z-20 mt-2 w-full sm:w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto animate-fade-in">
              {tickers.length === 0 ? (
                <p className="text-gray-400 text-sm p-3">No tickers available</p>
              ) : (
                tickers.map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={tickersSelected.includes(t)}
                      onChange={() => toggleTicker(t)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="font-medium">{t}</span>
                  </label>
                ))
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={start}
            onChange={(e) => onChange("start", e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={end}
            onChange={(e) => onChange("end", e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-5 gap-3">
        <ExportPDFButton data={[]} filter={filter} />
        <div className="flex flex-col md:flex-row gap-3">
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all w-full md:w-auto"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onApply}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow transition-all flex gap-2 items-center justify-center w-full md:w-auto"
          >
            <FaFilter/> Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}