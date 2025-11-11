# 📊 Stock Dashboard — Infovesta Project

A modern **Stock Market Dashboard** built with **React + Vite + TailwindCSS** for the Frontend and **Spring Boot** for the Backend.  
This project visualizes stock data interactively, allowing users to explore, filter, and export market insights easily.

---

## 🚀 Project Overview

**Stock Dashboard** is designed to demonstrate real-time stock visualization and data analytics.  
The system consists of:

| Component | Tech Stack | Description |
|------------|-------------|-------------|
| **Frontend (FE)** | React 18, Vite, TailwindCSS, Chart.js | Displays interactive stock charts, filters, and PDF export features |
| **Backend (BE)** | Java 17, Spring Boot, OpenCSV | Handles stock data processing and provides REST API for frontend |
| **Data Source** | IDX (Indonesia Stock Exchange) CSV Dataset | Processed from `msequity.csv` (metadata) and `trequity.csv` (historical prices) |

---

## 🧠 Features

✅ View stock performance (Open, High, Low, Close)  
✅ Interactive chart with filter by ticker & date range  
✅ Export data and chart as PDF  
✅ Responsive and elegant UI  
✅ Backend-driven data filtering  
✅ Dynamic table sorting & hover effects  

---

## ⚙️ Backend Setup (Spring Boot)

### **Requirements**
- Java 17+
- Maven 3.9+
- IDE (IntelliJ / VS Code / Eclipse)

### **Installation**
```bash
# Go to backend folder
cd backend

# Build project
mvn clean install

# Run Spring Boot app
mvn spring-boot:run
```
GET http://localhost:8080/api/stocks?ticker=BBRI,BBCA&start=2025-01-01&end=2025-01-31

## 💻 **Frontend Setup (React + Vite)**
### **Requirements**
- Node.js 18+
- npm or yarn

### **Installation**
```bash
# Go to frontend folder
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```
🌍 App will run on:
http://localhost:5173/

## 🧾 **Data Source**

Stock data used in this project is taken from:
- 📁 msequity.csv — Metadata (ticker, sector, subsector)
- 📁 trequity.csv — Historical stock prices

These datasets are derived from IDX (Bursa Efek Indonesia) sample data, processed and combined within the backend service using OpenCSV.

## 📤 **Export Feature**

You can export charts and tables directly as PDF via the Export PDF button in the Filter Bar.

📸 The PDF includes:
- Selected tickers
- Date range filter
- Generated timestamp

## 🧩 **Developer Notes**
- Make sure the backend is running on port 8080 before launching the frontend.
- Frontend fetches data from: http://localhost:8080/api/stocks
- Adjust CORS config in StockController.java if necessary: @CrossOrigin(origins = "*")
