import { TestBed } from '@angular/core/testing';
import { ArgumentService } from 'src/app/services/argument.service';

describe('ArgumentService', () => {
  let service: ArgumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArgumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});