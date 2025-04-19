let productContainer = document.getElementById("productContainer");

let products = [
  {
    iD: 1,
    name: "Mex Fresh",
    image: "Products images/max fresh Colgate.jpg",
    rating: 3,
    reviews: 52,
    price: 120,
    quantity: 0,
    category: "General"
  },
  {
    iD: 2,
    name: "Hum Tum Perfume",
    image: "Products images/Hum Tum.jpg",
    rating: 5,
    reviews: 88,
    price: 150,
    quantity: 1,
    category: "Cosmetics"
  },
  {
    iD: 3,
    name: "Banana Smoothie",
    image: "https://ik.imagekit.io/Prajapati/Benner1.jpg?updatedAt=1744544703953",
    rating: 3,
    reviews: 35,
    price: 99,
    quantity: 1,
    category: "journal"
  },
  {
    iD: 4,
    name: "Banana sweet",
    image: "https://ik.imagekit.io/Prajapati/Benner1.jpg?updatedAt=1744544703953",
    rating: 3,
    reviews: 35,
    price: 199,
    quantity: 1,
    category: "journal"
  }, 
  {
  iD: 5,
  name: "bet",
  image: "https://ik.imagekit.io/Prajapati/Benner1.jpg?updatedAt=1744544703953",
  rating: 3,
  reviews: 35,
  price: 159,
  quantity: 1,
  category: "toys"
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
