import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../App.css';

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #DDDDDD;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  display: flex;
  width: 90%;
  max-width: 500px;
  height: auto;
  background: #fff;
  border-radius: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  color: #000000;
  font-family: 'Roboto';
  font-weight: 700;
  padding: 20px;

  @media (min-width: 768px) {
    width: 500px;
    height: 205px;
  }
`;

const Title = styled.h2`
  margin: 20px 0;
  text-align: center;
`;

const Input = styled.input`
  width: calc(100% - 40px);
  height: 32px;
  padding: 0 10px;
  margin: 0 0 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;

  &:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
`;

const Button = styled.button`
  width: 100%;
  max-width: 111px;
  height: 32px;
  background: ${props => (props.disabled ? '#ccc' : '#007bff')};
  color: #fff;
  border: none;
  border-radius: 8px;
  align-self: flex-end;
  padding: 0 10px;
  margin-top: 10px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${props => (props.disabled ? '#ccc' : '#0056b3')};
  }
`;

const Signup = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username) {
      console.log('Salvando username no localStorage:', username);
      localStorage.setItem('username', username);
      navigate('/main');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <Title>Welcome to CodeLeap Network!</Title>
        <Input
          type="text"
          placeholder="Please enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSubmit} disabled={!username}>
          Enter
        </Button>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Signup;
