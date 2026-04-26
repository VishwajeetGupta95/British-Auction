package com.britishauction.britishauction.controller;

import com.britishauction.britishauction.dto.AuctionCreateDTO;
import com.britishauction.britishauction.dto.AuctionResponseDTO;
import com.britishauction.britishauction.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auctions")
@RequiredArgsConstructor
public class AuctionController {

    private final AuctionService auctionService;

    // create auction
    @PostMapping
    public ResponseEntity<AuctionResponseDTO> createAuction(
            @RequestBody AuctionCreateDTO request
    ) {
        try{
             return ResponseEntity.ok(auctionService.createAuction(request));
        } catch (Exception e) {
            e.printStackTrace(); // IMPORTANT
            throw e;
        }
    }

    // get single auction
    @GetMapping("/{id}")
    public ResponseEntity<AuctionResponseDTO> getAuction(
            @PathVariable Long id
    ) {
        try{
            return ResponseEntity.ok(auctionService.getAuction(id));
        } catch (Exception e) {
            e.printStackTrace(); // IMPORTANT
             throw e;
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<AuctionResponseDTO>> getAll() {
        return ResponseEntity.ok(auctionService.getAllAuctions());
    }

    // get all active auctions
    @GetMapping("/active")
    public ResponseEntity<List<AuctionResponseDTO>> getActive() {
        return ResponseEntity.ok(auctionService.getActiveAuctions());
    }

    @GetMapping("/scheduled")
    public ResponseEntity<List<AuctionResponseDTO>> getScheduled() {
        return ResponseEntity.ok(auctionService.getScheduledAuctions());
    }

    @GetMapping("/closed")
    public ResponseEntity<List<AuctionResponseDTO>> getClosed() {
        return ResponseEntity.ok(auctionService.getClosedAuctions());
    }

    @GetMapping("/force-closed")
    public ResponseEntity<List<AuctionResponseDTO>> getForceClosed() {
        return ResponseEntity.ok(auctionService.getForceClosedAuctions());
    }
    @GetMapping("/test")
    public String test() {
        return "OK";
    }
}