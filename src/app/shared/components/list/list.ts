import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { formatValueByColumn } from '../../utils/format-val.util';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationMeta } from '../../types/meta-pagination.type';
import { TableListLoading } from '../table-list-loading/table-list-loading';

export interface ActionButton {
  label: string;
  icon?: string;
  color?: string;
  action: (item: any) => void;
}

@Component({
  selector: 'app-list',
  imports: [CommonModule, TableListLoading],
  templateUrl: './list.html',
})
export class List implements OnChanges {
  @Input() items: any[] = [];
  @Input() actionButtons: ActionButton[] = [];
  @Input() pending: boolean = false;
  @Input() pagination: PaginationMeta = {
    currentPage: 1,
    size: 10,
    totalElements: 0,
    totalPages: 1,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  columns: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      this.generateColumns();
    }
  }

  formatVal = formatValueByColumn;

  private generateColumns() {
    if (this.items?.length) {
      // just get all keys from the first item, no filtering
      this.columns = Object.keys(this.items[0]);
    } else {
      this.columns = [];
    }
  }

  nextPage() {
    const currentPage = Number(this.route.snapshot.queryParams['page']) || 1;

    if (currentPage === this.pagination.totalPages) return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: currentPage + 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  previousPage() {
    const currentPage = Number(this.route.snapshot.queryParams['page']) || 1;

    if (currentPage - 1 < 2) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: undefined,
        },
        queryParamsHandling: 'merge',
      });

      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: currentPage - 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  handleButton(button: ActionButton, item: any) {
    button.action(item);
  }

  formatColumn(col: string): string {
    if (!col) return '';

    return col.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str) => str.toUpperCase());
  }
}
