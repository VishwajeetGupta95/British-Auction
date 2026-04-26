package com.britishauction.britishauction.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BidResponseDTO {

    private Long bidId;

    private String carrierName;

    private Double freightCharge;
    private Double originCharge;
    private Double destinationCharge;

    private Double totalCost;

    private Integer rank;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime bidTime;
}
