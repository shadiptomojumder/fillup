"use client";
import getProductById from "@/api/products/getProductById";
import ProductNotFound from "@/components/loading/ProductNotFound";
import Description from "@/components/shared/Description";
import SimilarProducts from "@/components/shared/SimilarProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Image as ImageIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const ProductDetailsPage = () => {
    const params = useParams(); // Get URL parameters

    const { productId } = params;

    // console.log("The productId is:", productId);
    const {
        data: product,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById({ productId: productId as string }),
    });

    console.log("The product is:", product);
    console.log("The error is:", error);

    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }
    if (error) {
        return <ProductNotFound />;
    }

    return (
        <main>
            <div className="container mx-auto my-10 px-3 sm:px-0 md:my-13">
                <section className="mb-15 flex flex-col items-start gap-10 sm:flex-row sm:gap-15 md:gap-25">
                    <div className="mx-auto rounded-sm border border-gray-200 bg-white p-0 shadow-lg sm:mx-0">
                        {isLoading ? (
                            <>
                                <Skeleton className="flex aspect-[415/332] h-[165px] w-[207px] items-center justify-center rounded-sm bg-gray-300 text-[230px] text-gray-400 sm:h-[332px] sm:w-[415px]">
                                    <ImageIcon className="h-[130px] w-[130px]" />
                                </Skeleton>
                            </>
                        ) : (
                            <>
                                {product && (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={300}
                                        height={300}
                                        className="aspect-[415/332] h-full w-full rounded-sm object-cover transition-all duration-300"
                                    />
                                )}
                            </>
                        )}
                    </div>
                    {isLoading ? (
                        <div className="flex w-full flex-col gap-3 bg-white sm:w-[45%]">
                            <Skeleton className="h-[20px] w-full rounded-full bg-gray-300" />
                            <Skeleton className="h-[18px] w-full rounded-full bg-gray-300" />
                            <Skeleton className="hidden h-[18px] rounded-full bg-gray-300 sm:block sm:w-[85%] md:w-[45%]" />
                            <Skeleton className="h-[20px] w-full rounded-full bg-gray-300 sm:w-[75%] md:w-[40%]" />
                            <Skeleton className="mt-4 h-[40px] w-full rounded-full bg-gray-300 sm:mt-7 md:w-[45%]" />
                        </div>
                    ) : (
                        <div className="mx-auto rounded-lg bg-white text-center sm:mx-0 sm:text-start">
                            <p className="mb-3 text-lg font-medium">{product?.name}</p>
                            <div className="mb-3 flex items-center justify-center gap-1.5 sm:justify-start">
                                <div className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 16 16">
                                        <g fill="none">
                                            <path
                                                fill="url(#fluentColorStar160)"
                                                d="M7.194 2.102a.9.9 0 0 1 1.614 0l1.521 3.082l3.401.494a.9.9 0 0 1 .5 1.535l-2.462 2.4l.581 3.387a.9.9 0 0 1-1.306.948L8.001 12.35l-3.042 1.6A.9.9 0 0 1 3.653 13l.58-3.387l-2.46-2.399a.9.9 0 0 1 .499-1.535l3.4-.494z"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="fluentColorStar160"
                                                    x1="14.5"
                                                    x2="1.125"
                                                    y1="14.332"
                                                    y2="1.72"
                                                    gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#FFD700" />
                                                    <stop offset="1" stopColor="#ffcd0f" />
                                                </linearGradient>
                                            </defs>
                                        </g>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 16 16">
                                        <g fill="none">
                                            <path
                                                fill="url(#fluentColorStar160)"
                                                d="M7.194 2.102a.9.9 0 0 1 1.614 0l1.521 3.082l3.401.494a.9.9 0 0 1 .5 1.535l-2.462 2.4l.581 3.387a.9.9 0 0 1-1.306.948L8.001 12.35l-3.042 1.6A.9.9 0 0 1 3.653 13l.58-3.387l-2.46-2.399a.9.9 0 0 1 .499-1.535l3.4-.494z"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="fluentColorStar160"
                                                    x1="14.5"
                                                    x2="1.125"
                                                    y1="14.332"
                                                    y2="1.72"
                                                    gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#FFD700" />
                                                    <stop offset="1" stopColor="#ffcd0f" />
                                                </linearGradient>
                                            </defs>
                                        </g>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 16 16">
                                        <g fill="none">
                                            <path
                                                fill="url(#fluentColorStar160)"
                                                d="M7.194 2.102a.9.9 0 0 1 1.614 0l1.521 3.082l3.401.494a.9.9 0 0 1 .5 1.535l-2.462 2.4l.581 3.387a.9.9 0 0 1-1.306.948L8.001 12.35l-3.042 1.6A.9.9 0 0 1 3.653 13l.58-3.387l-2.46-2.399a.9.9 0 0 1 .499-1.535l3.4-.494z"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="fluentColorStar160"
                                                    x1="14.5"
                                                    x2="1.125"
                                                    y1="14.332"
                                                    y2="1.72"
                                                    gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#FFD700" />
                                                    <stop offset="1" stopColor="#ffcd0f" />
                                                </linearGradient>
                                            </defs>
                                        </g>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 16 16">
                                        <g fill="none">
                                            <path
                                                fill="url(#fluentColorStar160)"
                                                d="M7.194 2.102a.9.9 0 0 1 1.614 0l1.521 3.082l3.401.494a.9.9 0 0 1 .5 1.535l-2.462 2.4l.581 3.387a.9.9 0 0 1-1.306.948L8.001 12.35l-3.042 1.6A.9.9 0 0 1 3.653 13l.58-3.387l-2.46-2.399a.9.9 0 0 1 .499-1.535l3.4-.494z"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="fluentColorStar160"
                                                    x1="14.5"
                                                    x2="1.125"
                                                    y1="14.332"
                                                    y2="1.72"
                                                    gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#FFD700" />
                                                    <stop offset="1" stopColor="#ffcd0f" />
                                                </linearGradient>
                                            </defs>
                                        </g>
                                    </svg>
                                </div>
                                <p className="text-base font-medium text-slate-600">5 Review</p>
                            </div>

                            <p className="mb-3 text-sm font-medium text-gray-600">
                                SKU: {product?.sku}
                            </p>
                            <p className="text-2xl font-medium text-primary">
                                ৳ {product?.finalPrice}
                            </p>
                            <button className="mt-8 hidden w-full items-center justify-center gap-1 rounded-full bg-[#00B307] py-1 text-white shadow-lg min-[424px]:flex">
                                <ShoppingCart size={20} className="text-[#FFFFFF]" />
                                Add to cart
                            </button>
                        </div>
                    )}
                </section>
                <Description product={product} />
            </div>
            <SimilarProducts />
        </main>
    );
};

export default ProductDetailsPage;
