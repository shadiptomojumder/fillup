"use client";
import { Card } from "@/components/ui/card";
import { RootState } from "@/lib/store";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AddressForm } from "../../components/address-form";
import { EducationPhase1Form } from "../../components/education-phase1-form";
import { EducationPhase2Form } from "../../components/education-phase2-form";
import { PersonalInformationForm } from "../../components/personal-info-form";
import { ProgressSteps } from "../../components/progress-steps";

export default function ProfilePage() {
    const [isSaving, setIsSaving] = useState(false);

    // Select profile data from Redux
    const { profile } = useSelector((state: RootState) => state.profile);
    console.log("Profile data:", profile);

    const [currentStep, setCurrentStep] = useState(() => {
        // Try to get the saved step from localStorage
        if (typeof window !== "undefined") {
            const savedStep = localStorage.getItem("formCurrentStep");
            return savedStep ? Number.parseInt(savedStep, 10) : 0;
        }
        return 0;
    });

    const steps = [
        { id: "personal", title: "Personal Information" },
        { id: "education-phase1", title: "Education Phase 1" },
        { id: "education-phase2", title: "Education Phase 2" },
        { id: "address", title: "Address" },
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            const newStep = currentStep + 1;
            setCurrentStep(newStep);
            localStorage.setItem("formCurrentStep", newStep.toString());
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            const newStep = currentStep - 1;
            setCurrentStep(newStep);
            localStorage.setItem("formCurrentStep", newStep.toString());
            window.scrollTo(0, 0);
        }
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-6">
                <Link
                    href="/"
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </div>

            <div className="mx-auto flex max-w-4xl flex-col space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
                    <p className="text-muted-foreground">
                        Enter your personal details that will be used to auto-fill government job
                        applications.
                    </p>
                </div>

                {/* Progress Indicator */}
                <ProgressSteps steps={steps} currentStep={currentStep} />

                <Card>
                    {currentStep === 0 && (
                        <PersonalInformationForm onNext={nextStep} onCancel={handleCancel} />
                    )}

                    {currentStep === 1 && (
                        <EducationPhase1Form onNext={nextStep} onPrevious={prevStep} />
                    )}

                    {currentStep === 2 && (
                        <EducationPhase2Form onNext={nextStep} onPrevious={prevStep} />
                    )}

                    {currentStep === 3 && <AddressForm onPrevious={prevStep} isSaving={isSaving} />}
                </Card>
            </div>
        </div>
    );
}
