import { TestBed } from '@angular/core/testing';

import { AuthenticationApi } from './authentication.api';

describe('AuthenticationService', () => {
  let service: AuthenticationApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
