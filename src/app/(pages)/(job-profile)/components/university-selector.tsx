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
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import universities from "../data/universities.json";

export interface UniversityOption {
    value: string;
    label: string;
}

interface UniversitySelectorProps {
    disabled?: boolean;
    value?: UniversityOption | null;
    onChange: (university: UniversityOption | null) => void;
    open?: boolean;
    setOpen: (open: boolean) => void;
}

const UniversitySelector = ({
    disabled,
    onChange,
    open,
    setOpen,
    value,
}: UniversitySelectorProps) => {
    const [selectedUniversity, setSelectedUniversity] = useState<UniversityOption | null>(null);
    console.log("selectedUniversity is:",selectedUniversity);
    
    const handleSelect = (university: UniversityOption) => {
        onChange(university);
        setOpen(false);
    };
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className="w-full justify-between">
                    {selectedUniversity ? selectedUniversity.label : "Select University..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Search university..." />
                    <CommandList>
                        <CommandEmpty>No university found.</CommandEmpty>
                        <CommandGroup>
                            {universities.map((univ) => (
                                <CommandItem
                                    key={univ.value}
                                    value={univ.label}
                                    onSelect={() => handleSelect(univ)}
                                    className="flex items-center justify-between text-sm">
                                    <span>{univ.label}</span>
                                    <Check
                                        className={cn(
                                            "h-4 w-4",
                                            selectedUniversity?.value === univ.value
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
};

export default UniversitySelector;
