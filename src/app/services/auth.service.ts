import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  currentUser;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {

              this.afAuth.authState.switchMap(auth => {
                  if (auth) {
                    this.currentUser = auth
                    return this.db.object<User>(`/users/${auth.uid}`).valueChanges()
                  } else return Observable.of<User>(null);
                })
                .subscribe(user => {
                    this.currentUser['username'] = user.username
                })

             }

   googleLogin() {
     const provider = new firebase.auth.GoogleAuthProvider()
     return this.afAuth.auth.signInWithPopup(provider)
       .then(() =>  console.log('successful auth'))
       .catch(error => console.log(error));
   }

   get hasUsername() {
    return this.currentUser.username ? true : false
  }
 
  checkUsername(username: string) {
    username = username.toLowerCase()
    return this.db.object<User>(`usernames/${username}`)
  }
 
  updateUsername(username: string) {
 
    let data = {}
    data[username] = this.currentUser.uid
 
    this.db.object<User>(`/users/${this.currentUser.uid}`).update({"username": username})
    this.db.object<User>(`/usernames`).update(data)
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}


export interface Roles { 
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  username: string;
  // email: string;
  // roles: Roles;
}