// Load products on website
function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const container = document.getElementById("productList");

  if (!container) return;

  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>No products added yet</p>";
    return;
  }

  products.forEach((p) => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" onclick="openModal('${p.image}')"
             style="cursor:zoom-in;">

        <h3>${p.name}</h3>
        <p>₹ ${p.price}</p>

        <button onclick="buyNow('${p.name}','${p.price}')">Buy Now</button>
      </div>
    `;
  });
}

// WhatsApp redirect
function buyNow(name, price) {
  let phone = "919812100187";
  let msg = "Hello, I want to buy " + name + " Price ₹" + price;
  let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg);
  window.open(url, "_blank");
}

// Admin panel functions
function addProduct() {
  const name = document.getElementById("pname").value;
  const price = document.getElementById("pprice").value;
  const image = document.getElementById("pimage").value;

  if (!name || !price || !image) {
    alert("Fill all fields");
    return;
  }

  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.push({ name, price, image });
  localStorage.setItem("products", JSON.stringify(products));

  document.getElementById("pname").value = "";
  document.getElementById("pprice").value = "";
  document.getElementById("pimage").value = "";

  showAdminProducts();
}

function showAdminProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const list = document.getElementById("adminList");

  if (!list) return;

  list.innerHTML = "";

  products.forEach((p, i) => {
    list.innerHTML += `
      <div class="admin-card">
        <img src="${p.image}" style="width:100%;height:120px;object-fit:cover;">
        <b>${p.name}</b>
        <p>₹ ${p.price}</p>
        <button onclick="deleteProduct(${i})">Delete</button>
      </div>
    `;
  });
}

function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  showAdminProducts();
}
