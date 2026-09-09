// DAY 2 — Arrays + Objects + Array Methods
// File: day-2-array-object.js

const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 55000,
    rating: 4.5,
    stock: 8
  },
  {
    id: 2,
    name: "Phone",
    category: "Electronics",
    price: 30000,
    rating: 4.7,
    stock: 15
  },
  {
    id: 3,
    name: "Headphones",
    category: "Accessories",
    price: 2500,
    rating: 4.2,
    stock: 0
  },
  {
    id: 4,
    name: "Keyboard",
    category: "Accessories",
    price: 1800,
    rating: 4.4,
    stock: 12
  },
  {
    id: 5,
    name: "Monitor",
    category: "Electronics",
    price: 15000,
    rating: 4.6,
    stock: 5
  }
];

const availableProducts = products.filter(
  product => product.stock > 0
);

const productNames = products.map(
  product => product.name
);

const expensiveProducts = products.filter(
  product => product.price > 10000
);

const totalInventoryValue = products.reduce(
  (total, product) =>
    total + product.price * product.stock,
  0
);

const bestProduct = products.reduce(
  (best, product) =>
    product.rating > best.rating ? product : best
);

console.log("Available Products:", availableProducts);
console.log("Product Names:", productNames);
console.log("Expensive Products:", expensiveProducts);
console.log("Inventory Value:", totalInventoryValue);
console.log("Best Product:", bestProduct);