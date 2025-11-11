import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaFilePdf } from "react-icons/fa";

export default function ExportPDFButton({ data = [], filter = {} }) {
  const [loading, setLoading] = useState(false);

  const exportPDF = async () => {
    const el = document.getElementById("dashboard-content");
    if (!el) {
      alert("Dashboard content not found.");
      return;
    }

    setLoading(true);
    try {

      const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const margin = 40;
      doc.setFontSize(14);
      doc.text("Stock Dashboard Report", margin, margin);
      doc.setFontSize(10);

      const tickersSelected = filter.tickersSelected || [];
      const tickersText =
        tickersSelected.length > 0
          ? tickersSelected.join(", ")
          : "All";

      doc.text(`Tickers (${tickersSelected.length || "All"}): ${tickersText}`, margin, margin + 16);
      doc.text(`Start Date: ${filter.start || "-"}`, margin, margin + 32);
      doc.text(`End Date: ${filter.end || "-"}`, margin, margin + 48);
      doc.text(`Generated: ${new Date().toLocaleString()}`, margin, margin + 64);

      const canvas = await html2canvas(el, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const imgProps = doc.getImageProperties(imgData);
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let positionY = 120;
      let heightLeft = imgHeight;
      let yOffset = 0;

      while (heightLeft > 0) {
        const sliceHeight = Math.min(imgHeight, pageHeight - margin * 2);
        doc.addImage(imgData, "PNG", margin, positionY - yOffset, imgWidth, imgHeight);
        heightLeft -= pageHeight - margin * 2;
        if (heightLeft > 0) {
          doc.addPage();
          positionY = margin;
          yOffset += pageHeight - margin * 2;
        }
      }
      doc.save("stock_dashboard.pdf");
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700 font-medium">Generating PDF... Please wait</p>
          </div>
        </div>
      )}
      <button onClick={exportPDF} className="bg-green-600 text-white px-4 py-2 rounded-lg flex gap-3 items-center">
        <FaFilePdf/> Export PDF
      </button>
    </>
  );
}