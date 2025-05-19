import { Skeleton } from "@/components/ui/skeleton";

const CategoryLoading = () => {
    return (
        <section className="flex w-full flex-col justify-between rounded-md border bg-white p-3 shadow">
            <Skeleton className="mx-auto mb-5 h-[80px] w-full bg-gray-300 sm:h-[100px]" />

            <div className="mx-auto flex w-[60%] items-center justify-between gap-3">
                <Skeleton className="mx-auto h-[10px] w-full bg-gray-300 md:h-[15px]" />
                <Skeleton className="mx-auto h-[10px] w-full bg-gray-300 md:h-[15px]" />
            </div>
            <Skeleton className="mx-auto mt-2 h-[20px] w-full rounded-full bg-gray-300 md:mt-4 md:h-[32px]" />
        </section>
    );
};

export default CategoryLoading;
