const express = require('express');
const unirest = require('unirest');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/token', async (req,res)=> {
    let otp = Math.floor(100000 + Math.random() * 900000);
    otp %= 10000;
    console.log(otp)
    try {
  
      const bodyToSend = {
        apikey: 'DZ5614KZ864GAY8EYARRMSNG3UMCHYVB',
        secret: '0N05X4PUQ9WNSTWI',
        usetype: 'stage',
        phone: 8850949073,
        message: `Your One Time Password is ${otp}`,
        senderid: 'varsha'
      }
      unirest.post(`http://www.way2sms.com/api/v1/sendCampaign`).send(bodyToSend).strictSSL(false).end(async (response) => {
        console.log(bodyToSend)
      })
      return res.status(200).send({
        message: otp
      });
  
    } catch (error) {
      console.log(error.message);
      console.log(JSON.stringify(error))
      return res.status(400).send({
        message: error.message
      });
    }
});

app.listen(5000, () => {
    console.log('Node server running on port 5000....');
})