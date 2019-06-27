import { TestBed } from '@angular/core/testing';

import { GovtdataService } from './govtdata.service';

describe('GovtdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GovtdataService = TestBed.get(GovtdataService);
    expect(service).toBeTruthy();
  });
});
