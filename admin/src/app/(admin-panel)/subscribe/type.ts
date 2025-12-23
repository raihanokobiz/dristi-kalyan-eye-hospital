export interface TSubscribe {
  _id: string;
  email: string;
  status?: boolean;
  createdAt?: string;
}

export interface AllsubscribeResponse {
  success: boolean;
  data: TSubscribe[];
}
export interface AllsubscribeResponse {
  success: boolean;
  data: TSubscribe[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface AllSubscribeWithPaginationResponse {
  success: boolean;
  data: {
    result: TSubscribe[];
    pagination: Pagination;
  };
}
