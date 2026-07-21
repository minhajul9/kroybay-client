"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { queryClient } from "@/Provider/ReactQueryClientProvider";
import { CartItemType } from "@/Types/ComponentTypes";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";
import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/custom/QuantitySelector/QuantitySelector";

type DebouncedFunction<T extends unknown[], R> = (...args: T) => R;
type DebouncedReturn<T extends unknown[]> = (...args: T) => void;

const debounce = <T extends unknown[]>(
  func: DebouncedFunction<T, void>, // The function passed in returns void
  delay: number
): DebouncedReturn<T> => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      // The function execution is synchronous (it just triggers the mutation)
      func(...args);
      timeoutId = null;
    }, delay);
  };
};

// --- PROPS for ProductItemBox ---
interface ProductItemBoxProps {
  product: CartItemType;
  isLoading: boolean;
  setIsLoading: (st: boolean) => void;
}

// --- COMPONENT DEFINITION ---
const ProductItemBox = ({
  product,
  isLoading,
  setIsLoading,
}: ProductItemBoxProps) => {


  const [count, setCount] = useState<number>(product.quantity);
  const axiosPrivate = useAxiosPrivate();
  const [quantity, setQuantity] = useState(product.quantity);

  const updateCart = async (newQuantity: number): Promise<number> => {
    console.log("API CALL: updating cart to quantity", newQuantity);

    await axiosPrivate.put(`/cart/product/${product.id}`, {
      quantity: newQuantity,
    });
    return newQuantity;
  };

  // 1. Replaced 'any' with AxiosResponse for standard API return
  const removeItem = async (): Promise<AxiosResponse> => {
    const res = await axiosPrivate.delete(`/cart/product/${product.id}`);
    return res;
  };


  const {
    mutate: mutateUpdateCount
  }
    =
    useMutation<
      number,
      AxiosError<{ message: string }>,
      number
    >({
      mutationKey: ["updateCart"],
      mutationFn: updateCart,
      onSuccess: (newQuantity: number) => {
        setCount(newQuantity);
        queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
        setIsLoading(false);
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMessage, { position: "bottom-right" });
        console.error("Update failed:", error);
        setIsLoading(false);
        queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
      },
    });

  // Typing the useMutation hook result for item removal
  const { mutate: removeProductItem } = useMutation<
    AxiosResponse, // 2. Replaced 'any' with AxiosResponse
    AxiosError<{ message: string }>,
    void // TVariables: The input to removeItem (none needed)
  >({
    mutationKey: ["removeCartItem"],
    mutationFn: removeItem,
    onSuccess: () => {
      toast.success("Item removed", { position: "bottom-right" });
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, { position: "bottom-right" });
      console.error("Removal failed:", error);
    },
  });


  const debouncedUpdateCart = useMemo(() => {
    return debounce<[number]>((newQuantity: number) => {
      setIsLoading(true);
      mutateUpdateCount(newQuantity);
    }, 500);
  }, [mutateUpdateCount, setIsLoading]);


  const handleCountChange = (newValue: number): void => {
    setCount(newValue);
    debouncedUpdateCart(newValue);
  };

  const finalPrice: number | null = product?.product?.basePrice;


  return (
    <div className="text-wrap p-3 px-2.5 border rounded-sm flex flex-col md:flex-row md:items-center gap-3 w-full bg-white shadow-sm mb-1">

      {/* LEFT — Image + Title + Price */}
      <section className="md:flex-1 flex flex-row md:justify-between items-center gap-3 mr-3">
        {/* Product Image */}
        <div className="md:flex-1 flex flex-row md:justify-start items-start gap-3">
          <Image
            height={70}
            width={70}
            className="w-12 h-12 mt-1 object-contain rounded-md bg-gray-50"
            src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.product.thumbnail}`}
            alt={product.product.name}
          />

          <div className="mx-2">
            <h2 className="text-lg font-semibold">{product.product.name}</h2>

            <p className="text-sm mt-1 flex gap-3 items-center text-gray-500">
              <p>
                <span className="bangla-font font-bold">
                  Brand:{" "}
                </span>
                <span className="bangla-font">
                  {product.product.brand?.name || "No Brand"}
                </span>
              </p>
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={() => removeProductItem()}
          className="md:mt-0 mt-auto bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-sm w-8 h-8 flex items-center justify-center transition"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </section>

      {/* RIGHT — Counter + Remove Button */}
      <section className=" flex md:flex-col gap-2 justify-between md:justify-end md:items-end">
        {/* Remove Button — push to bottom-left on mobile */}


        <QuantitySelector onChange={setQuantity} value={quantity} />
      </section>
    </div>
  );
};

export default ProductItemBox;
