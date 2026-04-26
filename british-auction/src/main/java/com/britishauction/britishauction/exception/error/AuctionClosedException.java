package com.britishauction.britishauction.exception.error;

public class AuctionClosedException extends CustomException {

    public AuctionClosedException(String message) {

        super(message, 410); // Gone
    }
}
