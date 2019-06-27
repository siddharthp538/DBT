import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-gasagencyhome',
  templateUrl: './gasagencyhome.component.html',
  styleUrls: ['./gasagencyhome.component.scss']
})
export class GasagencyhomeComponent implements OnInit {

  viewOrderToggle:boolean = false;
  viewOrderData:any = {
    aadhaarNo: '',
    beneficiaryAddress: '',
    beneficiaryDistrict: '',
    beneficiaryFirstName: '',
    beneficiaryLastName: '',
    beneficiaryLocation: '',
    beneficiaryOrderHistory: ["Tue Jun 25 2019 12:04:02 GMT+0530 (IST)"],
    beneficiaryPhoneNumber: '',
    beneficiaryPincode: '',
    beneficiaryState: '',
    lastSubsidyClaim: "2019-06-25T06:30:31.502Z",
    orderStatus: "ACCEPTED",
    subsidyEntitlement: 11
  }

  dashboardData: any = {
    gasAgencyDistrict: ''
  }

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

  validateOTPData2 = {
    gasAgencyRegistrationId: '',
    beneficiaryAadhaarNo:'',
    govAuthorityId: '123456789112',
    orderPlacedID: '',
    timeOrderPlaced: ''
  }

  orderPlacedData: any = {
    transactionId:''
  }

  requestFundsData = {
    gasAgencyRegistrationId:'',
    govAuthorityId:''
  }

  OtpVerifyData:any = {
    message:''
  }

  UpdateCustomerInfoData:any ;

  titleID = '';
  wrongOTP:boolean = false;
  OTPverified:boolean = false;
  orderSuccess:boolean = false;
  orderFailure:boolean = false; 
  displayToggle: boolean = false;
  displayPlaceOrderOTP: boolean = false;
  requestFundsErrorToggle: boolean = false;
  requestFundsSuccessToggle: boolean = false;
  updateCustomerToggle: boolean = false;
  notifyGovToggle:boolean = false;
  updateCustomerSuccessToggle: boolean = false;
  tempAadharNo = '';

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

    updateCustomerInfoForm2: FormGroup;
    submittedUpdateCustomerInfo2 = false;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private localStorageService: DataService) { }

  ngOnInit() {
    this.titleID = this.localStorageService.getFromLocalStorage();
    this.http.get('http://localhost:3000/api/GasAgency/'+this.titleID).subscribe(data => {
      console.log(data)
      this.dashboardData = data;
    });

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
      Validators.minLength(12), Validators.maxLength(12)]],
      govAuthorityId: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]]    
    });

    this.updateCustomerInfoForm = this.formBuilder.group({
      updateAadhar: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]]    
    });

    this.updateCustomerInfoForm2 = this.formBuilder.group({
      updatedPhoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]] ,
      updatedPincode: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(6), Validators.maxLength(6)]] ,
      updatedAddress: ['', [Validators.required]] ,
      updatedLocation: ['', [Validators.required]] ,
      updatedDistrict: ['', [Validators.required]] ,
      updatedState: ['', [Validators.required]] 

    });
  }

  get h() { return this.placeOrderForm.controls; }
  get c() { return this.placeOrderOtpForm.controls; }
  get g() { return this.requestOtpForm.controls; }
  get f() { return this.verifyOtpForm.controls; }
  get e() { return this.requestFundsForm.controls; }
  get d() { return this.updateCustomerInfoForm.controls; }
  get i() { return this.updateCustomerInfoForm2.controls; }

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
    this.OtpVerifyData = data;
    if(this.OtpVerifyData.message == "ok")
    {
      this.wrongOTP = false;
      this.OTPverified = true;
    }
   
    else
    {
      this.wrongOTP = true;
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
      this.viewOrderData = data;
      this.viewOrderToggle = true;
      console.log(this.viewOrderData);
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

    this.validateOTPData2.beneficiaryAadhaarNo = this.verifyOtpForm.value.aadharVerifyOtp;
    this.validateOTPData2.gasAgencyRegistrationId = this.verifyOtpForm.value.gasAgencyOtp;
    
    
    alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.verifyOtpForm.value))

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

    console.log(this.validateOTPData);
    this.http.post('http://localhost:3000/api/VerifyToken', JSON.stringify(this.validateOTPData), {
    headers: headers
    })
    .subscribe(data => {
    console.log(data);
    this.orderPlacedData = data;
    this.validateOTPData2.orderPlacedID = this.orderPlacedData.transactionId;
    const time = new Date();
    this.validateOTPData2.timeOrderPlaced = time.toString();
    console.log(this.validateOTPData2);

    this.http.post('http://localhost:3000/api/NotifyGovAuthority', JSON.stringify(this.validateOTPData2), {
      headers: headers
      })
      .subscribe(data => {
      console.log(data);
      this.notifyGovToggle = true;
     });

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
      this.requestFundsData.govAuthorityId = this.requestFundsForm.value.govAuthorityId;

      this.http.post('http://localhost:3000/api/RequestFunds', JSON.stringify(this.requestFundsData), {
      headers: headers
      })
      .subscribe(data => {
      console.log(data);
      this.requestFundsSuccessToggle = true;
      this.requestFundsErrorToggle = false;
      },
      error => this.requestFundsErrorToggle = true
               
      );
      
      alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.requestFundsForm.value))
     
    }

    onSubmitCustomerInfo(){
      this.submittedUpdateCustomerInfo = true;
  
      // stop here if form is invalid
      if (this.updateCustomerInfoForm.invalid) {
          return;
      } 

      this.http.get('http://localhost:3000/api/Beneficiary/'+this.updateCustomerInfoForm.value.updateAadhar).subscribe(data => {
      console.log(data)
      this.UpdateCustomerInfoData = data;
      this.updateCustomerToggle = true;
    });
      

      alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.updateCustomerInfoForm.value))
     
    }

    onSubmitCustomerInfo2(){
      this.submittedUpdateCustomerInfo2 = true;
  
      // stop here if form is invalid
      if (this.updateCustomerInfoForm2.invalid) {
          return;
      } 

     this.UpdateCustomerInfoData.beneficiaryPhoneNumber = this.updateCustomerInfoForm2.value.updatedPhoneNumber;
     this.UpdateCustomerInfoData.beneficiaryAddress = this.updateCustomerInfoForm2.value.updatedAddress;
     this.UpdateCustomerInfoData.beneficiaryDistrict = this.updateCustomerInfoForm2.value.updatedDistrict;
     this.UpdateCustomerInfoData.beneficiaryLocation = this.updateCustomerInfoForm2.value.updatedLocation;
     this.UpdateCustomerInfoData.beneficiaryPincode = this.updateCustomerInfoForm2.value.updatedPincode;
     this.UpdateCustomerInfoData.beneficiaryState = this.updateCustomerInfoForm2.value.updatedState;
     this.tempAadharNo = this.UpdateCustomerInfoData.aadhaarNo;

     delete this.UpdateCustomerInfoData.aadhaarNo;


      console.log(this.UpdateCustomerInfoData);

      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

      this.http.put('http://localhost:3000/api/Beneficiary/'+this.tempAadharNo, JSON.stringify(this.UpdateCustomerInfoData), {
        headers: headers
        })
        .subscribe(data => {
        console.log(data);
          this.updateCustomerSuccessToggle = true;
        
        }
                 
        );


      

      alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.updateCustomerInfoForm.value))
     
    }
  

}
// gasAgencyRegistrationId
// beneficiaryAadhaarNo