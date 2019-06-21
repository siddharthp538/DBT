import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-gasagencyhome',
  templateUrl: './gasagencyhome.component.html',
  styleUrls: ['./gasagencyhome.component.scss']
})
export class GasagencyhomeComponent implements OnInit {

  placeOrderData = {
    
    beneficiaryAadhaarNo: '',
    gasAgencyRegistrationId:''
  }

  placeOrderOTPData = {
    beneficiaryAadhaarNo: '',
    otp:''

  }

  requestOTPData = {
    beneficiaryAadhaarNo:''
  }

  validateOTPData = {
    beneficiaryAadhaarNo: '',
    gasAgencyRegistrationId:'',
    OTP:''
  }

  requestFundsData = {
    gasAgencyRegistrationId:''
  }

  wrongOTP:boolean = false;
  OTPverified:boolean = false;
  orderSuccess:boolean = false;
  orderFailure:boolean = false; 
  displayToggle: boolean = false;
  displayPlaceOrderOTP: boolean = false;

  placeOrderForm: FormGroup;
    submitted = false;

  placeOrderOtpForm : FormGroup
    submittedOtp = false;

  requestOtpForm: FormGroup;
  submittedRequestOtp = false;

  verifyOtpForm: FormGroup;
    submittedVerifyOtp = false;

  requestFundsForm: FormGroup;
    submittedAgencyRegistrationId = false;

    updateCustomerInfoForm: FormGroup;
    submittedUpdateCustomerInfo = false;


  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {

    this.placeOrderForm = this.formBuilder.group({
      customerAadhar: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]],
      placeOrderRegId: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]]

    });

    this.placeOrderOtpForm = this.formBuilder.group({
      placeOrderOtp: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(4), Validators.maxLength(4)]]

    });

    this.requestOtpForm = this.formBuilder.group({
      aadharRequestOtp: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]]    
    });

    this.verifyOtpForm = this.formBuilder.group({
      aadharVerifyOtp: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]],
      gasAgencyOtp: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]],
      otp: ['',[ Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(4), Validators.maxLength(4)]]     
    });

    this.requestFundsForm = this.formBuilder.group({
      gasAgencyRegistrationId: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]]    
    });

    this.updateCustomerInfoForm = this.formBuilder.group({
      updateAadhar: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]]    
    });
  }

  get h() { return this.placeOrderForm.controls; }
  get c() { return this.placeOrderOtpForm.controls; }
  get g() { return this.requestOtpForm.controls; }
  get f() { return this.verifyOtpForm.controls; }
  get e() { return this.requestFundsForm.controls; }
  get d() { return this.updateCustomerInfoForm.controls; }

  onSubmitOrder(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.placeOrderForm.invalid) {
        return;
    }


    this.placeOrderData.beneficiaryAadhaarNo = this.placeOrderForm.value.customerAadhar;   
    this.placeOrderOTPData.beneficiaryAadhaarNo = this.placeOrderForm.value.customerAadhar;
    this.placeOrderData.gasAgencyRegistrationId = this.placeOrderForm.value.placeOrderRegId;
    
    
    console.log(this.placeOrderData);

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
    
    
    this.http.post('http://localhost:5000/storeOTP', JSON.stringify(this.placeOrderData), {
    headers: headers
    })
    .subscribe(data => {
    console.log(data);
    this.displayPlaceOrderOTP = true;
    
    });

    
    alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.placeOrderForm.value))
   
  }


  onSubmitPlaceOrderOtp(){
    this.submittedOtp = true;

    // stop here if form is invalid
    if (this.placeOrderOtpForm.invalid) {
        return;
    }

    this.placeOrderOTPData.otp = this.placeOrderOtpForm.value.placeOrderOtp;
    
    alert('SUCCESS OTP!! :-)\n\n' + JSON.stringify(this.placeOrderOtpForm.value))

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
    
    
    this.http.post('http://localhost:5000/VerifyOTP', JSON.stringify(this.placeOrderOTPData), {
    headers: headers
    })
    .subscribe(data => {
    console.log(data);
    if(data.statusCode == 500)
    this.wrongOTP = true;
    else
    {
      this.wrongOTP = false;
      this.OTPverified = true;
    }
    
    });

   
  }

  placeOrder(){

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
    
    
    this.http.post('http://localhost:3000/api/PlaceOrder', JSON.stringify(this.placeOrderData), {
    headers: headers
    })
    .subscribe(data => {
      console.log(data)
      this.orderSuccess = true; 
    },
    error => this.orderFailure = true
    
    );

  }

  viewOrderDetails(){
    this.http.get('http://localhost:3000/api/Beneficiary/'+this.placeOrderData.beneficiaryAadhaarNo).subscribe(data => {
      console.log(data);
    });
  }

  onSubmitRequestOtp(){
    this.submittedRequestOtp = true;

    // stop here if form is invalid
    if (this.requestOtpForm.invalid) {
        return;
    }

    this.requestOTPData.beneficiaryAadhaarNo = this.requestOtpForm.value.aadharRequestOtp;

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

    
    this.http.post('http://localhost:5000/token', JSON.stringify(this.requestOTPData), {
    headers: headers
    })
    .subscribe(data => {
    console.log(data);
    });
    

    alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.requestOtpForm.value))
    this.displayToggle= true;
   
  }

  onSubmitVerifyOtp(){
    this.submittedVerifyOtp = true;

    // stop here if form is invalid
    if (this.verifyOtpForm.invalid) {
        return;
    }

    this.validateOTPData.OTP = this.verifyOtpForm.value.otp;
    this.validateOTPData.beneficiaryAadhaarNo = this.verifyOtpForm.value.aadharVerifyOtp;
    this.validateOTPData.gasAgencyRegistrationId = this.verifyOtpForm.value.gasAgencyOtp;
    
    alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.verifyOtpForm.value))

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

    
    this.http.post('http://localhost:3000/api/VerifyToken', JSON.stringify(this.validateOTPData), {
    headers: headers
    })
    .subscribe(data => {
    console.log(data);
    });
   
     }

  onSubmitRequestFunds(){
      this.submittedAgencyRegistrationId = true;
  
      // stop here if form is invalid
      if (this.requestFundsForm.invalid) {
          return;
      }

      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
  
      this.requestFundsData.gasAgencyRegistrationId = this.requestFundsForm.value.gasAgencyRegistrationId;

      this.http.post('http://localhost:3000/api/RequestFunds', JSON.stringify(this.requestFundsData), {
      headers: headers
      })
      .subscribe(data => {
      console.log(data);
      });
      
      alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.requestFundsForm.value))
     
    }

    onSubmitCustomerInfo(){
      this.submittedUpdateCustomerInfo = true;
  
      // stop here if form is invalid
      if (this.updateCustomerInfoForm.invalid) {
          return;
      } 
      

      alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.updateCustomerInfoForm.value))
     
    }
  

}
// gasAgencyRegistrationId
// beneficiaryAadhaarNo