let store = JSON.parse(localStorage.getItem("store")) || [];

function saveStore(){
  localStorage.setItem("store", JSON.stringify(store));
}

function addProduct(name, price, img, cat){
  store.push({name, price, img, cat});
  saveStore();
  alert("Product Added!");
}

function deleteProduct(index){
  store.splice(index,1);
  saveStore();
  location.reload();
}
