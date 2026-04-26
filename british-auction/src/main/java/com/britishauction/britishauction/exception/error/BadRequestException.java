package com.britishauction.britishauction.exception.error;

public class BadRequestException extends CustomException {

    public BadRequestException(String message) {
        super(message, 400);
    }
}
