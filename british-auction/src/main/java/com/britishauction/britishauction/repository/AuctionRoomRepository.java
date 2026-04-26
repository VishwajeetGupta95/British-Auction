package com.britishauction.britishauction.repository;

import com.britishauction.britishauction.entity.AuctionRoom;
import com.britishauction.britishauction.enums.AuctionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AuctionRoomRepository extends JpaRepository<AuctionRoom, Long> {

    // get all auctions
    List<AuctionRoom> findAll();


    Optional<AuctionRoom> findById(Long id);


    // Get all auctions by status
    List<AuctionRoom> findByStatus(AuctionStatus status);

    // Auctions that are about to close (useful for scheduler later)
    // for force close time
    List<AuctionRoom> findByStatusAndForcedCloseTimeBefore(
            AuctionStatus status,
            LocalDateTime time
    );

}
