"use client"

import { Product, ProductVariantType } from "@/Types/Types";
import { createContext, ReactNode, useContext, useState } from "react";

interface VariantContextType {
    product: Product;
    selectedVariant: ProductVariantType;
    setSelectedVariant: (variant: ProductVariantType) => void;
}

interface VariantProviderProps {
    product: Product;
    defaultVariant: ProductVariantType;
    children: ReactNode;
}

export const ProductVariantContext = createContext<VariantContextType | null>(null);

export const ProductVariantProvider = ({
    product,
    defaultVariant,
    children
}: VariantProviderProps) => {

    const [selectedVariant, setSelectedVariant] =
        useState<ProductVariantType>(defaultVariant);

    return (
        <ProductVariantContext.Provider value={{ product, selectedVariant, setSelectedVariant }}>
            {children}
        </ProductVariantContext.Provider>
    )
}

export function useVariant() {
    const context = useContext(ProductVariantContext);

    if (!context) {
        throw new Error(
            "useVariant must be used inside VariantProvider"
        );
    }

    return context;
}