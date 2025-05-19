import { User } from "./user.schemas";

// Interface representing an image file.
export interface ImageFile {
    id: string;
    file: File;
    preview: string;
    name: string;
    type: string;
}

// Interface representing API Response.
export interface APIResponse<T> {
    statusCode: number;
    success: boolean;
    message?: string | null;
    meta?: {
        page: number;
        limit: number;
        total: number;
    } | null;
    data?: T | null;
}

// Interface representing API Error.
export interface APIError {
    success: boolean;
    statusCode: number;
    message: string;
    errorMessages?: { path: string; message: string }[];
    stack?: string;
}

// Interface representing a Banner object.
export interface BannerImage {
    imageURL: string;
    public_id: string;
}

// Interface representing a login response object.
export interface LoginResponseData {
    user: User;
    accessToken: string;
}
