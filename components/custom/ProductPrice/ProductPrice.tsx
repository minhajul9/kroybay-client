"use client"

import { useVariant } from "@/Provider/ProductVariantProvider/ProductVariantProvider";
import { Product } from "@/Types/Types";
import { cn } from "@/lib/utils"; // Shadcn utility

interface ProductPriceProps {
  product: Product;
  align?: "left" | "center" | "right";
  placement?: "card" | "details",
}

export default function ProductPrice({ product, align = "center", placement = "card" }: ProductPriceProps) {
  // Mapping for Flexbox containers (justify-center, justify-start, etc.)
  const justifyMap = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  };
  const { selectedVariant } = useVariant()

  const alignmentClasses = justifyMap[align];

  const hasDiscount = !!product.discountType;
  const basePrice = placement == "card" ? product.basePrice : selectedVariant.priceOverride ? selectedVariant.priceOverride : product.basePrice;

  console.log("base price :", basePrice);
  let price;

  if (hasDiscount) {
    if (product.discountType == "FLAT") {
      price = Number(basePrice) - Number(product.discountValue);
    }
    else {
      price = Math.ceil(Number(basePrice) - ((Number(basePrice) / 100) * Number(product.discountValue)));
    }
  }
  else {
    price = basePrice
  }


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