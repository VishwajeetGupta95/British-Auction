package com.britishauction.britishauction.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "bid",
        indexes = {
                @Index(name = "idx_bid_auction_room", columnList = "auction_room_id"),
                @Index(name = "idx_bid_time", columnList = "bidTime")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String carrierName;

    // Pricing
    private Double freightCharge;
    private Double originCharge;
    private Double destinationCharge;

    private Integer transitTime;
    private LocalDateTime quoteValidity;

    private LocalDateTime bidTime;

    // Ranking (IMPORTANT)
    private Integer rank;

    // Relationship
    @ManyToOne
    @JoinColumn(name = "auction_room_id")
    private AuctionRoom auctionRoom;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;
}