package com.britishauction.britishauction.service;

import com.britishauction.britishauction.dto.AuctionEventDTO;
import com.britishauction.britishauction.repository.AuctionEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuctionEventImpl implements AuctionEventService {

    private final AuctionEventRepository eventRepository;

    public List<AuctionEventDTO> getEvents(Long auctionId) {

        return eventRepository
                .findByAuctionRoomIdOrderByTimestampDesc(auctionId)
                .stream()
                .map(event -> {
                    AuctionEventDTO dto = new AuctionEventDTO();
                    dto.setEventType(event.getEventType());
                    dto.setDescription(event.getDescription());
                    dto.setTimestamp(event.getTimestamp());
                    return dto;
                })
                .toList();
    }
}