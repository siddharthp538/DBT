import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-releasefund',
  templateUrl: './releasefund.component.html',
  styleUrls: ['./releasefund.component.scss']
})
export class ReleasefundComponent implements OnInit {

  fundReleaseForm: FormGroup;
  
  submitted = false;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.fundReleaseForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]],
      gasregno: ['',[Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]]     
    });

  }

  get f() { return this.fundReleaseForm.controls; }


  onSubmitFundRelease(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.fundReleaseForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.fundReleaseForm.value))
    
  }

 

}