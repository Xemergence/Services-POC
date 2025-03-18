import React, { useState, useEffect } from "react";
import { Filter, Search, Grid3X3, List, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  features: string[];
  efficiency: string;
  inStock: boolean;
  category: string;
  brand: string;
}

interface ProductCatalogProps {
  products?: Product[];
  onAddToCart?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const ProductCatalog = ({
  products = mockProducts,
  onAddToCart = () => {},
  onViewDetails = () => {},
}: ProductCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [filterBrand, setFilterBrand] = useState("all");
  const [filterEfficiency, setFilterEfficiency] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");

  const productsPerPage = 9;

  // Get unique brands and efficiency ratings for filters
  const brands = ["all", ...new Set(products.map((product) => product.brand))];
  const efficiencyRatings = [
    "all",
    ...new Set(products.map((product) => product.efficiency)),
  ];

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply brand filter
    if (filterBrand !== "all") {
      result = result.filter((product) => product.brand === filterBrand);
    }

    // Apply efficiency filter
    if (filterEfficiency !== "all") {
      result = result.filter(
        (product) => product.efficiency === filterEfficiency,
      );
    }

    // Apply price filter
    if (filterPrice !== "all") {
      switch (filterPrice) {
        case "under1000":
          result = result.filter((product) => product.price < 1000);
          break;
        case "1000to2000":
          result = result.filter(
            (product) => product.price >= 1000 && product.price <= 2000,
          );
          break;
        case "over2000":
          result = result.filter((product) => product.price > 2000);
          break;
      }
    }

    // Apply sorting
    switch (sortBy) {
      case "priceLow":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        // Keep original order for featured
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    products,
    searchTerm,
    sortBy,
    filterBrand,
    filterEfficiency,
    filterPrice,
  ]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      {/* Header with title and search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AC Products</h1>
          <p className="text-muted-foreground mt-1">
            Browse our selection of high-quality air conditioning units
          </p>
        </div>
        <div className="relative w-full md:w-auto mt-4 md:mt-0">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters and sorting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <Select value={filterBrand} onValueChange={setFilterBrand}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand === "all" ? "All Brands" : brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterEfficiency} onValueChange={setFilterEfficiency}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Efficiency" />
            </SelectTrigger>
            <SelectContent>
              {efficiencyRatings.map((rating) => (
                <SelectItem key={rating} value={rating}>
                  {rating === "all" ? "All Ratings" : rating}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterPrice} onValueChange={setFilterPrice}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under1000">Under $1,000</SelectItem>
              <SelectItem value="1000to2000">$1,000 - $2,000</SelectItem>
              <SelectItem value="over2000">Over $2,000</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="priceLow">Price: Low to High</SelectItem>
              <SelectItem value="priceHigh">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-10 w-10 rounded-none rounded-l-md"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-10 w-10 rounded-none rounded-r-md"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {indexOfFirstProduct + 1}-
          {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
          {filteredProducts.length} products
        </p>
      </div>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            We couldn't find any products matching your criteria. Try adjusting
            your filters or search term.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              rating={product.rating}
              image={product.image}
              features={product.features}
              efficiency={product.efficiency}
              inStock={product.inStock}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 mb-8">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col md:flex-row border rounded-lg overflow-hidden bg-white"
            >
              <div className="w-full md:w-64 h-48 relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.inStock ? (
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    In Stock
                  </Badge>
                ) : (
                  <Badge
                    variant="destructive"
                    className="absolute top-2 right-2"
                  >
                    Out of Stock
                  </Badge>
                )}
                <Badge variant="default" className="absolute top-2 left-2">
                  {product.efficiency}
                </Badge>
              </div>
              <div className="flex-1 p-4 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="font-normal"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-bold">
                    ${product.price.toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(product.id)}
                    >
                      <Info className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onAddToCart(product.id)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {pageNumbers.map((number) => {
              // Show first page, last page, current page, and pages around current page
              if (
                number === 1 ||
                number === totalPages ||
                (number >= currentPage - 1 && number <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={number}>
                    <PaginationLink
                      isActive={number === currentPage}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (
                (number === 2 && currentPage > 3) ||
                (number === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return (
                  <PaginationItem key={number}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Premium AC Unit XC-5000",
    description:
      "High-efficiency split system air conditioner with smart temperature control and energy-saving features.",
    price: 1299.99,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1581275288578-bfb98aa35dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Smart Control",
      "Energy Efficient",
      "Quiet Operation",
      "Easy Installation",
    ],
    efficiency: "A+++",
    inStock: true,
    category: "Split System",
    brand: "CoolBreeze",
  },
  {
    id: "2",
    title: "Economy Window AC Unit",
    description:
      "Affordable window-mounted air conditioner perfect for small rooms and apartments.",
    price: 499.99,
    rating: 4.0,
    image:
      "https://images.unsplash.com/photo-1580595999172-187fdd051bcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Easy Installation",
      "Compact Design",
      "Washable Filter",
      "Remote Control",
    ],
    efficiency: "A+",
    inStock: true,
    category: "Window Unit",
    brand: "AirMax",
  },
  {
    id: "3",
    title: "Deluxe Inverter AC System",
    description:
      "Advanced inverter technology for maximum energy efficiency and precise temperature control.",
    price: 1899.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1585770536735-27993a080586?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Inverter Technology",
      "Ultra Quiet",
      "WiFi Control",
      "Air Purification",
    ],
    efficiency: "A+++",
    inStock: true,
    category: "Split System",
    brand: "TechCool",
  },
  {
    id: "4",
    title: "Portable AC Unit Pro",
    description:
      "Versatile portable air conditioner with dehumidifier function and easy mobility between rooms.",
    price: 699.99,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1585770536735-27993a080586?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Portable",
      "Multi-Function",
      "Self-Evaporative",
      "Programmable Timer",
    ],
    efficiency: "A",
    inStock: true,
    category: "Portable",
    brand: "AirMax",
  },
  {
    id: "5",
    title: "Commercial Grade HVAC System",
    description:
      "Heavy-duty air conditioning system designed for commercial spaces and large residential areas.",
    price: 2499.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1581275288578-bfb98aa35dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: [
      "High Capacity",
      "Zoned Cooling",
      "Commercial Grade",
      "Advanced Filtration",
    ],
    efficiency: "A++",
    inStock: false,
    category: "Commercial",
    brand: "TechCool",
  },
  {
    id: "6",
    title: "Mini Split AC System",
    description:
      "Compact ductless mini-split system perfect for room additions and spaces without existing ductwork.",
    price: 1099.99,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1580595999172-187fdd051bcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Ductless",
      "Easy Installation",
      "Energy Efficient",
      "Quiet Operation",
    ],
    efficiency: "A++",
    inStock: true,
    category: "Mini Split",
    brand: "CoolBreeze",
  },
  {
    id: "7",
    title: "Smart Home AC Integration Kit",
    description:
      "Upgrade your existing AC unit with smart home capabilities and voice control integration.",
    price: 299.99,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1585770536735-27993a080586?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Smart Home Compatible",
      "Voice Control",
      "Energy Monitoring",
      "Remote Access",
    ],
    efficiency: "N/A",
    inStock: true,
    category: "Accessories",
    brand: "SmartAir",
  },
  {
    id: "8",
    title: "Whole House Central AC System",
    description:
      "Complete central air conditioning system for whole-house cooling with advanced air distribution.",
    price: 3299.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1581275288578-bfb98aa35dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Whole House Cooling",
      "Advanced Thermostat",
      "Quiet Operation",
      "High Efficiency",
    ],
    efficiency: "A+++",
    inStock: true,
    category: "Central System",
    brand: "TechCool",
  },
  {
    id: "9",
    title: "Budget Friendly Window AC",
    description:
      "Economical window air conditioner for small spaces with basic cooling functionality.",
    price: 299.99,
    rating: 3.8,
    image:
      "https://images.unsplash.com/photo-1580595999172-187fdd051bcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Compact",
      "Mechanical Controls",
      "Washable Filter",
      "Energy Efficient",
    ],
    efficiency: "A",
    inStock: true,
    category: "Window Unit",
    brand: "CoolSaver",
  },
  {
    id: "10",
    title: "Premium Ductless Multi-Zone System",
    description:
      "High-end multi-zone ductless system for cooling multiple rooms with individual temperature control.",
    price: 2899.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1585770536735-27993a080586?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Multi-Zone",
      "Individual Control",
      "Ultra Efficient",
      "Whisper Quiet",
    ],
    efficiency: "A+++",
    inStock: false,
    category: "Multi-Zone",
    brand: "TechCool",
  },
  {
    id: "11",
    title: "Solar-Ready AC System",
    description:
      "Eco-friendly air conditioning system designed to work with solar power for reduced energy costs.",
    price: 2199.99,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1581275288578-bfb98aa35dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Solar Compatible",
      "Energy Efficient",
      "Eco-Friendly",
      "Smart Controls",
    ],
    efficiency: "A+++",
    inStock: true,
    category: "Eco-Friendly",
    brand: "GreenCool",
  },
  {
    id: "12",
    title: "Compact Through-Wall AC Unit",
    description:
      "Space-saving through-wall air conditioner ideal for apartments and condos without window access.",
    price: 599.99,
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1580595999172-187fdd051bcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Through-Wall Design",
      "Digital Controls",
      "Energy Saver Mode",
      "Quiet Operation",
    ],
    efficiency: "A+",
    inStock: true,
    category: "Through-Wall",
    brand: "AirMax",
  },
];

export default ProductCatalog;
