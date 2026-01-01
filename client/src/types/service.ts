export interface Service {
    _id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    imagePublicId?: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ServiceResponse {
    statusCode: number;
    data: Service | Service[];
}
