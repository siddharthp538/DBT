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
      otp: ['',[ Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(4), Validators.maxLength(4)]]     
    });

    this.requestFundsForm = this.formBuilder.group({
      gasAgencyRegistrationId: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]]    
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

    this.displayPlaceOrderOTP = true;


    this.placeOrderData.beneficiaryAadhaarNo = this.placeOrderForm.value.customerAadhar;
    this.placeOrderData.gasAgencyRegistrationId = this.placeOrderForm.value.placeOrderRegId;
    
    
    console.log(this.placeOrderData);

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
    
    
    this.http.post('http://localhost:3000/api/PlaceOrder', JSON.stringify(this.placeOrderData), {
    headers: headers
    })
    .subscribe(data => {
    console.log(data);
    
    });

    
    alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.placeOrderForm.value))
   
  }


  onSubmitPlaceOrderOtp(){
    this.submittedOtp = true;

    // stop here if form is invalid
    if (this.placeOrderOtpForm.invalid) {
        return;
    }
    

    alert('SUCCESS OTP!! :-)\n\n' + JSON.stringify(this.placeOrderOtpForm.value))
   
  }

  onSubmitRequestOtp(){
    this.submittedRequestOtp = true;

    // stop here if form is invalid
    if (this.requestOtpForm.invalid) {
        return;
    }
    

    alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.requestOtpForm.value))
    this.displayToggle= true;
   
  }

  onSubmitVerifyOtp(){
    this.submittedVerifyOtp = true;

    // stop here if form is invalid
    if (this.verifyOtpForm.invalid) {
        return;
    }
    
    alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.verifyOtpForm.value))
   
     }

  onSubmitRequestFunds(){
      this.submittedAgencyRegistrationId = true;
  
      // stop here if form is invalid
      if (this.requestFundsForm.invalid) {
          return;
      }
      
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