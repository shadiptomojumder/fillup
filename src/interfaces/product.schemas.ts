import { z } from "zod";

// Product validation schema
export const productSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Product name is required" })
        .max(255, { message: "Product name must be less than 255 characters" }),

    price: z
        .number()
        .positive({ message: "Price must be a positive number" })
        .or(z.number().positive({ message: "Price must be a positive number" })),

    discount: z
        .number()
        .min(0, { message: "Discount must be between 0 and 100" })
        .max(100, { message: "Discount must be between 0 and 100" })
        .optional(), // Discount is optional

    quantity: z
        .string()
        .min(1, { message: "Quantity is required" })
        .max(50, { message: "Quantity should not exceed 50 characters" }),

    description: z
        .string()
        .max(1000, { message: "Description should not exceed 1000 characters" })
        .optional(),

    stock: z.number().min(0, { message: "Stock must be a positive number" }).optional(),

    images: z.any().optional(),

    sku: z
        .string()
        .min(1, { message: "SKU is required" })
        .max(50, { message: "SKU should not exceed 50 characters" })
        .optional(),

    isActive: z.boolean().optional(),
    isWeekendDeal: z.boolean().optional(),
    isFeatured: z.boolean().optional(),

    category: z.string().min(1, { message: "Category is required" }),
});

// Full category schema (used for fetching categories from the database)
export const productDataSchema = productSchema.extend({
    category: z.object({
        title: z.string(),
        value: z.string(),
        logo: z.string().url(),
        thumbnail: z.string().url(),
        id: z.string(),
    }),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    id: z.string(),
});

// Generate TypeScript types from the schema
export type Product = z.infer<typeof productDataSchema>;
export interface IProduct{
    id: string;
    name: string;
    price: number;
    finalPrice:number;
    discount:number;
    quantity: string;
    description:string;
    stock:number;
    images:[string];
    sku:string;
    isActive:boolean;
    isWeekendDeal:boolean;
    isFeatured:boolean;
    category: {
        value: string;
        title: string;
        logo: string;
        thumbnail: string;
        id: string;
    };
    createdAt: string;
    updatedAt: string;
}

export type ProductFormData = z.infer<typeof productSchema>;

// Product Update Schema (to handle updates)
export const productUpdateSchema = productSchema.partial().extend({
    // Allow partial updates
});
