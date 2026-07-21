import { Product, ProductVariantType } from "./Types";

export type NavItemType = {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    links?: NavItemType[];
    image?: string;
}

export type CartItemType = {
    cartId: string;
    createdAt: string;
    id: string;
    product: Product;
    productId: string;
    quantity: number;
    updatedAt: string;
    variant: ProductVariantType
    variantId: string;
}