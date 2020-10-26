const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const Nexmo = require('nexmo');
const Twitter = require('twitter');
 
dotenv.config();
const app = express();
app.use(bodyParser.json());
 
const port = 5000;
 
app.listen(port, () => console.log(`server started on port ${port}`));



// Credentials for using Nexmo and Twitter APIs

const nexmo = new Nexmo({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    applicationId: process.env.APPLICATION_ID,
    privateKey: './private.key'
  }, {debug: true});
   
  const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });

app.post('/userName', function(req, res) {
  userName = req.body.userName;
  app.get('/twitter', (req, res) => {
    // read most recent tweet
    var username = {screen_name: userName };
    client.get('statuses/user_timeline', username, function(error, tweets, response) {
      if (!error) {
        console.log(`most recent tweet: `, tweets[0].text);
        res.json(tweets[0].text)
      }
    });
  });
});


app.post('/sendSMS', function(req, res) {

  res.send(req.body);
  let score = req.body.score;
  let scoreSign = '';
 
  // analyze the sentiment and assign emoji
  if (score > '.5') {
    scoreSign = '✅'
  } else if (score == '.5') {
    scoreSign = '😐'
  } else {
    scoreSign = '👿'
  }
 
  //  Nexmo Messages API
  nexmo.channel.send(
    { type: 'sms', number: req.body.number }, // To
    { type: 'sms', number: process.env.NEXMO_NUMBER }, // From
    {
      content: {
        type: 'text',
        text: `${req.body.userName}'s most recent tweet was: \"\ ${req.body.tweetContent}\"\ and the sentiment score is: ${scoreSign}`,
      }
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );

});