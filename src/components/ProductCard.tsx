import React from "react";
import { Product } from "@/data/products";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      data-testid="product-card"
      className="flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative w-full aspect-[4/3] bg-slate-950/80 overflow-hidden flex items-center justify-center p-3">
          <img
            src={product.image}
            alt={product.name}
            data-testid="product-image"
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Category Tag */}
          {product.category && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-slate-900/80 text-indigo-300 border border-indigo-500/30 backdrop-blur-sm">
              {product.category}
            </span>
          )}

          {/* Rating */}
          {product.rating && (
            <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
          )}
        </div>

        {/* Product Details */}
        <CardHeader className="p-5 pb-2">
          <CardTitle
            data-testid="product-name"
            className="text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-indigo-300 transition-colors"
          >
            {product.name}
          </CardTitle>
          <CardDescription
            data-testid="product-description"
            className="text-sm text-slate-400 line-clamp-2 mt-2 leading-relaxed min-h-[2.5rem]"
          >
            {product.description}
          </CardDescription>
        </CardHeader>
      </div>

      {/* Card Footer: Price & Action */}
      <CardFooter className="p-5 pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
            Price
          </span>
          <span
            data-testid="product-price"
            className="text-xl font-extrabold text-white bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
          >
            {product.price}
          </span>
        </div>

        <Button
          size="sm"
          className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
