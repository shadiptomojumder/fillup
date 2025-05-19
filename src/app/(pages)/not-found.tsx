"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter()
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <div className="max-w-md space-y-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404</h1>
                    <h2 className="text-2xl font-semibold tracking-tight">Page Not Found</h2>
                    <p className="text-muted-foreground">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
                        been moved, deleted, or never existed.
                    </p>
                </div>

                <div className="flex flex-col justify-center gap-2 sm:flex-row">
                    <Button asChild variant="outline">
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            <span>Home</span>
                        </Link>
                    </Button>
                    <Button asChild>
                        <button onClick={() => router.back()} className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Go Back</span>
                        </button>
                    </Button>
                </div>
            </div>
        </div>
    );
}
