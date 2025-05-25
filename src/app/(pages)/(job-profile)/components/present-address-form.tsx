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

import upazilaOptionsRaw from "../components/upazila-name.json";
interface UpazilaOption {
    label: string;
    value: string;
}

type UpazilaOptionsMap = Record<string, UpazilaOption[]>;

const PresentAddressFields = ({
    register,
    errors,
    control,
    watch,
    setValue,
}: {
    register: any;
    errors: any;
    control: any;
    watch: any;
    setValue?: any;
}) => {
    const selectedDistrict = useWatch({
        control,
        name: "present_district",
    });

    const upazilaOptionsMap: UpazilaOptionsMap = upazilaOptionsRaw;

    return (
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
            {/* PRESENT ADDRESS CARE OF */}
            <div className="">
                <Label htmlFor="present_careof">
                    Care Of <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("present_careof")}
                    id="present_careof"
                    type="text"
                    className="h-11 bg-gray-100"
                    placeholder="Enter present careof"
                />
                <div className="h-5">
                    {errors.present_careof && (
                        <span className="text-xs text-red-500">
                            {errors.present_careof.message}
                        </span>
                    )}
                </div>
            </div>

            {/* PRESENT VILLAGE ADDRESS */}
            <div className="">
                <Label htmlFor="present_village">
                    Village/ Road/ House/ Flat <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("present_village")}
                    id="present_village"
                    type="text"
                    className="h-11 bg-gray-100"
                    placeholder="Enter village/ Road/ House/ Flat"
                />
                <div className="h-5">
                    {errors.present_village && (
                        <span className="text-xs text-red-500">
                            {errors.present_village.message}
                        </span>
                    )}
                </div>
            </div>

            {/* PRESENT DISTRICT */}
            <div className="">
                <Label htmlFor="present_district">
                    District <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="present_district"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                            <SelectTrigger id="present_district" className="h-11 bg-gray-100">
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
                    {errors.present_district && (
                        <span className="text-xs text-red-500">
                            {errors.present_district.message}
                        </span>
                    )}
                </div>
            </div>

            {/* PRESENT UPAZILA */}
            <div>
                <Label htmlFor="present_upazila">
                    Upazila/P.S. <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="present_upazila"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value ?? ""}
                            disabled={!selectedDistrict}>
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
                    {errors.present_upazila && (
                        <span className="text-xs text-red-500">
                            {errors.present_upazila.message}
                        </span>
                    )}
                </div>
            </div>

            {/* PRESENT POST OFFICE */}
            <div className="">
                <Label htmlFor="present_post">
                    Post Office <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("present_post")}
                    id="present_post"
                    type="text"
                    className="h-11 bg-gray-100"
                    placeholder="Enter post office name"
                />
                <div className="h-5">
                    {errors.present_post && (
                        <span className="text-xs text-red-500">{errors.present_post.message}</span>
                    )}
                </div>
            </div>

            {/* PRESENT POST CODE */}
            <div className="">
                <Label htmlFor="present_postcode">
                    Post Office <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("present_postcode")}
                    id="present_postcode"
                    type="text"
                    className="h-11 bg-gray-100"
                    placeholder="Enter post code"
                />
                <div className="h-5">
                    {errors.present_postcode && (
                        <span className="text-xs text-red-500">
                            {errors.present_postcode.message}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PresentAddressFields;
