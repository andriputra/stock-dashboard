package com.stockdashboard.util;

import com.opencsv.CSVReader;
import com.stockdashboard.model.Stock;

import java.io.*;
import java.time.LocalDate;
import java.util.*;

public class CsvLoader {
    public static Map<String, Map<String, String>> loadCompanyMeta(String resourcePath) {
        Map<String, Map<String, String>> meta = new HashMap<>();
        try (InputStream in = CsvLoader.class.getClassLoader().getResourceAsStream(resourcePath)) {
            if (in == null) {
                System.out.println("File not found: " + resourcePath);
                return meta;
            }

            try (CSVReader reader = new CSVReader(new InputStreamReader(in))) {
                String[] line;
                boolean skip = true;
                while ((line = reader.readNext()) != null) {
                    // Lewati header CSV
                    if (skip) { skip = false; continue; }
                    if (line.length < 5) continue;

                    // Parsing ticker, sektor, dan subsektor dari baris CSV
                    String ticker = line[0].replace("\"", "").trim();
                    String sector = line[3].replace("\"", "").trim();
                    String subsector = line[4].replace("\"", "").trim();

                    Map<String, String> info = new HashMap<>();
                    info.put("sector", sector);
                    info.put("subsector", subsector);
                    meta.put(ticker, info);
                }
            }
            System.out.println("Loaded " + meta.size() + " tickers from " + resourcePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return meta;
    }

    /* Membaca data harga saham dari file CSV.*/
    public static List<Stock> loadStockPrices(String resourcePath, Map<String, Map<String, String>> meta) {
        List<Stock> list = new ArrayList<>();
        try (InputStream in = CsvLoader.class.getClassLoader().getResourceAsStream(resourcePath)) {
            if (in == null) {
                System.out.println("File not found: " + resourcePath);
                return list;
            }

            try (CSVReader reader = new CSVReader(new InputStreamReader(in))) {
                String[] line;
                boolean skip = true;
                while ((line = reader.readNext()) != null) {
                    // Lewati header CSV
                    if (skip) { skip = false; continue; }
                    if (line.length < 11) continue;

                    // Parsing data harga saham per baris CSV
                    Stock s = new Stock();
                    s.setTicker(line[1].replace("\"", "").trim());
                    s.setDate(LocalDate.parse(line[2].replace("\"", "").trim()));
                    s.setOpen(Double.parseDouble(line[3]));
                    s.setHigh(Double.parseDouble(line[4]));
                    s.setLow(Double.parseDouble(line[5]));
                    s.setClose(Double.parseDouble(line[6]));
                    s.setVolume(Long.parseLong(line[9]));

                    // Melengkapi sektor dan subsektor dari metadata jika ada
                    if (meta.containsKey(s.getTicker())) {
                        Map<String, String> info = meta.get(s.getTicker());
                        s.setSector(info.getOrDefault("sector", ""));
                        s.setSubsector(info.getOrDefault("subsector", ""));
                    }

                    list.add(s);
                }
            }
            System.out.println("Loaded " + list.size() + " records from " + resourcePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}