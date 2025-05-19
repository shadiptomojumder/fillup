import { Product } from "@/interfaces/product.schemas";
import { addToCart, removeFromCart, updateCount } from "@/lib/slices/cartSlice";
import { RootState } from "@/lib/store";
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const AddToCartButtonMobile = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();
    const { items, isLoading } = useSelector((state: RootState) => state.cart);
    console.log("Items on cart: ", items);
    console.log("Cart Loading: ", isLoading);

    // Find the product in the cart
    const cartItem = items.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.count : 0; // Default to 0 if not in cart

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product })); // Ensure unique ID
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(updateCount({ id: product.id, count: newQuantity }));
        }
    };
    return (
        <>
            {/* ADD TO CART BUTTON FOR MOBILE DEVICES */}

            {quantity > 0 ? (
                <>
                    <div className="absolute bottom-0 left-1/2 flex w-[90%] -translate-x-1/2 items-center justify-between gap-1 rounded-full bg-yellow-500 text-white shadow-lg sm:hidden">
                        <button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            className="w-fit p-[1px] px-3 text-gray-800">
                            <Minus />
                        </button>
                        <p className="text-base font-semibold text-gray-900">{quantity}</p>
                        <button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            className="w-fit p-[1px] px-3 text-gray-800">
                            <Plus />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div
                        onClick={handleAddToCart}
                        className="absolute right-3 bottom-0 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#d7f2dc] text-primary shadow-2xl sm:hidden">
                        <Plus />
                    </div>
                </>
            )}
        </>
    );
};

export default AddToCartButtonMobile;
