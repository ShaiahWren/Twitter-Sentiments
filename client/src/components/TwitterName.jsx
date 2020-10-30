import React, { Component } from 'react';
import SentimentCalculate from './SentimentCalculate';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import LinearProgress from '@material-ui/core/LinearProgress';
// import Button from '@material-ui/core/Button';
import './TwitterName.css';
import Navbar from './Navbar';
import { createMuiTheme } from '@material-ui/core/styles';


const InputBox = styled.div`
  width: 100%;
  margin: auto;

  input {
    font-size: 50px;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
    border-radius: 6px;
    padding: 12px;
    border: solid 2px #073b4c;
  }
  textarea:focus, input:focus{
    outline: none;
}
  
  p {
    padding: 12px;
  }

`

const Spinner = styled.div`
  width: 500px;
  text-align: center;
  margin: 0 auto;

`

const MineTweet = styled.p`

  background-color: #FFB703;
  color: #023047;
  width: 150px;
  margin: 0 auto;
  padding: 12px;
  


`

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8ECAE6',
      main: '#FB8500',
      dark: '#FFB703',
      
      contrastText: '#023047',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const Header = styled.div`
  margin: 0 auto;
  font-size: 50px;
  color: #fb8500;

`

// const StyledButton = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     borderRadius: 3,
//     border: 0,
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   },
//   label: {
//     textTransform: 'capitalize',
//   },
// })(Button);






class TwitterName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '@MichelleObama',
      tweetContent: {},
      tweetSpinner: false
    };
  }

  senduserName = (event) => {
    event.preventDefault();

    fetch('/userName', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName: this.state.userName })
    })
    this.getTweet()
    this.setState({ userName: this.state.userName, tweetSpinner: true });
    setTimeout(() => { this.setState({ tweetSpinner: false }) }, 1000);
  }



  getTweet = (event) => {
    fetch('/twitter')
      .then(res => res.json())
      .then(tweetContent => this.setState({ tweetContent }, () => console.log('tweet fetched: ', tweetContent)))
   
  }




  render() {
    const { tweetSpinner } = this.state;
    return (
      <>
        <Navbar/>
        
        <InputBox>
          <label>
            {/* <Header>
              <h1>senTWEETments</h1>
            </Header> */}
         
            <input
              placeholder="@MichelleObama" className="inputBox"
              type="text"
              value={this.state.userName}
              onChange={(e) => this.setState({ userName: e.target.value })}
            />
          </label>
          
         <p><Button variant="contained" className="minetweet" onClick={this.senduserName} >
          Mine Tweet
        </Button></p>


          {tweetSpinner ? (
            <Spinner>
              <LinearProgress />
              </Spinner>
            
          ) : (
              <SentimentCalculate tweetContent={this.state.tweetContent} userName={this.state.userName} />
            )}
        </InputBox>
      </>
    )
  };


}

export default TwitterName;