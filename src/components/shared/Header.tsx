import { Menu } from "lucide-react";
import Link from "next/link";
import AuthUser from "./AuthUser";

const Header = () => {
    return (
        <header className="sticky top-0 z-[1000] w-full bg-white drop-shadow-md px-2 py-2 sm:px-0 sm:py-3 md:py-4">
            <section className="container mx-auto">
                <section className="flex justify-between items-center">
                    <section className="flex items-center gap-0.5">
                        <Menu size={28} className="sm:hidden" />
                        <Link href="/" className="flex items-center justify-center">
                            <span className="text-2xl font-bold font-montserrat capitalize italic">FillUP</span>
                        </Link>
                    </section>

                    <nav className="flex gap-4 sm:gap-6">
                        <Link
                            className="text-base font-semibold font-rubik"
                            href="#">
                            Features
                        </Link>
                        <Link
                            className="text-base font-semibold font-rubik"
                            href="#">
                            How It Works
                        </Link>
                        <Link
                            className="text-base font-semibold font-rubik"
                            href="/login">
                            Login
                        </Link>
                    </nav>

                    <section className="flex items-center gap-3 justify-self-end">
                        <AuthUser />
                    </section>
                </section>
            </section>
        </header>
    );
};

export default Header;
