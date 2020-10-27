import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'bloomer/lib/elements/Button';
// import { Card } from 'bloomer/lib/elements/Card';


import unirest from 'unirest';
import PhoneNumber from './PhoneNumber';
require('dotenv').config()

const Tweet = styled.div`

`


class SentimentCalculate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweetContent: props.tweetContent,
            userName: props.userName,
            score: '',
            sentiment: ''
        };
    }

    calculateSentiment = (event) => {
        console.log("calculating sentiment for: ", this.props.tweetContent)
        event.preventDefault();
        unirest.post("https://microsoft-text-analytics1.p.rapidapi.com/sentiment")
            .header("X-RapidAPI-Host", "microsoft-text-analytics1.p.rapidapi.com")
            .header("X-RapidAPI-Key", `${process.env.REACT_APP_RAPIDAPI_KEY}`)
            .header("Content-Type", "application/json")
            .send({ "documents": [{ "language": "en", "id": "string", "text": this.props.tweetContent }] })
            .end((result) => {
                const newSentiment = result.body.documents[0].sentiment;
                const newScore = result.body.documents[0].confidenceScores[newSentiment];
                const test = result.body.documents;
                console.log("This is the test! ", test);

                console.log("The score is:", newScore)
                this.setState({ score: newScore, sentiment: newSentiment })

            });
    }

    showTweet() {
        if (this.props.tweetContent) {
            return (
                <div>
                  
                        {this.props.tweetContent}
                   
                    <p><Button onClick={this.calculateSentiment}>
                        Calculate
                    </Button></p>
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                <Tweet>
                {this.showTweet()}
                </Tweet>
                <p>{this.state.score && `Sentiment score: ${this.state.score}`}</p>
                <p>{this.state.sentiment && `Plain text: ${this.state.sentiment}`}</p>
                <PhoneNumber score={this.state.score} tweetContent={this.props.tweetContent} userName={this.props.userName} />
            </div>
        )
    };
}
export default SentimentCalculate;