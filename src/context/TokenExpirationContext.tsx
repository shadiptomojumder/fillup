"use client";
import { logout as logoutApi } from "@/api/auth/logout";
import { logout, setLoading } from "@/lib/slices/userSlice";
import { RootState, store } from "@/lib/store";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistStore } from "redux-persist";

interface DecodedToken {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    exp: number; // Expiry timestamp
}

// Decode JWT and check expiry
const decodeToken = (token: string): DecodedToken | null => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);

        // Check if the token is expired
        if (decoded.exp * 1000 < Date.now()) {
            console.log("Access token has expired.");
            return null;
        }

        return decoded;
    } catch (error) {
        console.log("Invalid token:", error);
        return null;
    }
};

const TokenExpirationContext = ({ children }: { children: React.ReactNode }) => {
    const { accesstoken } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!accesstoken) return;

        const decoded = decodeToken(accesstoken);
        if (!decoded || !decoded.exp) return;

        const expireTimestamp = decoded.exp * 1000; // Convert to milliseconds
        const now = Date.now();
        const timeRemaining = expireTimestamp - now;

        if (timeRemaining > 0) {
            console.log(`Session expires in: ${timeRemaining / 1000}s`);

            const timeoutId = setTimeout(async () => {
                dispatch(setLoading(true));

                // Dispatch logout action
                dispatch(logout());

                // Clear authentication-related data
                localStorage.removeItem("accessToken");

                // Purge only the user state, not the entire Redux store
                persistStore(store).purge();

                try {
                    await logoutApi();
                } catch (error) {
                    console.error("Logout API Error:", error);
                }

                dispatch(setLoading(false));
                router.push("/login?message=session-expired");
            }, timeRemaining);

            return () => clearTimeout(timeoutId); // Cleanup on unmount
        } else {
            // If token is already expired, log out immediately
            dispatch(logout());
            localStorage.removeItem("accessToken");
            persistStore(store).purge();
            // Notify backend immediately
            (async () => {
                try {
                    await logoutApi();
                } catch (error) {
                    console.log("Logout API Error:", error);
                } finally {
                    dispatch(setLoading(false));
                    router.push("/login?message=session-expired");
                }
            })();
        }
    }, [accesstoken, dispatch, router]);

    return <>{children}</>;
};

export default TokenExpirationContext;
