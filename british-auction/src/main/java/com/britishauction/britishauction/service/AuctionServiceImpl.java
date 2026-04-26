package com.britishauction.britishauction.service;

import com.britishauction.britishauction.dto.AuctionCreateDTO;
import com.britishauction.britishauction.dto.AuctionResponseDTO;
import com.britishauction.britishauction.dto.BidRequestDTO;
import com.britishauction.britishauction.dto.BidResponseDTO;
import com.britishauction.britishauction.entity.AuctionEvent;
import com.britishauction.britishauction.entity.AuctionRoom;
import com.britishauction.britishauction.entity.Bid;
import com.britishauction.britishauction.enums.AuctionStatus;
import com.britishauction.britishauction.exception.error.AuctionClosedException;
import com.britishauction.britishauction.exception.error.ResourceNotFoundException;
import com.britishauction.britishauction.repository.AuctionEventRepository;
import com.britishauction.britishauction.repository.AuctionRoomRepository;
import com.britishauction.britishauction.repository.BidRepository;
import com.britishauction.britishauction.websocket.AuctionEventPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRoomRepository auctionRoomRepository;
    private final BidRepository bidRepository;
    private final AuctionEventRepository eventRepository;
    private final AuctionEventPublisher publisher;




    // place bid
    @Override
    public BidResponseDTO placeBid(BidRequestDTO request) {

        AuctionRoom auction = auctionRoomRepository.findById(request.getAuctionRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction not found"));

        LocalDateTime now = LocalDateTime.now();

        // Validation
        if (now.isAfter(auction.getForcedCloseTime())) {
            throw new AuctionClosedException("Auction is already closed");
        }

        if (now.isAfter(auction.getBidCloseTime())) {
            throw new RuntimeException("Auction bidding time is over");
        }

        // Save bid
        Bid bid = new Bid();
        bid.setCarrierName(request.getCarrierName());
        bid.setFreightCharge(request.getFreightCharge());
        bid.setOriginCharge(request.getOriginCharge());
        bid.setDestinationCharge(request.getDestinationCharge());
        bid.setTransitTime(request.getTransitTime());
        bid.setQuoteValidity(request.getQuoteValidity());
        bid.setBidTime(now);
        bid.setAuctionRoom(auction);

        bidRepository.save(bid);

        // fetch sort then rank
        List<Bid> bids = bidRepository.findByAuctionRoomId(auction.getId());

        bids.sort(Comparator.comparing(this::totalCost));

        for (int i = 0; i < bids.size(); i++) {
            bids.get(i).setRank(i + 1);
        }

        // extension logic
        boolean extended = handleExtension(auction, bids);

        // event logging
        saveEvent(auction, "BID_PLACED", "New bid by " + bid.getCarrierName());

        if (extended) {
            saveEvent(auction, "EXTENDED", "Auction time extended");
        }

        // websocket push
        AuctionResponseDTO response = buildAuctionResponse(auction, bids, extended);

        publisher.publishAuctionUpdate(auction.getId(), response);

        return mapToBidDTO(bid);
    }





    private Double totalCost(Bid bid) {
        return bid.getFreightCharge()+ bid.getDestinationCharge()+ bid.getOriginCharge();
    }





    private BidResponseDTO mapToBidDTO(Bid bid) {
        BidResponseDTO dto = new BidResponseDTO();

        dto.setBidId(bid.getId());
        dto.setCarrierName(bid.getCarrierName());
        dto.setFreightCharge(bid.getFreightCharge());
        dto.setOriginCharge(bid.getOriginCharge());
        dto.setDestinationCharge(bid.getDestinationCharge());

        dto.setTotalCost(
                bid.getFreightCharge()
                        +bid.getOriginCharge()
                        +bid.getDestinationCharge()
        );

        dto.setRank(bid.getRank());
        dto.setBidTime(bid.getBidTime());

        return dto;
    }




    private boolean handleExtension(AuctionRoom auction, List<Bid> bids) {

        LocalDateTime now = LocalDateTime.now();

        // Check a trigger window
        if (now.isBefore(auction.getBidCloseTime()
                .minusMinutes(auction.getTriggerWindow()))) {
            return false;
        }

        boolean shouldExtend = false;

        // Trigger A: any bid
        if (Boolean.TRUE.equals(auction.getBidTriggerEnabled())) {
            shouldExtend = true;
        }

        // Trigger B: rank change
        if (Boolean.TRUE.equals(auction.getRankChangeTrigger())) {
            shouldExtend = true; // simplified (can track previous state)
        }

        // Trigger C: L1 change
        if (Boolean.TRUE.equals(auction.getL1ChangeTrigger())) {
            shouldExtend = true; // improve later with previous L1 tracking
        }

        if (!shouldExtend) return false;

        LocalDateTime newTime = auction.getBidCloseTime()
                .plusMinutes(auction.getExtensionDuration());

        // 🚨 NEVER exceed forced close
        if (newTime.isAfter(auction.getForcedCloseTime())) {
            newTime = auction.getForcedCloseTime();
        }

        auction.setBidCloseTime(newTime);
        auctionRoomRepository.save(auction);

        return true;
    }



    private void saveEvent(AuctionRoom auction, String type, String desc) {

        AuctionEvent event = new AuctionEvent();
        event.setAuctionRoom(auction);
        event.setEventType(type);
        event.setDescription(desc);
        event.setTimestamp(LocalDateTime.now());

        eventRepository.save(event);
    }



    private AuctionResponseDTO buildAuctionResponse(
            AuctionRoom auction,
            List<Bid> bids,
            boolean extended
    ) {
        AuctionResponseDTO dto = new AuctionResponseDTO();

        dto.setAuctionId(auction.getId());
        dto.setRfqName(auction.getRfqName());
        dto.setBidCloseTime(auction.getBidCloseTime());
        dto.setForcedCloseTime(auction.getForcedCloseTime());
        dto.setStatus(auction.getStatus().name());
        dto.setExtended(extended);

        List<BidResponseDTO> bidDTOs = bids.stream()
                .map(this::mapToBidDTO)
                .toList();

        dto.setBids(bidDTOs);

        return dto;
    }



    @Override
    public AuctionResponseDTO createAuction(AuctionCreateDTO dto) {

        AuctionRoom auction = new AuctionRoom();

        auction.setRfqName(dto.getRfqName());
        auction.setBidStartTime(dto.getBidStartTime());
        auction.setBidCloseTime(dto.getBidCloseTime());
        auction.setForcedCloseTime(dto.getForcedCloseTime());

        auction.setTriggerWindow(dto.getTriggerWindow());
        auction.setExtensionDuration(dto.getExtensionDuration());

        auction.setBidTriggerEnabled(dto.getBidTriggerEnabled());
        auction.setRankChangeTrigger(dto.getRankChangeTrigger());
        auction.setL1ChangeTrigger(dto.getL1ChangeTrigger());
        auction.setStatus(AuctionStatus.valueOf(calculateStatus(dto).name()));


        auctionRoomRepository.save(auction);

        return buildAuctionResponse(auction, List.of(), false);
    }










    @Override
    public AuctionResponseDTO getAuction(Long auctionId) {

        AuctionRoom auction = auctionRoomRepository.findById(auctionId)
                .orElseThrow(() -> new RuntimeException("Auction not found"));

        List<Bid> bids = bidRepository.findByAuctionRoomId(auctionId);

        bids.sort(Comparator.comparing(this::totalCost));

        for (int i = 0; i < bids.size(); i++) {
            bids.get(i).setRank(i + 1);
        }

        return buildAuctionResponse(auction, bids, false);
    }



    @Override
    public List<AuctionResponseDTO> getActiveAuctions() {

        LocalDateTime now = LocalDateTime.now();

        return auctionRoomRepository.findAll().stream()
                .filter(a ->
                        !now.isBefore(a.getBidStartTime()) &&
                                now.isBefore(a.getBidCloseTime()) &&
                                now.isBefore(a.getForcedCloseTime())
                )
                .map(this::mapToDTO)
                .toList();
    }
    @Override
    public List<AuctionResponseDTO> getScheduledAuctions() {

        LocalDateTime now = LocalDateTime.now();

        return auctionRoomRepository.findAll().stream()
                .filter(a -> now.isBefore(a.getBidStartTime()))
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public List<AuctionResponseDTO> getClosedAuctions() {

        LocalDateTime now = LocalDateTime.now();

        return auctionRoomRepository.findAll().stream()
                .filter(a ->
                        now.isAfter(a.getBidCloseTime()) &&
                                now.isBefore(a.getForcedCloseTime())
                )
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public List<AuctionResponseDTO> getForceClosedAuctions() {

        LocalDateTime now = LocalDateTime.now();

        return auctionRoomRepository.findAll().stream()
                .filter(a -> now.isAfter(a.getForcedCloseTime()))
                .map(this::mapToDTO)
                .toList();
    }

    public AuctionStatus calculateStatus(AuctionCreateDTO dto) {

        LocalDateTime now = LocalDateTime.now();

        if (now.isBefore(dto.getBidStartTime())) {
            return AuctionStatus.SCHEDULED;
        }

        if (now.isAfter(dto.getForcedCloseTime())) {
            return AuctionStatus.FORCE_CLOSED;
        }

        if (now.isAfter(dto.getBidCloseTime())) {
            return AuctionStatus.CLOSED;
        }

        return AuctionStatus.ACTIVE;
    }


    private AuctionResponseDTO mapToDTO(AuctionRoom auction) {

        AuctionResponseDTO dto = new AuctionResponseDTO();

        dto.setAuctionId(auction.getId());
        dto.setRfqName(auction.getRfqName());

        dto.setBidCloseTime(auction.getBidCloseTime());
        dto.setForcedCloseTime(auction.getForcedCloseTime());

        dto.setStatus(auction.getStatus().name());

        return dto;
    }
}
