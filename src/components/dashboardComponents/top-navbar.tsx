import { SidebarTrigger } from "@/components/ui/sidebar";
import { Globe } from "lucide-react";
import Link from "next/link";
import Profile from "./profile";

export function TopNavbar() {
    return (
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 bg-background px-4 shadow-sm sm:px-5 md:px-7 lg:px-12">
            <div className="flex items-center gap-5">
                <SidebarTrigger className=""></SidebarTrigger>
                <Link
                    href="/"
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-600 duration-500 hover:bg-[#009ef7] hover:text-white">
                    <Globe size={20} />
                </Link>

                <div className="hidden items-center gap-5 p-2 xl:flex">
                    <Link
                        href="/dashboard"
                        className="mx-2 text-[13px] font-semibold text-gray-800 duration-500 hover:text-[#009ef7]">
                        Dashboard
                    </Link>
                    <Link
                        href="/dashboard/orders"
                        className="mx-2 text-[13px] font-semibold text-gray-800 duration-500 hover:text-[#009ef7]">
                        Orders
                    </Link>
                </div>
            </div>
            <Profile></Profile>
        </header>
    );
}
