import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.scss']
})
export class PlaceorderComponent implements OnInit {


  placeOrderForm: FormGroup;
    submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.placeOrderForm = this.formBuilder.group({
      customerAadhar: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(12), Validators.maxLength(12)]]  
    });
  }

  get g() { return this.placeOrderForm.controls; }

  onSubmitOrder(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.placeOrderForm.invalid) {
        return;
    }
    

    alert('SUCCESS1!! :-)\n\n' + JSON.stringify(this.placeOrderForm.value))
   
  }


  



}
