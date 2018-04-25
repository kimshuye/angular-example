import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-form01',
  templateUrl: './form01.component.html',
  styleUrls: ['./form01.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class Form01Component implements OnInit {

  model = {
    firstname:"",
    lastname:""
  }

  constructor() { }

  ngOnInit() {
  }

}
