let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct(){
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let image = document.getElementById("image").value;

  if(name=="" || price=="" || image==""){
    alert("Fill all fields");
    return;
  }

  products.push({name,price,image});
  localStorage.setItem("products", JSON.stringify(products));
  loadTable();
  alert("Product Added");

  document.getElementById("name").value="";
  document.getElementById("price").value="";
  document.getElementById("image").value="";
}

function loadTable(){
  let table = document.getElementById("table");
  if(!table) return;

  table.innerHTML = "";
  products.forEach((p,i)=>{
    table.innerHTML += `
      <tr>
        <td><img src="${p.image}" width="60"></td>
        <td>${p.name}</td>
        <td>₹${p.price}</td>
        <td><button onclick="deleteProduct(${i})">Delete</button></td>
      </tr>
    `;
  });
}

function deleteProduct(index){
  products.splice(index,1);
  localStorage.setItem("products", JSON.stringify(products));
  loadTable();
}

function showProducts(){
  let box = document.getElementById("products");
  if(!box) return;

  box.innerHTML = "";
  products.forEach(p=>{
    box.innerHTML += `
      <div class="box">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <h4>₹${p.price}</h4>
      </div>
    `;
  });
}

loadTable();
showProducts();
