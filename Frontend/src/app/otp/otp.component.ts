import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})

export class OtpComponent implements OnInit {

  data = {
    aadharNo:'',
    beneficiaryPhoneNumber:''
  }

  displayToggle: boolean = false;

  registerForm: FormGroup;
    submitted = false;

  requestForm: FormGroup;
    submittedRequest = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      aadhar: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]],
      otp: ['',[ Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(4), Validators.maxLength(4)]]     
    });

    this.requestForm = this.formBuilder.group({
      aadharRequest: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]],
      phone: ['',[ Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]]     
    });
  }

  get f() { return this.registerForm.controls; }
  get g() { return this.requestForm.controls; }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    

    alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.registerForm.value))
   
  }

  onSubmitRequest(){
    this.submittedRequest = true;

    // stop here if form is invalid
    if (this.requestForm.invalid) {
        return;
    }

    this.data.aadharNo = this.requestForm.value.aadharRequest;
    this.data.beneficiaryPhoneNumber = this.requestForm.value.phone;
    console.log(this.data);


    this.displayToggle= true;

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

    
    this.http.post('http://localhost:5000/token', JSON.stringify(this.requestForm.value), {
    headers: headers
    })
    .subscribe(data => {
    console.log(data);
    });


    alert('SUCCESS11!! :-)\n\n' + JSON.stringify(this.requestForm.value))
    
  }

  



}