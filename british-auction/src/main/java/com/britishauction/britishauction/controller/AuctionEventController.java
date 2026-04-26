package com.britishauction.britishauction.controller;

import com.britishauction.britishauction.dto.AuctionEventDTO;
import com.britishauction.britishauction.service.AuctionEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auctions")
public class AuctionEventController {

    private final AuctionEventService eventService;

    public AuctionEventController(AuctionEventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/{auctionId}/events")
    public ResponseEntity<List<AuctionEventDTO>> getEvents(
            @PathVariable Long auctionId
    ) {
        return ResponseEntity.ok(eventService.getEvents(auctionId));
    }
}