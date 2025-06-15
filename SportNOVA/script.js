// Add to Cart Function
function addToCart(productName, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name: productName, price: price, quantity: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} added to cart!`);
}
// 🌀 Slider Auto Change
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 4000); // Change slide every 4s
// 🛒 Render Cart Page
function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartContainer || !cartTotal) return;

  cartContainer.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerText = "0.00";
    return;
  }

  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p class="price">RM ${item.price.toFixed(2)}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(itemDiv);
    total += item.price;
  });

  cartTotal.innerText = total.toFixed(2);
}

function removeFromCart(index) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  loadCart();
}

function checkout() {
  alert("Proceeding to checkout (not implemented yet).");
  // You can integrate Stripe/PayPal/etc. here
}

document.addEventListener("DOMContentLoaded", loadCart);
function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartContainer || !cartTotal) return;

  cartContainer.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerText = "0.00";
    return;
  }

  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <div class="details">
        <h3>${item.name}</h3>
        <p class="price">RM ${item.price.toFixed(2)}</p>
      </div>
      <div class="controls">
        <button onclick="changeQty(${index}, -1)">-</button>
        <span class="quantity">${item.quantity}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
        <button onclick="removeFromCart(${index})">🗑️</button>
      </div>
    `;
    cartContainer.appendChild(itemDiv);
  });

  cartTotal.innerText = total.toFixed(2);
}

function changeQty(index, delta) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function fakeCheckout() {
  alert("✅ Payment successful! Thank you for your order.");
  localStorage.removeItem("cart");
  window.location.href = "success.html";
}

document.addEventListener("DOMContentLoaded", loadCart);
// Dark mode toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save theme to localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
});
