"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import universities from "../data/universities.json";

const groupOptionsMap: Record<string, { label: string; value: string }[]> = {
    "1": [
        { label: "Aeronautical Engineering", value: "328" },
        { label: "Architecture", value: "301" },
        { label: "Chemical Engineering", value: "302" },
        { label: "Civil Engineering", value: "303" },
        { label: "Computer Engineering", value: "393" },
        { label: "Computer Science", value: "324" },
        { label: "Computer Science & Engineering", value: "394" },
        { label: "Computer Science & Information Technology", value: "395" },
        { label: "Electrical & Electronics Engineering", value: "306" },
        { label: "Electrical Engineering", value: "305" },
        { label: "Electronic Engineering", value: "307" },
        { label: "Electronics & Communication Engineering", value: "397" },
        { label: "Electronics & Telecommunication Engineering", value: "400" },
        { label: "Environmental Engineering", value: "327" },
        { label: "Food and Process Engineering", value: "330" },
        { label: "Genetic Engineering", value: "308" },
        { label: "Glass and Ceramic Engineering", value: "407" },
        { label: "Industrial Engineering", value: "309" },
        { label: "Information and Communication Engineering", value: "401" },
        { label: "Information and Communication Technology", value: "396" },
        { label: "Leather Engineering", value: "310" },
        { label: "Marine Engineering", value: "311" },
        { label: "Materials Science & Engineering", value: "399" },
        { label: "Mechanical Engineering", value: "312" },
        { label: "Medical Physics and Biomedical Engineering", value: "403" },
        { label: "Metallurgical Engineering", value: "313" },
        { label: "Microwave Engineering", value: "325" },
        { label: "Mineral Engineering", value: "314" },
        { label: "Mining Engineering", value: "315" },
        { label: "Naval Architecture & Marine Engineering", value: "316" },
        { label: "Nuclear Engineering", value: "411" },
        { label: "Petroleum & Mining Engineering", value: "412" },
        { label: "Physical Planning", value: "317" },
        { label: "Regional Planning", value: "318" },
        { label: "Software Engineering", value: "329" },
        { label: "Structural Engineering", value: "319" },
        { label: "Telecommunication Engineering", value: "323" },
        { label: "Textile Engineering", value: "320" },
        { label: "Town Planning", value: "321" },
        { label: "Urban & Regional Planning", value: "322" },
        { label: "Water Resource Engineering", value: "398" },
        { label: "Other", value: "999" },
    ],
    "2": [
        { label: "Agr.Co-operative & Marketing", value: "226" },
        { label: "Agriculture Chemistry", value: "202" },
        { label: "Agriculture Co-operatives", value: "203" },
        { label: "Agriculture Economics", value: "204" },
        { label: "Agriculture Engineering", value: "205" },
        { label: "Agriculture Extension", value: "221" },
        { label: "Agriculture Finance", value: "206" },
        { label: "Agriculture Marketing", value: "207" },
        { label: "Agriculture Science", value: "208" },
        { label: "Agriculture Soil Science", value: "209" },
        { label: "Agriculture Statistics", value: "225" },
        { label: "Agriculture Water Management", value: "220" },
        { label: "Agro Forestry", value: "223" },
        { label: "Agronnomy", value: "214" },
        { label: "Agronomy & Aquaculture", value: "211" },
        { label: "Agronomy & Aquaculture Extension", value: "212" },
        { label: "Anatomology", value: "215" },
        { label: "Anatomy & Histology", value: "213" },
        { label: "Animal Breeding & Genetic", value: "216" },
        { label: "Animal Husbandry", value: "210" },
        { label: "Animal Nutrition", value: "218" },
        { label: "Animal Science", value: "217" },
        { label: "Bio-Technology", value: "227" },
        { label: "Business Studies", value: "250" },
        { label: "Corp Botany", value: "228" },
        { label: "Dairy Science", value: "229" },
        { label: "Doc.of Veterinary Science", value: "230" },
        { label: "Farm Power & Machinery", value: "237" },
        { label: "Farm Structure", value: "239" },
        { label: "Fisheries", value: "231" },
        { label: "Fisheries & Aquaculture", value: "232" },
        { label: "Fisheries Biology", value: "233" },
        { label: "Fisheries Management", value: "234" },
        { label: "Fisheries Technology", value: "235" },
        { label: "Food Tech. & Rural Industry", value: "238" },
        { label: "Forestry", value: "236" },
        { label: "Horticulture", value: "241" },
        { label: "Livestock", value: "242" },
        { label: "Microbiology & Hygenic", value: "243" },
        { label: "Paratrology", value: "246" },
        { label: "Plant Pathology", value: "245" },
        { label: "Poultry Science", value: "247" },
        { label: "Production Economics", value: "244" },
        { label: "Rural Sociology", value: "248" },
        { label: "Surgery & Obstate", value: "249" },
        { label: "Other", value: "999" },
    ],
    "3": [
        { label: "Dental Surgery", value: "392" },
        { label: "Medicine & Surgery", value: "391" },
        { label: "Other", value: "999" },
    ],
    "4": [
        { label: "Accounting", value: "101" },
        { label: "Agriculture", value: "201" },
        { label: "Anthropology", value: "102" },
        { label: "Applied Chemistry", value: "103" },
        { label: "Applied Mathematics", value: "105" },
        { label: "Applied Physics", value: "104" },
        { label: "Archaeology", value: "107" },
        { label: "Bangla", value: "108" },
        { label: "Banking", value: "109" },
        { label: "Biochemistry", value: "110" },
        { label: "Botany", value: "111" },
        { label: "Business Administration", value: "112" },
        { label: "Chemistry", value: "113" },
        { label: "Clinical Psychology", value: "115" },
        { label: "Communication Disorders", value: "183" },
        { label: "Computer Engineering", value: "184" },
        { label: "Computer Science", value: "114" },
        { label: "Computer Science & Engineering", value: "185" },
        { label: "Computer Science & Information Technology", value: "186" },
        { label: "Criminology", value: "182" },
        { label: "Criminology & Police Science", value: "179" },
        { label: "Development Studies", value: "117" },
        { label: "Disaster Science and Management", value: "408" },
        { label: "Drama & Music", value: "116" },
        { label: "Drawing and Printing", value: "174" },
        { label: "Economics", value: "118" },
        { label: "Education", value: "119" },
        { label: "English", value: "120" },
        { label: "Environmental science", value: "189" },
        { label: "Ethics", value: "176" },
        { label: "Finance", value: "121" },
        { label: "Finance and Banking", value: "192" },
        { label: "Fine Arts", value: "122" },
        { label: "Folklore", value: "123" },
        { label: "Food Technology and Nutrition Science", value: "413" },
        { label: "Food Technology and Nutritional Science", value: "406" },
        { label: "Forestry", value: "177" },
        { label: "Genetic and Breeding", value: "167" },
        { label: "Genetic Engineering and Biotechnology", value: "190" },
        { label: "Geography", value: "124" },
        { label: "Geography and Environmental Science", value: "125" },
        { label: "Geology/Geology and Mining", value: "188" },
        { label: "Government and Politics", value: "195" },
        { label: "Graphics", value: "170" },
        { label: "History", value: "126" },
        { label: "History of Music", value: "173" },
        { label: "Home Economics", value: "127" },
        { label: "Industrial Arts", value: "175" },
        { label: "Information and Communication Technology", value: "132" },
        { label: "Information Science and Library Management", value: "135" },
        { label: "Information Technology", value: "187" },
        { label: "International Law", value: "168" },
        { label: "International Relations", value: "129" },
        { label: "Islamic History and Culture", value: "130" },
        { label: "Islamic Studies", value: "402" },
        { label: "Language/Linguistic", value: "136" },
        { label: "Law/Jurisprudence", value: "134" },
        { label: "Management", value: "137" },
        { label: "Marine Science", value: "141" },
        { label: "Marketing", value: "138" },
        { label: "Mass Comm. & Journalism", value: "133" },
        { label: "Materials Science & Engineering", value: "191" },
        { label: "Mathematics", value: "139" },
        { label: "Medical Technology", value: "142" },
        { label: "Meteorology", value: "405" },
        { label: "Microbiology", value: "140" },
        { label: "Nutrition & Food Science", value: "410" },
        { label: "Oceanography", value: "409" },
        { label: "Pali", value: "143" },
        { label: "Peace & Conflict", value: "153" },
        { label: "Persian", value: "144" },
        { label: "Pharmaceutical Chemistry", value: "154" },
        { label: "Pharmacy", value: "145" },
        { label: "Philosophy", value: "146" },
        { label: "Physics", value: "147" },
        { label: "Political Science", value: "148" },
        { label: "Population Science", value: "152" },
        { label: "Population Science and Human Resource Development (RU)", value: "196" },
        { label: "Printing and Publication Studies", value: "193" },
        { label: "Psychology", value: "149" },
        { label: "Public Administration", value: "150" },
        { label: "Public Finance", value: "151" },
        { label: "Sanskrit", value: "155" },
        { label: "Social Welfare/Social Work", value: "156" },
        { label: "Social Works", value: "194" },
        { label: "Sociology", value: "157" },
        { label: "Soil Water and Environment Science", value: "158" },
        { label: "Statistics", value: "159" },
        { label: "Television, Film and Photography", value: "180" },
        { label: "Urban Development", value: "162" },
        { label: "Urdu", value: "161" },
        { label: "Women and Gender Studies", value: "181" },
        { label: "Women Studies", value: "164" },
        { label: "World Religion", value: "163" },
        { label: "Zoology", value: "166" },
        { label: "Other", value: "999" },
    ],
    "5": [
        { label: "B.A", value: "991" },
        { label: "B.B.A", value: "996" },
        { label: "B.B.S", value: "997" },
        { label: "B.com", value: "994" },
        { label: "B.S.S", value: "992" },
        { label: "B.Sc", value: "993" },
        { label: "L.L.B", value: "995" },
        { label: "Other", value: "999" },
    ],
    "6": [
        { label: "Akaid", value: "169" },
        { label: "Arabic", value: "106" },
        { label: "Fikha", value: "171" },
        { label: "Hadith", value: "128" },
        { label: "Islamic Studies", value: "131" },
        { label: "Modern Arabic", value: "172" },
        { label: "Tafsir", value: "160" },
        { label: "Other", value: "999" },
    ],
    "7": [
        { label: "Accounting", value: "260" },
        { label: "Accounting and Information Systems", value: "268" },
        { label: "Banking", value: "261" },
        { label: "Banking and Insurance", value: "267" },
        { label: "Business Administration", value: "262" },
        { label: "Finance", value: "263" },
        { label: "Finance and Banking", value: "273" },
        { label: "Human Resource Management", value: "271" },
        { label: "International Business", value: "269" },
        { label: "Management", value: "264" },
        { label: "Management Information Systems", value: "266" },
        { label: "Marketing", value: "265" },
        { label: "Organization Strategy and Leadership", value: "272" },
        { label: "Tourism and Hospitality Management", value: "270" },
        { label: "Other", value: "999" },
    ],
    "8": [
        { label: "Accounting", value: "101" },
        { label: "Agriculture", value: "201" },
        { label: "Anthropology", value: "102" },
        { label: "Applied Chemistry", value: "103" },
        { label: "Applied Mathematics", value: "105" },
        { label: "Applied Physics", value: "104" },
        { label: "Archaeology", value: "107" },
        { label: "Bangla", value: "108" },
        { label: "Banking", value: "109" },
        { label: "Biochemistry", value: "110" },
        { label: "Botany", value: "111" },
        { label: "Business Administration", value: "112" },
        { label: "Chemistry", value: "113" },
        { label: "Clinical Psychology", value: "115" },
        { label: "Communication Disorders", value: "183" },
        { label: "Computer Engineering", value: "184" },
        { label: "Computer Science", value: "114" },
        { label: "Computer Science & Engineering", value: "185" },
        { label: "Computer Science & Information Technology", value: "186" },
        { label: "Criminology", value: "182" },
        { label: "Criminology & Police Science", value: "179" },
        { label: "Development Studies", value: "117" },
        { label: "Disaster Science and Management", value: "408" },
        { label: "Drama & Music", value: "116" },
        { label: "Drawing and Printing", value: "174" },
        { label: "Economics", value: "118" },
        { label: "Education", value: "119" },
        { label: "English", value: "120" },
        { label: "Environmental science", value: "189" },
        { label: "Ethics", value: "176" },
        { label: "Finance", value: "121" },
        { label: "Finance and Banking", value: "192" },
        { label: "Fine Arts", value: "122" },
        { label: "Folklore", value: "123" },
        { label: "Food Technology and Nutrition Science", value: "413" },
        { label: "Food Technology and Nutritional Science", value: "406" },
        { label: "Forestry", value: "177" },
        { label: "Genetic and Breeding", value: "167" },
        { label: "Genetic Engineering and Biotechnology", value: "190" },
        { label: "Geography", value: "124" },
        { label: "Geography and Environmental Science", value: "125" },
        { label: "Geology/Geology and Mining", value: "188" },
        { label: "Government and Politics", value: "195" },
        { label: "Graphics", value: "170" },
        { label: "History", value: "126" },
        { label: "History of Music", value: "173" },
        { label: "Home Economics", value: "127" },
        { label: "Industrial Arts", value: "175" },
        { label: "Information and Communication Technology", value: "132" },
        { label: "Information Science and Library Management", value: "135" },
        { label: "Information Technology", value: "187" },
        { label: "International Law", value: "168" },
        { label: "International Relations", value: "129" },
        { label: "Islamic History and Culture", value: "130" },
        { label: "Islamic Studies", value: "402" },
        { label: "Language/Linguistic", value: "136" },
        { label: "Law/Jurisprudence", value: "134" },
        { label: "Management", value: "137" },
        { label: "Marine Science", value: "141" },
        { label: "Marketing", value: "138" },
        { label: "Mass Comm. & Journalism", value: "133" },
        { label: "Materials Science & Engineering", value: "191" },
        { label: "Mathematics", value: "139" },
        { label: "Medical Technology", value: "142" },
        { label: "Meteorology", value: "405" },
        { label: "Microbiology", value: "140" },
        { label: "Nutrition & Food Science", value: "410" },
        { label: "Oceanography", value: "409" },
        { label: "Pali", value: "143" },
        { label: "Peace & Conflict", value: "153" },
        { label: "Persian", value: "144" },
        { label: "Pharmaceutical Chemistry", value: "154" },
        { label: "Pharmacy", value: "145" },
        { label: "Philosophy", value: "146" },
        { label: "Physics", value: "147" },
        { label: "Political Science", value: "148" },
        { label: "Population Science", value: "152" },
        { label: "Population Science and Human Resource Development (RU)", value: "196" },
        { label: "Printing and Publication Studies", value: "193" },
        { label: "Psychology", value: "149" },
        { label: "Public Administration", value: "150" },
        { label: "Public Finance", value: "151" },
        { label: "Sanskrit", value: "155" },
        { label: "Social Welfare/Social Work", value: "156" },
        { label: "Social Works", value: "194" },
        { label: "Sociology", value: "157" },
        { label: "Soil Water and Environment Science", value: "158" },
        { label: "Statistics", value: "159" },
        { label: "Television, Film and Photography", value: "180" },
        { label: "Urban Development", value: "162" },
        { label: "Urdu", value: "161" },
        { label: "Women and Gender Studies", value: "181" },
        { label: "Women Studies", value: "164" },
        { label: "World Religion", value: "163" },
        { label: "Zoology", value: "166" },
        { label: "Other", value: "999" },
    ],
};

const GraduationField = ({
    register,
    errors,
    control,
    watch,
    isBachelorApplicable,
}: {
    register: any;
    errors: any;
    control: any;
    watch: any;
    isBachelorApplicable: any;
}) => {
    console.log("isBachelorApplicable is:", isBachelorApplicable);
    const [open, setOpen] = useState(false);
    // const [selectedUniversity, setSelectedUniversity] = useState<{
    //     value: string;
    //     label: string;
    // } | null>(null);

    // // console.log("The selectedUniversity:", selectedUniversity);

    const selectedExam = useWatch({
        control,
        name: "gra_exam",
    });

    // Watch the SSC result type select value
    const selectedSscResultType = useWatch({
        control,
        name: "gra_result_type",
    });
    // Determine if GPA input should show (for value "4" or "5")
    const showGpaInput = selectedSscResultType === "4" || selectedSscResultType === "5";
    return (
        <div
            className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${isBachelorApplicable ? "" : "hover:cursor-not-allowed"}`}>
            {/* GRADUATION EXAM TYPE */}
            <div className="">
                <Label htmlFor="gra_exam">
                    Examination <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="gra_exam"
                    render={({ field }) => (
                        <Select
                            disabled={!isBachelorApplicable}
                            onValueChange={field.onChange}
                            value={field.value ?? ""}>
                            <SelectTrigger id="gra_exam" className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-100">
                                <SelectItem value="1">B.Sc Engineering</SelectItem>
                                <SelectItem value="2">B.Sc in Agricultural Science</SelectItem>
                                <SelectItem value="3">M.B.B.S./B.D.S</SelectItem>
                                <SelectItem value="4">Honors</SelectItem>
                                <SelectItem value="5">Pass Course</SelectItem>
                                <SelectItem value="6">Fazil</SelectItem>
                                <SelectItem value="7">B.B.A</SelectItem>
                                <SelectItem value="8">Graduation Equivalent</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="h-5">
                    {errors.gra_exam && (
                        <span className="text-xs text-red-500">{errors.gra_exam.message}</span>
                    )}
                </div>
            </div>

            {/* GRADUATION Subject/Degree */}
            <div className="">
                <Label htmlFor="gra_subject">
                    Subject/Degree <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="gra_subject"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value ?? ""}
                            disabled={!selectedExam || !isBachelorApplicable}>
                            <SelectTrigger className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select subject" />
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
                    {errors.gra_subject && (
                        <span className="text-xs text-red-500">{errors.gra_subject.message}</span>
                    )}
                </div>
            </div>

            {/* GRADUATION University */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="gra_institute" className="mt-1.5">
                    University/Inst. <span className="text-red-500">*</span>
                </Label>

                <Controller
                    control={control}
                    name="gra_institute"
                    rules={{ required: "University is required" }}
                    render={({ field }) => {
                        const selectedOption = universities.find((u) => u.value === field.value);

                        return (
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        disabled={!isBachelorApplicable}
                                        aria-expanded={open}
                                        className="h-11 w-full justify-between text-muted-foreground hover:text-muted-foreground font-normal border-none bg-gray-100 hover:bg-gray-100">
                                        {selectedOption
                                            ? selectedOption.label
                                            : "Select university..."}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[400px] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Select university..."
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>No university found.</CommandEmpty>
                                            <CommandGroup>
                                                {universities.map((institute) => (
                                                    <CommandItem
                                                        key={institute.value}
                                                        value={institute.label}
                                                        onSelect={() => {
                                                            field.onChange(institute.value); // Only store value
                                                            setOpen(false);
                                                        }}
                                                        className={cn(
                                                            "cursor-pointer",
                                                            field.value === institute.value &&
                                                                "bg-gray-800 text-white",
                                                        )}>
                                                        {institute.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                field.value === institute.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0",
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        );
                    }}
                />
                <div className="h-5">
                    {errors.gra_institute && (
                        <span className="text-xs text-red-500">{errors.gra_institute.message}</span>
                    )}
                </div>
            </div>

            {/* GRADUATION Result Type */}
            <section className="flex justify-between gap-5">
                <div className="w-full">
                    <Label htmlFor="gra_result_type">
                        Result <span className="text-red-600">*</span>
                    </Label>
                    <Controller
                        control={control}
                        name="gra_result_type"
                        rules={{ required: "Result type is required" }}
                        render={({ field }) => (
                            <Select disabled={!isBachelorApplicable} onValueChange={field.onChange} value={field.value ?? ""}>
                                <SelectTrigger id="gra_result_type" className="h-11 bg-gray-100">
                                    <SelectValue placeholder="Select result type" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-100">
                                    <SelectItem value="1">1st Class</SelectItem>
                                    <SelectItem value="2">2nd Class</SelectItem>
                                    <SelectItem value="4">CGPA (out of 4)</SelectItem>
                                    <SelectItem value="5">CGPA (out of 5)</SelectItem>
                                    <SelectItem value="6">Passed</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <div className="h-5">
                        {errors.gra_result_type && (
                            <span className="text-xs text-red-500">
                                {errors.gra_result_type.message}
                            </span>
                        )}
                    </div>
                </div>

                {/* Conditionally show GPA input */}
                {showGpaInput && (
                    <div className="w-[60%] sm:w-full">
                        <Label htmlFor="gra_result">
                            Enter GPA <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            {...register("gra_result", {
                                required: "GPA is required",
                                validate: (value: string) => {
                                    // Only validate if GPA type is selected
                                    if (["1", "2", "6"].includes(watch("gra_result_type"))) {
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
                            id="gra_result"
                            type="text"
                            className="h-11 bg-gray-100"
                            placeholder="Example '4.25','3.25'"
                        />
                        <div className="h-5">
                            {errors.gra_result && (
                                <span className="text-xs text-red-500">
                                    {errors.gra_result.message}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* GRADUATION YEAR */}
            <div className="">
                <Label htmlFor="gra_year">
                    Passing year <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("gra_year")}
                    id="gra_year"
                    type="number"
                    disabled={!isBachelorApplicable}
                    className="h-11 bg-gray-100"
                    placeholder="Enter year like '2000', '1998'"
                />
                <div className="h-5">
                    {errors.gra_year && (
                        <span className="text-xs text-red-500">{errors.gra_year.message}</span>
                    )}
                </div>
            </div>

            {/* GRADUATION DURATION */}
            <div className="">
                <Label htmlFor="gra_duration">
                    Course Duration <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="gra_duration"
                    render={({ field }) => (
                        <Select disabled={!isBachelorApplicable} onValueChange={field.onChange} value={field.value ?? ""}>
                            <SelectTrigger id="gra_duration" className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select Course Duration" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-100">
                                <SelectItem value="03">03 Years</SelectItem>
                                <SelectItem value="04">04 Years</SelectItem>
                                <SelectItem value="05">05 Years</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="h-5">
                    {errors.gra_duration && (
                        <span className="text-xs text-red-500">{errors.gra_duration.message}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GraduationField;
