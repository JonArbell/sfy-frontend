import { TestBed } from '@angular/core/testing';

import { MyAccount } from './my-account.api';

describe('MyAccount', () => {
  let service: MyAccount;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAccount);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
