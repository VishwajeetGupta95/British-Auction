package com.britishauction.britishauction.repository;

import com.britishauction.britishauction.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    // Fetch all bids of an auction
    List<Bid> findByAuctionRoomId(Long auctionRoomId);

    @Query("""
    SELECT b FROM Bid b
    WHERE b.auctionRoom.id = :auctionId
    ORDER BY (b.freightCharge + b.originCharge + b.destinationCharge) ASC
""")
    List<Bid> findSortedBids(@Param("auctionId") Long auctionId);

    @Query("""
    SELECT b FROM Bid b
    WHERE b.auctionRoom.id = :auctionId
    ORDER BY (b.freightCharge + b.originCharge + b.destinationCharge) ASC
    LIMIT 1
""")
    Optional<Bid> findLowestBid(@Param("auctionId") Long auctionId);


}
