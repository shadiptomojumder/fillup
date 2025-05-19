"use client";
import getCategories from "@/api/categories/getCategories";
import CategoryLoading from "@/components/loading/CategoryLoading";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Category } from "@/interfaces/category.schemas";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const PopularCategorieSection = () => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });

    return (
        <section className="container mx-auto mb-10 px-3 sm:px-0">
            <Carousel
                opts={{
                    dragFree: true,
                }}>
                <div className="flex justify-between pb-5">
                    <h2 className="text-xl font-semibold text-black md:text-lg lg:text-2xl">
                        Popular Categories
                    </h2>
                    <div className="relative w-[80px]">
                        <CarouselPrevious
                            variant="default"
                            className="absolute top-1/2 left-0 z-50 bg-primary text-white"
                        />
                        <CarouselNext
                            variant="default"
                            className="absolute top-1/2 right-0 z-50 bg-primary text-white"
                        />
                    </div>
                </div>
                <CarouselContent className="-ml-8">
                    {isLoading ? (
                        <>
                            {Array.from({ length: 10 }, (_, index) => (
                                <CarouselItem
                                    key={index}
                                    className="w-full basis-1/2 min-[450px]:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/6 2xl:basis-1/6">
                                    <CategoryLoading />
                                </CarouselItem>
                            ))}
                        </>
                    ) : (
                        <>
                            {categories &&
                                categories.length > 0 &&
                                categories.map((category: Category, index: number) => (
                                    <CarouselItem
                                        key={index}
                                        className="w-full basis-1/2 pl-8 min-[450px]:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/6 2xl:basis-1/6">
                                        <Link href={`/products?category=${category?.id}`}>
                                            <div className="h-full rounded-lg border bg-white p-2 shadow-md">
                                                <div className="flex items-center justify-center rounded-lg bg-white">
                                                    <Image
                                                        src={category?.logo}
                                                        alt="food"
                                                        width={200}
                                                        height={200}
                                                        className="w-[166px] object-cover object-center"
                                                    />
                                                </div>
                                                <p className="mt-1 text-center text-sm font-semibold capitalize group-hover:text-[#2C742F] sm:text-base">
                                                    {category?.title}
                                                </p>
                                            </div>
                                        </Link>
                                    </CarouselItem>
                                ))}
                        </>
                    )}
                </CarouselContent>
                {/* <CarouselPrevious />
                <CarouselNext /> */}
            </Carousel>
        </section>
    );
};

export default PopularCategorieSection;
