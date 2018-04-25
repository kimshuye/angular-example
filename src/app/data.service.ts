import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSoure = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSoure.asObservable();

  constructor() { }

  changMessage(message:string){
    this.messageSoure.next(message);
  }

}
