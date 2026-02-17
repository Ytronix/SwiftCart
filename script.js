const loadProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => displayProducts(json));
};

const displayProducts = (products) => {
  const productContainer = document.getElementById("card-container");
  productContainer.innerHTML = "";

  let i = 0;
  for (const product of products) {
    console.log(product);
    if (i >= 4) break;
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-base-100 w-72 shadow-sm">
          <figure class = "bg-gray-100 p-5">
            <img
              class = "w-32 h-auto"
              src="${product.image}" alt="${product.name}"
            />
          </figure>
          <div class="card-body p-2">
            <h2 class="card-title justify-between text-xs mt-2">
              <div class="badge badge-soft badge-info">Men's Clothing</div>
              ⭐3.9 (120)
            </h2>
            <h1 class="text-lg">Raymond's Watch</h1>
            <h1 class="card-title">$100</h1>
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

loadProducts();
