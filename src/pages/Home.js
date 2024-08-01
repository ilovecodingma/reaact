import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Home.css'; // 스타일을 추가할 CSS 파일을 임포트합니다.

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (username && password) {
      navigate('/service'); // 로그인 성공 시 /service 페이지로 이동
    }
  };

  const handleSignup = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
  };

  return (
    <div className="home-container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
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
          <div className="button-container">
            <button type="submit" className="submit-button">Login</button>
            <button type="button" onClick={handleSignup} className="signup-button">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
