import React, { Component } from 'react';
import unirest from 'unirest';
import PhoneNumber from './PhoneNumber';
require('dotenv').config()

class SentimentCalculate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweetContent: props.tweetContent,
            userName: props.userName,
            score: ''
        };
    }

    calculateSentiment = (event) => {
        console.log("calculating sentiment for: ", this.props.tweetContent)
        event.preventDefault();
        unirest.post("https://microsoft-text-analytics1.p.rapidapi.com/sentiment")
            .header("X-RapidAPI-Host", "microsoft-text-analytics1.p.rapidapi.com")
            .header("X-RapidAPI-Key", process.env.REACT_APP_RAPIDAPI_KEY)
            .header("Content-Type", "application/json")
            .send({ "documents": [{ "language": "en", "id": "string", "text": this.props.tweetContent }] })
            .end((result) => {
                const newScore = result.body.documents[0].score
                console.log("The score is:", newScore)
                this.setState({ score: newScore })
            });
    }

    showTweet() {
        if (this.props.tweetContent) {
            return (
                <div>
                    {this.props.tweetContent}
                    <button onClick={this.calculateSentiment}>
                        Calculate sentiment score
                    </button>
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                {this.showTweet()}
                {this.state.score && `Tweet's sentiment score: ${this.state.score}`}
                <PhoneNumber score={this.state.score} tweetContent={this.props.tweetContent} userName={this.props.userName} />
            </div>
        )
    };
}
export default SentimentCalculate;