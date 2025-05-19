import { Headset, LockKeyhole, Truck, Wallet } from "lucide-react";

const ShocaseSection = () => {
    return (
        <main className="container mx-auto mt-5 mb-13 hidden rounded-lg bg-white p-5 drop-shadow-lg lg:block">
            <section className="grid grid-cols-4">
                <section className="flex items-center justify-center gap-3">
                    <div>
                        <Truck className="text-primary" size={40} />
                    </div>
                    <div>
                        <h2 className="font-bold text-[#1A1A1A]">Free Shipping</h2>
                        <p className="text-sm text-[#999999]">Free shipping on all your order</p>
                    </div>
                </section>
                <section className="flex items-center justify-center gap-3">
                    <div>
                        <Headset className="text-primary" size={40} />
                    </div>
                    <div>
                        <h2 className="font-bold text-[#1A1A1A]">Customer Support 24/7</h2>
                        <p className="text-sm text-[#999999]">Instant access to Support</p>
                    </div>
                </section>
                <section className="flex items-center justify-center gap-3">
                    <div>
                        <LockKeyhole className="text-primary" size={40} />
                    </div>
                    <div>
                        <h2 className="font-bold text-[#1A1A1A]">100% Secure Payment</h2>
                        <p className="text-sm text-[#999999]">We ensure your money is save</p>
                    </div>
                </section>
                <section className="flex items-center justify-center gap-3">
                    <div>
                        <Wallet className="text-primary" size={40} />
                    </div>
                    <div>
                        <h2 className="font-bold text-[#1A1A1A]">Money-Back Guarantee</h2>
                        <p className="text-sm text-[#999999]">30 Days Money-Back Guarantee</p>
                    </div>
                </section>
            </section>
        </main>
    );
};

export default ShocaseSection;
