import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sibling',
  templateUrl: './sibling.component.html',
  styleUrls: ['./sibling.component.css']
})
export class SiblingComponent implements OnInit {

  message:string;

  constructor(
    private data:DataService
  ) { }

  ngOnInit() {
    this.message ="default";
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  newMessage(){
    this.data.changMessage("Hello from Sibling");
  }

}
