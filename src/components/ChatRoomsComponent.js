import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChatRoomsComponent = ({ onSelectRoom }) => {
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/chatrooms')
            .then(response => {
                setChatRooms(response.data);
            })
            .catch(error => {
                console.error('Error fetching chat rooms:', error);
            });
    }, []);

    return (
        <div>
            <h1>Chat Rooms</h1>
            <ul>
                {chatRooms.map(room => (
                    <li key={room.id} onClick={() => onSelectRoom(room.id)}>
                        {room.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRoomsComponent;
