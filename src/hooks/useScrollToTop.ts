import { useRouter } from "next/router";
import { useEffect } from "react";

function useScrollToTop() {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);
}

export default useScrollToTop;
