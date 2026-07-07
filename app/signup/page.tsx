"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "@/config/axios";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { customerSchema, CustomerSchema } from "@/validators/customer.validation";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";




export default function SignUp() {
    const form = useForm<CustomerSchema>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
            phone: "",
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter()

    const { setAuth } = useAuth();

    const customerSignUp = async (data: CustomerSchema) => {

        // Exclude confirmPassword before sending
        const { confirmPassword, ...submitData } = data;

        const res = await axiosPrivate.post("/auth/register", submitData)


        return res.data;

    }



    const { mutate, isPending } = useMutation(
        {
            mutationFn: customerSignUp,
            onSuccess: (data) => {

                setAuth({
                    accessToken: data.data.accessToken,
                    user: data.data.user,
                    isLoading: false
                })


                toast.success("Sign up successful", {
                    position: "top-center",
                });

                router.push('/verify-OTP')

            },
            onError: (error) => {
                // Narrow error type to AxiosError to access response
                const err = error as import('axios').AxiosError<{ message?: string }>;
                console.error("Sign up failed", err.response?.data?.message);
                toast.error(err.response?.data?.message || "Unexpected error", {
                    position: "top-center",
                });
            }
        }
    );




    const onSubmit = (data: CustomerSchema) => {
        mutate(data); // ✅ use mutation
    };


    return (
        <div className="container mx-auto p-4 flex justify-center items-center min-h-[90vh]">

            <Card className="w-full max-w-2xl my-12">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>



                    <form onSubmit={form.handleSubmit(onSubmit)} >

                        <FieldGroup className="gap-4 my-4">

                            {/* name */}
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">Name</FieldLabel>

                                        <Input
                                            {...field}
                                            id="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            autoComplete="name"
                                            // autoCapitalize
                                            aria-invalid={fieldState.invalid}
                                        />

                                        {
                                            fieldState.invalid && <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        }
                                    </Field>
                                )}
                            />
                            
                            
                            {/* email */}
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
                                            placeholder="Enter your email"
                                            autoComplete="email"
                                            // autoCapitalize
                                            aria-invalid={fieldState.invalid}
                                        />

                                        {
                                            fieldState.invalid && <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        }
                                    </Field>
                                )}
                            />

                            {/* password */}
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

                            {/* confirm password */}
                            <Controller
                                name="confirmPassword"
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

                             {/* phone */}
                            <Controller
                                name="phone"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="phone">Phone</FieldLabel>

                                        <Input
                                            {...field}
                                            id="phone"
                                            type="text"
                                            placeholder="Enter your phone number"
                                            autoComplete="name"
                                            // autoCapitalize
                                            aria-invalid={fieldState.invalid}
                                        />

                                        {
                                            fieldState.invalid && <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        }
                                    </Field>
                                )}
                            />

                        </FieldGroup>





                        <Button type="submit" className="w-full md:col-span-2" disabled={isPending}>
                            {isPending ? "Signing Up..." : "Sign Up"}
                        </Button>

                    </form>



                </CardContent>
            </Card>

        </div>
    );
}
