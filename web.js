  
  //Light and Dark Mode:-
let modechangeElements = document.querySelectorAll(".modechange");
let body = document.querySelector("body");
let product = document.querySelectorAll(".product"); 
let isDark = false;

modechangeElements.forEach((element) => {
  element.addEventListener("click", () => {
    if (isDark) {
      body.style.backgroundColor = "white";
      body.style.color = "#1B1C1D";

      // सभी product का background और color बदलो
      product.forEach((p) => {
        p.style.backgroundColor = "white";
        p.style.color = "#1B1C1D";
      });

    } else {
      body.style.backgroundColor = "#1B1C1D";
      body.style.color = "white";

      product.forEach((p) => {
        p.style.backgroundColor = "#1B1C1D";
        p.style.color = "white";
      });
    }

    isDark = !isDark;
  });
});



  //Benner Sliding :-
  const slider = document.getElementById("slider");
  const slides = slider.querySelectorAll("img");
  const totalSlides = slides.length;
  let currentIndex = 0;

  function moveSlide() {
    currentIndex++;
    if (currentIndex >= totalSlides) {
      currentIndex = 0;
    }

    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  setInterval(moveSlide, 3000); // हर 3 सेकंड में स्लाइड बदलेगा

//Category slect button :-
let categoryB=document.querySelector("#categoryB");
let list=document.querySelector("#category");

categoryB.addEventListener("click", () => {
  let computedStyle = window.getComputedStyle(list);
  if (computedStyle.display === "none") {
    list.style.display = "block";
    isSettingVisible = true;
  } else {
    list.style.display = "none";
    
    
  }
  
  
});

// menu property :-

let menu=document.querySelector("#menu");

let menuoption=document.querySelector("#menuoption");

menu.addEventListener("click", () => {
  let computedStyle = window.getComputedStyle(menuoption);
  if (computedStyle.display === "none") {
    menuoption.style.display = "block";
    isSettingVisible = true;
  } else {
    menuoption.style.display = "none";
    
    menuoption.classList.toggle("open");
    
  }
});




//category option;

document.querySelectorAll("#category ul li").forEach(item => {
  item.addEventListener("click", function () {
    const selectedCategory = this.textContent.trim().toLowerCase();
    displayProductsByCategory(selectedCategory);
  });
});






function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/gi, "");
}

function isFuzzyMatch(product, query) {
  const fields = [
    product.name,
    product.category,
    product.price.toString(),
    product.rating.toString(),
    product.reviews.toString()
  ];

  return fields.some(field => normalize(field).includes(normalize(query)));
}

document.getElementById("searchInput").addEventListener("input", function () {
  let query = this.value.trim();

  if (query === "") {
    productContainer.innerHTML = ""; // खाली input पर products नहीं दिखाएंगे
    return;
  }

  let filteredProducts = products.filter(product => isFuzzyMatch(product, query));

  productContainer.innerHTML = "";

  if (filteredProducts.length === 0) {
    productContainer.innerHTML = "<p>No products found.</p>";
  } else {
    filteredProducts.forEach((product, index) => {
      let div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.image}" alt="Product Image">
        <h3>${product.name}</h3>
        <p>Rating: ${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}</p>
        <p>Reviews: ${product.reviews}</p>
        <p>Price: ₹${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
        <button class="cartButton" data-index="${index}">Add to Cart</button>
      `;
      productContainer.appendChild(div);
    });
  }
});


//Home button:-


document.getElementById("home").addEventListener("click", 
function() {
  location.reload();
});




