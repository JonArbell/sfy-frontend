import { PaginationMeta } from "../../../shared/types/meta-pagination.type";

export interface PaginatedResponseDTO<T> {
  data : T[];
  message : string;
  meta : PaginationMeta
}
