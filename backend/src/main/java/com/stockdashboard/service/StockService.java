package com.stockdashboard.service;

import com.stockdashboard.model.Stock;
import com.stockdashboard.util.CsvLoader;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StockService {
    private final List<Stock> allStocks;

    public StockService() {
        System.out.println("🚀 Loading data from CSV files...");
        Map<String, Map<String, String>> meta = CsvLoader.loadCompanyMeta("data/msequity.csv");
        List<Stock> tre = CsvLoader.loadStockPrices("data/trequity.csv", meta);

        allStocks = new ArrayList<>(tre);
        System.out.println("✅ Total combined records: " + allStocks.size());
    }

    public List<Stock> getFilteredStocks(List<String> tickers, String start, String end) {
        return allStocks.stream()
                .filter(s -> tickers == null || tickers.isEmpty() || tickers.contains(s.getTicker()))
                .filter(s -> {
                    if (start == null || start.isEmpty()) return true;
                    return !s.getDate().isBefore(LocalDate.parse(start));
                })
                .filter(s -> {
                    if (end == null || end.isEmpty()) return true;
                    return !s.getDate().isAfter(LocalDate.parse(end));
                })
                .sorted(Comparator.comparing(Stock::getDate))
                .collect(Collectors.toList());
    }

    public List<String> getAvailableTickers() {
        return allStocks.stream()
                .map(Stock::getTicker)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
}