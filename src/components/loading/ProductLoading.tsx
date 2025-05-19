import { Skeleton } from "@/components/ui/skeleton";

const ProductLoading = () => {
    return (
        <section className="flex w-full flex-col justify-between rounded-md border bg-white p-3 shadow">
            {/* <Skeleton className="mx-auto mb-3 h-[80px] w-full bg-gray-300 sm:h-[100px] md:h-[160px]" /> */}
            <Skeleton className="mx-auto mb-3 aspect-[415/332] h-full w-full bg-gray-300" />

            <Skeleton className="mx-auto mb-3 h-[18px] w-full rounded-full bg-gray-300" />
            <div className="mx-auto flex w-[60%] items-center justify-between gap-3">
                <Skeleton className="mx-auto h-[12px] w-full bg-gray-300 md:h-[15px]" />
                <Skeleton className="mx-auto h-[12px] w-full bg-gray-300 md:h-[15px]" />
            </div>
            <Skeleton className="mx-auto mt-3 h-[18px] w-full rounded-full bg-gray-300" />
            <Skeleton className="mx-auto mt-2 h-[20px] w-full rounded-full bg-gray-300 md:mt-4 md:h-[32px]" />
        </section>
    );
};

export default ProductLoading;
