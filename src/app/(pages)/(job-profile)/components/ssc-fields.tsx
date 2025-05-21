"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Controller, useWatch } from "react-hook-form";

const groupOptionsMap: Record<string, { label: string; value: string }[]> = {
    "1": [
        { label: "Science", value: "1" },
        { label: "Humanities", value: "2" },
        { label: "Business Studies", value: "3" },
        { label: "General", value: "4" },
        { label: "Other", value: "99" },
    ],
    "2": [
        { label: "Science", value: "1" },
        { label: "Humanities", value: "2" },
        { label: "Business Studies", value: "3" },
        { label: "General", value: "4" },
        { label: "Other", value: "99" },
    ],
    "3": [
        { label: "Agro-Based Food", value: "11" },
        { label: "Architectural Drafting with CAD", value: "12" },
        { label: "Automotive", value: "13" },
        { label: "Building Maintenance", value: "14" },
        { label: "Ceramic", value: "15" },
        { label: "Civil Construction", value: "16" },
        { label: "Civil Drafting with CAD", value: "17" },
        { label: "Computer and Information Technology", value: "18" },
        { label: "Dress Making", value: "19" },
        { label: "Dyeing, Printing and Finishing", value: "20" },
        { label: "Electrical Maintenance Works", value: "21" },
        { label: "Farm Machinery", value: "22" },
        { label: "Fish Culture and Breeding", value: "23" },
        { label: "Food Processing and Preservation", value: "24" },
        { label: "Fruit and Vegetable Cultivation", value: "25" },
        { label: "General Electrical Works", value: "26" },
        { label: "General Electronics", value: "27" },
        { label: "General Mechanics", value: "28" },
        { label: "Glass", value: "29" },
        { label: "Knitting", value: "33" },
        { label: "Livestock Rearing and Farming", value: "30" },
        { label: "Machine Tools Operation", value: "31" },
        { label: "Mechanical Drafting with CAD", value: "32" },
        { label: "Patient Care Technique", value: "34" },
        { label: "Plumbing and Pipe Fittings", value: "35" },
        { label: "Poultry Rearing and Farming", value: "36" },
        { label: "Refrigeration and Air Conditioning", value: "37" },
        { label: "Shrimp Culture and Breeding", value: "38" },
        { label: "Welding and Fabrication", value: "39" },
        { label: "Wood Working", value: "40" },
        { label: "Other", value: "99" },
    ],
    "4": [
        { label: "Science", value: "1" },
        { label: "Humanities", value: "2" },
        { label: "Business Studies", value: "3" },
        { label: "General", value: "4" },
        { label: "Other", value: "99" },
    ],
    "5": [
        { label: "Science", value: "1" },
        { label: "Humanities", value: "2" },
        { label: "Business Studies", value: "3" },
        { label: "General", value: "4" },
        { label: "Other", value: "99" },
    ],
    "6": [
        { label: "Agro-Based Food", value: "11" },
        { label: "Architectural Drafting with CAD", value: "12" },
        { label: "Automotive", value: "13" },
        { label: "Building Maintenance", value: "14" },
        { label: "Ceramic", value: "15" },
        { label: "Civil Construction", value: "16" },
        { label: "Civil Drafting with CAD", value: "17" },
        { label: "Computer and Information Technology", value: "18" },
        { label: "Dress Making", value: "19" },
        { label: "Dyeing, Printing and Finishing", value: "20" },
        { label: "Electrical Maintenance Works", value: "21" },
        { label: "Farm Machinery", value: "22" },
        { label: "Fish Culture and Breeding", value: "23" },
        { label: "Food Processing and Preservation", value: "24" },
        { label: "Fruit and Vegetable Cultivation", value: "25" },
        { label: "General Electrical Works", value: "26" },
        { label: "General Electronics", value: "27" },
        { label: "General Mechanics", value: "28" },
        { label: "Glass", value: "29" },
        { label: "Knitting", value: "33" },
        { label: "Livestock Rearing and Farming", value: "30" },
        { label: "Machine Tools Operation", value: "31" },
        { label: "Mechanical Drafting with CAD", value: "32" },
        { label: "Patient Care Technique", value: "34" },
        { label: "Plumbing and Pipe Fittings", value: "35" },
        { label: "Poultry Rearing and Farming", value: "36" },
        { label: "Refrigeration and Air Conditioning", value: "37" },
        { label: "Shrimp Culture and Breeding", value: "38" },
        { label: "Welding and Fabrication", value: "39" },
        { label: "Wood Working", value: "40" },
        { label: "Other", value: "99" },
    ],
};

const SSCField = ({
    register,
    errors,
    control,
    watch,
}: {
    register: any;
    errors: any;
    control: any;
    watch: any;
}) => {
    const selectedExam = useWatch({
        control,
        name: "ssc_exam",
    });

    const selectedGroup = useWatch({
        control,
        name: "ssc_group",
    });

    // Watch the SSC result type select value
    const selectedSscResultType = useWatch({
        control,
        name: "ssc_result_type",
    });
    // Determine if GPA input should show (for value "4" or "5")
    const showGpaInput = selectedSscResultType === "4" || selectedSscResultType === "5";
    return (
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
            {/* SSC EXAM TYPE */}
            <div className="">
                <Label htmlFor="ssc_exam">
                    Examination <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="ssc_exam"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                            <SelectTrigger id="ssc_exam" className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-100">
                                <SelectItem value="2">Dakhil</SelectItem>
                                <SelectItem value="1">S.S.C</SelectItem>
                                <SelectItem value="4">O Level/Cambridge</SelectItem>
                                <SelectItem value="5">S.S.C Equivalent</SelectItem>
                                <SelectItem value="3">S.S.C Vocational</SelectItem>
                                <SelectItem value="6">Dakhil Vocational</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="h-5">
                    {errors.ssc_exam && (
                        <span className="text-xs text-red-500">{errors.ssc_exam.message}</span>
                    )}
                </div>
            </div>

            {/* SSC BOARD */}
            <div className="">
                <Label htmlFor="ssc_board">
                    Board <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="ssc_board"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                            <SelectTrigger id="ssc_board" className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-100">
                                <SelectItem value="11">Barishal</SelectItem>
                                <SelectItem value="12">Chittagong</SelectItem>
                                <SelectItem value="13">Cumilla</SelectItem>
                                <SelectItem value="14">Dhaka</SelectItem>
                                <SelectItem value="15">Dinajpur</SelectItem>
                                <SelectItem value="16">Jashore</SelectItem>
                                <SelectItem value="17">Madrasah</SelectItem>
                                <SelectItem value="18">Mymensingh</SelectItem>
                                <SelectItem value="19">Rajshahi</SelectItem>
                                <SelectItem value="20">Sylhet</SelectItem>
                                <SelectItem value="21">Open University</SelectItem>
                                <SelectItem value="22">Edexcel International</SelectItem>
                                <SelectItem value="23">Cambridge International - IGCE</SelectItem>
                                <SelectItem value="24">Pharmacy Council of Bangladesh</SelectItem>
                                <SelectItem value="25">
                                    The State Medical Faculty of Bangladesh
                                </SelectItem>
                                <SelectItem value="26">
                                    Bangladesh Technical Education Board (BTEB)
                                </SelectItem>
                                <SelectItem value="99">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="h-5">
                    {errors.ssc_board && (
                        <span className="text-xs text-red-500">{errors.ssc_board.message}</span>
                    )}
                </div>
            </div>

            {/* SSC ROLL NUMBER */}
            <div className="">
                <Label htmlFor="ssc-roll">
                    Roll Number <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("ssc_roll")}
                    id="ssc-roll"
                    type="number"
                    className="h-11 bg-gray-100"
                    placeholder="123456"
                />
                <div className="h-5">
                    {errors.ssc_roll && (
                        <span className="text-xs text-red-500">{errors.ssc_roll.message}</span>
                    )}
                </div>
            </div>

            {/* SSC Result Type */}
            <section className="flex justify-between gap-5">
                <div className="w-full">
                    <Label htmlFor="ssc_result_type">
                        Result Type <span className="text-red-600">*</span>
                    </Label>
                    <Controller
                        control={control}
                        name="ssc_result_type"
                        rules={{ required: "Result type is required" }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                <SelectTrigger id="ssc_result_type" className="h-11 bg-gray-100">
                                    <SelectValue placeholder="Select result type" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-100">
                                    <SelectItem value="1">1st Division</SelectItem>
                                    <SelectItem value="2">2nd Division</SelectItem>
                                    <SelectItem value="3">3rd Division</SelectItem>
                                    <SelectItem value="4">GPA (out of 4)</SelectItem>
                                    <SelectItem value="5">GPA (out of 5)</SelectItem>
                                    <SelectItem value="6">Passed</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <div className="h-5">
                        {errors.ssc_result_type && (
                            <span className="text-xs text-red-500">
                                {errors.ssc_result_type.message}
                            </span>
                        )}
                    </div>
                </div>

                {/* Conditionally show GPA input */}
                {showGpaInput && (
                    <div className="w-[60%] sm:w-full">
                        <Label htmlFor="ssc_result">
                            Enter GPA <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            {...register("ssc_result", {
                                required: "GPA is required",
                                validate: (value: string) => {
                                    // Only validate if GPA type is selected
                                    if (["1", "2", "3", "6"].includes(watch("ssc_result_type"))) {
                                        if (!value) return "GPA is required";

                                        const num = parseFloat(value);
                                        if (isNaN(num)) return "GPA must be a number";
                                        if (num < 1 || num > 5)
                                            return "GPA must be between 1.00 and 5.00";
                                    }
                                    // No validation if GPA is not selected
                                    return true;
                                },
                            })}
                            id="ssc_result"
                            type="text"
                            className="h-11 bg-gray-100"
                            placeholder="Example '4.25','3.25'"
                        />
                        <div className="h-5">
                            {errors.ssc_result && (
                                <span className="text-xs text-red-500">
                                    {errors.ssc_result.message}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* GROUP/SUBJECT */}
            <div>
                <Label htmlFor="ssc_group">
                    Group/Subject <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="ssc_group"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value ?? ""}
                            disabled={!selectedExam}>
                            <SelectTrigger className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select group/subject" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-100">
                                {(groupOptionsMap[selectedExam ?? ""] ?? []).map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="h-5">
                    {errors.ssc_group && (
                        <span className="text-xs text-red-500">{errors.ssc_group.message}</span>
                    )}
                </div>
            </div>

            {/* SSC YEAR */}
            <div className="">
                <Label htmlFor="ssc_year">
                    Passing year <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("ssc_year")}
                    id="ssc_year"
                    type="number"
                    className="h-11 bg-gray-100"
                    placeholder="Enter year like '2000', '1998'"
                />
                <div className="h-5">
                    {errors.ssc_year && (
                        <span className="text-xs text-red-500">{errors.ssc_year.message}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SSCField;
