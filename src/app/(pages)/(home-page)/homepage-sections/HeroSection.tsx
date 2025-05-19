"use client";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Banner1 from "../../../../../public/banners/leaf4.jpg";

const HeroSection = () => {
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

    return (
        <section className="container px-2 sm:px-0 mx-auto w-full py-12 md:py-24 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                            Auto-fill Government Job Applications
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl">
                            Save time by automatically filling out repetitive government job
                            application forms with your personal details.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Link href="/signup">
                            <Button size="lg" className="gap-1">
                                Get Started
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="#how-it-works">
                            <Button size="lg" variant="outline">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Image
                        alt="Form Filler Demo"
                        className="rounded-lg object-cover"
                        src={Banner1}
                        width={600}
                        height={600}
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
