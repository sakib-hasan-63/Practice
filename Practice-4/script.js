// DAY 2 — JavaScript Fundamentals
        const products = [
            { id: 1, name: "Laptop", category: "Electronics", price: 55000, rating: 4.5, stock: 8 },
            { id: 2, name: "Phone", category: "Electronics", price: 30000, rating: 4.7, stock: 15 },
            { id: 3, name: "Headphones", category: "Accessories", price: 2500, rating: 4.2, stock: 0 },
            { id: 4, name: "Keyboard", category: "Accessories", price: 1800, rating: 4.4, stock: 12 },
            { id: 5, name: "Monitor", category: "Electronics", price: 15000, rating: 4.6, stock: 5 }
        ];

        // Array Methods Execution
        const availableProducts = products.filter(product => product.stock > 0);
        const productNames = products.map(product => product.name);
        const expensiveProducts = products.filter(product => product.price > 10000);

        const totalInventoryValue = products.reduce(
            (total, product) => total + product.price * product.stock, 
            0
        );

        const bestProduct = products.reduce(
            (best, product) => product.rating > best.rating ? product : best
        );

        // Rendering Data into HTML
        document.getElementById("total-val").innerText = "₹" + totalInventoryValue.toLocaleString('en-IN');
        document.getElementById("best-prod").innerText = `${bestProduct.name} (${bestProduct.rating}★)`;
        document.getElementById("avail-count").innerText = `${availableProducts.length} Products`;
        document.getElementById("expensive-count").innerText = `${expensiveProducts.length} Items`;

        // Populate Table Rows
        const tableBody = document.getElementById("product-table-body");
        
        products.forEach(product => {
            const row = document.createElement("tr");
            
            const stockStatus = product.stock > 0 
                ? `<span class="badge badge-success">In Stock (${product.stock})</span>`
                : `<span class="badge badge-danger">Out of Stock</span>`;

            row.innerHTML = `
                <td>#${product.id}</td>
                <td><strong>${product.name}</strong></td>
                <td>${product.category}</td>
                <td>₹${product.price.toLocaleString('en-IN')}</td>
                <td><span class="badge badge-star">${product.rating} ★</span></td>
                <td>${stockStatus}</td>
            `;

            tableBody.appendChild(row);
        });