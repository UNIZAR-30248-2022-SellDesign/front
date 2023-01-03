import { TestBed, async } from '@angular/core/testing';
import { BarraNavegacionComponent } from './barra-navegacion.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import axios from 'axios';
import { backURI } from 'src/environments/backURI';
import { BuscadorService } from '../../services/buscador.service';

describe('BarraNavegacionComponent', () => {
  let component: BarraNavegacionComponent;
  let fixture: any;
  let router: Router;
  let route: ActivatedRoute;
  let servicio: BuscadorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarraNavegacionComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: route },
        { provide: BuscadorService, useValue: servicio }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(BarraNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    let params: Params;
    route.params.subscribe(paramsReceived => {
    params = paramsReceived;
    console.log(params);
    });
    expect(component).toBeTruthy();
  });
});