let productContainer = document.getElementById("productContainer");

let products = [
  {
    iD: 1,
    name: "Mex Fresh",
    image: "https://ik.imagekit.io/Prajapati/mex%20fresh%20Colgate.jpg?updatedAt=1745050721975",
    rating: 3,
    reviews: 52,
    price: 20,
    quantity: 1,
    category: "General"
  },
  {
    iD: 2,
    name: "Hum Tum Perfume",
    image: "https://ik.imagekit.io/Prajapati/Hum%20Thum.jpg?updatedAt=1745050721704",
    rating: 5,
    reviews: 88,
    price: 78,
    quantity: 1,
    category: "Cosmetics"
  }
  
];

// Clear container first
productContainer.innerHTML = "";

products.forEach(function(product, index) {
  let div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <img src="${product.image}" alt="Product Image">
    <div class="product-details">
      <h3>${product.name}</h3>
      <p>Rating: ${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}</p>
      <p>Reviews: ${product.reviews}</p>
      <p>iD: ${product.iD}</p>
      <p>Price: ₹${product.price}</p>
      <p>Quantity: ${product.quantity}</p>
      <button class="cartButton" data-index="${index}">Add to Cart</button>
    </div>
  `;

  // Add to Cart button
  div.querySelector(".cartButton").addEventListener("click", function (e) {
    e.stopPropagation(); // div को expand होने से रोकने के लिए
    let selectedProduct = products[index];
    document.dispatchEvent(new CustomEvent("add-to-cart", { detail: selectedProduct }));
  });

  // Fullscreen expand on click
  div.addEventListener("click", function () {
    document.querySelectorAll(".product.expanded").forEach(el => {
      el.classList.remove("expanded");
      let close = el.querySelector(".close-btn");
      if (close) close.remove();

      let oldBuyBtn = el.querySelector(".buy-btn");
      if (oldBuyBtn) oldBuyBtn.remove();
    });

    div.classList.add("expanded");

    // Close button
    let closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.innerText = "×";
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      div.classList.remove("expanded");
      closeBtn.remove();

      let buyBtn = div.querySelector(".buy-btn");
      if (buyBtn) buyBtn.remove();
    });
    div.appendChild(closeBtn);

    // Buy Now button
    let buyBtn = document.createElement("button");
    buyBtn.className = "buy-btn cartButton";
    buyBtn.innerText = "Buy Now";

    buyBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      window.location.href = " Buy.html"; // Navigate to the Buy page
    });

    let cartBtn = div.querySelector(".cartButton");
    cartBtn.insertAdjacentElement("afterend", buyBtn);
  });

  productContainer.appendChild(div);
});





function displayProductsByCategory(category) {
  let filteredProducts = products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );

  productContainer.innerHTML = "";

  if (filteredProducts.length === 0) {
    productContainer.innerHTML = "<p>No products found in this category.</p>";
    return;
  }

  filteredProducts.forEach((product, index) => {
    let div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="Product Image">
      <div class="product-details">
        <h3>${product.name}</h3>
        <p>Rating: ${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}</p>
        <p>Reviews: ${product.reviews}</p>
        <p>iD: ${product.iD}</p>
        <p>Price: ₹${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
        <button class="cartButton" data-index="${index}">Add to Cart</button>
      </div>
    `;

    div.querySelector(".cartButton").addEventListener("click", function (e) {
      e.stopPropagation();
      let selectedProduct = filteredProducts[index];
      document.dispatchEvent(new CustomEvent("add-to-cart", { detail: selectedProduct }));
    });

    div.addEventListener("click", function () {
      document.querySelectorAll(".product.expanded").forEach(el => {
        el.classList.remove("expanded");
        let close = el.querySelector(".close-btn");
        if (close) close.remove();
        let oldBuyBtn = el.querySelector(".buy-btn");
        if (oldBuyBtn) oldBuyBtn.remove();
      });

      div.classList.add("expanded");

      let closeBtn = document.createElement("button");
      closeBtn.className = "close-btn";
      closeBtn.innerText = "×";
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        div.classList.remove("expanded");
        closeBtn.remove();
        let buyBtn = div.querySelector(".buy-btn");
        if (buyBtn) buyBtn.remove();
      });
      div.appendChild(closeBtn);

      let buyBtn = document.createElement("button");
      buyBtn.className = "buy-btn cartButton";
      buyBtn.innerText = "Buy Now";
      buyBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        window.location.href = "Buy.html";
      });

      let cartBtn = div.querySelector(".cartButton");
      cartBtn.insertAdjacentElement("afterend", buyBtn);
    });

    productContainer.appendChild(div);
  });
}

document.querySelectorAll("#category ul li").forEach(item => {
  item.addEventListener("click", function () {
    const selectedCategory = this.textContent.trim();
    displayProductsByCategory(selectedCategory);
  });
});
