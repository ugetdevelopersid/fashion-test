import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email.trim()) {
      navigate('/dashboard');
    }
  };

  const handleSignUp = () => {
    navigate('/personal-info');
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">Welcome to Stylla</h1>
        
        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
        
        <div className="link">
          New user? <button onClick={handleSignUp} style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default Welcome; 