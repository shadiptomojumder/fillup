"use client";
import getProducts from "@/api/products/getProducts";
import ProductLoading from "@/components/loading/ProductLoading";
import ProductCard from "@/components/shared/ProductCard";
import { Carousel, CarouselContent, CarouselItem, Next, Previous } from "@/components/ui/carousel";
import { APIResponse } from "@/interfaces/common.schemas";
import { Product } from "@/interfaces/product.schemas";
import { useQuery } from "@tanstack/react-query";
import leaf1 from "../../../../../public/banners/leaf4.jpg";

const FeaturedProducts = () => {
    const { data, isLoading } = useQuery<APIResponse<Product[]>>({
        queryKey: ["products", { isFeatured: true }],
        queryFn: () => getProducts({ isFeatured: true }),
    });
    const products = data?.data;


    return (
        <div className="overflow-hidden py-12" style={{ backgroundImage: `url(${leaf1.src})` }}>
            <div className="container mx-auto px-3 sm:px-0">
                <h2 className="mb-5 text-center font-rubik text-xl font-semibold text-white uppercase md:text-lg lg:text-2xl">
                    Featured Products 🎇
                </h2>

                <Carousel
                    opts={{
                        dragFree: true,
                    }}>
                    <CarouselContent className="-ml-8">
                        {isLoading ? (
                            <>
                                {Array.from({ length: 6 }, (_, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="w-full basis-1/2 pl-8 min-[450px]:basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/6">
                                        <ProductLoading />
                                    </CarouselItem>
                                ))}
                            </>
                        ) : (
                            <>
                                {products &&
                                    products.length > 0 &&
                                    products.map((product: Product, index: number) => (
                                        <CarouselItem
                                            key={index}
                                            className="w-full basis-1/2 pl-8 min-[450px]:basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/6">
                                            <ProductCard product={product} />
                                        </CarouselItem>
                                    ))}
                            </>
                        )}
                    </CarouselContent>
                    {!isLoading && (
                        <>
                            <Previous className="-left-3.5 bg-primary text-white" />
                            <Next className="-right-3.5 bg-primary text-white" />
                        </>
                    )}
                </Carousel>
            </div>
        </div>
    );
};

export default FeaturedProducts;
