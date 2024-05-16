import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './components/app/store';
import Signup from './pages/Signup';
import MainScreen from './pages/MainScreen';

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const username = localStorage.getItem('username');
  console.log('username no localStorage:', username);

  return (
    <Provider store={store}>
      <Router>
        <MainContainer>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/main" element={username ? <MainScreen /> : <Navigate to="/signup" />} />
            <Route path="*" element={<Navigate to={username ? "/main" : "/signup"} />} />
          </Routes>
        </MainContainer>
      </Router>
    </Provider>
  );
};

export default App;
