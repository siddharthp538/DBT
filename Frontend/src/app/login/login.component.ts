import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  gasRegisterForm: FormGroup;
  govRegisterForm: FormGroup;
  
  submittedRequest = false;
  submitted = false;

  displayToggle = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

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
    });

    this.router.navigate(['/gasagencyhome']);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.gasRegisterForm.value))
    
  }

  onSubmitGov(){
    this.submitted= true;

    // stop here if form is invalid
    if (this.govRegisterForm.invalid) {
        return;
    }

    this.router.navigate(['/releasefund']);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.govRegisterForm.value))
    
  }

  toggleGas(){
    this.displayToggle = true;
  }

  toggleGov(){
    this.displayToggle = false;
  }



}


