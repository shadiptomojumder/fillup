"use client";

import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface EducationPhase2FormProps {
    onNext: () => void;
    onPrevious: () => void;
}

export function EducationPhase2Form({ onNext, onPrevious }: EducationPhase2FormProps) {
    const [isBachelorApplicable, setIsBachelorApplicable] = useState(false);
    const [isMastersApplicable, setIsMastersApplicable] = useState(false);

    return (
        <>
            <CardHeader>
                <CardTitle>Education Phase 2</CardTitle>
                <CardDescription>
                    Enter your Bachelor's and Master's degree information if applicable.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-start gap-3">
                        <h3 className="font-medium">Bachelor's Degree</h3>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="bachelor-applicable"
                                checked={isBachelorApplicable}
                                onCheckedChange={(checked) =>
                                    setIsBachelorApplicable(checked === true)
                                }
                            />
                            <Label
                                htmlFor="bachelor-applicable"
                                className="cursor-pointer text-sm font-normal">
                                If Applicable
                            </Label>
                        </div>
                    </div>
                    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${isBachelorApplicable?"":"hover:cursor-not-allowed"}`}>
                        <div className="space-y-2">
                            <Label htmlFor="bachelor-university">University/Institution</Label>
                            <Input
                                id="bachelor-university"
                                placeholder="University of Dhaka"
                                disabled={!isBachelorApplicable}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bachelor-degree">Degree</Label>
                            <Input
                                id="bachelor-degree"
                                placeholder="BSc in Computer Science"
                                disabled={!isBachelorApplicable}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bachelor-year">Passing Year</Label>
                            <Input
                                id="bachelor-year"
                                placeholder="2016"
                                disabled={!isBachelorApplicable}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bachelor-result">Result (CGPA/Class)</Label>
                            <Input
                                id="bachelor-result"
                                placeholder="3.80"
                                disabled={!isBachelorApplicable}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-start gap-3">
                        <h3 className="font-medium">Master's Degree</h3>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="masters-applicable"
                                checked={isMastersApplicable}
                                onCheckedChange={(checked) =>
                                    setIsMastersApplicable(checked === true)
                                }
                            />
                            <Label
                                htmlFor="masters-applicable"
                                className="cursor-pointer text-sm font-normal">
                                If Applicable
                            </Label>
                        </div>
                    </div>
                    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${isMastersApplicable?"":"hover:cursor-not-allowed"}`}>
                        <div className="space-y-2">
                            <Label htmlFor="masters-university">University/Institution</Label>
                            <Input
                                id="masters-university"
                                placeholder="University of Dhaka"
                                disabled={!isMastersApplicable}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="masters-degree">Degree</Label>
                            <Input
                                id="masters-degree"
                                placeholder="MSc in Computer Science"
                                disabled={!isMastersApplicable}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="masters-year">Passing Year</Label>
                            <Input
                                id="masters-year"
                                placeholder="2018"
                                disabled={!isMastersApplicable}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="masters-result">Result (CGPA/Class)</Label>
                            <Input
                                id="masters-result"
                                placeholder="3.90"
                                disabled={!isMastersApplicable}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={onPrevious}>
                    Back
                </Button>
                <Button type="button" onClick={onNext}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </>
    );
}
