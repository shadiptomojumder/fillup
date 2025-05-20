"use client";
import { logout } from "@/lib/slices/userSlice";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useAutoLogout = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { accesstoken } = useSelector((state: RootState) => state.user);
    const expiry = localStorage.getItem("accessTokenExpiry");

    useEffect(() => {
        if (accesstoken && expiry) {
            const expiresInMs = parseInt(expiry) - Date.now();
            const expiresInSec = Math.floor(expiresInMs / 1000); // Convert ms to seconds

            console.log(`Token expires in: ${expiresInSec} seconds`);

            if (expiresInMs <= 0) {
                handleLogout();
                return;
            }

            const timeout = setTimeout(() => {
                handleLogout();
            }, expiresInMs);

            return () => clearTimeout(timeout);
        }
    }, []);

    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("accessTokenExpiry");

        // Dispatch logout action
        dispatch(logout());

        // Redirect to login with message
        toast.warning("Your session has expired. Please log in again.", {
            duration: 10000,
            closeButton: true,
        });
        router.push("/login?message=session-expired");
    };
};
