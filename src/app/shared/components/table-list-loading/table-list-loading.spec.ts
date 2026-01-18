import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListLoading } from './table-list-loading';

describe('TableListLoading', () => {
  let component: TableListLoading;
  let fixture: ComponentFixture<TableListLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableListLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableListLoading);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
