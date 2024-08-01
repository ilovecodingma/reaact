import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Service.css'; // 스타일을 추가할 CSS 파일을 임포트합니다.


const Service = () => {
  const navigate = useNavigate();

  const handleMapNavigation = () => {
    navigate('/map'); // 맵 페이지로 이동
  };

  const handleChatNavigation = () => {
    navigate('/chat'); // 채팅 페이지로 이동
  };

  return (
    <div className="service-container">
      <h2>Service Page</h2>
      <div className="button-container">
        <button className="navigation-button" onClick={handleMapNavigation}>Go to Map</button>
        <button className="navigation-button" onClick={handleChatNavigation}>Go to Chat</button>
      </div>
    </div>
  );
};

export default Service;
