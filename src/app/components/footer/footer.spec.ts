import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ FooterComponent ]
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(FooterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have the Router service injected', () => {
        expect(component.router).toBeDefined();
    });
  });