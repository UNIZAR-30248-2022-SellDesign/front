import { async, TestBed,ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import axios from 'axios';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let router: Router;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home on ngOnInit if session exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('session');
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not navigate on ngOnInit if session does not exist', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should set emptyName to true and errors to true if username is empty', () => {
    component.username = '';
    component.password = 'password';
    component.login();
    expect(component.emptyName).toEqual(true);
    expect(component.errors).toEqual(true);
  });

  it('login -> parametros correcto', () => {
    component.password = "123456A"
    component.username = "Manuel"
    component.login()
    expect(component.errors).toEqual(false);
    expect(component.emptyPassword).toEqual(false);
  });

  it('login -> contraseña vacía', () => {
    component.password = ""
    component.username = "Manuel"
    component.login()
    expect(component.errors).toEqual(true);
    expect(component.emptyPassword).toEqual(true);
  });

  it('login -> parametros correcto', fakeAsync(() => {
    component.password = "123456A"
    component.username = "Manuel"
    
    spyOn(axios, 'post').and.resolveTo({ status: 201, data: { username: component.username,
      password: component.password} });
    spyOn(router, 'navigate');
    component.login()
    tick(500)
    expect(axios.post).toHaveBeenCalledWith('https://selldesign-backend.onrender.com/users/login', {
      username: component.username,
      password: component.password,

    });
    
    // localStorage.setItem('session', "sadfasdf")
    // localStorage.setItem('idUsuario','idUsuario')
    // localStorage.setItem('userName','userName')

  }));


});