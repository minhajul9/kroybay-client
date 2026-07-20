"use client"

import AddToCart from '@/components/custom/AddToCart/AddToCart'
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


            <AddToCart quantity={quantity} successResponse={() => setQuantity(1)} productId={product.id} variantId={selectedVariant.id} slug={product.slug} />
        </div>
    )
}

export default VariantSelection