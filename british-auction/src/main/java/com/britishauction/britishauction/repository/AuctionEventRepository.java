package com.britishauction.britishauction.repository;

import com.britishauction.britishauction.entity.AuctionEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionEventRepository extends JpaRepository<AuctionEvent, Long> {

    // Fetch event logs for auction (sorted)
    List<AuctionEvent> findByAuctionRoomIdOrderByTimestampDesc(Long auctionRoomId);
}
