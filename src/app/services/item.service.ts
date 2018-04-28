import { Injectable } from '@angular/core';

@Injectable()
export class ItemService {

  items;

  constructor() { }

}

export interface Item {
  body:string;
}
