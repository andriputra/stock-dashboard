import React, { useState, useMemo } from "react";
import { FaCaretDown, FaCaretUp, FaTabletAlt} from "react-icons/fa";
import { FiBarChart2, FiTable } from "react-icons/fi"; 

export default function StockTable({ data = [] }) {
  const [sortColumn, setSortColumn] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fungsi untuk menangani perubahan sorting ketika header kolom diklik
  const handleSort = (col) => {
    if (col === sortColumn) setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    else {
      setSortColumn(col);
      setSortOrder("asc");
    }
  };

  // useMemo untuk melakukan sorting data berdasarkan kolom dan urutan sorting saat ini
  const sorted = useMemo(() => {
    const copy = (data || []).slice();
  
    copy.sort((a, b) => {
      let A = a[sortColumn];
      let B = b[sortColumn];
  
      // Konversi tipe data untuk perbandingan yang tepat
      if (sortColumn === "date") {
        A = new Date(A);
        B = new Date(B);
      } else if (["open", "high", "low", "close", "volume"].includes(sortColumn)) {
        A = Number(A);
        B = Number(B);
      }
  
      if (A < B) return sortOrder === "asc" ? -1 : 1;
      if (A > B) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  
    return copy;
  }, [data, sortColumn, sortOrder]);

  if (!data.length)
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-md border border-gray-200 mt-4 text-gray-400">
        {/* Ikon kosong */}
         <FiTable className="w-16 h-16 mb-2" />
         <span className="text-lg font-normal">No data found for the selected filter</span>
      </div>
    );
  // Daftar kolom yang akan ditampilkan pada tabel beserta labelnya
  const headers = [
    { key: "date", label: "Date" },
    { key: "ticker", label: "Ticker" },
    { key: "open", label: "Open" },
    { key: "high", label: "High" },
    { key: "low", label: "Low" },
    { key: "close", label: "Close" },
    { key: "volume", label: "Volume" },
  ];

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg mt-4">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-300">
          <tr>
            {headers.map((h) => (
              <th
                key={h.key}
                className="py-2 px-4 text-left cursor-pointer select-none border"
                onClick={() => handleSort(h.key)}
              >
                <div className="flex justify-between items-center gap-1">
                  <span>{h.label}</span>
                  {["open", "high", "low", "close", "date"].includes(h.key) && (
                    <div className="flex flex-col ml-1 w-3">
                      <FaCaretUp
                        className={`transition-colors duration-200 ${
                          sortColumn === h.key && sortOrder === "asc"
                            ? "text-red-500"
                            : "text-gray-400"
                        } hover:text-red-400`}
                      />
                      <FaCaretDown
                        className={`transition-colors duration-200 ${
                          sortColumn === h.key && sortOrder === "desc"
                            ? "text-red-500"
                            : "text-gray-400"
                        } hover:text-red-400`}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={i}
              className={`border border-gray-200 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-100"
              } hover:bg-blue-100 transition-colors duration-200`}
            >
              <td className="px-4 py-2">{row.date}</td>
              <td className="px-4 py-2 font-semibold">{row.ticker}</td>
              <td className="px-4 py-2">{row.open.toLocaleString()}</td>
              <td className="px-4 py-2">{row.high.toLocaleString()}</td>
              <td className="px-4 py-2">{row.low.toLocaleString()}</td>
              <td className="px-4 py-2">{row.close.toLocaleString()}</td>
              <td className="px-4 py-2">{row.volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}