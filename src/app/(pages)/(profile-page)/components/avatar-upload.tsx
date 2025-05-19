"use client";

import { ImageFile } from "@/interfaces/common.schemas";
import { Camera, CircleUser } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useRef, type ChangeEvent } from "react";

interface AvatarUploadProps {
    image: ImageFile | null;
    setImage: React.Dispatch<React.SetStateAction<ImageFile | null>>;
    setIsImageChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AvatarUpload({ image, setImage, setIsImageChanged }: AvatarUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newImage = {
                id: URL.createObjectURL(file),
                file: file,
                preview: URL.createObjectURL(file),
                name: file.name,
                type: file.type,
            };
            setImage(newImage);
            if (setIsImageChanged) {
                setIsImageChanged(true);
            }
        }
    };

    // const removeImage = () => {
    //     if (image) {
    //         URL.revokeObjectURL(image.id);
    //     }
    //     setImage(null);
    // };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.add("border-primary");
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.currentTarget.classList.remove("border-primary");
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
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
            setImage(newImage);
        }
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="relative mx-auto w-fit max-w-2xl rounded-full border-2 border-dashed bg-white">
            {image ? (
                <Image
                    src={image?.preview || "/placeholder.svg"}
                    alt="Product preview"
                    priority
                    width={150}
                    height={150}
                    className="h-[170px] w-[170px] rounded-full object-cover object-center"
                />
            ) : (
                <div className="flex h-[170px] w-[170px] items-center justify-center rounded-full border bg-white shadow-lg drop-shadow-lg">
                    <CircleUser size={190} />
                </div>
            )}

            {/* <button
                type="button"
                onClick={removeImage}
                className="absolute top-1 right-1 rounded-full bg-white p-1 shadow-md"
                aria-label="Remove image">
                <X className="h-4 w-4 text-gray-600" />
            </button> */}
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-5 bottom-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#d7f2dc] shadow-lg drop-shadow-lg"
                aria-label="Upload image">
                <Camera className="h-5 w-5 text-gray-600" />
            </button>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                aria-label="Select product image"
            />
        </div>
    );
}
