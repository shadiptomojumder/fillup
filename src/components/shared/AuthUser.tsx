"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLogout from "@/hooks/useLogout ";
import { setLoading } from "@/lib/slices/userSlice";
import { RootState } from "@/lib/store";
import { CircleUser, FileClock, LayoutDashboard, LogOut, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthUser = () => {
    const { user, isLoading } = useSelector((state: RootState) => state.user);
    const { items } = useSelector((state: RootState) => state.cart);
    // console.log("Redux User is:", user);
    // console.log("Redux isLoading is:", isLoading);
    const handleLogout = useLogout();
    const dispatch = useDispatch();

    useEffect(() => {
        // Set loading state to false after initial check
        dispatch(setLoading(false));
    }, [dispatch]);

    return (
        <>
            
            {isLoading ? (
                <div>User Loading...</div>
            ) : (
                <>
                    {user ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    {/* <div className="flex cursor-pointer items-center gap-1.5 rounded-md bg-accent p-2 text-sm font-semibold text-primary">
                                        <CircleUser size={20} /> <span className="hidden sm:block">Shadipto</span>
                                    </div> */}
                                    <div className="flex cursor-pointer items-center gap-1.5 rounded-full bg-accent p-0 text-sm font-semibold text-primary sm:rounded-md sm:p-2">
                                        <CircleUser className="h-[35px] w-[35px] sm:h-[20px] sm:w-[20px]" />{" "}
                                        <span className="hidden capitalize sm:block">
                                            {user?.firstName}
                                        </span>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="z-[2255] grid w-56 gap-1.5 p-2">
                                    <DropdownMenuItem asChild className="focus:bg-[#d7f2dc8e]">
                                        <Link
                                            href="/my-profile"
                                            className="flex items-center gap-2 rounded-md border-2 border-[#d7f2dc8e] bg-[#d7f2dc8e] p-2 text-primary transition duration-300 ease-in-out hover:border-primary hover:bg-[#d7f2dc8e]">
                                            <User size={20} className="text-primary" />
                                            <p className="text-sm font-medium text-gray-800">
                                                My Profile
                                            </p>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="focus:bg-[#d7f2dc8e]">
                                        <Link
                                            href="/order-history"
                                            className="flex items-center gap-2 rounded-md border-2 border-[#d7f2dc8e] bg-[#d7f2dc8e] p-2 text-primary transition duration-300 ease-in-out hover:border-primary hover:bg-[#d7f2dc8e]">
                                            <FileClock size={20} className="text-primary" />
                                            <p className="text-sm font-medium text-gray-800">
                                                Order History
                                            </p>
                                        </Link>
                                    </DropdownMenuItem>
                                    {user && user.role === "ADMIN" && (
                                        <DropdownMenuItem asChild className="focus:bg-[#d7f2dc8e]">
                                            <Link
                                                href="/dashboard"
                                                className="flex items-center gap-2 rounded-md border-2 border-[#d7f2dc8e] bg-[#d7f2dc8e] p-2 text-primary transition duration-300 ease-in-out hover:border-primary hover:bg-[#d7f2dc8e]">
                                                <LayoutDashboard
                                                    size={20}
                                                    className="text-primary"
                                                />
                                                <p className="text-sm font-medium text-gray-800">
                                                    Dashboard
                                                </p>
                                            </Link>
                                        </DropdownMenuItem>
                                    )}

                                    <DropdownMenuItem asChild className="focus:bg-[#d7f2dc8e]">
                                        <button
                                            onClick={handleLogout}
                                            className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-[#d7f2dc8e] bg-[#d7f2dc8e] p-2 text-primary transition duration-300 ease-in-out hover:border-primary hover:bg-[#d7f2dc8e]">
                                            <LogOut size={20} className="text-primary" />
                                            <p className="text-sm font-medium text-gray-800">
                                                Logout
                                            </p>
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="flex items-center gap-0.5 rounded-md bg-accent p-2 text-sm font-semibold text-nowrap text-primary sm:gap-1.5">
                                <CircleUser size={19} className="hidden sm:block" /> Sign in
                                <span className="max-[430px]:hidden"> / Sign up</span>
                            </Link>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default AuthUser;
