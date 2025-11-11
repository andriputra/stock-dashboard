package com.stockdashboard.controller;

import com.stockdashboard.model.Stock;
import com.stockdashboard.service.StockService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

// Menandai kelas ini sebagai REST controller untuk menangani request HTTP
@RestController
// Menentukan base URL untuk semua endpoint di controller ini
@RequestMapping("/api/stocks")
// Mengizinkan akses dari semua origin untuk menghindari masalah CORS
@CrossOrigin(origins = "*")
public class StockController {

    private final StockService service;

    // Dependency injection service melalui konstruktor untuk memisahkan logika bisnis
    public StockController(StockService service) {
        this.service = service;
    }

    // Endpoint untuk mendapatkan daftar saham dengan filter opsional berdasarkan ticker dan rentang tanggal
    @GetMapping
    public List<Stock> getStocks(
            @RequestParam(required = false) String ticker,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end
    ) {
        // Mengubah parameter ticker yang dipisahkan koma menjadi list ticker
        List<String> tickers = new ArrayList<>();
        if (ticker != null && !ticker.isEmpty()) {
            tickers = Arrays.asList(ticker.split(","));
        }
        // Memanggil service untuk mendapatkan data saham yang sudah difilter
        return service.getFilteredStocks(tickers, start, end);
    }

    // Endpoint untuk mendapatkan daftar semua ticker yang tersedia
    @GetMapping("/tickers")
    public List<String> getTickers() {
        // Mengambil daftar ticker dari service
        return service.getAvailableTickers();
    }
}