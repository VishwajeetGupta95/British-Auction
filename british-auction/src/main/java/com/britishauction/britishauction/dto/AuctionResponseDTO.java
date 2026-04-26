package com.britishauction.britishauction.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionResponseDTO {

    private Long auctionId;
    private String rfqName;
    @JsonFormat(pattern = "yyy-MM-dd HH:mm:ss")
    private LocalDateTime bidStartTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime bidCloseTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime forcedCloseTime;

    private String status;

    private List<BidResponseDTO> bids;

    private Boolean extended;
    private String extensionReason;
}