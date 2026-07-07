import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "sonner";
import { profileSchema, ProfileSchema } from "@/validators/profileEdit.validation";
import { getErrorMessage } from "@/lib/errorMessage";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const ProfileEditor = () => {
    const { auth, setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const form = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: auth?.user?.name || "",
            phone: auth?.user?.phone || "",
        },
    });

    const updateUser = async (data: ProfileSchema) => {
        const res = await axiosPrivate.patch("/customer", data);

        return res.data;
    };

    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            setAuth((prev) => ({
                ...prev,
                user: data.data,
            }));

            toast.success(data.message, {
                position: "bottom-right",
            });

            form.reset({
                name: data.data.lastName,
                phone: data.data.phone,
            });
        },
        onError: (error) => {
            const errMassage = getErrorMessage(error);
            toast.error(errMassage, { position: "bottom-right" });
        },
    });

    return (
        <div>
            <Card className="max-w-[600px] mx-auto my-10">
                <CardContent>

                    <form
                        onSubmit={form.handleSubmit((data) => updateProfile(data))}
                        className="space-y-5"
                    >
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

                        <Button disabled={isPending || !form.formState.isDirty} type="submit" className="w-full">
                            {isPending ? "Saving..." : "Save"}
                        </Button>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileEditor;
