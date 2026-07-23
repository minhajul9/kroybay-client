import { Product, ProductImageType, ProductVariantType } from "./Types";

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
    variant: CartVariantType
    variantId: string;
}


export type CartVariantType = {
    weight: number;
    stock: number;
    sku: string;
    images: ProductImageType[];
    options: {
        id: string;
        optionValue: {
            hexcolor?: string;
            optionType: { name: string }
            optionTypeId: string;
            value: string;
        }
    }[]
}