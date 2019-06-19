import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gasagencyhome',
  templateUrl: './gasagencyhome.component.html',
  styleUrls: ['./gasagencyhome.component.scss']
})
export class GasagencyhomeComponent implements OnInit {

  displayToggle: boolean = false;

  placeOrderForm: FormGroup;
    submitted = false;

  requestOtpForm: FormGroup;
  submittedRequestOtp = false;

  verifyOtpForm: FormGroup;
    submittedVerifyOtp = false;

    requestFundsForm: FormGroup;
    submittedAgencyRegistrationId = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.placeOrderForm = this.formBuilder.group({
      customerAadhar: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]]  
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
  }

  get h() { return this.placeOrderForm.controls; }
  get g() { return this.requestOtpForm.controls; }
  get f() { return this.verifyOtpForm.controls; }
  get e() { return this.requestFundsForm.controls; }

  onSubmitOrder(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.placeOrderForm.invalid) {
        return;
    }
    
    alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.placeOrderForm.value))
   
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
  

}
