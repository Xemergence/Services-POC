import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Check,
  ChevronLeft,
  Heart,
  Info,
  Share,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

interface InstallationOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ProductDetailsProps {
  id?: string;
  name?: string;
  brand?: string;
  price?: number;
  rating?: number;
  reviewCount?: number;
  description?: string;
  features?: string[];
  specifications?: Record<string, string>;
  images?: string[];
  installationOptions?: InstallationOption[];
  inStock?: boolean;
  deliveryEstimate?: string;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

const ProductDetails = ({
  id = "ac-123",
  name = "Premium Inverter Split AC 1.5 Ton",
  brand = "CoolBreeze",
  price = 1299.99,
  rating = 4.7,
  reviewCount = 128,
  description = "Energy-efficient inverter technology split air conditioner with smart climate control, Wi-Fi connectivity, and advanced air purification system.",
  features = [
    "Energy-efficient inverter technology",
    "Smart climate control with mobile app",
    "Wi-Fi connectivity for remote operation",
    "Advanced air purification system",
    "Ultra-quiet operation (as low as 19dB)",
    "Quick cooling technology",
    "Auto-clean function",
  ],
  specifications = {
    "Cooling Capacity": "1.5 Ton (18,000 BTU)",
    "Energy Rating": "5 Star",
    "Annual Energy Consumption": "835.7 kWh",
    Refrigerant: "R-32 (Eco-friendly)",
    "Compressor Type": "Dual Inverter Rotary",
    "Indoor Unit Dimensions": "998 x 345 x 210 mm",
    "Outdoor Unit Dimensions": "770 x 545 x 288 mm",
    Warranty: "10 years on compressor, 5 years on unit",
    "Noise Level": "19-41 dB",
    "Special Features": "Sleep mode, Auto restart, Self-diagnosis",
  },
  images = [
    "https://images.unsplash.com/photo-1581275288578-bfb98e9d2d9a?q=80&w=1000",
    "https://images.unsplash.com/photo-1581275288578-bfb98e9d2d9a?q=80&w=1000",
    "https://images.unsplash.com/photo-1581275288578-bfb98e9d2d9a?q=80&w=1000",
  ],
  installationOptions = [
    {
      id: "standard",
      name: "Standard Installation",
      description: "Basic installation with essential components and setup",
      price: 149.99,
    },
    {
      id: "premium",
      name: "Premium Installation",
      description:
        "Enhanced installation with additional copper piping and premium mounting",
      price: 249.99,
    },
    {
      id: "professional",
      name: "Professional Installation",
      description:
        "Complete solution including electrical work, premium materials, and extended warranty",
      price: 349.99,
    },
  ],
  inStock = true,
  deliveryEstimate = "3-5 business days",
  onAddToCart = () => console.log("Added to cart"),
  onBuyNow = () => console.log("Buy now clicked"),
}: ProductDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedInstallation, setSelectedInstallation] = useState(
    installationOptions[0].id,
  );

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  const getSelectedInstallationPrice = () => {
    const option = installationOptions.find(
      (opt) => opt.id === selectedInstallation,
    );
    return option ? option.price : 0;
  };

  const totalPrice = price * quantity + getSelectedInstallationPrice();

  return (
    <div className="bg-white w-full max-w-7xl mx-auto p-6 rounded-lg shadow-sm">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="ghost" className="flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          Back to Products
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
            <img
              src={images[selectedImage]}
              alt={name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex gap-2 overflow-auto pb-2">
            {images.map((image, idx) => (
              <div
                key={idx}
                className={`cursor-pointer h-20 w-20 rounded-md overflow-hidden border-2 ${selectedImage === idx ? "border-primary" : "border-gray-200"}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img
                  src={image}
                  alt={`${name} thumbnail ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
                <p className="text-gray-500">{brand}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex">{renderStars(rating)}</div>
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-sm text-gray-500">
                ({reviewCount} reviews)
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${price.toFixed(2)}</span>
              {inStock ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <Check className="mr-1 h-3 w-3" /> In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Truck className="mr-1 h-4 w-4" />
              Estimated delivery: {deliveryEstimate}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-600">{description}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Key Features</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Installation Options</h3>
            <RadioGroup
              value={selectedInstallation}
              onValueChange={setSelectedInstallation}
              className="space-y-3"
            >
              {installationOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-start space-x-2 rounded-md border p-4"
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <div className="flex-1">
                    <Label
                      htmlFor={option.id}
                      className="text-base font-medium"
                    >
                      {option.name} - ${option.price.toFixed(2)}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
            <div className="mt-2 text-sm text-gray-500 flex items-center">
              <Info className="mr-1 h-4 w-4" />
              <span>All installations include basic setup and testing</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Quantity</h3>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between text-lg font-medium mb-4">
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={onAddToCart}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button className="flex-1" onClick={onBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="specifications">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="warranty">Warranty & Support</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent
            value="specifications"
            className="p-4 border rounded-md mt-2"
          >
            <h3 className="text-lg font-medium mb-4">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specifications).map(([key, value], idx) => (
                <div key={idx} className="flex">
                  <span className="font-medium w-1/2">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="warranty" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-4">Warranty Information</h3>
            <p className="mb-4">
              This product comes with the following warranty coverage:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>10-year warranty on compressor</li>
              <li>5-year warranty on all parts</li>
              <li>
                1-year warranty on installation (if performed by our certified
                technicians)
              </li>
            </ul>
            <h3 className="text-lg font-medium mt-6 mb-4">Support Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Support</CardTitle>
                  <CardDescription>
                    Available 24/7 for all technical issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Call our support line at 1-800-555-COOL or email
                    support@coolbreeze.example
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Plans</CardTitle>
                  <CardDescription>
                    Keep your AC running efficiently
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Annual maintenance plans starting at $99/year with priority
                    service
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Plans
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Customer Reviews</h3>
              <Button>Write a Review</Button>
            </div>
            <div className="space-y-6">
              {/* Placeholder reviews */}
              {[1, 2, 3].map((_, idx) => (
                <div key={idx} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {renderStars(4 + Math.random())}
                        </div>
                        <h4 className="font-medium">Great product!</h4>
                      </div>
                      <p className="text-sm text-gray-500">
                        John D. - {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">
                    This AC unit has been a game-changer for our home. It cools
                    quickly and efficiently, and the app control is very
                    convenient. Installation was smooth and the technicians were
                    professional.
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products Section - Placeholder */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Placeholder for related product cards */}
          {[1, 2, 3, 4].map((_, idx) => (
            <Card key={idx} className="overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-1581275288578-bfb98e9d2d9a?q=80&w=500&h=500&fit=crop&auto=format`}
                  alt="Related AC unit"
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium truncate">
                  Economy Split AC {idx + 1}.0 Ton
                </h3>
                <p className="text-sm text-gray-500 truncate">CoolBreeze</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold">
                    ${(799.99 + idx * 100).toFixed(2)}
                  </span>
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
