package com.stockdashboard.controller;

import com.stockdashboard.model.Stock;
import com.stockdashboard.service.StockService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "*")
public class StockController {

    private final StockService service;

    public StockController(StockService service) {
        this.service = service;
    }

    @GetMapping
    public List<Stock> getStocks(
            @RequestParam(required = false) String ticker,
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end
    ) {
        List<String> tickers = new ArrayList<>();
        if (ticker != null && !ticker.isEmpty()) {
            tickers = Arrays.asList(ticker.split(","));
        }
        return service.getFilteredStocks(tickers, start, end);
    }

    @GetMapping("/tickers")
    public List<String> getTickers() {
        return service.getAvailableTickers();
    }
}