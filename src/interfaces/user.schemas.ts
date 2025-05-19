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
