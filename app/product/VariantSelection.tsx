"use client"

import ProductPrice from '@/components/custom/ProductPrice/ProductPrice'
import { QuantitySelector } from '@/components/custom/QuantitySelector/QuantitySelector'
import { Button } from '@/components/ui/button'
import { useVariant } from '@/Provider/ProductVariantProvider/ProductVariantProvider'
import { Product } from '@/Types/Types'
import { ShoppingCartIcon } from 'lucide-react'
import { useState } from 'react'

const VariantSelection = ({ product }: { product: Product }) => {

    const { selectedVariant, setSelectedVariant } = useVariant();
    const [quantity, setQuantity] = useState(1);


    return (
        <div className='space-y-4'>

            {selectedVariant.stock > 0 ? (
                <p className="text-green-700 font-semibold text-lg">In Stock</p>
            ) : (
                <p className="text-red-700 font-semibold text-lg">Out Of Stock</p>
            )}

            <ProductPrice product={product} align="left" />

            <div>
                {
                    product.variants.map((variant) => <Button
                        className="m-0.5"
                        variant={selectedVariant.id == variant.id ? "default" : 'outline'}
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                    >{variant.sku}</Button>)
                }
            </div>

            <div>
                <QuantitySelector onChange={setQuantity} value={quantity}  />
            </div>


            <Button
                size="lg"
                className="group relative h-12 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-red-700 hover:to-red-800 hover:shadow-xl active:scale-95"
            >
                <ShoppingCartIcon className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                Add to Cart
            </Button>
        </div>
    )
}

export default VariantSelection