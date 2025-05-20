"use client";
import { useAutoLogout } from "@/hooks/useAutoLogout";
import React from "react";

const TokenExpirationContext = ({ children }: { children: React.ReactNode }) => {
    useAutoLogout();
    // console.log("TokenExpirationContext hit");
    
    return <>{children}</>;
};

export default TokenExpirationContext;
