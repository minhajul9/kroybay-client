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
  category: CategoryType;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  basePrice: number;
  discountType?: string;
  discountValue?: number;
  expiresAt: string
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