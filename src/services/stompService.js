import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
const stompClient = Stomp.over(socket);

const connectHandler = () => {
  stompClient.connect({}, (frame) => {
    console.log('Connected: ' + frame);

    // 연결된 후에 메시지를 보낼 수 있습니다
    stompClient.send('/app/hello', {}, JSON.stringify({ 'message': 'Hello, world!' }));
  }, (error) => {
    console.error('STOMP connection error', error);
  });
};

// STOMP 클라이언트를 연결
connectHandler();

// 메시지 보내기
const sendMessage = (message) => {
  if (stompClient.connected) {
    stompClient.send('/app/hello', {}, JSON.stringify({ 'message': message }));
  } else {
    console.error('STOMP client not connected');
  }
};
