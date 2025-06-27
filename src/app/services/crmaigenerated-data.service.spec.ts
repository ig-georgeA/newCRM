import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CRMAIGeneratedDataService } from './crmaigenerated-data.service';

describe('CRMAIGeneratedDataService', () => {
  let service: CRMAIGeneratedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CRMAIGeneratedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
