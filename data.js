let siteData = {
  phone: "919812100187",
  categories: [
    "Sofa","Bed","Mattress","Chair","Fridge","Washing Machine","Geyser",
    "LED","Almirah","Cooler","AC","Mixer","Juicer","Fan","Table","Heater",
    "Utensils","Iron","Counter"
  ],
  products: []
};

if(localStorage.getItem("siteData")){
  siteData = JSON.parse(localStorage.getItem("siteData"));
}else{
  localStorage.setItem("siteData",JSON.stringify(siteData));
}
