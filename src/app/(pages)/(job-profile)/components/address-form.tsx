"use client";

import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddressFormProps {
    onPrevious: () => void;
    isSaving: boolean;
}

export function AddressForm({ onPrevious, isSaving }: AddressFormProps) {
    return (
        <>
            <CardHeader>
                <CardTitle>Address Information</CardTitle>
                <CardDescription>Enter your permanent and present address details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <h3 className="font-medium">Permanent Address</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="permanent-address-en">Address Line (English)</Label>
                            <Textarea
                                id="permanent-address-en"
                                placeholder="Village/House No., Road, Area"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="permanent-address-bn">Address Line (Bangla)</Label>
                            <Textarea
                                id="permanent-address-bn"
                                placeholder="গ্রাম/বাড়ি নং, রাস্তা, এলাকা"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="permanent-district">District</Label>
                            <Input id="permanent-district" placeholder="Dhaka" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="permanent-upazila">Upazila/Thana</Label>
                            <Input id="permanent-upazila" placeholder="Mirpur" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="permanent-post-office">Post Office</Label>
                            <Input id="permanent-post-office" placeholder="Mirpur" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="permanent-post-code">Post Code</Label>
                            <Input id="permanent-post-code" placeholder="1216" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-medium">Present Address</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="present-address-en">Address Line (English)</Label>
                            <Textarea
                                id="present-address-en"
                                placeholder="Village/House No., Road, Area"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="present-address-bn">Address Line (Bangla)</Label>
                            <Textarea
                                id="present-address-bn"
                                placeholder="গ্রাম/বাড়ি নং, রাস্তা, এলাকা"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="present-district">District</Label>
                            <Input id="present-district" placeholder="Dhaka" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="present-upazila">Upazila/Thana</Label>
                            <Input id="present-upazila" placeholder="Mirpur" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="present-post-office">Post Office</Label>
                            <Input id="present-post-office" placeholder="Mirpur" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="present-post-code">Post Code</Label>
                            <Input id="present-post-code" placeholder="1216" />
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={onPrevious}>
                    Back
                </Button>
                <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </CardFooter>
        </>
    );
}
