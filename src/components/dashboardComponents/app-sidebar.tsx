"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Building Your Products",
            url: "#",
            items: [
                {
                    title: "All Products",
                    url: "/dashboard/products",
                },
                {
                    title: "Add New Product",
                    url: "/dashboard/products/create",
                },
                {
                    title: "All Categories",
                    url: "/dashboard/categories",
                },
                {
                    title: "Add New Category",
                    url: "/dashboard/categories/create",
                },
                {
                    title: "Styling",
                    url: "#",
                },
            ],
        },
        {
            title: "Website Setup",
            url: "#",
            items: [
                {
                    title: "Homepage Banner",
                    url: "/dashboard/banners",
                },
                {
                    title: "File Conventions",
                    url: "#",
                },
                {
                    title: "Functions",
                    url: "#",
                },
                {
                    title: "next.config.js Options",
                    url: "#",
                },
                {
                    title: "CLI",
                    url: "#",
                },
                {
                    title: "Edge Runtime",
                    url: "#",
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    //console.log("the pathname is:", pathname);

    interface NavItem {
        title: string;
        url: string;
        isActive?: boolean;
        items?: NavItem[];
    }

    const isActive = (item: NavItem): boolean => {
        if (pathname === item.url) return true;
        if (item.items?.some((subItem) => pathname === subItem.url)) return true;
        return false;
    };

    const { setOpenMobile } = useSidebar();

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <p className="text-center text-3xl font-bold text-black italic">Lalon Store</p>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="pr-0">
                    <SidebarMenu className="">
                        {data.navMain.map((item) => {
                            const active = isActive(item);

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <p
                                        className={`p-2 text-base font-semibold ${active ? "text-primary" : "text-black"}`}>
                                        {item.title}
                                    </p>

                                    {item.items?.length ? (
                                        <SidebarMenuSub className="border-none px-0">
                                            {item.items.map((item) => {
                                                const active = isActive(item);
                                                return (
                                                    <Link key={item.title} href={item.url}>
                                                        <SidebarMenuSubItem
                                                            onClick={() => setOpenMobile(false)}
                                                            className={`cursor-pointer border-l-2 py-2 ps-2 text-sm duration-200 ease-out hover:border-primary hover:bg-[#d7f2dc] hover:text-primary ${active ? "border-primary bg-[#d7f2dc] font-medium text-primary" : "border-white bg-white font-medium text-black"}`}>
                                                            {item.title}
                                                        </SidebarMenuSubItem>
                                                    </Link>
                                                );
                                            })}
                                        </SidebarMenuSub>
                                    ) : null}
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
