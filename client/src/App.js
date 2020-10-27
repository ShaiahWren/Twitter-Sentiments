import React from 'react';
import TwitterName from './components/TwitterName';
import About from './components/About';
import styled from 'styled-components';
import './App.css';
import bulma from 'bulma/css/bulma.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  min-height: 100vh;
  align-items: center;

`



function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/"> 
        <Wrapper>
          <TwitterName />
        </Wrapper>
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Router>
    </div>
  );
}

export default App;
