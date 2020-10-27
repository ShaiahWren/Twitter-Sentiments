import React from 'react';
import TwitterName from './components/TwitterName';
import styled from 'styled-components';
import './App.css';
import { Button, Label, NavbarLink, Title, NavbarMenu, Control, Field, NavbarStart, Navbar, NavbarEnd, NavbarDropdown, NavbarBrand, NavbarBurger, NavbarItem, Icon  } from 'bloomer/lib/elements/Button';
import bulma from 'bulma/css/bulma.css';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;

`



function App() {
  return (
    <div className="App">
    
      <Wrapper>
        <TwitterName />
      </Wrapper>
    </div>
  );
}

export default App;
