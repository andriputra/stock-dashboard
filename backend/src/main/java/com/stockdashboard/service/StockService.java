package com.stockdashboard.service;

import com.stockdashboard.model.Stock;
import com.stockdashboard.util.CsvLoader;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
// Service ini bertanggung jawab untuk memuat data saham dan menyediakan metode untuk mengambil data yang difilter.
public class StockService {
    private final List<Stock> allStocks;

    // Konstruktor memuat data saham dari file CSV dan menginisialisasi daftar saham.
    public StockService() {
        System.out.println("Loading data from CSV files...");
        Map<String, Map<String, String>> meta = CsvLoader.loadCompanyMeta("data/msequity.csv");
        List<Stock> tre = CsvLoader.loadStockPrices("data/trequity.csv", meta);

        allStocks = new ArrayList<>(tre);
        System.out.println("Total combined records: " + allStocks.size());
    }

    // Mengambil daftar saham yang difilter berdasarkan ticker, tanggal mulai, dan tanggal akhir.
    public List<Stock> getFilteredStocks(List<String> tickers, String start, String end) {
        return allStocks.stream()
                // Filter berdasarkan ticker jika diberikan.
                .filter(s -> tickers == null || tickers.isEmpty() || tickers.contains(s.getTicker()))
                // Filter berdasarkan tanggal mulai jika diberikan.
                .filter(s -> {
                    if (start == null || start.isEmpty()) return true;
                    return !s.getDate().isBefore(LocalDate.parse(start));
                })
                // Filter berdasarkan tanggal akhir jika diberikan.
                .filter(s -> {
                    if (end == null || end.isEmpty()) return true;
                    return !s.getDate().isAfter(LocalDate.parse(end));
                })
                // Mengurutkan hasil berdasarkan tanggal.
                .sorted(Comparator.comparing(Stock::getDate))
                .collect(Collectors.toList());
    }

    // Mengambil daftar ticker unik yang tersedia dari data saham.
    public List<String> getAvailableTickers() {
        return allStocks.stream()
                .map(Stock::getTicker)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
}