
import type { LucideIcon } from "lucide-react"


export interface HomeHeroBanner {
  id?: string;
  description: string;
  desktopImageUrl: string;
  mobileImageUrl: string;
  ctaHref: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  discountedPrice?: number | null;
  isTrending?: boolean;
  isPopular?: boolean;
}


export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  cartId: string;
}

export interface ProductToAdd {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}


export interface Category {
  id: string;
  name: string;
  image?: string;
}


interface SearchResultProduct {
  id: string;
  name: string;
}

interface SearchResultCategory {
  id: string;
  name: string;
}

export interface SearchResults {
  products: SearchResultProduct[];
  categories: SearchResultCategory[];
}


export interface User {
  id: string;
  name: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type Sort = 'newest' | 'priceLowToHigh' | 'priceHighToLow'


export type IconType = LucideIcon
