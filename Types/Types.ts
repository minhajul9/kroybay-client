export type UserType = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  district?: string;
  thana?: string;
  address?: string;
  isBlocked: boolean;
  isDeleted: boolean;
  role: string;
  image?: string;
  createdAt: Date;
};

export type Auth = {
  user: UserType | null;
  accessToken: string | null;
  isLoading: boolean;
};

export type CategoryType = {
  id: string;
  title: string;
  slug: string;
  image: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  children?: SubCategory[];
};

export type CategoryUser = {
  id: string;
  firstName: string;
  lastName: string;
  image: string | null;
  email: string;
};

export type SubCategory = {
  id: string;
  title: string;
  slug: string;
  image: string;
  categoryId: number;
  parent: CategoryType;
};

export type BrandType = {
  id: string;
  name: string;
  logo: string;
  slug: string;
  website: string;
  description: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductOptionType = {
  id: string;
  name: string;
  slug: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  values: ProductOptionValue[]
};

export type ProductVariantType = {
  images: ProductImageType[];
  id: string
  sku: string
  costPriceOverride: number
  priceOverride: number
  stock: number
  weight: number
  createdAt: string
  isActive: boolean
  options: ProductOptionValue[]
  productId: string
  updatedAt: string
}

export type ProductOptionValue = {
  id: string;
  optionTypeId: string;
  optionType: ProductOptionType;
  value: string;
  slug: string;
  hexColor?: string;
  createdAt: string;
  updatedAt: string;
  optionValueId: string;
}


export type ProductImageType = {
  id: string;
  url: string;
  altText: string;
  isPrimary: boolean;
  productId: string;
  variantId?: string;
}


export type Product = {
  id: string;
  images: ProductImageType[];
  thumbnail: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  isFeatured: boolean;
  discountType: string;
  discountValue: string | number;
  categoryId: string;
  category: SubCategory;
  brandId?: string;
  brand?: BrandType;
  basePrice: number;
  costPrice: number;
  createdAt: string;
  updatedAt: string;
  optionTypes: ProductOptionType[];
  totalStock: number;
  variants: ProductVariantType[];
};



export type BannerType = {
  id: string;
  image: string;
  link?: string;
  title: string;
  slug: string;
  isActive: boolean;
  createdById: string;
  updatedById: string;
};