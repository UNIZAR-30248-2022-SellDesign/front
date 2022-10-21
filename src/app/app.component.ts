import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'selldesign-front';
  showBar = true;
  constructor(public router: Router) {
    this.router = router;
  }

}
