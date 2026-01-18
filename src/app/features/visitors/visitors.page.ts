import { Component, effect, Signal, signal } from '@angular/core';
import { List } from '../../shared/components/list/list';
import { Head } from '../../shared/components/head/head';
import { Authenticated } from '../../layout/authenticated/authenticated.layout';
import { Visitor } from '../../core/data-access/visitor/visitor';
import { VisitorResponseDTO } from '../../shared/dtos/response/visitor-response.dto';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { PaginationMeta } from '../../shared/types/meta-pagination.type';
import { ConfirmDialogStore } from '../../core/stores/confirm-dialog.store';

@Component({
  selector: 'app-visitors',
  imports: [Authenticated, Head, List],
  templateUrl: './visitors.page.html'
})
export class Visitors {

  query!: ReturnType<typeof toSignal>;

  pagination = signal<PaginationMeta>({
    currentPage : 1,
    size : 10,
    totalElements : 0,
    totalPages : 1
  });

  constructor(
    private visitorApi : Visitor,
    private route : ActivatedRoute,
    private confirmDialogStore : ConfirmDialogStore
  ){
    this.query = toSignal(this.route.queryParams, { initialValue: {} });

    effect(() => {
      const query = this.query();
      this.visitorApi.fetchAllVisitors(query)
      .subscribe({
        next : val => {
          this.visitors.set(val.data);
          this.pagination.set(val.meta);
        }
      });
    });
  }

  visitors = signal<VisitorResponseDTO[]>([]);


}
