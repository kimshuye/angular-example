import { Component, OnInit , ViewChild , AfterViewInit, Input, Output } from '@angular/core';
import { DataService } from '../data.service';
// import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  // @ViewChild(ChildComponent) child;

  message:string;

  constructor(
    private data:DataService
  ) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  // ngAfterViewInit(){
  //   this.message = this.child.message;
  // }

  receiveMessage($event){
    this.message = $event;
  }

  sendMessage(){
    this.data.changMessage(this.message);
  }

}
