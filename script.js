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
            <h1 class="card-title">${product.price}</h1>
            <div class="card-action w-full flex gap-2">
              <button class="btn btn-soft flex-1">
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
  console.log(categories);
  const categoryBtns = document.getElementById("categories");

  for (const category of categories) {
    const btn = document.createElement("button");
    btn.classList.add(
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
              <button class="btn btn-soft flex-1">
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

loadProducts();
loadCategories();
