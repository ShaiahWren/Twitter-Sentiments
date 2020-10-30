import React, { Component } from 'react';
import styled from 'styled-components';
// import { Button } from 'bloomer/lib/elements/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TodayIcon from '@material-ui/icons/Today';
import Button from '@material-ui/core/Button';

import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { CardHeaderIcon, Icon, CardHeaderTitle, Image, Subtitle, Content, Media, MediaLeft, MediaContent, CardImage, Title } from 'bloomer';


import unirest from 'unirest';
import PhoneNumber from './PhoneNumber';
require('dotenv').config()

const TweetCard = styled.div`
  margin: 0 auto;
  width: 500px;
  min-height: 500px;
`


class SentimentCalculate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tweetContent: props.text,
      // name: props.user.name,
      userName: props.userName,
      score: '',
      sentiment: ''
    };
  }

  calculateSentiment = (event) => {
    console.log("calculating sentiment for: ", this.props.tweetContent.text)
    event.preventDefault();
    unirest.post("https://microsoft-text-analytics1.p.rapidapi.com/sentiment")
      .header("X-RapidAPI-Host", "microsoft-text-analytics1.p.rapidapi.com")
      .header("X-RapidAPI-Key", `${process.env.REACT_APP_RAPIDAPI_KEY}`)
      .header("Content-Type", "application/json")
      .send({ "documents": [{ "language": "en", "id": "string", "text": this.props.tweetContent.text }] })
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
    if (this.props.tweetContent.text) {
      return (
        <div>
           <p><Button variant="contained" className="calculate" onClick={this.calculateSentiment}>
            Calculate
                    </Button></p>
          <TweetCard>

            <Card>
              <CardHeader>
                <CardHeaderTitle>
                  Component
</CardHeaderTitle>
                <CardHeaderIcon>
                  <Icon className="fa fa-angle-down" />
                </CardHeaderIcon>
              </CardHeader>
              <CardImage>
                <Image isRatio='3:4' src={this.props.tweetContent.user.profile_banner_url} />
              </CardImage>
              <CardContent>
                <Media>
                  <MediaLeft>
                    <Image isSize='20x20' src={this.props.tweetContent.user.profile_image_url_https} />
                  </MediaLeft>
                  <MediaLeft>
                  
                  </MediaLeft>
                  <MediaContent>
                    <Title isSize={4}>{this.props.tweetContent.user.name}</Title>
                    <Subtitle isSize={6}>{`"${this.props.tweetContent.user.description}" `}</Subtitle>
                    <Subtitle isSize={6}>{`@${this.props.tweetContent.user.screen_name} `}<br></br><LocationOnIcon/>{this.props.tweetContent.user.location}  <FavoriteIcon/>{this.props.tweetContent.user.favourites_count}<br></br><SupervisedUserCircleIcon/>{this.props.tweetContent.user.followers_count}<br></br><TodayIcon/>{this.props.tweetContent.user.created_at}.</Subtitle>
                   

                  </MediaContent>
                </Media>

                <Media>
                  <MediaLeft>
                  </MediaLeft>
                  <MediaContent>
                    

                  </MediaContent>
                </Media>

                <Content>
                {this.props.tweetContent.text}
                  <br />
                  <small>{this.props.tweetContent.created_at}</small>
                </Content>
              </CardContent>
            </Card>
          </TweetCard>

          
          

         
        </div>
      )
    }
  }


  render() {
    return (
      <>
        <div>




          <p>{this.showTweet()}</p>

          <p>{this.state.score && `Sentiment score: ${this.state.score}`}</p>
          <p>{this.state.sentiment && `Plain text: ${this.state.sentiment}`}</p>
          {/* <PhoneNumber score={this.state.score} tweetContent={this.props.tweetContent} userName={this.props.userName} /> */}
        </div>


      </>
    )
  };
}
export default SentimentCalculate;