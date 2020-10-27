import React, { Component } from 'react';
import SentimentCalculate from './SentimentCalculate';
 
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
      body: JSON.stringify({userName: this.state.userName})
    })
    this.getTweet()
  }

  getTweet = (event) => {
    fetch('/twitter')
    .then(res => res.json())
    .then(tweetContent => this.setState({tweetContent}, () => console.log('tweet fetched: ', tweetContent)))
  }



  render() {
    return (
        <div>
        <label>
          {/* <p>Enter a Twitter Handle and find the most recent tweet:</p> */}
          <input
            placeholder="@CardiBFranceFR"
            type="text"
            value={this.state.userName}
            onChange={(e) => this.setState({ userName: e.target.value})}
          />
        </label>
          <p><button onClick={this.senduserName}>
            <p>Calculate</p>
          </button></p>
          <SentimentCalculate tweetContent={this.state.tweetContent} userName={this.state.userName} />

        </div>
      ) 
  };


}
 
export default TwitterName;