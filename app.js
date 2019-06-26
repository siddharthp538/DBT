const express = require('express');
const unirest = require('unirest');
const crypto =  require('crypto');
const bodyParser = require('body-parser');
const Nexmo = require('nexmo');
const cors = require('cors');

const nexmo = new Nexmo({
  apiKey: 'f9c55a37',
  apiSecret: 'S9gkoR7jlxM8I5DH',
});


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.post('/token', async (req,res)=> {
    let otp = Math.floor(1000 + Math.random() * 9000);;
    console.log(otp);
    let message = req.body.beneficiaryAadhaarNo + '$' + otp;
    let hash  = crypto.createHash('sha256').update(message).digest('hex');
    let phoneNumber = 0;
    unirest.get(`http://localhost:3000/api/Beneficiary/${req.body.beneficiaryAadhaarNo}`).strictSSL(false).end(async (response) => {
      phoneNumber = '91' + response.body.beneficiaryPhoneNumber;
      console.log(phoneNumber);      
      nexmo.message.sendSms('Bhaiya Blockchains', phoneNumber, otp, (err, responseData) => {
        console.log("error is : " + err);
        if (err) {
            console.log(err);
        } else {
            console.log(responseData);
            if(responseData.messages[0]['status'] === "0") {
                let bodyToSend = {
                beneficiaryAadhaarNo : req.body.beneficiaryAadhaarNo,
                beneficiaryPhoneNumber : phoneNumber,
                tokenHash : hash
              }
              unirest.post(`http://localhost:3000/api/CalculateToken`).send(bodyToSend).strictSSL(false).end(async (response) => {
                res.status(200).send({
                  message: otp
                });
              });      
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                res.send("error occured");
            }
        }
      });
    }); 
});

app.post('/storeOTP', (req,res)=>{
  let otp = Math.floor(1000 + Math.random() * 9000);
  console.log(otp);
  try {
    let phoneNumber = '';   
    unirest.get(`http://localhost:3000/api/Beneficiary/${req.body.beneficiaryAadhaarNo}`).strictSSL(false).end(async (response) => {
      phoneNumber = response.body.beneficiaryPhoneNumber;
      console.log(response.body.beneficiaryPhoneNumber);
      console.log(phoneNumber);
      const toNumber = '91' + phoneNumber;
      console.log(toNumber);
      nexmo.message.sendSms('Bhaiya Blockchains', toNumber, otp, (err, responseData) => {
        console.log("error is : " + err);
        if (err) {
            console.log(err);
        } else {
            console.log(responseData);
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
                bodyToSend = {
                  beneficiaryAadhaarNo : req.body.beneficiaryAadhaarNo,
                  OTP : otp
                }
                unirest.post(`http://localhost:3000/api/StoreOTP`).send(bodyToSend).strictSSL(false).end(async (response) => {
                  console.log(bodyToSend);
                  res.status(200).send({
                    message: otp
                  });
                });      
            
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                res.send("error occured");
            }
        }
      });
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


    console.log("inside verify otp");
    bodyToSend = {
      beneficiaryAadhaarNo : req.body.beneficiaryAadhaarNo,
      OTP : req.body.otp
    }
    unirest.post(`http://localhost:3000/api/VerifyOTP`).send(bodyToSend).strictSSL(false).end(async (response) => {
      console.log(response.body.error);
      console.log(response.body);
      if(response.body.error){
        res.send(response.body.error);
      } 
      else{
        res.send({
          message: "ok"
        })
      }   
    });      

     
});

app.post('/otp', (req,res)=>{
  let otp = Math.floor(Math.random()*100000);
  const from =  'Ministry of Oil & Natural Gas';
  console.log(from);
  const to = '91'+req.body.phone;
  const text = otp;
  console.log(to);
  console.log(text);
  nexmo.message.sendSms('Bhaiya Blockchains', to, text, (err, responseData) => {
    console.log("error is : " + err);
    if (err) {
        console.log(err);
    } else {
        console.log(responseData);
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
            res.send("otp sent!");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            res.send("error occured");
        }
    }
  });


});

app.listen(5000, () => {
    console.log('Node server running on port 5000....');
})