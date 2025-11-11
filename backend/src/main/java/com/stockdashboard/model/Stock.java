package com.stockdashboard.model;

import java.time.LocalDate;

/**
 * Model data untuk menyimpan informasi saham.
 */
public class Stock {
    // Tanggal data saham
    private LocalDate date;
    // Kode ticker saham
    private String ticker;
    // Harga pembukaan saham pada tanggal tersebut
    private double open;
    // Harga tertinggi saham pada tanggal tersebut
    private double high;
    // Harga terendah saham pada tanggal tersebut
    private double low;
    // Harga penutupan saham pada tanggal tersebut
    private double close;
    // Volume perdagangan saham pada tanggal tersebut
    private long volume;
    // Sektor industri saham
    private String sector;
    // Sub-sektor industri saham
    private String subsector;

    // Getter dan setter untuk setiap atribut di atas
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getTicker() { return ticker; }
    public void setTicker(String ticker) { this.ticker = ticker; }

    public double getOpen() { return open; }
    public void setOpen(double open) { this.open = open; }

    public double getHigh() { return high; }
    public void setHigh(double high) { this.high = high; }

    public double getLow() { return low; }
    public void setLow(double low) { this.low = low; }

    public double getClose() { return close; }
    public void setClose(double close) { this.close = close; }

    public long getVolume() { return volume; }
    public void setVolume(long volume) { this.volume = volume; }

    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }

    public String getSubsector() { return subsector; }
    public void setSubsector(String subsector) { this.subsector = subsector; }
}