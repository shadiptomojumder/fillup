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
        { label: "Business Studies", value: "3" },
        { label: "General", value: "4" },
        { label: "Humanities", value: "2" },
        { label: "Science", value: "1" },
        { label: "Other", value: "99" },
    ],
    "2": [
        { label: "Business Studies", value: "3" },
        { label: "General", value: "4" },
        { label: "Humanities", value: "2" },
        { label: "Science", value: "1" },
        { label: "Other", value: "99" },
    ],
    "3": [
        { label: "Business Studies", value: "3" },
        { label: "General", value: "4" },
        { label: "Humanities", value: "2" },
        { label: "Science", value: "1" },
        { label: "Other", value: "99" },
    ],
    "4": [
        { label: "Agriculture Technology", value: "12" },
        { label: "Architecture and Interior Design Technology", value: "13" },
        { label: "Automobile Technology", value: "15" },
        { label: "Ceramic Technology", value: "48" },
        { label: "Chemical Technology", value: "21" },
        { label: "Civil Technology", value: "16" },
        { label: "Computer Science & Engineering Technology", value: "20" },
        { label: "Computer Science Technology", value: "17" },
        { label: "Data Telecommunication and Network Technology", value: "23" },
        { label: "Electrical and Electronics Technology", value: "24" },
        { label: "Electrical Technology", value: "22" },
        { label: "Electro-Medical Technology", value: "57" },
        { label: "Electronics Technology", value: "42" },
        { label: "Environmental Technology", value: "27" },
        { label: "Firm Machinery", value: "46" },
        { label: "Food Technology", value: "54" },
        { label: "Garments Design and Pattern Making", value: "53" },
        { label: "General Mechanics", value: "45" },
        { label: "Glass Technology", value: "50" },
        { label: "Graphic Design Technology", value: "49" },
        { label: "Information and Communication Technology", value: "18" },
        { label: "Instrumentation & Process Control Technology", value: "31" },
        { label: "Jute Technology", value: "52" },
        { label: "Library Science", value: "43" },
        { label: "Marine Technology", value: "55" },
        { label: "Mechanical Technology", value: "32" },
        { label: "Mechatronics Technology", value: "34" },
        { label: "Mining & Mine Survey Technology", value: "56" },
        { label: "Power Technology", value: "36" },
        { label: "Printing Technology", value: "37" },
        { label: "Refrigeration & Air Conditioning Technology", value: "38" },
        { label: "Shipbuilding Technology", value: "47" },
        { label: "Survey", value: "44" },
        { label: "Telecommunication Technology", value: "41" },
        { label: "Textile Engineering", value: "51" },
        { label: "Other", value: "99" },
    ],
    "5": [
        { label: "Business Studies", value: "3" },
        { label: "General", value: "4" },
        { label: "Humanities", value: "2" },
        { label: "Science", value: "1" },
        { label: "Other", value: "99" },
    ],
    "6": [
        { label: "Business Studies", value: "3" },
        { label: "General", value: "4" },
        { label: "Humanities", value: "2" },
        { label: "Science", value: "1" },
        { label: "Other", value: "99" },
    ],
    "7": [
        { label: "Dental", value: "93" },
        { label: "Laboratory", value: "92" },
        { label: "Pharmacy", value: "96" },
        { label: "Physiotherapy", value: "94" },
        { label: "Radiography", value: "91" },
        { label: "Radiotherapy", value: "95" },
        { label: "Other", value: "99" },
    ],
    "8": [
        { label: "Agro Machinery", value: "71" },
        { label: "Automobile", value: "72" },
        { label: "Building Maintenance and Construction", value: "73" },
        { label: "Clothing and Garments Finishing", value: "74" },
        { label: "Computer Operation and Maintenance", value: "75" },
        { label: "Drafting Civil", value: "76" },
        { label: "Electrical Works and Maintenance", value: "77" },
        { label: "Electronic Control and Communication", value: "78" },
        { label: "Fish Culture and Breeding", value: "79" },
        { label: "Food", value: "85" },
        { label: "Industrial Wood Working", value: "84" },
        { label: "Machine Tools Operation and Maintenance", value: "80" },
        { label: "Mechatronics", value: "86" },
        { label: "Poultry Rearing and Farming", value: "81" },
        { label: "Refrigeration and Air-conditioning", value: "82" },
        { label: "Welding and Fabrication", value: "83" },
        { label: "Other", value: "99" },
    ],
};

const HSCField = ({
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
        name: "hsc_exam",
    });

    const selectedGroup = useWatch({
        control,
        name: "hsc_group",
    });

    // Watch the HSC result type select value
    const selectedHSCResultType = useWatch({
        control,
        name: "hsc_result_type",
    });
    // Determine if GPA input should show (for value "4" or "5")
    const showGpaInput = selectedHSCResultType === "4" || selectedHSCResultType === "5";
    return (
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
            {/* HSC EXAM TYPE */}
            <div className="">
                <Label htmlFor="hsc_exam">
                    Examination <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="hsc_exam"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                            <SelectTrigger id="hsc_exam" className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                            <SelectContent className=" bg-gray-100">
                                <SelectItem value="2">Alim</SelectItem>
                                <SelectItem value="1">H.S.C</SelectItem>
                                <SelectItem value="3">Business Management</SelectItem>
                                <SelectItem value="4">Diploma-in-Engineering</SelectItem>
                                <SelectItem value="5">A Level/Sr. Cambridge</SelectItem>
                                <SelectItem value="6">H.S.C Equivalent</SelectItem>
                                <SelectItem value="7">Diploma in Medical Technology</SelectItem>
                                <SelectItem value="8">H.S.C Vocational</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="h-5">
                    {errors.hsc_exam && (
                        <span className="text-xs text-red-500">{errors.hsc_exam.message}</span>
                    )}
                </div>
            </div>

            {/* HSC BOARD */}
            <div className="">
                <Label htmlFor="hsc_board">
                    Board <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="hsc_board"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                            <SelectTrigger id="hsc_board" className="h-11 bg-gray-100">
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
                    {errors.hsc_board && (
                        <span className="text-xs text-red-500">{errors.hsc_board.message}</span>
                    )}
                </div>
            </div>

            {/* HSC ROLL NUMBER */}
            <div className="">
                <Label htmlFor="hsc_roll">
                    Roll Number <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("hsc_roll")}
                    id="hsc_roll"
                    type="number"
                    className="h-11 bg-gray-100"
                    placeholder="123456"
                />
                <div className="h-5">
                    {errors.hsc_roll && (
                        <span className="text-xs text-red-500">{errors.hsc_roll.message}</span>
                    )}
                </div>
            </div>

            {/* HSC Result Type */}
            <section className="flex justify-between gap-5">
                <div className="w-full">
                    <Label htmlFor="hsc_result_type">
                        Result Type <span className="text-red-600">*</span>
                    </Label>
                    <Controller
                        control={control}
                        name="hsc_result_type"
                        rules={{ required: "Result type is required" }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                <SelectTrigger id="hsc_result_type" className="h-11 bg-gray-100">
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
                        {errors.hsc_result_type && (
                            <span className="text-xs text-red-500">
                                {errors.hsc_result_type.message}
                            </span>
                        )}
                    </div>
                </div>

                {/* Conditionally show GPA input */}
                {showGpaInput && (
                    <div className="w-[60%] sm:w-full">
                        <Label htmlFor="hsc_result">
                            Enter GPA <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            {...register("hsc_result", {
                                required: "GPA is required",
                                validate: (value: string) => {
                                    // Only validate if GPA type is selected
                                    if (["1", "2", "3", "6"].includes(watch("hsc_result_type"))) {
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
                            id="hsc_result"
                            type="text"
                            className="h-11 bg-gray-100"
                            placeholder="Example '4.25','3.25'"
                        />
                        <div className="h-5">
                            {errors.hsc_result && (
                                <span className="text-xs text-red-500">
                                    {errors.hsc_result.message}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* GROUP/SUBJECT */}
            <div>
                <Label htmlFor="hsc_group">
                    Group/Subject <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="hsc_group"
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
                    {errors.hsc_group && (
                        <span className="text-xs text-red-500">{errors.hsc_group.message}</span>
                    )}
                </div>
            </div>

            {/* HSC YEAR */}
            <div className="">
                <Label htmlFor="hsc_year">
                    Passing year <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("hsc_year")}
                    id="hsc_year"
                    type="number"
                    className="h-11 bg-gray-100"
                    placeholder="Enter year like '2000', '1998'"
                />
                <div className="h-5">
                    {errors.hsc_year && (
                        <span className="text-xs text-red-500">{errors.hsc_year.message}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HSCField;
