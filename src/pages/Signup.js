import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import successAnimation from '../animations/success.json';
import '../CSS/Signup.css'; // 스타일을 추가할 CSS 파일을 임포트합니다.

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    if (username && password) {
      setIsSignedUp(true);
    }
  };

  const handleAnimationClick = () => {
    navigate('/'); // 클릭 시 로그인 페이지로 이동
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      </div>
      {isSignedUp && (
        <div
          className="animation-overlay"
          onClick={handleAnimationClick}
        >
          <Lottie options={defaultOptions} height="80%" width="80%" />
        </div>
      )}
    </div>
  );
};

export default Signup;
