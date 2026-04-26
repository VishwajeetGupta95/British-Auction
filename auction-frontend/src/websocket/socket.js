import SockJS from "sockjs-client";
import { over } from "stompjs";

let stompClient = null;

export const connectSocket = (auctionId, onMessage) => {
  const socket = new SockJS("http://localhost:8081/ws-auction");
  stompClient = over(socket);

  stompClient.connect({}, () => {
    console.log("WebSocket Connected");

    stompClient.subscribe(`/topic/auction/${auctionId}`, (message) => {
      const data = JSON.parse(message.body);
      onMessage(data);
    });
  });
};

export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.disconnect();
    console.log("WebSocket Disconnected");
  }
};