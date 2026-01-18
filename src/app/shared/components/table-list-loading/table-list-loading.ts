import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-list-loading',
  imports: [],
  templateUrl: './table-list-loading.html',
})
export class TableListLoading {
  rows: number[] = [1, 2, 3, 4, 5];
  columns: number[] = [1, 2, 3, 4, 5];
}
