import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BarraNavegacionComponent } from './barra-navegacion.component';

describe('BarraNavegacionComponent', () => {
  let component: BarraNavegacionComponent;
  let fixture: ComponentFixture<BarraNavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [ BarraNavegacionComponent ],
  
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should instance', () => {
  //   expect(component).toBeDefined();
  //   expect(component.busqueda).toBe("");
  // });

  it('should create', () => {
    // expect(component).toBeTruthy();
    expect(component).toBeTruthy();
  });
});
