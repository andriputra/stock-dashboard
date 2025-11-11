package com.stockdashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/* Kelas utama aplikasi Spring Boot*/
@SpringBootApplication
public class StockDashboardApplication {
    /* Entry point untuk menjalankan aplikasi.*/
    public static void main(String[] args) {
        SpringApplication.run(StockDashboardApplication.class, args);
    }
}