import { TestBed } from '@angular/core/testing';

import { CustomProgressBarService } from './custom-progress-bar.service';

describe('CustomProgressBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomProgressBarService = TestBed.get(CustomProgressBarService);
    expect(service).toBeTruthy();
  });
});
