package com.britishauction.britishauction.scheduler;

import com.britishauction.britishauction.dto.AuctionCreateDTO;
import com.britishauction.britishauction.dto.AuctionResponseDTO;
import com.britishauction.britishauction.dto.BidResponseDTO;
import com.britishauction.britishauction.entity.AuctionEvent;
import com.britishauction.britishauction.entity.AuctionRoom;
import com.britishauction.britishauction.entity.Bid;
import com.britishauction.britishauction.enums.AuctionStatus;
import com.britishauction.britishauction.repository.AuctionEventRepository;
import com.britishauction.britishauction.repository.AuctionRoomRepository;
import com.britishauction.britishauction.repository.BidRepository;
import com.britishauction.britishauction.websocket.AuctionEventPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AuctionScheduler {

    private final AuctionRoomRepository auctionRoomRepository;
    private final AuctionEventRepository eventRepository;
    private final AuctionEventPublisher publisher;
    private final BidRepository bidRepository;

    @Scheduled(fixedRate = 60000)
    public void updateAuctionStatus() {
        List<AuctionRoom> auctions = auctionRoomRepository.findAll();

        for (AuctionRoom auction : auctions) {
            AuctionStatus status = calculateStatus(auction);
            auction.setStatus(AuctionStatus.valueOf(status.name()));
        }

        auctionRoomRepository.saveAll(auctions);
    }

    // Runs every 5 seconds (you can tune this)
    @Scheduled(fixedRate = 5000)
    public void closeExpiredAuctions() {

        LocalDateTime now = LocalDateTime.now();

        // Get all ACTIVE auctions whose force time lesser than current time
        List<AuctionRoom> auctions =
                auctionRoomRepository.findByStatusAndForcedCloseTimeBefore(
                        AuctionStatus.ACTIVE, now
                );

        for (AuctionRoom auction : auctions) {

            if (now.isAfter(auction.getForcedCloseTime())) {

                auction.setStatus(AuctionStatus.FORCE_CLOSED);
                auctionRoomRepository.save(auction);

                //  Log event
                saveEvent(auction, "FORCE_CLOSED", "Auction force closed");

                publishFinalState(auction);
            }
        }

    }
    private void publishFinalState(AuctionRoom auction) {

        List<Bid> bids = bidRepository.findByAuctionRoomId(auction.getId());

        // Sort + rank
        bids.sort(Comparator.comparing(this::totalCost));

        for (int i = 0; i < bids.size(); i++) {
            bids.get(i).setRank(i + 1);
        }

        // Build response
        AuctionResponseDTO dto = new AuctionResponseDTO();
        dto.setAuctionId(auction.getId());
        dto.setRfqName(auction.getRfqName());
        dto.setBidCloseTime(auction.getBidCloseTime());
        dto.setForcedCloseTime(auction.getForcedCloseTime());
        dto.setStatus(auction.getStatus().name());
        dto.setExtended(false);

        List<BidResponseDTO> bidDTOs = bids.stream()
                .map(this::mapToDTO)
                .toList();

        dto.setBids(bidDTOs);

        // 📡 Broadcast
        publisher.publishAuctionUpdate(auction.getId(), dto);
    }

    public BidResponseDTO mapToDTO(Bid bid) {
        BidResponseDTO dto = new BidResponseDTO();

        dto.setBidId(bid.getId());
        dto.setCarrierName(bid.getCarrierName());
        dto.setFreightCharge(bid.getFreightCharge());
        dto.setOriginCharge(bid.getOriginCharge());
        dto.setDestinationCharge(bid.getDestinationCharge());

        dto.setTotalCost(
                totalCost(bid)
        );

        dto.setRank(bid.getRank());
        dto.setBidTime(bid.getBidTime());

        return dto;
    }

    private Double totalCost(Bid bid) {
        return bid.getDestinationCharge()+ bid.getFreightCharge() + bid.getOriginCharge();
    }

    private void saveEvent(AuctionRoom auction, String type, String desc) {

        AuctionEvent event = new AuctionEvent();
        event.setAuctionRoom(auction);
        event.setEventType(type);
        event.setDescription(desc);
        event.setTimestamp(LocalDateTime.now());

        eventRepository.save(event);
    }
    public AuctionStatus calculateStatus(AuctionRoom auction) {

        LocalDateTime now = LocalDateTime.now();

        if (now.isBefore(auction.getBidStartTime())) {
            return AuctionStatus.SCHEDULED;
        }

        if (now.isAfter(auction.getForcedCloseTime())) {
            return AuctionStatus.FORCE_CLOSED;
        }

        if (now.isAfter(auction.getBidCloseTime())) {
            return AuctionStatus.CLOSED;
        }

        return AuctionStatus.ACTIVE;
    }
}