export interface UrlSummaryResponseDTO {
  totalUrls: number;
  totalVisits: number;
  totalUniqueVisitors: number;
  mostVisitedUrl: string;
  mostViewerLocation: string;
}

interface ApexAxisChartData {
  count: number;
  name: string;
}

export interface UrlChartsResponseDTO {
  top3VisitsByUrl: ApexAxisChartData[];
  totalVisitorsByDevices: ApexAxisChartData[];
}
