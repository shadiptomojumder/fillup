"use client";
import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createProfileSchema } from "@/interfaces/jobProfile.schemas";
import { clearProfile, updateProfileStep } from "@/lib/slices/profileSlice";
import { RootState } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

interface PersonalInformationFormProps {
    onNext: () => void;
    onCancel: () => void;
}
const personalInfoSchema = createProfileSchema.pick({
    name: true,
    name_bn: true,
    father: true,
    father_bn: true,
    mother: true,
    mother_bn: true,
    dob: true,
    religion: true,
    gender: true,
    nid_no: true,
    marital_status: true,
    mobile: true,
    email: true,
    quota: true,
    dep_status: true,
});
type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;

export function PersonalInformationForm({ onNext, onCancel }: PersonalInformationFormProps) {
    const dispatch = useDispatch();
    const [selectedQuota, setSelectedQuota] = useState<string | undefined>(undefined);
    const { profile } = useSelector((state: RootState) => state.profile);
    console.log("Profile DOB:");

    const showQuotaDetails = selectedQuota && selectedQuota !== "8"; // Show details if any quota except "Not Applicable" is selected

    const getQuotaDetailsLabel = () => {
        switch (selectedQuota) {
            case "2":
                return "[Freedom Fighter Details] i.e, Name, Certificate No, Date etc";
            case "3":
                return "[War Heroine Details] i.e, Name, Certificate No, Date etc";
            case "4":
                return "[Physically Challenged Details] i.e, Type, Certificate No, etc";
            case "6":
                return "[Ethnic Minority Details] i.e, Community, etc";
            default:
                return "Additional Details";
        }
    };

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PersonalInfoSchema>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            name: profile.name || "",
            name_bn: profile.name_bn || "",
            father: profile.father || "",
            father_bn: profile.father_bn || "",
            mother: profile.mother || "",
            mother_bn: profile.mother_bn || "",
            dob: profile.dob ? format(parseISO(profile?.dob || ""), "yyyy-MM-dd") : "", // ✅ formatted using date-fns
            religion: profile.religion || "",
            gender: profile.gender || "",
            nid_no: profile.nid_no || "",
            marital_status: profile.marital_status || "",
            mobile: profile.mobile || "",
            email: profile.email || "",
            quota: profile.quota || "8",
            dep_status: profile.dep_status || "5",
        },
    });
    console.log("Personal info Errors:", errors);

    const onSubmit: SubmitHandler<PersonalInfoSchema> = async (data) => {
        console.log("Form data is:", data);
        // Dispatch to Redux store
        dispatch(updateProfileStep(data));
        // Proceed to next step
        onNext();
    };
    const handleCancel = () => {
        dispatch(clearProfile());
        onCancel();
    };

    // Load previous values into form on mount
    useEffect(() => {
        if (profile?.name) {
            reset({
                name: profile.name || "",
                name_bn: profile.name_bn || "",
                father: profile.father || "",
                father_bn: profile.father_bn || "",
                mother: profile.mother || "",
                mother_bn: profile.mother_bn || "",
                dob: profile.dob ? format(parseISO(profile?.dob || ""), "yyyy-MM-dd") : "", // ✅ formatted using date-fns
                religion: profile.religion || "",
                gender: profile.gender || "",
                nid_no: profile.nid_no || "",
                marital_status: profile.marital_status || "",
                mobile: profile.mobile || "",
                email: profile.email || "",
                quota: profile.quota || "8",
                dep_status: profile.dep_status || "5",
            });

            // Optional: set selectedQuota for UI logic
            setSelectedQuota(profile.quota);
        }
    }, [profile, reset]);

    return (
        <>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                    Enter your personal details in both English and Bangla where applicable.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="">
                            <Label htmlFor="name-en">
                                Full Name (English) <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("name")}
                                id="name-en"
                                placeholder="Enter your full name"
                                className="h-11 bg-gray-100"
                            />
                            <div className="h-5">
                                {errors.name && (
                                    <span className="text-xs text-red-500">
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="">
                            <Label htmlFor="name-bn">
                                Full Name (Bangla) <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("name_bn")}
                                id="name-bn"
                                placeholder="Enter your name in Bangla"
                                className="h-11 bg-gray-100"
                            />
                            <div className="h-5">
                                {errors.name_bn && (
                                    <span className="text-xs text-red-500">
                                        {errors.name_bn.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="">
                            <Label htmlFor="father-name-en">
                                Father's Name (English) <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("father")}
                                id="father-name-en"
                                placeholder="Enter father's name"
                                className="h-11 bg-gray-100"
                            />
                            <div className="h-5">
                                {errors.father && (
                                    <span className="text-xs text-red-500">
                                        {errors.father.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="">
                            <Label htmlFor="father-name-bn">
                                Father's Name (Bangla) <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("father_bn")}
                                id="father-name-bn"
                                placeholder="Enter father's name in Bangla"
                                className="h-11 bg-gray-100"
                            />
                            <div className="h-5">
                                {errors.father_bn && (
                                    <span className="text-xs text-red-500">
                                        {errors.father_bn.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="mother-name-en">
                                Mother's Name (English) <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("mother")}
                                id="mother-name-en"
                                placeholder="Enter mother's name"
                                className="h-11 bg-gray-100"
                            />
                            <div className="h-5">
                                {errors.mother && (
                                    <span className="text-xs text-red-500">
                                        {errors.mother.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="">
                            <Label htmlFor="mother-name-bn">
                                Mother's Name (Bangla) <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("mother_bn")}
                                id="mother-name-bn"
                                placeholder="Enter mother's name in Bangla"
                                className="h-11 bg-gray-100"
                            />
                            <div className="h-5">
                                {errors.mother_bn && (
                                    <span className="text-xs text-red-500">
                                        {errors.mother_bn.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="">
                            <Label htmlFor="dob">
                                Date of Birth <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("dob")}
                                id="dob"
                                type="date"
                                className="h-11 bg-gray-100"
                            />
                            <div className="h-5">
                                {errors.dob && (
                                    <span className="text-xs text-red-500">
                                        {errors.dob.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="">
                            <Label htmlFor="nid">
                                National ID Number <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("nid_no")}
                                id="nid"
                                type="number"
                                placeholder="Enter your NID number"
                                className="h-11 bg-gray-100"
                            />
                            <div className="h-5">
                                {errors.nid_no && (
                                    <span className="text-xs text-red-500">
                                        {errors.nid_no.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="">
                            <Label htmlFor="mobile">
                                Mobile Number <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("mobile")}
                                id="mobile"
                                type="number"
                                placeholder="+880 1XXX-XXXXXX"
                                className="h-11 bg-gray-100"
                            />
                            <div className="h-5">
                                {errors.mobile && (
                                    <span className="text-xs text-red-500">
                                        {errors.mobile.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="">
                            <Label htmlFor="email">
                                Email <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("email")}
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="h-11 bg-gray-100"
                            />
                            <div className="h-5">
                                {errors.email && (
                                    <span className="text-xs text-red-500">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="religion">
                                Religion <span className="text-red-500">*</span>
                            </Label>
                            <Controller
                                control={control}
                                name="religion"
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value ?? ""}>
                                        <SelectTrigger id="religion" className="h-11 bg-gray-100">
                                            <SelectValue placeholder="Select religion" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Islam</SelectItem>
                                            <SelectItem value="2">Hinduism</SelectItem>
                                            <SelectItem value="3">Buddhism</SelectItem>
                                            <SelectItem value="4">Christianity</SelectItem>
                                            <SelectItem value="5">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <div className="h-5">
                                {errors.religion && (
                                    <span className="text-xs text-red-500">
                                        {errors.religion.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">
                                Gender<span className="text-red-500">*</span>
                            </Label>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value ?? ""}>
                                        <SelectTrigger id="gender" className="h-11 bg-gray-100">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Third Gender">
                                                Third Gender
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="marital_status">
                                Marital Status<span className="text-red-500">*</span>
                            </Label>
                            <Controller
                                name="marital_status"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value ?? ""}>
                                        <SelectTrigger
                                            id="marital_status"
                                            className="h-11 bg-gray-100">
                                            <SelectValue placeholder="Select Marital Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Single">Single</SelectItem>
                                            <SelectItem value="Married">Married</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dep_status">
                                Departmental Status<span className="text-red-500">*</span>
                            </Label>
                            <Controller
                                name="dep_status"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value ?? "5"}>
                                        <SelectTrigger id="dep_status" className="h-11 bg-gray-100">
                                            <SelectValue placeholder="Select departmental status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Govt. Employee</SelectItem>
                                            <SelectItem value="2">Semi Govt. Employee</SelectItem>
                                            <SelectItem value="3">Autonomous</SelectItem>
                                            <SelectItem value="4">
                                                Departmental Candidate
                                            </SelectItem>
                                            <SelectItem value="5">Not Applicable</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="quota">
                                Quota<span className="text-red-500">*</span>
                            </Label>
                            <Controller
                                name="quota"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value ?? "8"}
                                        onValueChange={(value) => {
                                            field.onChange(value); // Update react-hook-form
                                            setSelectedQuota(value); // Update local state
                                        }}>
                                        <SelectTrigger id="quota" className="h-11 bg-gray-100">
                                            <SelectValue placeholder="Select quota" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2">
                                                Child of Freedom Fighter
                                            </SelectItem>
                                            <SelectItem value="3">
                                                Child of War Heroine (Birangana)
                                            </SelectItem>
                                            <SelectItem value="4">Physically Challenged</SelectItem>
                                            <SelectItem value="6">Ethnic Minority</SelectItem>
                                            <SelectItem value="8">Not Applicable</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            {showQuotaDetails && (
                                <div className="mt-2">
                                    <Label
                                        htmlFor="quota_details"
                                        className="text-sm text-muted-foreground">
                                        {getQuotaDetailsLabel()}
                                    </Label>
                                    <Input
                                        id="quota_details"
                                        name="quota_details"
                                        maxLength={100}
                                        className="mt-1"
                                        placeholder="Enter details"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </form>
        </>
    );
}
