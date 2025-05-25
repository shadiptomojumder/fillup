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

import { useEffect } from "react";
import upazilaOptionsRaw from "../components/upazila-name.json";
interface UpazilaOption {
    label: string;
    value: string;
}

type UpazilaOptionsMap = Record<string, UpazilaOption[]>;

const PermanentAddressFields = ({
    register,
    errors,
    control,
    watch,
    isSameAsPresent,
    setValue,
}: {
    register: any;
    errors: any;
    control: any;
    watch: any;
    isSameAsPresent?: boolean;
    setValue?: any;
}) => {
    const selectedDistrict = useWatch({
        control,
        name: "permanent_district",
    });

    const upazilaOptionsMap: UpazilaOptionsMap = upazilaOptionsRaw;

    const presentDistrict = watch("present_district");
    const presentUpazila = watch("present_upazila");

    // Sync permanent values if same_as_present is checked
    // useEffect(() => {
    //   if (isSameAsPresent) {
    //     setValue("permanent_district", presentDistrict);
    //     setSelectedDistrict(presentDistrict);

    //     // Defer upazila setting to ensure district is registered first
    //     const timeout = setTimeout(() => {
    //       setValue("permanent_upazila", presentUpazila);
    //     }, 0); // Run after current call stack

    //     return () => clearTimeout(timeout);
    //   }
    // }, [isSameAsPresent, presentDistrict, presentUpazila, setValue]);

    // Sync permanent district and upazila when checkbox is checked
    useEffect(() => {
        if (isSameAsPresent) {
            setValue("permanent_district", presentDistrict);
            setValue("permanent_upazila", presentUpazila);

            // Defer upazila setting to ensure district is registered first
            const timeout = setTimeout(() => {
                setValue("permanent_upazila", presentUpazila);
            }, 0); // Run after current call stack
            return () => clearTimeout(timeout);
        } else {
            // Optionally clear when unchecked, or leave user to pick manually
            // setValue("permanent_district", "");
            // setValue("permanent_upazila", "");
        }
    }, [isSameAsPresent, presentDistrict, presentUpazila, setValue]);

    return (
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
            {/* PRESENT ADDRESS CARE OF */}
            <div className="">
                <Label htmlFor="permanent_careof">
                    Care Of <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("permanent_careof")}
                    id="permanent_careof"
                    type="text"
                    disabled={isSameAsPresent}
                    className="h-11 bg-gray-100"
                    placeholder="Enter permanent careof"
                />
                <div className="h-5">
                    {errors.permanent_careof && (
                        <span className="text-xs text-red-500">
                            {errors.permanent_careof.message}
                        </span>
                    )}
                </div>
            </div>

            {/* PRESENT VILLAGE ADDRESS */}
            <div className="">
                <Label htmlFor="permanent_village">
                    Village/ Road/ House/ Flat <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("permanent_village")}
                    id="permanent_village"
                    type="text"
                    disabled={isSameAsPresent}
                    className="h-11 bg-gray-100"
                    placeholder="Enter village/ Road/ House/ Flat"
                />
                <div className="h-5">
                    {errors.permanent_village && (
                        <span className="text-xs text-red-500">
                            {errors.permanent_village.message}
                        </span>
                    )}
                </div>
            </div>

            {/* PRESENT DISTRICT */}
            <div className="">
                <Label htmlFor="permanent_district">
                    District <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="permanent_district"
                    render={({ field }) => (
                        <Select
                            disabled={isSameAsPresent}
                            onValueChange={field.onChange}
                            value={field.value ?? ""}>
                            <SelectTrigger id="permanent_district" className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-100">
                                <SelectItem value="26">Bagerhat</SelectItem>
                                <SelectItem value="64">Bandarban</SelectItem>
                                <SelectItem value="32">Barguna</SelectItem>
                                <SelectItem value="29">Barishal</SelectItem>
                                <SelectItem value="30">Bhola</SelectItem>
                                <SelectItem value="10">Bogura</SelectItem>
                                <SelectItem value="54">Brahmanbaria</SelectItem>
                                <SelectItem value="56">Chandpur</SelectItem>
                                <SelectItem value="13">Chapai Nawabganj</SelectItem>
                                <SelectItem value="60">Chattogram</SelectItem>
                                <SelectItem value="19">Chuadanga</SelectItem>
                                <SelectItem value="61">Cox`s Bazar</SelectItem>
                                <SelectItem value="55">Cumilla</SelectItem>
                                <SelectItem value="40">Dhaka</SelectItem>
                                <SelectItem value="3">Dinajpur</SelectItem>
                                <SelectItem value="45">Faridpur</SelectItem>
                                <SelectItem value="59">Feni</SelectItem>
                                <SelectItem value="8">Gaibandha</SelectItem>
                                <SelectItem value="41">Gazipur</SelectItem>
                                <SelectItem value="47">Gopalganj</SelectItem>
                                <SelectItem value="53">Habiganj</SelectItem>
                                <SelectItem value="36">Jamalpur</SelectItem>
                                <SelectItem value="23">Jashore</SelectItem>
                                <SelectItem value="28">Jhalakathi</SelectItem>
                                <SelectItem value="20">Jhenaidah</SelectItem>
                                <SelectItem value="9">Joypurhat</SelectItem>
                                <SelectItem value="62">Khagrachhari</SelectItem>
                                <SelectItem value="25">Khulna</SelectItem>
                                <SelectItem value="38">Kishoreganj</SelectItem>
                                <SelectItem value="7">Kurigram</SelectItem>
                                <SelectItem value="17">Kushtia</SelectItem>
                                <SelectItem value="57">Lakshmipur</SelectItem>
                                <SelectItem value="5">Lalmonirhat</SelectItem>
                                <SelectItem value="48">Madaripur</SelectItem>
                                <SelectItem value="21">Magura</SelectItem>
                                <SelectItem value="39">Manikganj</SelectItem>
                                <SelectItem value="18">Meherpur</SelectItem>
                                <SelectItem value="52">Moulvibazar</SelectItem>
                                <SelectItem value="44">Munshiganj</SelectItem>
                                <SelectItem value="34">Mymensingh</SelectItem>
                                <SelectItem value="11">Naogaon</SelectItem>
                                <SelectItem value="22">Narail</SelectItem>
                                <SelectItem value="43">Narayanganj</SelectItem>
                                <SelectItem value="42">Narsingdi</SelectItem>
                                <SelectItem value="12">Natore</SelectItem>
                                <SelectItem value="33">Netrokona</SelectItem>
                                <SelectItem value="4">Nilphamari</SelectItem>
                                <SelectItem value="58">Noakhali</SelectItem>
                                <SelectItem value="16">Pabna</SelectItem>
                                <SelectItem value="1">Panchagarh</SelectItem>
                                <SelectItem value="31">Patuakhali</SelectItem>
                                <SelectItem value="27">Pirojpur</SelectItem>
                                <SelectItem value="46">Rajbari</SelectItem>
                                <SelectItem value="14">Rajshahi</SelectItem>
                                <SelectItem value="63">Rangamati</SelectItem>
                                <SelectItem value="6">Rangpur</SelectItem>
                                <SelectItem value="24">Satkhira</SelectItem>
                                <SelectItem value="49">Shariatpur</SelectItem>
                                <SelectItem value="35">Sherpur</SelectItem>
                                <SelectItem value="15">Sirajganj</SelectItem>
                                <SelectItem value="50">Sunamganj</SelectItem>
                                <SelectItem value="51">Sylhet</SelectItem>
                                <SelectItem value="37">Tangail</SelectItem>
                                <SelectItem value="2">Thakurgaon</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="h-5">
                    {errors.permanent_district && (
                        <span className="text-xs text-red-500">
                            {errors.permanent_district.message}
                        </span>
                    )}
                </div>
            </div>

            {/* PERMANENT UPAZILA */}
            <div>
                <Label htmlFor="permanent_upazila">
                    Upazila/P.S. <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="permanent_upazila"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value ?? ""}
                            disabled={!selectedDistrict || isSameAsPresent}>
                            <SelectTrigger className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select group/subject" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-100">
                                {(upazilaOptionsMap[selectedDistrict ?? ""] ?? []).map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="h-5">
                    {errors.permanent_upazila && (
                        <span className="text-xs text-red-500">
                            {errors.permanent_upazila.message}
                        </span>
                    )}
                </div>
            </div>

            {/* PRESENT POST OFFICE */}
            <div className="">
                <Label htmlFor="permanent_post">
                    Post Office <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("permanent_post")}
                    id="permanent_post"
                    type="text"
                    disabled={isSameAsPresent}
                    className="h-11 bg-gray-100"
                    placeholder="Enter post office name"
                />
                <div className="h-5">
                    {errors.permanent_post && (
                        <span className="text-xs text-red-500">
                            {errors.permanent_post.message}
                        </span>
                    )}
                </div>
            </div>

            {/* PRESENT POST CODE */}
            <div className="">
                <Label htmlFor="permanent_postcode">
                    Post Office <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("permanent_postcode")}
                    id="permanent_postcode"
                    type="text"
                    disabled={isSameAsPresent}
                    className="h-11 bg-gray-100"
                    placeholder="Enter post code"
                />
                <div className="h-5">
                    {errors.permanent_postcode && (
                        <span className="text-xs text-red-500">
                            {errors.permanent_postcode.message}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PermanentAddressFields;
