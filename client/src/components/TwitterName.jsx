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
          Enter a Twitter Handle and find the most recent tweet:
          <input
            placeholder="Shaiah Emigh-Doyle"
            type="text"
            value={this.state.userName}
            onChange={(e) => this.setState({ userName: e.target.value})}
          />
        </label>
          <button onClick={this.senduserName}>
            find most recent tweet
          </button>
          <SentimentCalculate tweetContent={this.state.tweetContent} userName={this.state.userName} />

        </div>
      ) 
  };


}
 
export default TwitterName;