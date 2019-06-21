const express = require('express');
const unirest = require('unirest');
const crypto =  require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.post('/token', async (req,res)=> {
    let otp = Math.floor(100000 + Math.random() * 900000);
    otp %= 10000;
    let message = req.body.beneficiaryAadhaarNo + '$' + otp;
    let hash  = crypto.createHash('sha256').update(message).digest('hex');
    try {   
  
      let bodyToSend = {
        apikey: 'DZ5614KZ864GAY8EYARRMSNG3UMCHYVB',
        secret: '0N05X4PUQ9WNSTWI',
        usetype: 'stage',
        phone: req.body.beneficiaryPhoneNumber,
        message: `Your One Time Password is ${otp}`,
        senderid: 'varsha'
      }
      unirest.post(`http://www.way2sms.com/api/v1/sendCampaign`).send(bodyToSend).strictSSL(false).end(async (response) => {
        console.log(bodyToSend)
      });
      bodyToSend = {
        beneficiaryAadhaarNo : req.body.beneficiaryAadhaarNo,
        beneficiaryPhoneNumber : req.body.beneficiaryPhoneNumber,
        tokenHash : hash
      }
      unirest.post(`http://localhost:3000/api/CalculateToken`).send(bodyToSend).strictSSL(false).end(async (response) => {
        console.log(response)
      });      
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

app.post('/storeOTP', (req,res)=>{
  let otp = Math.floor(100000 + Math.random() * 900000);
  otp %= 10000;
  try {
    let phoneNumber = '';   
    unirest.get(`http://localhost:3000/api/Beneficiary/${req.body.beneficiaryAadhaarNo}`).strictSSL(false).end(async (response) => {
      phoneNumber = response.beneficiaryPhoneNumber;
      console.log(response.beneficiaryPhoneNumber);
      console.log(response.body.beneficiaryPhoneNumber);
    });
    let bodyToSend = {
      apikey: 'DZ5614KZ864GAY8EYARRMSNG3UMCHYVB',
      secret: '0N05X4PUQ9WNSTWI',
      usetype: 'stage', 
      phone: phoneNumber,
      message: `Your One Time Password is ${otp}`,
      senderid: 'varsha'
    }
    unirest.post(`http://www.way2sms.com/api/v1/sendCampaign`).send(bodyToSend).strictSSL(false).end(async (response) => {
      console.log(bodyToSend)
    });
    bodyToSend = {
      beneficiaryAadhaarNo : req.body.beneficiaryAadhaarNo,
      OTP : otp
    }
    unirest.post(`http://localhost:3000/api/StoreOTP`).send(bodyToSend).strictSSL(false).end(async (response) => {
      console.log(bodyToSend);
    });      
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


app.post('/VerifyOTP', (req,res)=>{

  try {   

    
    bodyToSend = {
      beneficiaryAadhaarNo : req.body.beneficiaryAadhaarNo,
      OTP : req.body.otp
    }
    unirest.post(`http://localhost:3000/api/VerifyOTP`).send(bodyToSend).strictSSL(false).end(async (response) => {
      console.log(bodyToSend);
    });      
    return res.status(200).send({
      message: "ok"
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