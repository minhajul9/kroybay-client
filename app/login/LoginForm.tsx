"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import googleLogo from "@/public/google.png";
import { axiosPrivate } from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";


const loginSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {

    const searchParams = useSearchParams();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const [isPending, setIsPending] = useState(false);

    const { setAuth } = useAuth();
    const router = useRouter();


    async function onSubmit(values: LoginFormValues) {
        try {
            // const res = await axiosPrivate.post("/admin/auth/login", values);
            // console.log("Login Success: ", res);

            setIsPending(true)

            const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(values),
                headers: {
                    "content-type": "application/json"
                }
            });

            const res = await data.json();

            if (res.statusCode === 401 && res.status !== 200) {
                toast.warning(res.message, {
                    position: "top-center",
                });
            }
            else {
                setAuth({
                    accessToken: res.data.accessToken,
                    isLoading: false,
                    user: res.data.user,
                });
                router.push("/dashboard");
            }
        } catch (error) {
            console.log('error');
            if (error instanceof AxiosError) {
                toast.warning(error.response?.data.message, {
                    position: "top-center",
                });
            } else {
                toast.error("Something went wrong.", {
                    position: "top-center",
                });
            }
            setAuth((prev) => {
                return {
                    ...prev,
                    isLoading: false,
                };
            });
        }
        finally { setIsPending(true) }
    }

    const handleGoogleLogin = async () => {
        try {
            window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`;
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Card className="w-full max-w-sm mx-2">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <Button
                    className="w-full mb-4"
                    variant="outline"
                    onClick={handleGoogleLogin}
                >
                    <Image
                        src={googleLogo}
                        alt="Google Icon"
                        width={16}
                        height={16}
                        className="inline-block mr-2 h-4 w-4"
                    />


                    Continue with Google
                </Button>


                <div className="text-center my-4 text-muted-foreground">or</div>
                <form
                    id="login-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>

                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        placeholder="example@mail.com"
                                        autoComplete="email"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>

                                    <Input
                                        {...field}
                                        id="password"
                                        type="password"
                                        placeholder="Your password"
                                        autoComplete="current-password"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        {isPending ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <div className="flex justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                        New user?{" "}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </a>
                    </p>

                    <p className="text-sm text-muted-foreground">
                        <a href="/forget-password" className="hover:underline">
                            Forgot you password?
                        </a>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
