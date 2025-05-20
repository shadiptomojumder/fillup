import * as z from "zod";

// Regex patterns for phone number validation Bangladesh only
const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

const emailOrPhoneSchema = z.string().refine(
    (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || bdPhoneRegex.test(value);
    },
    {
        message: "Must be a valid email or phone number",
    },
);

export const userSchema = z.object({
    firstName: z.string().min(1).trim(),
    lastName: z.string().min(1).trim(),
    email: z.string().email().trim().toLowerCase().optional(), // optional due to sparse
    phone: z
        .string()
        .trim()
        .toLowerCase()
        .optional()
        .refine((value) => !value || bdPhoneRegex.test(value), {
            message: "Invalid Bangladeshi phone number. Use format: +8801XXXXXXXXX or 01XXXXXXXXX",
        }),
    address: z.string().trim().toLowerCase().optional(), // optional due to sparse
    googleId: z.string().trim().toLowerCase().optional(), // optional due to sparse
    role: z.enum(["USER", "ADMIN"]).default("USER"),
    avatar: z.string().optional(),
    otp: z.number().optional(),
    password: z.string().min(8), // Adjust min length as needed
    refreshToken: z.string().optional(), // refreshToken is optional.
});

// Extend the original schema with the 'id' field
export const userSchemaWithId = userSchema.extend({
    id: z.string(), // Assuming 'id' is a string. Adjust as needed (e.g., z.number(), z.number().int())
});

export type User = z.infer<typeof userSchemaWithId>;
export type UserFormData = z.infer<typeof userSchema>;

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    googleId: string;
    role: string;
    avatar: string;
    otp: number;
    refreshToken: string;
}

// Example usage and refinement for specific cases

// Signup Schema (password required, no googleId)
export const signupSchema = userSchema
    .omit({
        googleId: true,
        refreshToken: true,
        otp: true,
        avatar: true,
        role: true,
        address: true,
    })
    .extend({
        emailOrPhone: emailOrPhoneSchema.optional(),
        password: z.string().min(8),
    });

export type SignupSchema = z.infer<typeof signupSchema>;

// Login Schema (email or phone, password)
export const loginSchema = z.object({
    email: z.string().email().trim().toLowerCase().optional(), // optional due to sparse
    phone: z
        .string()
        .trim()
        .toLowerCase()
        .optional()
        .refine((value) => !value || bdPhoneRegex.test(value), {
            message: "Invalid Bangladeshi phone number. Use format: +8801XXXXXXXXX or 01XXXXXXXXX",
        }),
    emailOrPhone: emailOrPhoneSchema.optional(),
    password: z.string().min(6),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// Google Login Schema (googleId required, no password)
export const googleLoginSchema = userSchema
    .omit({
        password: true,
        refreshToken: true,
        phone: true,
        address: true,
        otp: true,
        avatar: true,
        email: true,
        role: true,
    })
    .extend({
        googleId: z.string().min(1),
    });

export type GoogleLoginSchema = z.infer<typeof googleLoginSchema>;

// Profile Update Schema (partial updates allowed)
export const profileUpdateSchema = userSchema
    .partial()
    .omit({ password: true, refreshToken: true, googleId: true });

export type ProfileUpdateSchema = z.infer<typeof profileUpdateSchema>;

// Schema for validating signup data in auth services
export const signupDataSchema = z.object({
    firstName: z
        .string({ required_error: "First name is required." })
        .nonempty({ message: "First name is required." })
        .min(2, { message: "First name must be at least 2 characters long." }),
    lastName: z
        .string({ required_error: "Last name is required." })
        .nonempty({ message: "Last name is required." })
        .min(2, { message: "Last name must be at least 2 characters long." }),
    email: z
        .string({ required_error: "Email is required." })
        .nonempty({ message: "Email is required." })
        .email({ message: "Please provide a valid email address." }),
    password: z
        .string({ required_error: "Password is required." })
        .nonempty({ message: "Password is required." })
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(64, { message: "Password must not exceed 64 characters." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[^A-Za-z0-9]/, {
            message: "Password must contain at least one special character.",
        }),
});

export type SignupDataSchema = z.infer<typeof signupDataSchema>;

// Schema for validating login data in auth services
export const loginDataSchema = z.object({
    email: z
        .string({ required_error: "Email is required." })
        .nonempty({ message: "Email is required." })
        .email({ message: "Please provide a valid email address." }),
    password: z
        .string({ required_error: "Password is required." })
        .nonempty({ message: "Password is required." })
        .min(8, { message: "Password must be at least 8 characters long." }),
});

export type LoginDataSchema = z.infer<typeof loginDataSchema>;

// User Interface
export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    jobProfiles: Array<any>;
    role: string;
    avatar: string;
    otp: number;
    refreshToken: string;
}