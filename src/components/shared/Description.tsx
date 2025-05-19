import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IProduct } from "@/interfaces/product.schemas";

const Description = ({ product }: { product?: IProduct }) => {
    return (
        <div>
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="review">Review</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="rounded-lg border-2 bg-gray-50 p-5">
                    <div>
                        <p>{product?.description}</p>
                        <br />
                        <p className="font-semibold text-gray-900">Product details:</p>
                        <br />
                        <p>
                            Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at
                            posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem
                            vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet nisi
                            porttitor vel. Etiam tincidunt metus vel dui interdum sollicitudin.
                            Mauris sem ante, vestibulum nec orci vitae, aliquam mollis lacus. Sed et
                            condimentum arcu, id molestie tellus. Nulla facilisi. Nam scelerisque
                            vitae justo a convallis. Morbi urna ipsum, placerat quis commodo quis,
                            egestas elementum leo. Donec convallis mollis enim. Aliquam id mi quam.
                            Phasellus nec fringilla elit. Nulla mauris tellus, feugiat quis pharetra
                            sed, gravida ac dui. Sed iaculis, metus faucibus elementum tincidunt,
                            turpis mi viverra velit, pellentesque tristique neque mi eget nulla.
                            Proin luctus elementum neque et pharetra.{" "}
                        </p>
                    </div>
                </TabsContent>
                <TabsContent value="review" className="rounded-lg border-2 bg-gray-50 p-5">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-lg font-semibold text-gray-800">
                            No reviews yet, Be the first one to review !
                        </p>
                        <br />
                        <Button variant="default" size="lg" className="">
                            Write a review
                        </Button>
                        <br />
                        <br />
                        <p>Help others find the perfect product by leaving a review.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Description;
