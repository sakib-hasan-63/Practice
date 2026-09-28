// Product Data

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        id: 4,
        name: "Backpack",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    },
    {
        id: 5,
        name: "Sunglasses",
        price: 799,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    },
    {
        id: 6,
        name: "Sports Bottle",
        price: 499,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8"
    }
];


// Get HTML Elements

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const cartButton = document.getElementById("cartButton");
const cartSection = document.getElementById("cartSection");
const closeCart = document.getElementById("closeCart");
const checkoutButton = document.getElementById("checkoutButton");


// Get Cart From Local Storage

let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];


// Show Products On Page

function showProducts() {

    productList.innerHTML = "";

    products.forEach(function (product) {

        const productCard = document.createElement("div");

        productCard.className =
            "bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition";

        productCard.innerHTML = `
            <img 
                src="${product.image}" 
                alt="${product.name}"
                class="w-full h-52 object-cover"
            >

            <div class="p-5">

                <h3 class="text-xl font-semibold">
                    ${product.name}
                </h3>

                <p class="text-blue-600 font-bold text-lg mt-2">
                    ₹${product.price}
                </p>

                <button
                    onclick="addToCart(${product.id})"
                    class="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Add to Cart
                </button>

            </div>
        `;

        productList.appendChild(productCard);
    });
}


// Add Product To Cart

function addToCart(productId) {

    const product = products.find(function (item) {
        return item.id === productId;
    });

    const existingProduct = cart.find(function (item) {
        return item.id === productId;
    });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });

    }


    saveCart();
    showCart();

    alert(product.name + " added to cart!");
}


// Save Cart In Local Storage

function saveCart() {

    localStorage.setItem(
        "shoppingCart",
        JSON.stringify(cart)
    );
}


// Show Cart

function showCart() {

    cartItems.innerHTML = "";

    // Check if cart is empty

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="text-center text-gray-500 py-8">
                Your cart is empty.
            </p>
        `;

        cartTotal.innerText = "₹0";
        cartCount.innerText = "0";

        return;
    }


    let total = 0;
    let totalItems = 0;


    cart.forEach(function (product) {

        // Calculate total price

        total = total + product.price * product.quantity;

        // Calculate total products

        totalItems = totalItems + product.quantity;


        const cartProduct = document.createElement("div");

        cartProduct.className =
            "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4";


        cartProduct.innerHTML = `

            <div class="flex items-center gap-4">

                <img
                    src="${product.image}"
                    class="w-20 h-20 object-cover rounded-lg"
                >

                <div>

                    <h3 class="font-semibold">
                        ${product.name}
                    </h3>

                    <p class="text-blue-600">
                        ₹${product.price}
                    </p>

                </div>

            </div>


            <div class="flex items-center gap-3">

                <button
                    onclick="decreaseQuantity(${product.id})"
                    class="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                >
                    -
                </button>


                <span class="font-semibold">
                    ${product.quantity}
                </span>


                <button
                    onclick="increaseQuantity(${product.id})"
                    class="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                >
                    +
                </button>


                <button
                    onclick="removeFromCart(${product.id})"
                    class="ml-3 text-red-500 hover:text-red-700"
                >
                    Remove
                </button>

            </div>
        `;


        cartItems.appendChild(cartProduct);

    });


    cartTotal.innerText = "₹" + total;
    cartCount.innerText = totalItems;
}


// Increase Product Quantity

function increaseQuantity(productId) {

    const product = cart.find(function (item) {
        return item.id === productId;
    });


    product.quantity = product.quantity + 1;

    saveCart();
    showCart();
}


// Decrease Product Quantity

function decreaseQuantity(productId) {

    const product = cart.find(function (item) {
        return item.id === productId;
    });


    if (product.quantity > 1) {

        product.quantity = product.quantity - 1;

    } else {

        removeFromCart(productId);

        return;
    }


    saveCart();
    showCart();
}


// Remove Product From Cart

function removeFromCart(productId) {

    cart = cart.filter(function (item) {
        return item.id !== productId;
    });


    saveCart();
    showCart();
}


// Open Cart

cartButton.addEventListener("click", function () {

    cartSection.classList.remove("hidden");

    showCart();

    cartSection.scrollIntoView({
        behavior: "smooth"
    });

});


// Close Cart

closeCart.addEventListener("click", function () {

    cartSection.classList.add("hidden");

});


// Checkout

checkoutButton.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert("Order placed successfully! 🎉");


    // Empty the cart after checkout

    cart = [];

    saveCart();
    showCart();

});


// Start The Application

showProducts();
showCart();
