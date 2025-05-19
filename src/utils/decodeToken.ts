import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    exp: number; // Expiry timestamp
}
// Decode JWT and check expiry
export const decodeToken = (token: string): DecodedToken | null => {
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
