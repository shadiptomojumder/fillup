import Link from "next/link";

const Footer = () => {
    return (
        <footer className="flex w-full flex-col gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
            <p className="text-sm font-semibold text-muted-foreground">
                © 2025 FormFiller. All rights reserved.
            </p>
            <nav className="flex gap-4 sm:ml-auto sm:gap-6">
                <Link className="text-xs underline-offset-4 hover:underline" href="#">
                    Terms of Service
                </Link>
                <Link className="text-xs underline-offset-4 hover:underline" href="#">
                    Privacy
                </Link>
            </nav>
        </footer>
    );
};

export default Footer;
