"use client";
import { Label } from "@/components/ui/label";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartItemLoading from "../components/CartItemLoading";

const Checkout = () => {
    const { items, isLoading } = useSelector((state: RootState) => state.cart);
    const { user } = useSelector((state: RootState) => state.user);

    console.log("Items on cart: ", items);
    console.log("Cart Loading: ", isLoading);
    const calculateTotal = () => {
        const total = items.reduce((accumulator, item) => {
            const itemTotal = item.count * (item?.price ?? 0);
            return accumulator + itemTotal;
        }, 0);
        return total;
    };

    return (
        <main className="min-h-[70dvh] pt-5 pb-10 md:py-10">
            <section className="container mx-auto px-3 sm:px-0">
                <h2 className="pb-5 text-center text-2xl font-bold md:py-10">Checkout</h2>
                <section className="grid grid-cols-12 gap-3">
                    <div className="col-span-12 rounded-md border-2 p-2 md:col-span-8 md:p-5">
                        {/* <ProductCartCardLoading/> */}
                        {isLoading ? (
                            <>
                                {Array.from({ length: 2 }, (_, index) => (
                                    <CartItemLoading key={index} />
                                ))}
                            </>
                        ) : items.length > 0 ? (
                            <>
                                {items &&
                                    items.length > 0 &&
                                    items.map((cartItem) => {
                                        return <CartItem key={cartItem.id} cartItem={cartItem} />;
                                    })}
                            </>
                        ) : (
                            <>
                                <p className="text-center text-lg font-semibold text-slate-600">
                                    No product for checkout
                                </p>
                                {/* <PiEmptyBold className="mx-auto mt-2 text-[70px] text-gray-300 md:mt-8 md:text-[150px]" /> */}
                            </>
                        )}
                    </div>

                    <div className="col-span-12 md:col-span-1"></div>
                    <div className="col-span-12 h-fit space-y-4 md:col-span-3">
                        <div className="h-fit rounded-md bg-slate-100">
                            <div className="flex items-center justify-between rounded-t-md bg-primary px-4 py-2">
                                <h2 className="text-base font-semibold">Delivery address</h2>

                                {/* <AddNewAddressModal
                                    user={user as User}
                                    setUser={setUser}
                                /> */}
                            </div>
                            {user && user.address ? (
                                <div className="px-4 py-4">
                                    <p className="text-sm font-bold capitalize">
                                        {user?.firstName},
                                    </p>
                                    <p className="text-sm">{user?.phone}</p>
                                    <p className="text-sm capitalize">{user?.address}</p>
                                </div>
                            ) : (
                                <div className="px-4 py-4">
                                    <p className="text-center text-sm font-medium capitalize">
                                        No address added
                                    </p>
                                </div>
                            )}

                            {/* <div className="px-4 py-4">
                                <p className="text-sm font-bold capitalize">Shadipto mojumder,</p>
                                <p className="text-sm ">+8801892157351</p>
                                <p className="text-sm ">42 Mollapara Rd, Dhaka, Bangladesh</p>
                            </div> */}
                        </div>
                        <div className="h-fit space-y-2 rounded-md border-2 p-4">
                            {/* <h2 className="text-xl font-bold">Cart Total</h2> */}
                            <div className="flex items-center justify-between gap-5 border-b-2 border-slate-400 py-2">
                                <Label className="text-sm font-semibold text-slate-500">
                                    Subtotal:
                                </Label>
                                <p className="text-sm font-bold">৳{calculateTotal()}</p>
                            </div>
                            <div className="flex items-center justify-between gap-5 border-b-2 border-slate-400 py-2">
                                <Label className="text-sm font-semibold text-slate-500">
                                    Shipping:
                                </Label>
                                <p className="text-sm font-bold capitalize">Free</p>
                            </div>
                            <div className="flex items-center justify-between gap-5 py-2">
                                <Label className="text-sm font-semibold text-slate-500">
                                    Total:
                                </Label>
                                <p className="text-sm font-bold capitalize">৳{calculateTotal()}</p>
                            </div>
                            <button className="flex w-full items-center justify-center rounded-full bg-primary py-2 text-sm font-semibold text-white shadow-lg">
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    );
};

export default Checkout;
