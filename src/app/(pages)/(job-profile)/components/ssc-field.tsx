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
import { groupOptionsMap } from "./data";

const SSCField = ({ register, errors, control }: { register: any; errors: any; control: any }) => {
    const selectedExam = useWatch({
        control,
        name: "ssc.ssc_exam",
    });

    const selectedGroup = useWatch({
        control,
        name: "ssc.ssc_group",
    });

    // Watch the SSC result type select value
    const selectedSscResultType = useWatch({
        control,
        name: "ssc.ssc_result_type",
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
                    name="ssc.ssc_exam"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                            <SelectTrigger id="ssc_exam" className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">S.S.C</SelectItem>
                                <SelectItem value="2">Dakhil</SelectItem>
                                <SelectItem value="3">S.S.C Vocational</SelectItem>
                                <SelectItem value="4">O Level/Cambridge</SelectItem>
                                <SelectItem value="5">S.S.C Equivalent</SelectItem>
                                <SelectItem value="6">Dakhil Vocational</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="h-5">
                    {errors.ssc?.ssc_exam && (
                        <span className="text-xs text-red-500">{errors.ssc?.ssc_exam.message}</span>
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
                    name="ssc.ssc_board"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                            <SelectTrigger id="ssc_board" className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                            <SelectContent>
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
                    {errors.ssc?.ssc_board && (
                        <span className="text-xs text-red-500">
                            {errors.ssc?.ssc_board.message}
                        </span>
                    )}
                </div>
            </div>

            {/* SSC ROLL NUMBER */}
            <div className="">
                <Label htmlFor="ssc-roll">
                    Roll Number <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("ssc.ssc_roll")}
                    id="ssc-roll"
                    type="number"
                    className="h-11 bg-gray-100"
                    placeholder="123456"
                />
                <div className="h-5">
                    {errors.ssc?.ssc_roll && (
                        <span className="text-xs text-red-500">{errors.ssc?.ssc_roll.message}</span>
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
                        name="ssc.ssc_result_type"
                        rules={{ required: "Result type is required" }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                <SelectTrigger id="ssc_result_type" className="h-11 bg-gray-100">
                                    <SelectValue placeholder="Select result type" />
                                </SelectTrigger>
                                <SelectContent>
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
                        {errors.ssc?.ssc_result_type && (
                            <span className="text-xs text-red-500">
                                {errors.ssc?.ssc_result_type.message}
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
                            {...register("ssc.ssc_result", { valueAsNumber: true })}
                            id="ssc_result"
                            type="number"
                            className="h-11 bg-gray-100"
                        />
                        <div className="h-5">
                            {errors.ssc?.ssc_result && (
                                <span className="text-xs text-red-500">
                                    {errors.ssc?.ssc_result.message}
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
                    name="ssc.ssc_group"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value ?? ""}
                            disabled={!selectedExam}>
                            <SelectTrigger className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select group/subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {(groupOptionsMap[selectedExam ?? ""] ?? []).map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>

            {/* SSC YEAR */}
            <div className="">
                <Label htmlFor="ssc_year">
                    Passing year <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("ssc.ssc_year")}
                    id="ssc_year"
                    type="number"
                    className="h-11 bg-gray-100"
                    placeholder="Enter year like '2000', '1998'"
                />
                <div className="h-5">
                    {errors.ssc?.ssc_year && (
                        <span className="text-xs text-red-500">{errors.ssc?.ssc_year.message}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SSCField;
