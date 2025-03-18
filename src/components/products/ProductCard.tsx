import React from "react";
import { ShoppingCart, Star, Info } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  rating?: number;
  image?: string;
  features?: string[];
  efficiency?: string;
  inStock?: boolean;
  onAddToCart?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  title = "Premium AC Unit XC-5000",
  description = "High-efficiency split system air conditioner with smart temperature control and energy-saving features.",
  price = 1299.99,
  rating = 4.5,
  image = "https://images.unsplash.com/photo-1581275288578-bfb98aa35dbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  features = [
    "Smart Control",
    "Energy Efficient",
    "Quiet Operation",
    "Easy Installation",
  ],
  efficiency = "A+++",
  inStock = true,
  onAddToCart = () => {},
  onViewDetails = () => {},
}: ProductCardProps) => {
  return (
    <Card className="w-[350px] h-[450px] flex flex-col overflow-hidden bg-white">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {inStock ? (
          <Badge variant="secondary" className="absolute top-2 right-2">
            In Stock
          </Badge>
        ) : (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Out of Stock
          </Badge>
        )}
        <Badge variant="default" className="absolute top-2 left-2">
          {efficiency}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm ml-1">{rating}</span>
          </div>
        </div>
        <CardDescription className="line-clamp-2 text-xs">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-xs">
              <div className="w-1 h-1 rounded-full bg-primary mr-1"></div>
              {feature}
            </div>
          ))}
        </div>
        <div className="mt-4 text-xl font-bold">${price.toLocaleString()}</div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(id)}
          className="flex-1 mr-2"
        >
          <Info className="h-4 w-4 mr-1" />
          Details
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onAddToCart(id)}
          className="flex-1"
          disabled={!inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
