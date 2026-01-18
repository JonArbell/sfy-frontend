import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, NgApexchartsModule } from 'ng-apexcharts';
import { Head } from '../../shared/components/head/head';
import { Authenticated } from '../../layout/authenticated/authenticated.layout';
import { Dashboard as DashboardApi } from '../../core/data-access/dashboard/dashboard';
import {
  UrlChartsResponseDTO,
  UrlSummaryResponseDTO,
} from '../../shared/dtos/response/dashboard.dto';
import { environment } from '../../../environments/environment.development';
import { List } from '../../shared/components/list/list';
import { UrlResponseDTO } from '../../shared/dtos/response/url-response.dto';

@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule, CommonModule, Authenticated, Head, List],
  templateUrl: './dashboard.page.html',
})
export class Dashboard {
  BACKEND_BASE_URL = environment.backendBaseUrlAPI;

  summary = signal<UrlSummaryResponseDTO>({
    totalUrls: 0,
    totalVisits: 0,
    totalUniqueVisitors: 0,
    mostVisitedUrl: '',
    mostViewerLocation: '',
  });

  recentUrls = signal<UrlResponseDTO[]>([]);

  private chartsUrl = signal<UrlChartsResponseDTO>({
    top3VisitsByUrl: [],
    totalVisitorsByDevices: [],
  });

  chartsUrlPending = signal(true);

  test = signal<ApexAxisChartSeries>([]);

  top3VisitsSeries = computed<ApexAxisChartSeries>(() => [
    {
      name: 'Visits',
      data: this.chartsUrl().top3VisitsByUrl.map((v) => v.count),
    },
  ]);

  totalVisitorsSeries = computed(() => this.chartsUrl().totalVisitorsByDevices.map((t) => t.count));

  totalVisitorsLabels = computed(() => this.chartsUrl().totalVisitorsByDevices.map((t) => t.name));

  isRecentUrlLoading = signal(false);

  pieChartOptions: ApexChart = {
    type: 'pie',
    height: 320,
  };

  pieResponsiveOptions = [
    {
      breakpoint: 1024,
      options: {
        chart: { height: 280 },
        legend: { position: 'bottom' },
      },
    },
  ];

  chartOptions: ApexChart = {
    type: 'bar',
    height: 350,
  };

  top3VisitsXAxis = computed(() => ({
    categories: this.chartsUrl().top3VisitsByUrl.map((v) => v.name),
  }));

  xaxisOptionsTime = signal<ApexXAxis>({
    categories: [],
  });

  constructor(private dashboardApi: DashboardApi) {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardApi.fetchDashboardSummary().subscribe({
      next: (val) => this.summary.set(val.data),
    });

    this.dashboardApi.fetchDashboardRecentUrls().subscribe({
      next: (val) => this.recentUrls.set(val.data),
    });

    this.dashboardApi.fetchDashboardChart().subscribe({
      next: (val) => this.chartsUrl.set(val.data),
      complete: () => this.chartsUrlPending.set(false),
    });
  }
}
