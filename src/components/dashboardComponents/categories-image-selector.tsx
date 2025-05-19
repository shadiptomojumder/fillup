"use client";
import { ImageFile } from "@/interfaces/common.schemas";
import { X } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useRef, type ChangeEvent } from "react";

interface CategoryImageSelectorProps {
    images: { thumbnail: ImageFile | null; logo: ImageFile | null };
    setImages: React.Dispatch<
        React.SetStateAction<{ thumbnail: ImageFile | null; logo: ImageFile | null }>
    >;
    setIsImageChanged?: React.Dispatch<React.SetStateAction<{ thumbnail: boolean; logo: boolean }>>;
}

export default function CategoriesImageSelector({
    images,
    setImages,
    setIsImageChanged,
}: CategoryImageSelectorProps) {
    const thumbnailInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>, type: "thumbnail" | "logo") => {
        const file = event.target.files?.[0];
        if (file) {
            const newImage = {
                id: URL.createObjectURL(file),
                file: file,
                preview: URL.createObjectURL(file),
                name: file.name,
                type: file.type,
            };

            setImages((prevImages) => ({ ...prevImages, [type]: newImage }));

            if (setIsImageChanged) {
                setIsImageChanged((prevState) => ({ ...prevState, [type]: true }));
            }
        }
    };

    const removeImage = (type: "thumbnail" | "logo") => {
        if (images[type]) {
            URL.revokeObjectURL(images[type]!.id);
        }
        setImages((prevImages) => ({ ...prevImages, [type]: null }));
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.add("border-primary");
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.currentTarget.classList.remove("border-primary");
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, type: "thumbnail" | "logo") => {
        event.preventDefault();
        event.currentTarget.classList.remove("border-primary");
        const file = event.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const newImage = {
                id: URL.createObjectURL(file),
                file: file,
                preview: URL.createObjectURL(file),
                name: file.name,
                type: file.type,
            };
            setImages((prevImages) => ({ ...prevImages, [type]: newImage }));
            if (setIsImageChanged) {
                setIsImageChanged((prevState) => ({ ...prevState, [type]: true }));
            }
        }
    };

    return (
        <div className="mx-auto w-full max-w-2xl">
            {/* Thumbnail */}
            <div className="mb-5">
                <p className="py-2 text-base font-semibold">
                    Select Thumbnail <span className="text-red-600">*</span>
                </p>
                {images.thumbnail ? (
                    <div className="relative mx-auto w-fit">
                        <Image
                            src={images.thumbnail.preview || "/placeholder.svg"}
                            alt="Thumbnail preview"
                            width={100}
                            height={100}
                            className="aspect-[5.88] h-full w-full rounded-lg object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage("thumbnail")}
                            className="absolute top-1 right-1 rounded-full bg-white p-1 shadow-md"
                            aria-label="Remove image">
                            <X className="h-4 w-4 text-gray-600" />
                        </button>
                    </div>
                ) : (
                    <div className="col-span-4 flex h-28 w-full items-center justify-center rounded-lg bg-white font-semibold text-primary">
                        No image seleted
                    </div>
                )}
                <div
                    className="mt-3 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-[#d7f2dc] px-4 py-6 text-center transition-colors duration-200 hover:border-primary"
                    onClick={() => thumbnailInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(event) => handleDrop(event, "thumbnail")}>
                    <input
                        type="file"
                        ref={thumbnailInputRef}
                        onChange={(event) => handleFileChange(event, "thumbnail")}
                        accept="image/*"
                        className="hidden"
                        aria-label="Select thumbnail image"
                    />
                    <p className="font-semibold text-gray-600">
                        Click to select or drag and drop thumbnail image here (1536*261 pixels
                        recommended)
                    </p>
                </div>
            </div>

            {/* Logo */}
            <div>
                <p className="py-2 text-base font-semibold">
                    Select Logo <span className="text-red-600">*</span>
                </p>
                {images.logo ? (
                    <div className="relative mx-auto w-fit">
                        <Image
                            src={images.logo.preview || "/placeholder.svg"}
                            alt="Logo preview"
                            width={100}
                            height={100}
                            className="h-32 w-fit rounded-lg object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage("logo")}
                            className="absolute top-1 right-1 rounded-full bg-white p-1 shadow-md"
                            aria-label="Remove image">
                            <X className="h-4 w-4 text-gray-600" />
                        </button>
                    </div>
                ) : (
                    <div className="col-span-4 flex h-32 w-full items-center justify-center rounded-lg bg-white font-semibold text-primary">
                        No image seleted
                    </div>
                )}
                <div
                    className="mt-3 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-[#d7f2dc] px-4 py-8 text-center transition-colors duration-200 hover:border-primary"
                    onClick={() => logoInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(event) => handleDrop(event, "logo")}>
                    <input
                        type="file"
                        ref={logoInputRef}
                        onChange={(event) => handleFileChange(event, "logo")}
                        accept="image/*"
                        className="hidden"
                        aria-label="Select logo image"
                    />
                    <p className="font-semibold text-gray-600">
                        Click to select or drag and drop logo image here (300*300 pixels
                        recommended)
                    </p>
                </div>
            </div>
        </div>
    );
}
