import { logout as logoutApi } from "@/api/auth/logout";
import { store } from "@/lib/store";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import { logout, setLoading } from "../lib/slices/userSlice";

const useLogout = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(setLoading(true)); // Set loading state to true

        // Clear user state
        dispatch(logout());

        // Clear localStorage
        localStorage.clear();
        localStorage.removeItem("accessToken");

        // Clear all persisted state
        persistStore(store).purge();

        // Call the logout API
        try {
            await logoutApi();
        } catch (error) {
            console.log("Logout API Error:", error);
        }

        // Clear cookies
        document.cookie.split(";").forEach((cookie) => {
            const [name] = cookie.split("=");
            document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        });

        dispatch(setLoading(false)); // Set loading state to false
        // Redirect to home page
        window.location.href = "/";
    };

    return handleLogout;
};
export default useLogout;
