import React from 'react'
import ImageGallery from "@/components/custom/ImageGallery/ImageGallery";
import { Product } from '@/Types/Types';
import { fetchData } from '@/lib/fetchFunction';
import Image from 'next/image';
import ProductPrice from '@/components/custom/ProductPrice/ProductPrice';
import { Button } from '@/components/ui/button';
import { ProductVariantProvider } from '@/Provider/ProductVariantProvider/ProductVariantProvider';

const ProductDetails = async ({ params }: { params: Promise<{ slug: string }>; }) => {

  const data = await fetchData(`/products/${(await params).slug}`);
  if (!data?.data)
    return (
      <p className="text-2xl mt-12 font-bold text-center">Product Not Found</p>
    );
  const product: Product = data.data;

  console.log("product details: ", product);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10 container mx-auto mb-16 mt-10">

      <ProductVariantProvider
        product={product}
        defaultVariant={product?.variants[0]}
      >


        <ImageGallery images={product.images} />


        <div className="lg:col-span-2 space-y-4">
          {product.brand && (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.brand.logo}`}
              alt={product.brand.name}
              width={100}
              height={100}
              className="w-16 h-14 object-contain mb-2"
            />
          )}

          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <h2 className="my-3">
            Category:{" "}
            <span className="font-semibold">{product.category.parent.title}</span>
          </h2>

          <h2 className="mb-5">
            Sub Category:{" "}
            <span className="font-semibold">{product.category.title}</span>
          </h2>

          {product.totalStock > 0 ? (
            <p className="text-green-700 font-semibold text-lg">In Stock</p>
          ) : (
            <p className="text-red-700 font-semibold text-lg">Out Of Stock</p>
          )}

          <ProductPrice product={product} align="left" placement='details' />

          <div>
            {
              product.variants.map((variant) => <Button variant={'outline'} key={variant.id}>{variant.sku}</Button>)
            }
          </div>

          {/* <HandleAddToCart id={product.id} slug={product.slug} /> */}
        </div>
      </ProductVariantProvider>

      <div className="my-10">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <div
          className="tiptap"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    </div>
  )
}

export default ProductDetails