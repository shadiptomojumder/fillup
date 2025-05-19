import { z } from "zod";

// Category validation schema
export const categorySchema = z.object({
    title: z
        .string()
        .min(3, "Category title must be at least 3 characters")
        .max(50, "Category title not more than 50 characters")
        .trim(),
    logo: z.any().optional(),
    thumbnail: z.any().optional(),
});

// Full category schema (used for fetching categories from the database)
export const categoryDataSchema = categorySchema.extend({
    value: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
});

// Generate TypeScript types from the schema
export type Category = z.infer<typeof categoryDataSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;

export interface ICategory {
    title: string;
    value: string;
    logo: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
}

// Category Update Schema (to handle updates)
export const categoryUpdateSchema = categorySchema.partial().extend({
    // Allow partial updates
});
