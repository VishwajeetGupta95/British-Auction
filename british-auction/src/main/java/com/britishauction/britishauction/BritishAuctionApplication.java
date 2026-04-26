package com.britishauction.britishauction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BritishAuctionApplication {

    public static void main(String[] args) {
        SpringApplication.run(BritishAuctionApplication.class, args);
        System.out.println("APP STARTED");
    }

}
