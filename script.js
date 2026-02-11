// Load products on website
function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const container = document.getElementById("productList");

  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>No products added yet</p>";
    return;
  }

  products.forEach((p, i) => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" onclick="openModal(this.src)" style="cursor:zoom-in;">
        <h3>${p.name}</h3>
        <p>₹ ${p.price}</p>

        <a href="https://wa.me/919812100187?text=Hello%20I%20want%20to%20buy%20${encodeURIComponent(p.name)}%20Price:%20₹${p.price}" 
           target="_blank">
           <button>Buy Now</button>
        </a>
      </div>
    `;
  });
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

// Show products in admin panel
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

// Delete product
function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  showAdminProducts();
}
