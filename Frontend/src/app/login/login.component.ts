import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  gasAgencyData:any = {
    gasAgencyRegistrationId:'',
    gasAgencyPassword:''
  }

  govtAuthData:any = {
    govAuthorityId:'',
    govAuhtorityPassword:''
  }

  wrongPasswordToggle:boolean = false;
  wrongGasIdToggle:boolean = false;

  wrongGovPasswordToggle:boolean = false;
  wrongGovIdToggle:boolean = false;

  
  gasRegisterForm: FormGroup;
  govRegisterForm: FormGroup;
  
  submittedRequest = false;
  submitted = false;

  displayToggle = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private localStorageService: DataService) { }

  

  ngOnInit() {

    this.gasRegisterForm = this.formBuilder.group({
      gasregno: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]],
      password: ['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]     
    });

    this.govRegisterForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      passwordgov: ['',[ Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]     
    });

  }

  get g() { return this.gasRegisterForm.controls; }
  get f() { return this.govRegisterForm.controls; }


  onSubmitGas(){
    this.submittedRequest = true;

    // stop here if form is invalid
    if (this.gasRegisterForm.invalid) {
        return;
    }

    this.http.get('http://localhost:3000/api/GasAgency/'+this.gasRegisterForm.value.gasregno).subscribe(data => {
      console.log(data);
      this.gasAgencyData = data;

      if(this.gasAgencyData.gasAgencyPassword == this.gasRegisterForm.value.password)
      {
      console.log(this.gasRegisterForm.value);
      this.wrongPasswordToggle = false;
      this.wrongGasIdToggle = false;
      this.localStorageService.storeOnLocalStorage(this.gasAgencyData.gasAgencyRegistrationId);
      this.router.navigate(['/gasagencyhome']);
      }
      else
      {
      console.log("NO match")
      this.wrongPasswordToggle = true;
      }
      
    },
    error => this.wrongGasIdToggle = true
    
    );

    
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.gasRegisterForm.value))
    
  }

  onSubmitGov(){
    this.submitted= true;

    // stop here if form is invalid
    if (this.govRegisterForm.invalid) {
        return;
    }

    this.http.get('http://localhost:3000/api/GovAuthority/'+this.govRegisterForm.value.username).subscribe(data => {
      console.log(data);
      this.govtAuthData = data;

      if(this.govtAuthData.govAuhtorityPassword == this.govRegisterForm.value.passwordgov)
      {
      console.log(this.govRegisterForm.value);
      this.wrongGovPasswordToggle = false;
      this.wrongGovIdToggle = false;
      this.router.navigate(['/releasefund']);
      }
      else
      {
      console.log("NO match")
      this.wrongGovPasswordToggle = true;
      }
      
    },
    error => this.wrongGovIdToggle = true
    
    );
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.govRegisterForm.value))
    
  }

  toggleGas(){
    this.displayToggle = true;
  }

  toggleGov(){
    this.displayToggle = false;
  }



}


