import { Check } from "lucide-react";

interface Step {
    id: string;
    title: string;
}

interface ProgressStepsProps {
    steps: Step[];
    currentStep: number;
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
    return (
        <div className="relative">
            <div className="mb-4 flex h-2 overflow-hidden rounded bg-gray-200 text-xs">
                <div
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    className="flex flex-col justify-center bg-primary text-center whitespace-nowrap text-white shadow-none transition-all duration-500"></div>
            </div>
            <div className="flex justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center">
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                index < currentStep
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : index === currentStep
                                        ? "border-primary text-primary"
                                        : "border-gray-300 text-gray-300"
                            }`}>
                            {index < currentStep ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                <span>{index + 1}</span>
                            )}
                        </div>
                        <span
                            className={`mt-2 text-xs ${index <= currentStep ? "font-medium text-primary" : "text-muted-foreground"}`}>
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
