export interface TBooking {
    _id: string;
    appointmentDay: string;
    patientName: string;
    phone: string;
    age: string;
    problem: string;
    status: string[];
    doctorId: string;
    createdAt: string;
}

/** Response type for fetching all bookings (without pagination) */
export interface AllBookingResponse {
    success: boolean;
    data: TBooking[];
}

/** Response type for fetching bookings with pagination */
export interface AllBookingWithPaginationResponse {
    success: boolean;
    data: {
        result: TBooking[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
}

/** Response type for fetching a single booking */
export interface SingleBookingResponse {
    success: boolean;
    data: TBooking;
}

