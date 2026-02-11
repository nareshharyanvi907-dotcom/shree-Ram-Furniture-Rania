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

  products.forEach((p, i) => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" />
        <h3>${p.name}</h3>
        <p>₹ ${p.price}</p>
        <button>Buy Now</button>
      </div>
    `;
  });
}

// Add product from admin panel
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

  alert("Product Added Successfully");

  document.getElementById("pname").value = "";
  document.getElementById("pprice").value = "";
  document.getElementById("pimage").value = "";

  showAdminProducts();
}

// Show products in admin panel
function showAdminProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const list = document.getElementById("adminList");

  if (!list) return;

  list.innerHTML = "";

  products.forEach((p, i) => {
    list.innerHTML += `
      <div class="admin-card">
        <img src="${p.image}">
        <b>${p.name}</b>
        <p>₹ ${p.price}</p>
        <button onclick="deleteProduct(${i})">Delete</button>
      </div>
    `;
  });
}

// Delete product
function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  showAdminProducts();
}
