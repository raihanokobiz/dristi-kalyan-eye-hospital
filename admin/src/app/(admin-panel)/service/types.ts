export type TService = {
    _id?: string;
    title: string;
    description: string;
    price: number;
    image?: string;
    imagePublicId?: string;
    slug?: string;
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
};

// Response for all services without pagination
export type AllServiceResponse = {
    statusCode: number;
    status: string;
    message: string;
    data: TService[];
};

// Response for all services with pagination
export type AllServiceWithPaginationResponse = {
    statusCode: number;
    status: string;
    message: string;
    data: {
        result: TService[];
        pagination: {
            currentPage: number;
            currentPageLimit: number;
            total: number;
            totalPage: number;
            prevPage: number | null;
            prevPageLimit: number;
            nextPage: number | null;
            nextPageLimit: number;
        };
    };
};

// Response for a single service
export type SingleServiceResponse = {
    statusCode: number;
    status: string;
    message: string;
    data: TService;
};
