let cart = document.querySelector("#cart");
let cartoption = document.querySelector("#cartoption");

cart.addEventListener("click", () => {
  let computedStyle = window.getComputedStyle(cartoption);
  cartoption.style.display = computedStyle.display === "none" ? "table" : "none";
});

let cartTable = document.querySelector("#cartoption");
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Total Row
let totalRow = document.createElement("tr");
totalRow.innerHTML = `
  <td colspan="5" style="text-align:right;"><strong>Total:</strong></td>
  <td><strong>₹<span id="totalAmount">0</span></strong></td>
`;
cartTable.appendChild(totalRow);

// Buy Button Row
let buyRow = document.createElement("tr");
buyRow.innerHTML = `
  <td colspan="6" style="text-align:right;">
    <button id="cartbtn" style="padding: 10px 20px; background-color: green; color: white; border: none; cursor: pointer;">
      Buy
    </button>
  </td>
`;
cartTable.appendChild(buyRow);

document.addEventListener("click", function(e) {
  if (e.target.id === "cartbtn") {
    window.location.href = "Buy.html";
  }
});

// Total Update
function updateTotal() {
  let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("totalAmount").textContent = total;
}

// Save to local storage
function saveCartToLocal() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Render cart
function renderCartItems() {
  document.querySelectorAll(".cartRow").forEach(row => row.remove());
  cartItems.forEach(product => {
    let row = document.createElement("tr");
    row.classList.add("cartRow");
    row.innerHTML = `
      <td><button class="removeBtn">X</button></td>
      <td>${product.name}</td>
      <td><img src="${product.image}" alt="product" width="50"></td>
      <td>
        <button class="decQty">-</button>
        <span class="qtyValue">${product.quantity}</span>
        <button class="incQty">+</button>
      </td>
      <td>₹<span class="unitPrice">${product.price}</span></td>
      <td>₹<span class="priceValue">${product.price * product.quantity}</span></td>
    `;
    cartTable.insertBefore(row, totalRow);
  });
  updateTotal();
}
renderCartItems();

// Add to cart event
document.addEventListener("add-to-cart", function(e) {
  let product = e.detail;

  let exists = cartItems.find(item => item.name === product.name);
  if (exists) {
    showCustomAlert("Product is already added in your cart");
    return;
  }

  cartItems.push({ ...product });
  saveCartToLocal();
  renderCartItems();
});

// Remove
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("removeBtn")) {
    let row = e.target.closest("tr");
    let name = row.children[1].innerText;

    showConfirmRemove("Remove product from your cart?", () => {
      cartItems = cartItems.filter(item => item.name !== name);
      saveCartToLocal();
      renderCartItems();
    });
  }
});

// Quantity control
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("incQty") || e.target.classList.contains("decQty")) {
    let row = e.target.closest("tr");
    let qtyElem = row.querySelector(".qtyValue");
    let unitPrice = parseInt(row.querySelector(".unitPrice").textContent);
    let priceElem = row.querySelector(".priceValue");
    let name = row.children[1].innerText;
    let product = cartItems.find(item => item.name === name);
    if (!product) return;

    if (e.target.classList.contains("incQty")) {
      product.quantity++;
    } else if (e.target.classList.contains("decQty") && product.quantity > 1) {
      product.quantity--;
    }

    saveCartToLocal();
    renderCartItems();
  }
});

// Confirm Remove Box
function showConfirmRemove(message, onConfirm) {
  const existing = document.querySelector('.custom-alert');
  if (existing) existing.remove();

  let alertModal = document.createElement('div');
  alertModal.classList.add('custom-alert');
  alertModal.innerHTML = `
    <div class="alert-content">
      <span id="alertMessage">${message}</span>
      <div style="margin-top: 15px;">
        <button id="confirmRemove" class="btnConfirm">Yes</button>
        <button id="cancelRemove" class="btnCancel">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(alertModal);
  alertModal.style.display = "flex";

  document.getElementById("confirmRemove").addEventListener("click", function () {
    alertModal.remove();
    onConfirm();
  });

  document.getElementById("cancelRemove").addEventListener("click", function () {
    alertModal.remove();
  });
}

// Alert box
function showCustomAlert(message) {
  let alertModal = document.createElement('div');
  alertModal.classList.add('custom-alert');
  alertModal.innerHTML = `
    <div class="alert-content">
      <span id="alertMessage">${message}</span>
      <button id="closeAlertBtn">OK</button>
    </div>
  `;
  document.body.appendChild(alertModal);
  alertModal.style.display = "flex";

  document.getElementById("closeAlertBtn").addEventListener("click", function() {
    alertModal.remove();
  });
}
