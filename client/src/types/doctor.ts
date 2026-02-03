export interface Doctor {
    _id: string;
    name: string;
    email: string;
    phone: string;
    degree: string;
    image: string;
    imagePublicId?: string;
    visitingTime: string;
    consultationFee: number;
    availableDays: string[];
    gender: "male" | "female";
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface DoctorResponse {
    statusCode: number;
    data: Doctor | Doctor[];
}

export interface DoctorFilter {
    day: string;
}