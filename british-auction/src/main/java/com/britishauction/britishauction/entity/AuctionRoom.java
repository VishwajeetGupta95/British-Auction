package com.britishauction.britishauction.entity;
import com.britishauction.britishauction.enums.AuctionStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "auction_room",
        indexes = {
                @Index(name = "idx_bid_close_time", columnList = "bidCloseTime"),
                @Index(name = "idx_forced_close_time", columnList = "forcedCloseTime")
        }
)
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String rfqName;

    // Auction Timing

    @Column(nullable = false)
    private LocalDateTime bidStartTime;
    @Column(nullable = false)
    private LocalDateTime bidCloseTime;
    @Column(nullable = false)
    private LocalDateTime forcedCloseTime;

    // Extension Config (from doc)
    @Column(nullable = false)
    private Integer triggerWindow;// X minutes

    @Column(nullable = false)
    private Integer extensionDuration;  // Y minutes

    // Trigger Types
    private Boolean bidTriggerEnabled;
    private Boolean rankChangeTrigger;
    private Boolean l1ChangeTrigger;

    // Status
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AuctionStatus status;

    // Relationships
    @OneToMany(mappedBy = "auctionRoom", cascade = CascadeType.ALL)
    private List<Bid> bids;

    // Optional: activity logs
    @OneToMany(mappedBy = "auctionRoom", cascade = CascadeType.ALL)
    private List<AuctionEvent> events;
}
