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
public class AuctionCreateDTO {

    private String rfqName;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime bidStartTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime bidCloseTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime forcedCloseTime;

    // Config
    private Integer triggerWindow;
    private Integer extensionDuration;

    // Trigger flags
    private Boolean bidTriggerEnabled;
    private Boolean rankChangeTrigger;
    private Boolean l1ChangeTrigger;
    private String status;

}