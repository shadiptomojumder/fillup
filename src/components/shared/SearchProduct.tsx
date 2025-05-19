"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchProduct = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const name = searchParams.get("name");
        if (name) {
            setSearchTerm(name);
        }
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/products?name=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full bg-transparent">
            <button
                type="submit"
                className="absolute top-1/2 right-0 flex h-full -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-full bg-green-700 px-1 py-2 text-white sm:px-4">
                <Search />
            </button>
            <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Your Products"
                className="w-full rounded-full bg-accent placeholder:text-sm md:placeholder:text-base"
            />
        </form>
    );
};

export default SearchProduct;
