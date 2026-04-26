package com.britishauction.britishauction.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs")
@Setter
@Getter
public class AuctionEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventType; // BID_PLACED, EXTENSION, CLOSED

    private String description;

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "auction_room_id")
    private AuctionRoom auctionRoom;
}
