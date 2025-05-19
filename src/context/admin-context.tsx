"use client";
import { decodeToken } from "@/utils/decodeToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminContext = ({ children,role }: { children: React.ReactNode ,role:string}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        // console.log("Access token:", accessToken);

        const decodedAccessToken = decodeToken(accessToken || "");
        // console.log("Decoded access token:", decodedAccessToken);

        if (!decodedAccessToken) {
            router.replace("/login");
        } else if (decodedAccessToken.role !== role && decodedAccessToken.role !== "ADMIN") {
            // ✅ Allow ADMIN to access everything
            router.replace("/unauthorized");
        } else {
            setLoading(false); // ✅ Allow access
        }
    }, [router, role]); // ✅ Added missing dependency `role`

    if (loading) return <div className="h-screen bg-white w-screen"></div>; // ✅ Prevents flashing of protected content

    return <>{children}</>;
};

export default AdminContext;
