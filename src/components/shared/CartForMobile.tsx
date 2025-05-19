"use client";
import { RootState } from "@/lib/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CartForMobile = () => {
    const { items } = useSelector((state: RootState) => state.cart);

    const [isMatched, setIsMatched] = useState<boolean>(false);
    const pathname = usePathname();
    //console.log("The pathname is: ", pathname);

    useEffect(() => {
        if (pathname.startsWith("/checkout")) {
            setIsMatched(true);
        } else {
            setIsMatched(false);
        }
    }, [pathname]);

    return (
        <>
            {/* <section className="bg-white sm:hidden shadow-[0px_-5px_14px_-0px_rgba(0,0,0,0.3)] h-12 w-full fixed bottom-0 left-0 rounded-t-xl px-2 py-1">
                <div className="h-[50px] w-[50px] bg-primary rounded-full flex items-center justify-center absolute -top-3 left-1/2 -translate-x-1/2">
                    <ShoppingBasket size={40} className="text-gray-900" />
                </div>
            </section> */}

            {}

            <Link href={"/checkout"} className="sm:hidden">
                <div
                    className={`fixed right-5 bottom-5 z-[3000] text-primary flex h-[45px] w-[45px] items-center justify-center rounded-full bg-[#d7f2dc] shadow-[0px_0px_4px_4px_rgba(0,0,0,0.2)] transition duration-200 ease-in-out ${isMatched ? "scale-0" : "scale-100"}`}>
                    <ShoppingCart size={25} />
                    {items && items.length > 0 ? (
                        <div className="absolute -top-1 -right-1 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-blue-200 text-xs text-gray-950 font-semibold">
                            {items?.length}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </Link>
        </>
    );
};

export default CartForMobile;

// box-shadow: 0px -20px 11px -3px rgba(0,0,0,0.1);
// box-shadow: 0px -11px 14px 0px rgba(0,0,0,0.1);
