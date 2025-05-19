"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLogout from "@/hooks/useLogout ";
import { setLoading } from "@/lib/slices/userSlice";
import { RootState } from "@/lib/store";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
    const { user, isLoading } = useSelector((state: RootState) => state.user);
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
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <div>
                                            <Image
                                                src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?t=st=1739111967~exp=1739115567~hmac=42aa19f2a97f479e45ea4ae7e4d279a79e9a7b2f074822aa45944d4115f833b4&w=996"
                                                alt="oppo"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-black capitalize">
                                                {user?.firstName} {user?.lastName}
                                            </p>
                                            <p className="text-sm font-semibold text-gray-800 lowercase">
                                                @{user?.role}
                                            </p>
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            Profile
                                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Billing
                                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Settings
                                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Keyboard shortcuts
                                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem onClick={handleLogout}>
                                        Log out
                                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="flex items-center gap-0.5 rounded-md bg-primary p-2 text-sm font-semibold text-nowrap text-white sm:gap-1.5">
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

export default Profile;
