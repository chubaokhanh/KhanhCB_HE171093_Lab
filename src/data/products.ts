export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
  rating?: number;
}

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Keychron K2 Wireless Mechanical Keyboard",
    description: "Compact 75% layout wireless mechanical keyboard with hot-swappable switches, aluminum frame, and customizable RGB backlight.",
    price: "$79.99",
    image: "/products/keyboard.svg",
    category: "Peripherals",
    rating: 4.8,
  },
  {
    id: "prod-2",
    name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
    description: "Industry-leading noise canceling with dual processors and 8 microphones for superior call quality and immersive hi-res audio.",
    price: "$349.99",
    image: "/products/headphones.svg",
    category: "Audio",
    rating: 4.9,
  },
  {
    id: "prod-3",
    name: "Apple Watch Series 9 GPS 45mm",
    description: "Advanced health and fitness tracking, stunning Always-On Retina display, and the revolutionary Double Tap gesture.",
    price: "$399.00",
    image: "/products/smartwatch.svg",
    category: "Wearables",
    rating: 4.7,
  },
  {
    id: "prod-4",
    name: "Logitech MX Master 3S Performance Mouse",
    description: "Ergonomic master mouse featuring 8K DPI any-surface tracking, quiet acoustic clicks, and MagSpeed electromagnetic scrolling.",
    price: "$99.99",
    image: "/products/mouse.svg",
    category: "Peripherals",
    rating: 4.9,
  },
  {
    id: "prod-5",
    name: "Dell UltraSharp 27 4K USB-C Hub Monitor",
    description: "Brilliant 4K IPS Black screen with 2000:1 contrast ratio, 98% DCI-P3 wide color gamut, and 90W single-cable USB-C connectivity.",
    price: "$579.99",
    image: "/products/monitor.svg",
    category: "Displays",
    rating: 4.8,
  },
  {
    id: "prod-6",
    name: "Anker 3-in-1 MagSafe Wireless Charging Station",
    description: "Ultra-compact fast wireless charging dock compatible with iPhone 15/14, Apple Watch Series, and AirPods Pro.",
    price: "$89.99",
    image: "/products/charger.svg",
    category: "Accessories",
    rating: 4.6,
  },
  {
    id: "prod-7",
    name: "Bose SoundLink Flex Bluetooth Outdoor Speaker",
    description: "Rugged waterproof IP67 portable speaker engineered with PositionIQ acoustic technology for rich, deep outdoor sound.",
    price: "$149.00",
    image: "/products/speaker.svg",
    category: "Audio",
    rating: 4.7,
  },
  {
    id: "prod-8",
    name: "Elgato Stream Deck MK.2 Studio Controller",
    description: "15 customizable tactile LCD keys designed to effortlessly trigger live actions, control audio mixing, lighting, and streaming apps.",
    price: "$149.99",
    image: "/products/streamdeck.svg",
    category: "Streaming",
    rating: 4.9,
  },
];
