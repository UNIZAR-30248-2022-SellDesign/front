import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class ArgumentService {

  private argumentSource = new BehaviorSubject<String>("first");
  currentargument = this.argumentSource.asObservable();

  constructor() { }

  sendArgument(argument: String) {
    this.argumentSource.next(argument);
  }

}