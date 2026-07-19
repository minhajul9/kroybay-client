"use client"

import { useVariant } from "@/Provider/ProductVariantProvider/ProductVariantProvider";
import { Product } from "@/Types/Types";
import { calculatePrice } from "@/lib/calculatePrice";
import { cn } from "@/lib/utils"; // Shadcn utility

interface ProductPriceProps {
  product: Product;
  align?: "left" | "center" | "right";
}

export default function ProductPrice({ product, align = "center" }: ProductPriceProps) {
  // Mapping for Flexbox containers (justify-center, justify-start, etc.)
  const justifyMap = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  };
  const { selectedVariant } = useVariant()

  const alignmentClasses = justifyMap[align];

  const basePrice = selectedVariant.priceOverride ? selectedVariant.priceOverride : product.basePrice;

  const { price, hasDiscount } = calculatePrice(basePrice, product.discountType, product.discountValue)


  return (
    <div className={cn("w-full", alignmentClasses)}>
      <p className="font-semibold text-[#5d5b5b]">
        {hasDiscount ? (
          <span className="gap-2">
            <span className=" text-muted-foreground line-through opacity-45">
              <span className="font-semibold">৳</span>
              {basePrice}
            </span>
            {" "}
            <span className="font-semibold">
              <span className="font-semibold">৳</span>
              {price}
            </span>
          </span>
        ) : (
          <span>
            <span className="font-semibold">৳</span>
            {price}
          </span>
        )}
      </p>
    </div>
  );
}