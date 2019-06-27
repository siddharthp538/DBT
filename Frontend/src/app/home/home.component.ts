import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageUrlArray = [ "assets/modi.jpg",
                  "assets/farmer.jpg",
                  "assets/blockchain.jpg",
                   "assets/ration.jpeg"]

  constructor() { }

  ngOnInit() {
  }

}
