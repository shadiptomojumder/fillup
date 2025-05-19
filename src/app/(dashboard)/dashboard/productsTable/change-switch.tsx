import updateProduct from "@/api/products/updateProduct";
import { Switch } from "@/components/ui/switch";
import { APIError } from "@/interfaces/common.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const CnangeSwitch = ({
    productId,
    fieldName,
    initialValue,
}: {
    productId: string;
    fieldName: "isWeekendDeal" | "isFeatured";
    initialValue?: boolean;
}) => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateProduct,
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("Product Successfully Updated");
                queryClient.invalidateQueries({ queryKey: ["products"] });
            }
        },
        onError: (error: APIError) => {
            console.log("The CnangeSwitch Page Error is: ", error);

            if (error.statusCode === 409) {
                toast.warning("Product already exist.");
            } else if (error.statusCode === 400) {
                toast.warning(error.message || "Please fill all the required fields!");
            } else {
                toast.error(error.message || "An unknown error occurred.");
            }
        },
    });

    const handleSwitchChange = (checked: boolean) => {
        // console.log("The Switch was clicked:", checked);

        mutate({ productId, data: { [fieldName]: checked } });
    };
    return (
        <Switch
            id={fieldName}
            name={fieldName}
            className=""
            defaultChecked={initialValue}
            disabled={isPending}
            onCheckedChange={(e) => handleSwitchChange(e)}
        />
    );
};

export default CnangeSwitch;
