import React from 'react';
import { useNavigate } from 'react-router-dom';

const Service = () => {
  const navigate = useNavigate();

  const handleMapNavigation = () => {
    navigate('/map'); // 맵 페이지로 이동
  };

  const handleChatNavigation = () => {
    navigate('/chat'); // 채팅 페이지로 이동
  };

  return (
    <div>
      <h2>Service Page</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button onClick={handleMapNavigation}>Go to Map</button>
        <button onClick={handleChatNavigation}>Go to Chat</button>
      </div>
    </div>
  );
};

export default Service;
