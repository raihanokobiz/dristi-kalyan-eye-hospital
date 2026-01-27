export type TDoctor = {
    _id: string;
    id: string;
    name: string;
    image?: string;
    imagePublicId?: string;
    vectorImagePublicId: string;
    degree: string;
    visitingTime: string;
    phone: string;
    email?: string;
    availableDays: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[];
    consultationFee: number;
    gender: "male" | "female";
    // status: "Active" | "Inactive";
    status: boolean;
};

export type TDoctorForm = {
    name: string;
    image?: File[];
    degree: string;
    visitingTime: string;
    phone: string;
    email?: string;
    availableDays: (("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"))[];
    consultationFee: number;
    gender: "male" | "female";
    status: boolean;
};

// Response for all doctors without pagination
export type AllDoctorResponse = {
    statusCode: number;
    status: string;
    message: string;
    data: TDoctor[];
};

// Response for all doctors with pagination
export type AllDoctorWithPaginationResponse = {
    statusCode: number;
    status: string;
    message: string;
    data: {
        result: TDoctor[];
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

// Response for a single doctor
export type SingleDoctorResponse = {
    statusCode: number;
    status: string;
    message: string;
    data: TDoctor;
};
