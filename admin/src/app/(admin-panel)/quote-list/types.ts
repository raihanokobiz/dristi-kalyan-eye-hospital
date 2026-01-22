export interface Product {
    productRef: {
        _id: string;
        name: string;
        price: number;
    };
    inventoryRef: {
        _id: string;
        name?: string;
        level?: string;
    };
    quantity: number;
    price: number;
    mrpPrice: number;
}

export interface Quote {
    _id: string;
    quoteId: string;
    subTotalPrice: number;
    totalPrice: number;
    shippingCost: number;
    couponRef: string | null;
    couponDiscount: number;
    correlationId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerCity: string;
    customerAddress: string;
    customerThana?: string;
    paymentMethod: "CashOnDelivery" | "MobileBanking" | "Card";
    mobileBankingProvider?: string;
    mobileNumber?: string;
    paymentRef: string[];
    products: Product[];
    status: "OrderPlaced" | "DeliveredPending" | "Delivered" | "Cancelled" | "Hold" | "InReview";
    paymentStatus: "PENDING" | "COMPLETED" | "FAILED";
    isGuestUser: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface QuotePagination {
    page: number;
    limit: number;
    total: number;
}

export interface QuoteResponse {
    success: boolean;
    message: string;
    data: Quote;
}

export interface QuotesListResponse {
    success: boolean;
    message: string;
    data: {
        result: Quote[];
        pagination: QuotePagination;
    };
}
