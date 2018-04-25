import { Component, OnInit, Input ,Output ,EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  // @Input()message:string;
  message: string;

  // @Output() messageEvent = new EventEmitter<string>();
  
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  sendMessage(){
    this.data.changMessage("Hello child");
  }

}
