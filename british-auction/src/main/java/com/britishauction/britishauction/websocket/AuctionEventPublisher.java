package com.britishauction.britishauction.websocket;

import com.britishauction.britishauction.dto.AuctionResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class AuctionEventPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public AuctionEventPublisher(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // publish the qoute
    public void publishAuctionUpdate(Long auctionId, AuctionResponseDTO data) {

        Map<String, Object> payload = new HashMap<>();
        payload.put("type", "AUCTION_UPDATE");
        payload.put("auctionId", auctionId);
        payload.put("data", data);

        messagingTemplate.convertAndSend(
                "/topic/auction/" + auctionId,
                payload
        );
    }
}
