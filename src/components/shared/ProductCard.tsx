import { Badge } from "@/components/ui/badge";
import { Product } from "@/interfaces/product.schemas";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import AddToCartButtonMobile from "./AddToCartButtonMobile";

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <section className="group relative z-50 flex h-full w-full flex-col justify-between rounded-md border bg-white p-[5px] shadow-lg transition-all duration-300 disabled:bg-red-400 sm:p-3">
            <div className="relative">
                <Image
                    src={product?.images[0]}
                    alt="product"
                    width={415}
                    height={332}
                    className="mx-auto aspect-[415/332] h-full w-full object-cover object-center"
                />

                {/* ADD TO CART BUTTON FOR MOBILE DEVICES */}
                <AddToCartButtonMobile product={product} />
            </div>
            <section className="mt-3 flex h-full flex-col justify-between gap-1 min-[424px]:mt-1">
                <Link href={`/products/${product?.id}`} passHref>
                    <h2 className="line-clamp-2 text-center text-sm font-medium text-ellipsis text-[#1A1A1A] capitalize transition-all duration-300 hover:underline">
                        {product?.name}
                    </h2>
                </Link>
                <div className="space-y-1 text-center sm:space-y-2">
                    <p className="text-sm font-medium text-[#1A1A1A] sm:text-base">
                        {product?.quantity}
                    </p>
                    <p className="text-base font-bold text-[#1A1A1A]">৳{product?.price}</p>

                    <AddToCartButton product={product} />
                </div>
            </section>

            {product?.stock === 0 && (
                <div className={`absolute top-0 left-0 h-full w-full rounded-md bg-gray-100/70`}>
                    {product?.stock === 0 && (
                        <Badge className="absolute top-2 left-2 bg-yellow-400 hover:bg-yellow-400">
                            Out of stocks
                        </Badge>
                    )}
                </div>
            )}
        </section>
    );
};

export default ProductCard;
