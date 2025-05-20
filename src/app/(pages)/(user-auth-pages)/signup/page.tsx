"use client";
import SignupApi from "@/api/auth/signup";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupDataSchema, SignupDataSchema } from "@/interfaces/user.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const SignupPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignupDataSchema>({ resolver: zodResolver(signupDataSchema) });

    const { mutate, isPending } = useMutation({
        mutationFn: SignupApi,
        onSuccess: (response) => {
            // console.log("The Res in Signup page is:", response);
            // console.log("The Res.data in Signup page is:", response.data);

            if (response.statusCode === 201) {
                toast.success("Account successfully created");
                reset();
                router.push("/login");
            }
        },
        onError: (error: any) => {
            console.log("The Error in Signup page is:", error);

            // Check if user is offline
            if (!navigator.onLine) {
                toast.error("You're offline. Please check your internet connection.");
                return;
            }

            // If no response received (server is down or network error)
            if (!error?.response) {
                toast.error("Unable to connect to the server. Please try again later.");
                return;
            }

            const statusCode = error.response?.status;
            const errorMessage = error.response?.data?.message || "Something went wrong.";

            switch (statusCode) {
                case 400:
                    toast.warning(errorMessage || "Please fill in all required fields correctly.");
                    break;
                case 409:
                    toast.warning("An account with this email already exists.");
                    break;
                default:
                    toast.error("Unexpected error occurred. Please try again later.");
                    break;
            }
        },
    });

    const onSubmit: SubmitHandler<SignupDataSchema> = async (data) => {
        console.log("Form data is:", data);

        await mutate({ data });
    };
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-4 py-12">
            <Card className="w-full max-w-xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-center text-2xl font-bold">
                        Create an account
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your details to create your FormFiller account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="md:space-y-1">
                        <div className="grid grid-cols-2 gap-1 md:gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <Label htmlFor="firstName">
                                    First Name <span className="text-red-600">*</span>
                                </Label>
                                <Input
                                    {...register("firstName")}
                                    id="firstName"
                                    type="text"
                                    placeholder="John"
                                />
                                <div className="h-5">
                                    {errors.firstName && (
                                        <span className="text-xs text-red-500">
                                            {errors.firstName.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <Label htmlFor="lastName">
                                    Last Name <span className="text-red-600">*</span>
                                </Label>
                                <Input
                                    {...register("lastName")}
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                />
                                <div className="h-5">
                                    {errors.firstName && (
                                        <span className="text-xs text-red-500">
                                            {errors.firstName.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <Label htmlFor="email">
                                Email <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("email")}
                                id="email"
                                placeholder="m@example.com"
                                type="email"
                            />
                            <div className="h-5">
                                {errors.email && (
                                    <span className="text-xs text-red-500">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="">
                            <Label htmlFor="password">
                                Password <span className="text-red-600">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    {...register("password")}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-0 right-0 h-full px-3"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">
                                        {showPassword ? "Hide password" : "Show password"}
                                    </span>
                                </Button>
                            </div>
                            <div className="h-5">
                                {errors.password && (
                                    <span className="text-xs text-red-500">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full" type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader className="animate-spin" />
                                    Creating account
                                </>
                            ) : (
                                <>Create account</>
                            )}
                        </Button>
                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="underline underline-offset-4 hover:text-primary">
                                Log in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
            <div className="text-center text-xs text-balance text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking create account, you agree to our <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
};

export default SignupPage;
