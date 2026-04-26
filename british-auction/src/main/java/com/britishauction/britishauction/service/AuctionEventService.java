package com.britishauction.britishauction.service;

import com.britishauction.britishauction.dto.AuctionEventDTO;

import java.util.List;

public interface AuctionEventService {
    List<AuctionEventDTO> getEvents(Long auctionId);
}
