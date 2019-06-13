import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageUrlArray = ["assets/farmer.jpg",
                   "assets/modi.jpg",
                   "assets/lpg.jpg",
                   "assets/ration.jpeg"]
  toggle: boolean = false;
  toggleDisplay(){
    this.toggle = !this.toggle;
  }

  constructor() { }

  ngOnInit() {
  }

}
