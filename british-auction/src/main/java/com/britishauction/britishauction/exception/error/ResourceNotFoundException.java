package com.britishauction.britishauction.exception.error;


public class ResourceNotFoundException extends CustomException {

    public ResourceNotFoundException(String message) {
        super(message, 404);
    }
}



