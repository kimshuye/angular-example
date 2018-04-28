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

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
      //// Get auth data, then get firestore user document || null
      this.user$ = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })
  }

    ///// Login/Signup //////
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      return this.oAuthLogin(provider);
    }
  
    private oAuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
          this.updateUserData(credential.user)
        })
    }
  
    signOut() {
      this.afAuth.auth.signOut()
    }
  
    private updateUserData(user) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const data: User = {
        uid: user.uid,
        email: user.email,
        roles: {
          subscriber: true
        }
      }
      return userRef.set(data, { merge: true })
    }

}


export interface Roles { 
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
}