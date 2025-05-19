"use client";
import getBannerImages from "@/api/banners/getBannerImages";
import { BannerImage } from "@/interfaces/common.schemas";
import { useQuery } from "@tanstack/react-query";
import { GalleryVertical } from "lucide-react";
import Image from "next/image";

const BannerPage = () => {
    const { data: bannerImages, isLoading } = useQuery({
        queryKey: ["bannerImages"],
        queryFn: getBannerImages,
    });

    console.log("bannerImages are:", bannerImages);
    return (
        <section className="px-4 py-5 sm:px-5 md:px-7 lg:px-12">
            <div className="mb-5 flex flex-col items-start justify-between gap-3 lg:flex-row">
                <div>
                    <h2 className="flex gap-2 text-center text-lg font-semibold text-primary sm:text-left">
                        <GalleryVertical />
                        Create New Banners
                    </h2>
                    <p className="text-start text-sm sm:text-left">
                        This is Banner Page here you can upload a new banner , update an existing
                        banner or delete a banner.
                    </p>
                </div>
            </div>

            <section>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {bannerImages && bannerImages.length > 0 ? (
                            bannerImages.map((image: BannerImage, index: number) => (
                                <div
                                    key={index}
                                    className="flex flex-col justify-center gap-3 lg:flex-row lg:justify-start lg:gap-5">
                                    <p className="text-center text-lg font-semibold text-nowrap text-slate-700 lg:text-start">
                                        #{index + 1} Banner
                                    </p>
                                    <Image
                                        src={image.imageURL}
                                        alt="banner"
                                        width={100}
                                        height={100}
                                        className="aspect-[1600/600] h-[150px] w-full p-2 min-[449px]:h-[300px] lg:w-[800px]"
                                    />
                                </div>
                            ))
                        ) : (
                            <div>No banner images found.</div>
                        )}
                    </>
                )}
            </section>
        </section>
    );
};

export default BannerPage;
