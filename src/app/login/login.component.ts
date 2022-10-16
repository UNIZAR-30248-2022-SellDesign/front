import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import axios from 'axios';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";

  // Possible errors:
  emptyName: boolean = false;
  emptyPassword: boolean = false;
  errors: boolean = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.errors = false;
    this.emptyName = false;
    this.emptyPassword = false;
    
    if (this.username == "") {
      this.emptyName = true;
      this.errors = true;
    }
    if (this.password == "") {
      this.emptyPassword = true;
      this.errors = true;
    }

    if (!this.errors) {
      axios.post("https://selldesign-backend.onrender.com/users/login", {
        username: this.username,
        password: this.password,
      })
        .then((res) => {
          if (res.status == 200) {
            this.router.navigate(['/mainPage']);
          }

        }).catch((error) => {
          console.log(error);
        })
    }
  }

}
