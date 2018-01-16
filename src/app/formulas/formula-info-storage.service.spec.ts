import { TestBed, inject } from '@angular/core/testing';

import { FormulaInfoStorageService } from './formula-info-storage.service';

describe('FormulaInfoStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormulaInfoStorageService]
    });
  });

  it('should be created', inject([FormulaInfoStorageService], (service: FormulaInfoStorageService) => {
    expect(service).toBeTruthy();
  }));
});
