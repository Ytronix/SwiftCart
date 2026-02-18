const loadProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      displayAllProducts(json);
      displayTrendingProducts(json);
    });
};
const loadCategories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json));
};
const loadSortedCategories = (category) => {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((json) => displaysortedProducts(json));
};
const productDetails = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((json) => showDetails(json));
};

const showPage = (id, button) => {
  const home = document.getElementById("Home");
  const Products = document.getElementById("Products");

  const buttons = document.querySelectorAll(".nav-btn");
  buttons.forEach((button) => button.classList.remove("nav-btn-active"));

  home.classList.add("hidden");
  Products.classList.add("hidden");

  document.getElementById(id).classList.remove("hidden");
  button.classList.add("nav-btn-active");
};
const displayTrendingProducts = (products) => {
  const productContainer = document.getElementById("card-container");
  productContainer.innerHTML = "";

  let i = 0;
  for (const product of products) {
    if (i >= 3) break;
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-base-100 w-72 h-96 shadow-sm">
          <figure class = "bg-gray-100 p-5">
            <img
              class = "w-32 h-40"
              src="${product.image}" alt="${product.name}"
            />
          </figure>
          <div class="card-body p-2 justify-between">
            <h2 class="card-title justify-between text-xs mt-2">
              <div class="badge badge-soft badge-info">${product.category}</div>
              ⭐${product.rating.rate} (${product.rating.count})
            </h2>
            <h1 class="text-lg">${product.title}</h1>
            <h1 class="card-title">$${product.price}</h1>
            <div class="card-action w-full flex gap-2">
              <button onclick="productDetails(${product.id})" class="btn btn-soft flex-1">
                <i class="fa-regular fa-eye"></i>
                Details
              </button>
              <button class="btn btn-soft btn-info flex-1">
                <i class="fa-solid fa-cart-shopping"></i>
                Add
              </button>
            </div>
          </div>
        </div>
        `;

    productContainer.append(card);
    i++;
  }
};
const displayCategories = (categories) => {
  const categoryBtns = document.getElementById("categories");

  for (const category of categories) {
    const btn = document.createElement("button");
    btn.classList.add(
      "category-btn",
      "btn",
      "btn-neutral",
      "btn-outline",
      "rounded-4xl",
      "hover:border-none",
      "hover:bg-sky-200",
      "hover:text-sky-500",
      "w-auto",
    );
    btn.innerText = category;

    categoryBtns.append(btn);

    const btns = document.querySelectorAll(".category-btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const allBtns = document.querySelectorAll(".category-btn");
        allBtns.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    btn.addEventListener("click", () => {
      loadSortedCategories(category);
    });
  }
};
const displayAllProducts = (allProducts) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  for (const product of allProducts) {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-base-100 w-72 h-96 shadow-sm">
          <figure class = "bg-gray-100 p-5">
            <img
              class = "w-32 h-40"
              src="${product.image}" alt="${product.name}"
            />
          </figure>
          <div class="card-body p-2 justify-between">
            <h2 class="card-title justify-between text-xs mt-2">
              <div class="badge badge-soft badge-info">${product.category}</div>
              ⭐${product.rating.rate} (${product.rating.count})
            </h2>
            <h1>${product.title}</h1>
            <h1 class="card-title">$${product.price}</h1>
            <div class="card-action w-full flex gap-2">
              <button onclick="productDetails(${product.id})" class="btn btn-soft flex-1">
                <i class="fa-regular fa-eye"></i>
                Details
              </button>
              <button class="btn btn-soft btn-info flex-1">
                <i class="fa-solid fa-cart-shopping"></i>
                Add
              </button>
            </div>
          </div>
        </div>
        `;

    productContainer.append(card);
  }
};
const displaysortedProducts = (sortedProducts) => {
  const productContainer = document.getElementById("product-container"); // same as All
  productContainer.innerHTML = ""; // clear old cards

  for (const product of sortedProducts) {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="card bg-base-100 w-72 h-96 shadow-sm">
        <figure class="bg-gray-100 p-5">
          <img class="w-32 h-40" src="${product.image}" alt="${product.title}" />
        </figure>
        <div class="card-body p-2 justify-between">
          <h2 class="card-title justify-between text-xs mt-2">
            <div class="badge badge-soft badge-info">${product.category}</div>
            ⭐${product.rating.rate} (${product.rating.count})
          </h2>
          <h1>${product.title}</h1>
          <h1 class="card-title">$${product.price}</h1>
          <div class="card-action w-full flex gap-2">
            <button onclick="productDetails(${product.id})" class="btn btn-soft flex-1">
              <i class="fa-regular fa-eye"></i>
              Details
            </button>
            <button class="btn btn-soft btn-info flex-1">
              <i class="fa-solid fa-cart-shopping"></i>
              Add
            </button>
          </div>
        </div>
      </div>
    `;
    productContainer.append(card);
  }
};
const showDetails = (details) => {
  const productdetails = document.getElementById("product-details");
  productdetails.innerHTML = `
          <figure class = "bg-gray-100 p-5">
            <img
              class = "w-32 h-40 mx-auto"
              src="${details.image}" alt="${details.title}"
            />
          </figure>
          <h1 class="modal-title text-2xl mb-5 font-semibold">
            ${details.title}
          </h1>
          <p class="product-desciption text-slate-600 mb-2">
            ${details.description}
          </p>
          <div class="flex justify-between items-center">
            <h3 class="price text-lg font-semibold">$${details.price}</h3>
            <h5 class="rating">⭐${details.rating.rate} (${details.rating.count})</h5>
          </div>
          <div class="modal-action flex justify-end items-center gap-5">
            <button class="btn btn-soft btn-info">
              <i class="fa-solid fa-cart-shopping"></i>
              Add
            </button>
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
  `;

  document.getElementById("details_modal").showModal();
};

loadProducts();
loadCategories();
