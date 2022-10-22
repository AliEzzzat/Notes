import { TestBed } from '@angular/core/testing';

import { LogtoprofileGuard } from './logtoprofile.guard';

describe('LogtoprofileGuard', () => {
  let guard: LogtoprofileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogtoprofileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
