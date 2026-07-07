"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    passwordSchema,
    PasswordSchema,
} from "@/validators/profileEdit.validation";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { getErrorMessage } from "@/lib/errorMessage";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const ResetPassword = () => {
    const axiosPrivate = useAxiosPrivate();

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const form = useForm<PasswordSchema>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const updateUser = async (data: PasswordSchema) => {
        const res = await axiosPrivate.post("auth/reset-password", {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        });
        return res.data;
    };

    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            toast.success(data.message, {
                position: "bottom-right",
            });

            form.reset();
        },
        onError: (error) => {
            const errMassage = getErrorMessage(error);
            toast.error(errMassage, { position: "bottom-right" });
        },
    });

    return (
        <div>
            <Card className="max-w-[600px] mx-auto my-10">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                    <CardDescription>
                        Please enter your current password and new password. If you logged
                        in with Google, use a dummy old password.
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <form
                        onSubmit={form.handleSubmit((data) => updateProfile(data))}
                        className="space-y-5"
                    >
                        <Controller
                            name="oldPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="oldPassword">
                                        Old Password
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            {...field}
                                            id="oldPassword"
                                            className="pr-[46px]"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your current password"
                                            disabled={form.formState.isSubmitting}
                                            aria-invalid={fieldState.invalid}
                                        />

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-l-none bg-muted-foreground/5"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />



                        <Controller
                            name="newPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="newPassword">
                                        New Password
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            {...field}
                                            id="newPassword"
                                            className="pr-[46px]"
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="Enter new password"
                                            disabled={form.formState.isSubmitting}
                                            aria-invalid={fieldState.invalid}
                                        />

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-l-none bg-muted-foreground/5"
                                            onClick={() => setShowNewPassword((prev) => !prev)}
                                        >
                                            {showNewPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="confirmPassword">
                                        Confirm Password
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            {...field}
                                            id="confirmPassword"
                                            className="pr-[46px]"
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="Re-enter new password"
                                            disabled={form.formState.isSubmitting}
                                            aria-invalid={fieldState.invalid}
                                        />

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-l-none bg-muted-foreground/5"
                                            onClick={() => setShowNewPassword((prev) => !prev)}
                                        >
                                            {showNewPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Button disabled={isPending} type="submit" className="w-full">
                            {isPending ? "Saving..." : "Save"}
                        </Button>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
};

export default ResetPassword;
