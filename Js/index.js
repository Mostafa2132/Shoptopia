//! get all cat

async function getAllCat() {
  let res = await fetch("https://dummyjson.com/products/category-list");
  let data = await res.json();

  showAllCat(data);
}
getAllCat();

// show all cat
function showAllCat(arr) {
  let x = ``;
  for (let i = 0; i < arr.length; i++) {
    x += `
               <div class="col-md-4 category">
            <div class="item d-flex align-items-center justify-content-center">
                    <h2>${arr[i].toUpperCase()}</h2>
            </div>
        </div>
        
        `;
  }

  if (document.getElementById("rowCat")) {
    document.getElementById("rowCat").innerHTML = x;
  }

  let allCat = document.querySelectorAll(".category");
  for (let i = 0; i < allCat.length; i++) {
    allCat[i].addEventListener("click", (e) => {
      let targetCat = e.target.innerText;
      localStorage.setItem("myCategory", targetCat);

      location.pathname = "/productCatPro.html";
    });
  }
}

// show category information (products)

async function getCategoryProducts() {
  let res = await fetch(
    `https://dummyjson.com/products/category/${localStorage.getItem(
      "myCategory"
    )}`
  );
  let data = await res.json();

  showCategoryProducts(data.products);
}
// getCategoryProducts()

if (location.pathname.includes("/productCatPro.html")) {
  getCategoryProducts();
}

// show category information (products)

function showCategoryProducts(arr) {
  let x = ``;
  for (let i = 0; i < arr.length; i++) {
    x += `
            <div class="col-md-4 product" id=${arr[i].id}>
                <div class="card" >
                    <img src="${arr[i].thumbnail}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${arr[i].title}</h5>
                      <p class="card-text">${arr[i].description}</p>
                        <div class="foot d-flex justify-content-between align-items-center">
                            <h5 class="text-success">${arr[i].price} $</h5>
                            <h5> ${arr[i].rating} <i class="fa-regular fa-star text-warning"></i></h5>
                        </div>
                         <button type="button" class="btn btn-outline-success w-100 my-2">Add To Cart</button>
                    </div>
                      
                  </div>
            </div>
        
        
        `;
  }
  if (document.getElementById("catPro")) {
    document.getElementById("catPro").innerHTML = x;
  }

  if (document.getElementById("anyPro")) {
    document.getElementById("anyPro").innerHTML = x;
  }

  let allProCat = document.querySelectorAll(".product");
  for (let i = 0; i < allProCat.length; i++) {
    allProCat[i].addEventListener("click", () => {
      localStorage.setItem("proId", allProCat[i].getAttribute("id"));
      location.pathname = "/productDeteli.html";
    });
  }
}

// show product detail

async function getProductDetail() {
  let res = await fetch(
    `https://dummyjson.com/products/${localStorage.getItem("proId")}`
  );
  let data = await res.json();

  showProductDetail(data);
}

if (location.pathname.includes("/productDeteli.html")) {
  getProductDetail();
}

function showProductDetail(arr) {
  let x = `
                    <div class="col-md-6">
                <img src="${arr.thumbnail}" class="w-100" alt="">
            </div>
            <div class="col-md-6">
                <h4 class="fs-2 fw-bold">${arr.title}</h4>
                <h4 class="py-1 fw-bold lh-lg"> <span class="text-muted">${arr.description}</span></h4>
                <h4 class="py-3 fw-bold">Price : <span class="text-muted">${arr.price} $</span></h4>
                <h4 class="py-3 fw-bold">Brand : <span class="text-muted">${arr.brand}</span></h4>
                <h4 class="py-3 fw-bold">Category : <span class="text-muted">${arr.category}</span></h4>
                <h4 class="py-3 fw-bold">Return Policy : <span class="text-muted">${arr.returnPolicy}</span></h4>
                <h4 class="py-3 fw-bold text-danger">Discount : ${arr.discountPercentage} %</h4>
                  <button type="button" class="btn btn-outline-success w-100 my-2">Add To Cart</button>
            </div>
        
        
        `;
  if (document.getElementById("proInfo")) {
    document.getElementById("proInfo").innerHTML = x;
  }
  if (document.getElementById("anyPro")) {
    document.getElementById("anyPro").innerHTML = x;
  }
}

// any products

async function anyProduct() {
  let res = await fetch("https://dummyjson.com/products");
  let data = await res.json();
  showCategoryProducts(data.products);
}

if (location.pathname.includes("/anyProducts.html")) {
  anyProduct();
}

// add product

let name = document.getElementById("name");
let Price = document.getElementById("Price");
let cat = document.getElementById("cat");
let des = document.getElementById("des");
let addBtn = document.getElementById("addBtn");
let warMsg = document.querySelector(".warMsg");

async function addProduct() {
  let product = {
    title: name.value,
    description: des.value,
    price: Price.value,
    category: cat.value,
  };
  let res = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}
let allInp = document.querySelectorAll("input , textarea")

if (location.pathname.includes("/addProduct.html")) {
  addBtn.addEventListener("click", () => {
    if (checkInp()) {
     if (validate(name) && validate(Price) && validate(cat) && validate(des)) {
        warMsg.classList.replace("d-block", "d-none");
        addProduct();
        clear();
        Toastify({
          text: "product added successfully",
          gravity: "bottom",
          duration: 3000,
          style: {
            color: "#000",
            fontWeight: "bold",
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        setTimeout(function () {
          location.pathname = "index.html";
        }, 3000);
        allInp.forEach((x)=>{
            x.classList.remove("is-valid")
        })
      } else{
        alert("اكتب كلام زي الناس ياعم بطلنها شغلانه")
      }
    } else {
        warMsg.classList.replace("d-none", "d-block");
      }
  });
}

function clear() {
  name.value = "";
  des.value = "";
  Price.value = "";
  cat.value = "";
}

function checkInp() {
  if (
    name.value == "" ||
    des.value == "" ||
    Price.value == "" ||
    cat.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function validate(ele) {
  let regex = {
    name: /^\w{3,8} ?([a-z]{3,8})?$/gm,
    Price: /^[1-9][0-9]{1,6}$/,
    cat: /^.{2,10}$/,
    des: /^.{2,10}$/,
  };
  if (regex[ele.id].test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    return true;
  } else {
    ele.classList.remove("is-valid");
    ele.classList.add("is-invalid");
    return false;
  }
}

let navLink = $(".nav-link");

if (location.pathname.includes("/addProduct.html")) {
  navLink.removeClass("active");
  $("a[href='addProduct.html']").addClass("active");
}
if (location.pathname.includes("/anyProducts.html")) {
  navLink.removeClass("active");
  $("a[href='anyProducts.html']").addClass("active");
}
if (location.pathname.includes("/productDeteli.html")) {
  navLink.removeClass("active");
}

// loding screen

$(window).ready(function () {
  $(".spinner").hide(1700, function () {
    $(".loading").fadeOut(1000, function () {
      $("body").css("overflow", "visible");
    });
  });
});


if(location.pathname.includes("/index.html")){
    document.getElementById("shopBtn").addEventListener("click", function(){
        $("html, body").animate({scrollTop:600},1000)
    })
    }




