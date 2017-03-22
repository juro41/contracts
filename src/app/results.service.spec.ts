/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResultsService } from './results.service';

describe('ResultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultsService]
    });
  });

  it('should ...', inject([ResultsService], (service: ResultsService) => {
    expect(service).toBeTruthy();
  }));
});
