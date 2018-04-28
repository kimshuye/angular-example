import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ItemService {

  items:AngularFireList<Item>;
  userId:string;

  constructor(
    private db:AngularFireDatabase,
    private afAuth:AngularFireAuth    
  ) { 
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid;
    });
  }

  getItemList(): AngularFireList<Item>{
    if(!this.userId) return;
    this.items = this.db.list(`items/${this.userId}`);
    return this.items;
  }

  createItem(item:Item){
    this.items.push(item);
  }

  join(itemKey){
    const data = { [this.userId]:true};
    const members = this.db.object(`items/${itemKey}/members`);
    members.update(data);
  }

  leave(itemKey){
    const member = this.db.object(`items/${itemKey}/members/${this.userId}`);
    member.remove();
  }

}

export interface Item {
  body:string;
}
