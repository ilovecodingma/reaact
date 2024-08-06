import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const messageInputRef = useRef(null);
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    // Fetch chat rooms
    fetch('http://localhost:8080/chatrooms')
      .then(response => response.json())
      .then(data => setChatRooms(data));

    // Create a SockJS connection
    const socket = new SockJS('http://localhost:8080/ws/messages');
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      console.log('Connected: ' + frame);

      // Subscribe to the topic
      client.subscribe('/topic/public', (message) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          JSON.parse(message.body),
        ]);
      });

      setStompClient(client);
    }, (error) => {
      console.error('STOMP error: ', error);
    });

    // Clean up function when component unmounts
    return () => {
      if (client) {
        client.disconnect(() => {
          console.log('Disconnected');
        });
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && input) {
      const chatMessage = {
        sender: 'User',
        content: input,
        type: 'CHAT',
      };
      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
      setInput('');
      messageInputRef.current.focus();
    } else {
      console.error('STOMP client is not connected or input is empty.');
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <h1>STOMP WebSocket Chat</h1>
      <div>
        <h2>Chat Rooms</h2>
        <ul>
          {chatRooms.map((room) => (
            <li key={room.id}>{room.name}</li>
          ))}
        </ul>
      </div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.sender}: {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        ref={messageInputRef}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
