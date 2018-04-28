import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  usernameText: string;
  usernameAvailable: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  checkUsername() {
    this.auth.checkUsername(this.usernameText).valueChanges().subscribe(username => {
      this.usernameAvailable = !username
    })
  }

  updateUsername() {
    console.log
    this.auth.updateUsername(this.usernameText)
  }


  signInWithGoogle() {
    this.auth.googleLogin()
  }

  logout() {
    this.auth.logout();
  }

}
