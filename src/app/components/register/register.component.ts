import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = "";
  password: string = "";
  email: string = "";
  confirmPassword: string = "";

  // Possible errors
  emptyUser: boolean = false;
  emptyMail: boolean = false;
  emptyPassword: boolean = false;
  emptyConfirm: boolean = false;

  invalidEmail: boolean = false;

  noDigits: boolean = false;
  noUpper: boolean = false;
  wrongLength: boolean = false;

  wrongConfirm: boolean = false;

  errors: boolean = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('session')) {
      this.router.navigate(['/Perfil']);
    }
  }

  validateEmail(emailToValidate: string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(emailToValidate).toLowerCase());
  }

  validatePassword(passToValidate: string) {
    var valid: true;
    if (this.password.search(/\d/) == -1 || this.password.search(/[A-Z]/) == -1 || this.password.length < 4) {

    }
  }

  register() {
    this.errors = false, this.emptyUser = false, this.emptyMail = false, this.emptyPassword = false, this.emptyConfirm = false, this.invalidEmail = false, this.noDigits = false, this.noUpper = false, this.wrongConfirm = false, this.wrongLength = false;
    //Username checks:
    // Not empty
    if (this.username == "") {
      this.emptyUser = true;
      this.errors = true;
    }
    //Email checks:
    // Not empty
    if (this.email == "") {
      this.emptyMail = true;
      this.errors = true;
    } else {
      if (!this.validateEmail(this.email)) {
        this.invalidEmail = true;
        this.errors = true;
      }
    }
    //Pass checks:
    // Not empty
    if (this.password == "") {
      this.emptyPassword = true;
      this.errors = true;
    } else {
      // Contain digits
      if (this.password.search(/\d/) == -1) {
        this.noDigits = true;
        this.errors = true;
      }
      // Contain uppercase
      if (this.password.search(/[A-Z]/) == -1) {
        this.noUpper = true;
        this.errors = true;
      }
      // Correct length
      if (this.password.length < 6 || this.password.length > 16) {
        this.wrongLength = true;
        this.errors = true;
      }
    }
    //Confirm pass checks:
    if (this.confirmPassword == "") {
      this.emptyConfirm = true;
      this.errors = true;
    } else {
      if (this.password != this.confirmPassword) {
        this.wrongConfirm = true;
        this.errors = true;
      }
    }

    if (!this.errors) {
      axios.post("https://selldesign-backend.onrender.com/users/signup", {
        username: this.username,
        email: this.email,
        password: this.password
      })
        .then((res) => {
          if (res.status == 201) {
            this.router.navigate(['/login']);
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Registro fallido");
        })
    }
  }

}
