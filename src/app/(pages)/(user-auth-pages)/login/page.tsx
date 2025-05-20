"use client";
import login from "@/api/auth/login";
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
import { loginDataSchema, LoginDataSchema } from "@/interfaces/user.schemas";
import { setUser } from "@/lib/slices/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginDataSchema>({ resolver: zodResolver(loginDataSchema) });

    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            // console.log("The Res in Login page is:", response);

            const userData = response?.data?.user;
            const accesstoken = response?.data?.accessToken;
            if (accesstoken) {
                const payload = JSON.parse(atob(accesstoken.split(".")[1]));

                const expiry = payload.exp * 1000; // Convert to milliseconds
                // localStorage.setItem("accessToken", accesstoken);
                localStorage.setItem("accessTokenExpiry", expiry.toString());
            }

            if (response.statusCode === 200) {
                router.push("/");
                toast.success("Login Successfull");
                reset();

                // Save user in Redux store
                if (accesstoken) {
                    if (userData) {
                        dispatch(setUser({ user: userData, accesstoken: accesstoken }));
                    } else {
                        console.log("User data is undefined");
                    }
                } else {
                    console.log("Access token is undefined");
                }
            }
        },
        onError: (error: any) => {
            console.log("The Error in Login page is:", error);

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
            const errorMessage =
                error.response?.data?.message || "Something went wrong. Please try again.";

            switch (statusCode) {
                case 400:
                    toast.warning("Please fill in all required fields correctly.");
                    break;
                case 401:
                    toast.error("Invalid email or password.");
                    break;
                case 500:
                    toast.error("Server error. Please try again later.");
                    break;
                default:
                    toast.error(errorMessage);
                    break;
            }
        },
    });

    const onSubmit: SubmitHandler<LoginDataSchema> = async (data) => {
        await mutate({ data });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-center text-2xl font-bold">Log in</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and password to access your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="md:space-y-1">
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
                        <div className="relative">
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
                                    Logging in
                                </>
                            ) : (
                                <>Log in</>
                            )}
                        </Button>
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/signup"
                                className="underline underline-offset-4 hover:text-primary">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
            <div className="text-center text-xs text-balance text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
};

export default LoginPage;
