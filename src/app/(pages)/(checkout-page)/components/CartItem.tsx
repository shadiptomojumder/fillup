import { deleteFromCart, ICartItem, removeFromCart, updateCount } from "@/lib/slices/cartSlice";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";

const CartItem = ({ cartItem }: { cartItem: ICartItem }) => {
    const dispatch = useDispatch();

    const handleDeleteFromCart = (id: string) => {
        dispatch(deleteFromCart(id)); // Removes entire product
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) {
            dispatch(removeFromCart(cartItem.id));
        } else {
            dispatch(updateCount({ id: cartItem.id, count: newQuantity }));
        }
    };
    return (
        <div className="flex items-start border-b border-slate-400 bg-white py-2 last:border-0">
            <Image
                src={cartItem?.images || ""}
                width={70}
                height={70}
                alt="product image"
                className="aspect-[415/332] h-full max-h-[80px] w-full max-w-[100px] object-cover object-center"
            />
            <section className="flex w-full flex-col gap-1">
                <h2 className="text-sm font-medium capitalize">{cartItem?.name}</h2>
                <div className="flex w-full flex-col items-start justify-between gap-2 min-[425px]:flex-row sm:gap-5">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-nowrap">
                            ৳{cartItem && cartItem.price && cartItem?.price * cartItem.count}
                        </p>
                        <div className="flex items-center gap-[2px]">
                            <p className="text-sm font-medium text-slate-500">৳{cartItem?.price}</p>
                            <p className="text-xs font-medium text-slate-400">|</p>
                            <p className="text-sm font-medium text-slate-500">piece</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={()=>handleDeleteFromCart(cartItem?.id)} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-200 text-red-700">
                            <Trash2 size={18} />
                        </button>
                        <div className="flex w-fit items-center justify-around gap-1 rounded-full border-2 border-gray-600 bg-slate-100 text-white shadow-lg">
                            <button
                                onClick={() => handleQuantityChange(cartItem?.count - 1)}
                                className="cursor-pointer rounded-l-full border-r-2 border-gray-600 p-[1px] px-2 text-gray-800">
                                <Minus />
                            </button>
                            <p className="flex w-7 items-center justify-center text-base font-semibold text-gray-900">
                                {cartItem?.count}
                            </p>
                            <button
                                onClick={() => handleQuantityChange(cartItem?.count + 1)}
                                className="cursor-pointer rounded-r-full border-l-2 border-gray-600 p-[1px] px-2 text-gray-800">
                                <Plus />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CartItem;
