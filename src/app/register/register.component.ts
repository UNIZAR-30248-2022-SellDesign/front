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

  constructor(public router: Router) { }

  ngOnInit(): void {
    console.log("test");
  }

  validateEmail(emailToValidate: string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(emailToValidate).toLowerCase());
  }

  register() {
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
