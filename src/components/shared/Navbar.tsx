import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleUser, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
    return (
        <main className="grid grid-cols-3 bg-gray-100 px-40 py-3 drop-shadow-lg fixed top-0 z-[1000] w-full">
            <section>
                <p className="text-3xl font-bold italic">SKB BEST</p>
            </section>
            <section className="w-full px-5">
                <div className="relative bg-transparent">
                    <Label
                        htmlFor="search"
                        className="absolute top-1/2 right-0 flex h-full -translate-y-1/2 items-center justify-center rounded-r-full bg-primary px-4 text-white">
                        <Search />
                    </Label>
                    <Input
                        id="search"
                        placeholder="Search by keyword "
                        className="rounded-full ring-[#2992F233]"
                    />
                </div>
            </section>
            <section className="flex items-center gap-2 place-self-end">
                <Link href="#" className="rounded-md bg-primary p-2 text-white hover:bg-primary/90">
                    <ShoppingCart size={19} />
                </Link>

                <Link
                    href="#"
                    className="flex items-center gap-1.5 rounded-md bg-primary p-2 text-sm font-semibold text-white hover:bg-primary/90">
                    <CircleUser size={19} /> Pitu
                </Link>

                <Link
                    href="#"
                    className="flex items-center gap-1.5 rounded-md bg-primary p-2 text-sm font-semibold text-white hover:bg-primary/90">
                    <CircleUser size={19} /> Sign in / Sign up
                </Link>
            </section>
        </main>
    );
};

export default Navbar;
