let cart = [];

function addToCart(name, price) {
  let existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  let cartItems = document.getElementById("cart-items");
  let cartCount = document.getElementById("cart-count");
  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <div>
        <p>${item.name}</p>
        <button onclick="changeQty(${index},-1)">-</button>
        ${item.qty}
        <button onclick="changeQty(${index},1)">+</button>
        <button onclick="removeItem(${index})">حذف</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "الإجمالي: " + total + " جنيه";
  cartCount.innerText = cart.length;
}

function changeQty(index, amount) {
  cart[index].qty += amount;
  if (cart[index].qty <= 0) cart.splice(index,1);
  updateCart();
}

function removeItem(index) {
  cart.splice(index,1);
  updateCart();
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
}

function showCheckout() {
  document.getElementById("checkout").style.display = "flex";
}

function closeCheckout() {
  document.getElementById("checkout").style.display = "none";
}

function generateInvoice() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  let invoiceText = `الاسم: ${name}<br>الهاتف: ${phone}<br>العنوان: ${address}<br><br>المنتجات:<br>`;
  let total = 0;

  cart.forEach(item => {
    invoiceText += `${item.name} × ${item.qty}<br>`;
    total += item.price * item.qty;
  });

  invoiceText += `<br><strong>الإجمالي: ${total} جنيه</strong>`;

  document.getElementById("invoice-details").innerHTML = invoiceText;

  document.getElementById("checkout").style.display = "none";
  document.getElementById("invoice").style.display = "flex";
}

function closeInvoice() {
  document.getElementById("invoice").style.display = "none";
}

function sendWhatsApp() {
  let text = document.getElementById("invoice-details").innerText;
  let url = "https://wa.me/201000000000?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
}

function filterProducts(category) {
  let products = document.querySelectorAll(".product");
  products.forEach(p => {
    if (category === "all" || p.dataset.category === category) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}
