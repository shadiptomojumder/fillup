import * as z from "zod";

// Regex patterns for phone number validation Bangladesh only
const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

// Nested schemas for present_address, ssc, hsc (all fields required except group_other, board_other)
const presentAddressSchema = z.object({
    careof: z.string({ required_error: "Care of is required" }),
    village: z.string({ required_error: "Village is required" }),
    district: z.string({ required_error: "District is required" }),
    upazila: z.string({ required_error: "Upazila is required" }),
    post: z.string({ required_error: "Post is required" }),
    postcode: z.string({ required_error: "Postcode is required" }),
});

const SSCSchema = z.object({
    ssc_exam: z.string({ required_error: "Exam is required" }),
    ssc_roll: z.coerce.number({ required_error: "Roll is required" }),
    ssc_group: z.string({ required_error: "Group is required" }),
    ssc_group_other: z.string().optional().nullable(),
    ssc_board: z.string({ required_error: "Board is required" }),
    ssc_board_other: z.string().optional().nullable(),
    ssc_result_type: z.string({ required_error: "Result type is required" }),
    ssc_result: z.coerce.number({ required_error: "Result is required" }).optional().nullable(),
    ssc_year: z
        .string({ required_error: "Passing year is required" })
        .nonempty({ message: "Passing year is required." }),
});

const HSCSchema = z.object({
    hsc_exam: z.string({ required_error: "Exam is required" }),
    hsc_roll: z.coerce.number({ required_error: "Roll is required" }),
    hsc_group: z.string({ required_error: "Group is required" }),
    hsc_group_other: z.string().optional().nullable(),
    hsc_board: z.string({ required_error: "Board is required" }),
    hsc_board_other: z.string().optional().nullable(),
    hsc_result_type: z.string({ required_error: "Result type is required" }),
    hsc_result: z.coerce.number({ required_error: "Result is required" }).optional().nullable(),
    hsc_year: z
        .string({ required_error: "Passing year is required" })
        .nonempty({ message: "Passing year is required." }),
});

const GratuationSchema = z.object({
    if_applicable_gra: z.coerce
        .number({ required_error: "Result is required" })
        .optional()
        .nullable(),
    gra_exam: z.string({ required_error: "Exam is required" }),
    gra_institute: z.coerce.number({ required_error: "Roll is required" }),
    gra_institute_other: z.string().optional().nullable(),
    gra_subject: z.string({ required_error: "Board is required" }),
    gra_subject_other: z.string().optional().nullable(),
    gra_result_type: z.string({ required_error: "Result type is required" }),
    gra_result: z.coerce.number({ required_error: "Result is required" }).optional().nullable(),
    gra_duration: z.coerce.number({ required_error: "Result is required" }).optional().nullable(),
    gra_year: z
        .string({ required_error: "Passing year is required" })
        .nonempty({ message: "Passing year is required." }),
});

export const createProfileSchema = z
    .object({
        userId: z
            .string({ required_error: "User ID is required" })
            .min(1, { message: "User ID cannot be empty" }),
        name: z
            .string({ required_error: "Name is required" })
            .nonempty({ message: "Name is required." })
            .min(2, { message: "Name must be at least 2 characters long." }),
        name_bn: z
            .string({ required_error: "Bangla name is required" })
            .nonempty({ message: "Bangla name is required." })
            .min(2, { message: "Bangla name must be at least 2 characters long." }),
        father: z
            .string({ required_error: "Father's name is required" })
            .nonempty({ message: "Father's name is required." })
            .min(2, { message: "Father's name must be at least 2 characters long." }),
        father_bn: z
            .string({ required_error: "Father's Bangla name is required" })
            .nonempty({ message: "Father's Bangla name is required." })
            .min(2, { message: "Father's Bangla name must be at least 2 characters long." }),
        mother: z
            .string({ required_error: "Mother's name is required" })
            .nonempty({ message: "Mother's name is required." })
            .min(2, { message: "Mother's name must be at least 2 characters long." }),
        mother_bn: z
            .string({ required_error: "Mother's Bangla name is required" })
            .nonempty({ message: "Mother's Bangla name name is required." })
            .min(2, { message: "Mother's Bangla name name must be at least 2 characters long." }),
        dob: z.coerce.date({ required_error: "Date of birth is required" }),
        religion: z
            .string({ required_error: "Religion is required" })
            .nonempty({ message: "Religion is required" }),
        gender: z
            .string({ required_error: "Gender is required" })
            .nonempty({ message: "Gender is required." }),

        nid: z.string({ required_error: "NID is required" }),
        nid_no: z
            .string({ required_error: "NID number is required" })
            .nonempty({ message: "NID number is required." })
            .min(2, { message: "NID number must be at least 2 characters long." }),
        breg: z.string().optional(), // Required if nid === "0", handle in service or with refine
        passport: z.string().optional(),

        email: z
            .string({ required_error: "Email is required." })
            .nonempty({ message: "Email is required." })
            .email({ message: "Please provide a valid email address." }),
        mobile: z
            .string({ required_error: "Mobile is required" })
            .regex(bdPhoneRegex, { message: "Mobile must be a valid Bangladeshi phone number" }),
        confirm_mobile: z
            .string({ required_error: "Confirm mobile is required" })
            .regex(bdPhoneRegex, {
                message: "Confirm mobile must be a valid Bangladeshi phone number",
            }),

        nationality: z.string({ required_error: "Nationality is required" }),

        marital_status: z.string({ required_error: "Marital status is required" }),
        quota: z.string({ required_error: "Quota is required" }),
        dep_status: z.string().optional(),

        present_address: presentAddressSchema,
    })
    .merge(SSCSchema)
    .merge(HSCSchema)
    .merge(GratuationSchema);

export type CreateProfileSchema = z.infer<typeof createProfileSchema>;

// Update schema: all fields optional, userId cannot be updated
export const updateProfileSchema = createProfileSchema.omit({ userId: true }).partial();

export interface IProfile {
    id?: string;
    userId: string;

    name: string;
    name_bn: string;
    father: string;
    father_bn: string;
    mother: string;
    mother_bn: string;
    dob: Date;
    gender: string;

    nid: string;
    nid_no?: string;

    breg?: string;
    passport?: string;

    email: string;
    mobile: string;
    confirm_mobile: string;

    nationality: string;
    religion: string;
    marital_status: string;
    quota: string;
    dep_status?: string;

    present_address: {
        careof: string;
        village: string;
        district: string;
        upazila: string;
        post: string;
        postcode: string;
    };

    ssc_exam: string;
    ssc_roll: number;
    ssc_group: string;
    ssc_group_other?: string | null;
    ssc_board: string;
    ssc_board_other?: string | null;
    ssc_result_type: string;
    ssc_result?: number | null;
    ssc_year: string;

    hsc_exam: string;
    hsc_roll: number;
    hsc_group: string;
    hsc_group_other?: string | null;
    hsc_board: string;
    hsc_board_other?: string | null;
    hsc_result_type: string;
    hsc_result?: number | null;
    hsc_year: string;

    createdAt?: Date;
    updatedAt?: Date;
}
