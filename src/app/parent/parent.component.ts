import { Component, OnInit , ViewChild , AfterViewInit } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements AfterViewInit {

  @ViewChild(ChildComponent) child;

  message = "Hello parent";

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.message = this.child.message;
  }

  receiveMessage($event){
    this.message = $event;
  }

}
