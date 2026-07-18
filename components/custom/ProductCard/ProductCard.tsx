import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/Types/Types";
import { calculatePrice } from "@/lib/calculatePrice";

const ProductCard = ({ product }: { product: Product }) => {

    const {price, hasDiscount} = calculatePrice(product.basePrice, product.discountType, product.discountValue)
    return (
        <Card key={product.id} className="h-full py-0 rounded-sm">
            <CardContent className="h-full flex flex-col p-0">
                <Link
                    href={`/product/${product.slug}`}
                    className="flex flex-col flex-grow text-center"
                >
                    <div className="rounded-md group flex flex-col gap-1">
                        <div className="overflow-hidden rounded-sm aspect-square shadow-sm p-4 border">
                            <Image
                                src={
                                    product.thumbnail
                                        ? `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.thumbnail}`
                                        : "/altImage.jpg"
                                }
                                alt={product.name}
                                width={400}
                                height={400}
                                className="w-full h-full object-contain object-center aspect-square transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        <h2 className="text-base font-bold mb-1 px-1">{product.name}</h2>

                        <div className="flex justify-center mb-2 px-1">
                            {/* <p className="text-md font-semibold text-[#5d5b5b]">
                                {product.basePrice}<span className="bangla-font font-semibold">৳</span>
                            </p> */}
                            <div>
                                <p className="font-semibold text-[#5d5b5b]">
                                    {hasDiscount ? (
                                        <span className="gap-2">
                                            <span className=" text-muted-foreground line-through opacity-45">
                                                <span className="font-semibold">৳</span>
                                                {product.basePrice}
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
                        </div>
                    </div>
                </Link>


            </CardContent>
        </Card>
    );
};

export default ProductCard;
