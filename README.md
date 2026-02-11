<?php
session_start();

// -------- BASIC SETTINGS ----------
$shop_name = "Shri Ram Furniture And Electronics House - Rania";
$phone = "919812100187";
$address = "Near Gaushala, Jiwan Nagar Road, Rania, Haryana";

// Simple file database
$data_file = "data.json";
if(!file_exists($data_file)){
    file_put_contents($data_file, json_encode([
        "categories"=>[],
        "products"=>[]
    ]));
}
$data = json_decode(file_get_contents($data_file), true);

// ---------- ADMIN LOGIN ----------
if(isset($_POST['login'])){
    if($_POST['user']=="admin" && $_POST['pass']=="12345"){
        $_SESSION['admin']=true;
    }
}

if(isset($_GET['logout'])){
    session_destroy();
    header("location:index.php");
}

// ---------- ADD CATEGORY ----------
if(isset($_POST['add_cat'])){
    $data['categories'][] = [
        "name"=>$_POST['catname'],
        "img"=>$_POST['catimg']
    ];
    file_put_contents($data_file,json_encode($data));
}

// ---------- ADD PRODUCT ----------
if(isset($_POST['add_pro'])){
    $data['products'][] = [
        "cat"=>$_POST['cat'],
        "name"=>$_POST['name'],
        "price"=>$_POST['price'],
        "war"=>$_POST['war'],
        "img"=>$_POST['img']
    ];
    file_put_contents($data_file,json_encode($data));
}
?>
<!DOCTYPE html>
<html>
<head>
<title><?php echo $shop_name ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{margin:0;font-family:Arial;background:#f5f5f5}
header{background:#0b3c5d;color:#fff;text-align:center;padding:15px}
.slider img{width:100%;height:220px;object-fit:cover}
.search{padding:10px;text-align:center}
.search input{width:90%;padding:10px;border-radius:8px;border:1px solid #ccc}
h2{text-align:center}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;padding:10px}
.box{background:#fff;border-radius:10px;padding:10px;text-align:center}
.box img{width:100%;height:100px;object-fit:cover;border-radius:8px}
.btn{display:inline-block;background:green;color:white;padding:6px 12px;border-radius:5px;text-decoration:none;margin-top:5px}
.admin{background:#fff;margin:10px;padding:10px;border-radius:10px}
input,button,select{padding:8px;margin:5px;width:100%}
</style>
</head>
<body>

<header>
<h1><?php echo $shop_name ?></h1>
<p><?php echo $address ?> | 📞 9812100187</p>
</header>

<div class="slider">
<img id="slide" src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7">
</div>

<div class="search">
<input type="text" id="search" placeholder="Search products...">
</div>

<h2>Categories</h2>
<div class="grid">
<?php foreach($data['categories'] as $c){ ?>
<div class="box">
<img src="<?php echo $c['img'] ?>">
<h4><?php echo $c['name'] ?></h4>
</div>
<?php } ?>
</div>

<h2>Products</h2>
<div class="grid" id="products">
<?php foreach($data['products'] as $p){ 
$msg="Hello, mujhe ".$p['name']." buy karna hai";
?>
<div class="box">
<img src="<?php echo $p['img'] ?>">
<h4><?php echo $p['name'] ?></h4>
<p>₹<?php echo $p['price'] ?></p>
<small>Warranty: <?php echo $p['war'] ?></small><br>
<a class="btn" href="https://wa.me/<?php echo $phone ?>?text=<?php echo urlencode($msg) ?>">Buy Now</a>
</div>
<?php } ?>
</div>

<hr>

<?php if(!isset($_SESSION['admin'])){ ?>

<div class="admin">
<h2>Admin Login</h2>
<form method="post">
<input name="user" placeholder="Username">
<input type="password" name="pass" placeholder="Password">
<button name="login">Login</button>
</form>
<p><b>Default Login:</b> admin / 12345</p>
</div>

<?php } else { ?>

<div class="admin">
<h2>Admin Dashboard</h2>
<a href="?logout=1">Logout</a>

<h3>Add Category</h3>
<form method="post">
<input name="catname" placeholder="Category Name">
<input name="catimg" placeholder="Category Image URL">
<button name="add_cat">Add Category</button>
</form>

<h3>Add Product</h3>
<form method="post">
<select name="cat">
<?php foreach($data['categories'] as $c){ ?>
<option><?php echo $c['name'] ?></option>
<?php } ?>
</select>
<input name="name" placeholder="Product Name">
<input name="price" placeholder="Price">
<input name="war" placeholder="Warranty">
<input name="img" placeholder="Image URL">
<button name="add_pro">Add Product</button>
</form>
</div>

<?php } ?>

<script>
let slides=[
"https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
"https://images.unsplash.com/photo-1616486701797-0f33f61038ec",
"https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
];
let i=0;
setInterval(()=>{
document.getElementById("slide").src=slides[i];
i=(i+1)%slides.length;
},3000);
</script>

</body>
</html>
