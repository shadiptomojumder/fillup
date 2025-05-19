import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Define protected routes and their allowed roles
// const protectedRoutes: Record<string, string[]> = {
//     "/dashboard": ["ADMIN"], // Both users & admins can access
//     "/my-profile": ["USER", "ADMIN"], // Both users & admins can access
// };

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

// Middleware function
export function middleware(req: NextRequest) {
    const token = req.cookies.get("accessToken")?.value;
    console.log("Token from Cookies:", token);

    const decoded = token ? decodeToken(token) : null;
    console.log("Decoded Token Data:", decoded);
    const userRole = decoded?.role;
    console.log("userRole from Cookies:", userRole);

    // Check if the requested route is protected
    // const matchedRoute = Object.keys(protectedRoutes).find((route) =>
    //     req.nextUrl.pathname.startsWith(route),
    // );

    // if (matchedRoute) {
    //     const allowedRoles = protectedRoutes[matchedRoute];

    //     // If no token or role is found, redirect to login
    //     if (!token) {
    //         return NextResponse.redirect(new URL("/login", req.url));
    //     }

    //     // If user role is not allowed, redirect to unauthorized page
    //     if (userRole && !allowedRoles.includes(userRole)) {
    //         return NextResponse.redirect(new URL("/unauthorized", req.url));
    //     }
    // }

    // Allow the request if everything is fine
    return NextResponse.next();
}

// Define the routes where middleware should run
export const config = {
    matcher: ["/my-profile", "/dashboard/:path*", "/dashboard/admin"], // Protect these routes
};
