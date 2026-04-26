package com.britishauction.britishauction.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BidRequestDTO{

    private Long auctionRoomId;

    private String carrierName;

    private Double freightCharge;
    private Double originCharge;
    private Double destinationCharge;

    private Integer transitTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime quoteValidity;

}