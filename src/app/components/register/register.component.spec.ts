import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let router: Router;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    localStorage.clear()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not redirect to Perfil without session', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to Perfil with session', () => {
    localStorage.setItem('session','session')
    spyOn(localStorage, 'getItem').and.returnValue('session');
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/Perfil']);
  });

  it('validate email -> true', () => {
    expect(component.validateEmail("a@gmail.com")).toEqual(true)
  });

  it('validate email -> false', () => {
    expect(component.validateEmail("algo")).toEqual(false)
  });

  it('register -> username, password, email should be empty', () => {
    component.username = ""
    component.password = ""
    component.email = ""
    component.confirmPassword = ""
    component.register()
    expect(component.emptyUser).toEqual(true);
    expect(component.emptyMail).toEqual(true);
    expect(component.emptyPassword).toEqual(true);
    expect(component.emptyConfirm).toEqual(true);
    expect(component.errors).toEqual(true);
  });
  

  it('register -> email is not empty but is not valid', () => {
    component.email = "agmail.com"
    component.register()
    expect(component.invalidEmail).toEqual(true)
    expect(component.errors).toEqual(true)
  });

  it('register -> password is not empty but is not valid (uppercase)', () => {
    component.password = "123456a"
    component.register()
    expect(component.noUpper).toEqual(true)
    expect(component.errors).toEqual(true)
  });

  it('register -> password is not empty but is not valid (digit)', () => {
    component.password = "AAAAAAA"
    component.register()
    expect(component.noDigits).toEqual(true)
    expect(component.errors).toEqual(true)
  });

  it('register -> password is not empty but is not valid (length)', () => {
    component.password = "1256A"
    component.register()
    expect(component.wrongLength).toEqual(true)
    expect(component.errors).toEqual(true)
  });


  it('register -> password is not empty but is not equal to confirm', () => {
    component.password = "123456A"
    component.confirmPassword = "1234456A"
    component.register()
    expect(component.wrongConfirm).toEqual(true)
    expect(component.errors).toEqual(true)
  });

  it('register -> parametros correcto', () => {
    component.password = "123456A"
    component.confirmPassword = "123456A"
    component.username = "Manuel"
    component.email = "aa@gmail.com"
    spyOn(axios,'post').and.returnValue(Promise.resolve({status:201}))
    component.register()
    expect(component.errors).toEqual(false);

  });


  it('register -> axios POST status 201', () => {
    component.password = "123456A"
    component.confirmPassword = "123456A"
    component.username = "Manuel"
    component.email = "aa@gmail.com"

    spyOn(axios, 'post').and.resolveTo({ status: 201 });
    spyOn(router, 'navigate');
    component.register()
    expect(axios.post).toHaveBeenCalledWith('https://selldesign-backend.onrender.com/users/signup', {
      username: component.username,
      email: component.email,
      password: component.password
    });
  });

  // it('register -> axios POST status != 201', () => {
  //   component.password = "123456A"
  //   component.confirmPassword = "123456A"
  //   component.username = "Manuel"
  //   component.email = "aa@gmail.com"

  //   spyOn(axios, 'post').and.returnValue(Promise.reject({response: {status: 400}}))
  //   component.register()
  //   expect(axios.post).toHaveBeenCalledWith('https://selldesign-backend.onrender.com/users/signup', {
  //     username: component.username,
  //     email: component.email,
  //     password: component.password
  //   });
  //   expect(function () {throw new Error("Registro fallido")}).toThrow('Registro fallido');
  // });

});
