export interface UrlShortenRequestDTO {
  url : string;
  expirationDate?: string;
  active?: boolean
  password?: string;
}
