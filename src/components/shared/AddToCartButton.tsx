import { Product } from "@/interfaces/product.schemas";
import { addToCart, removeFromCart, updateCount } from "@/lib/slices/cartSlice";
import { RootState } from "@/lib/store";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const AddToCartButton = ({ product }: { product: Product }) => {
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
            {quantity > 0 ? (
                <div className="hidden min-h-[32px] w-full items-center justify-between gap-1 rounded-full bg-yellow-500 shadow-lg sm:flex">
                    <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="flex h-[32px] w-[50px] cursor-pointer items-center justify-center rounded-l-full border-r-2 border-gray-600 text-gray-800">
                        <Minus />
                    </button>
                    <p className="text-base font-semibold text-gray-900">
                        {quantity} <span className="hidden 2xl:inline">in Bag</span>
                    </p>
                    <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="flex h-[32px] w-[50px] cursor-pointer items-center justify-center rounded-r-full border-l-2 border-gray-600 text-gray-800">
                        <Plus />
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleAddToCart}
                    className="hidden w-full cursor-pointer items-center justify-center gap-1 rounded-full bg-[#00B307] py-1 text-white shadow-lg sm:flex">
                    <ShoppingCart size={20} />
                    Add to cart
                </button>
            )}
        </>
    );
};

export default AddToCartButton;
