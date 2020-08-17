import { TestBed } from '@angular/core/testing';

import { AuthNavGuardGuard } from './auth-nav-guard.guard';

describe('AuthNavGuardGuard', () => {
  let guard: AuthNavGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthNavGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
