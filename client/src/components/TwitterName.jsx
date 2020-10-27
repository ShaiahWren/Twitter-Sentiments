import React, { Component } from 'react';
import SentimentCalculate from './SentimentCalculate';
import { Button } from 'bloomer/lib/elements/Button';
import styled from 'styled-components';
import bulma from 'bulma/css/bulma.css';


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



class TwitterName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      tweetContent: '',
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
    this.setState({userName: ''});
  }

  getTweet = (event) => {
    fetch('/twitter')
      .then(res => res.json())
      .then(tweetContent => this.setState({ tweetContent }, () => console.log('tweet fetched: ', tweetContent)))
  }



  render() {
    return (
      <>
        <InputBox>
          <label>
            {/* <p></p> */}
            <input
              placeholder="@CardiBFranceFR"
              type="text"
              value={this.state.userName}
              onChange={(e) => this.setState({ userName: e.target.value })}
            />
          </label>

          <p><Button className="button is-blue" onClick={this.senduserName}>
            Mine Tweets
          </Button></p>
          <SentimentCalculate tweetContent={this.state.tweetContent} userName={this.state.userName} />
        </InputBox>
      </>
    )
  };


}

export default TwitterName;