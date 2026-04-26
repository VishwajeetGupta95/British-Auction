package com.britishauction.britishauction.controller;

import com.britishauction.britishauction.dto.BidRequestDTO;
import com.britishauction.britishauction.dto.BidResponseDTO;
import com.britishauction.britishauction.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/{id}/bids")
public class BidController {

    private final AuctionService auctionService;

    public BidController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    // place bid
    @PostMapping
    public ResponseEntity<BidResponseDTO> placeBid(
            @RequestBody BidRequestDTO request
    ) {
        try {
            return ResponseEntity.ok(
                    auctionService.placeBid(request)
            );
        } catch (Exception e) {
            e.printStackTrace(); // IMPORTANT
            throw e;
        }
    }
}
