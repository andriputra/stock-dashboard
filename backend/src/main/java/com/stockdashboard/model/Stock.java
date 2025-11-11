package com.stockdashboard.model;

import java.time.LocalDate;

public class Stock {
    private LocalDate date;
    private String ticker;
    private double open;
    private double high;
    private double low;
    private double close;
    private long volume;
    private String sector;
    private String subsector;

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