import React, { Component } from 'react';
 
class PhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: props.score,
      tweetContent: props.tweetContent,
      userName: props.userName,
      number: ''
    };
    this.sendSMS = this.sendSMS.bind(this);
  }
  sendSMS() {
    fetch('/sendSMS', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: this.state.number,
          score: this.props.score,
          tweetContent: this.props.tweetContent,
          userName: this.props.userName
        })
      })
     .then(res => {
        alert('Your text was successfully sent!')
      })
      .catch(function(error){ console.log(error)});
  };
  
  renderPhoneInput() {
    if (this.props.score) {
        return (
          <div>
            Phone number:
            <input
              placeholder="18005554444"
              type="tel"
              value={this.state.number}
              onChange={(e) => this.setState({ number: e.target.value})}
            />
          </div>
        );
      }
  };
  renderSendButton() {
    if (this.state.number && this.state.number.match(/\d/g).length===11) {
        return (
          <div>
            <button onClick={this.sendSMS}>
            Send the tweet’s score to my phone
            </button>
          </div>
        );
      }
  };
  
  
  render() {
    return (
      <div>
        {this.renderPhoneInput()}
        {this.renderSendButton()}
      </div>
    )
  }
 
}
export default PhoneNumber;