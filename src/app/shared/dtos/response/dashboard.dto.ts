export interface UrlSummaryResponseDTO {
  totalUrls: number;
  totalVisits: number;
  totalUniqueVisitors: number;
  mostVisitedUrl: string;
  mostViewerLocation: string;
}

interface TotalVisitorsByDevices {
  count: number;
  device: string;
}

export interface UrlChartsResponseDTO {
  top3VisitsByUrl: ApexAxisChartSeries;
  totalVisitorsByDevices: TotalVisitorsByDevices[];
}
