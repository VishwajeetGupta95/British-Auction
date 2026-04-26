package com.britishauction.britishauction.service;

import com.britishauction.britishauction.dto.AuctionCreateDTO;
import com.britishauction.britishauction.dto.AuctionResponseDTO;
import com.britishauction.britishauction.dto.BidRequestDTO;
import com.britishauction.britishauction.dto.BidResponseDTO;

import java.util.List;

public interface AuctionService {

    BidResponseDTO placeBid(BidRequestDTO request);

    AuctionResponseDTO getAuction(Long auctionId);

    AuctionResponseDTO createAuction(AuctionCreateDTO dto);

    List<AuctionResponseDTO> getActiveAuctions();

    List<AuctionResponseDTO> getScheduledAuctions();

    List<AuctionResponseDTO> getClosedAuctions();

    List<AuctionResponseDTO> getForceClosedAuctions();

    List<AuctionResponseDTO> getAllAuctions();
}
