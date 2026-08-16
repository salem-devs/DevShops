const apiUrl = "https://fakestoreapi.com/products";

const productsContainer = document.getElementById("productsContainer");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("errorMessage");
const categoryButtons = document.querySelectorAll(".category-btn");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const cartBtn = document.getElementById("cartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const overlay = document.getElementById("overlay");

let products = [];
let cart = [];


// Récupéreration des produits
async function getProducts() {
    try {
        loader.style.display = "block";

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des produits");
        }

        const data = await response.json();

        products = data;

        displayProducts(products);
        console.log(products);

    } catch (error) {
        console.error(error);
        errorMessage.textContent = "Impossible de charger les produits.";

    } finally {
        loader.style.display = "none";
    }
}

// Affichage des produits
function displayProducts(productsToDisplay) {

    productsContainer.innerHTML = "";

    productsToDisplay.forEach(product => {

        const productCard = document.createElement("article");

        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">

            <h2>${product.title}</h2>

            <p>${product.category}</p>

            <strong>${product.price} $</strong>

            <button class="add-cart-btn" data-id="${product.id}">
                Ajouter au panier
            </button>
        `;

        productsContainer.appendChild(productCard);
    });
}

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        if (category === "all") {

            displayProducts(products);

        } else {

            const filteredProducts = products.filter(product => {
                return product.category === category;
            });

            displayProducts(filteredProducts);
        }
    });
});


//Recherche de produits
searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(searchText);
    });

    displayProducts(filteredProducts);
});

function addToCart(productId) {

    const product = products.find(product => {
        return product.id === productId;
    });

    if (product) {

        const existingProduct = cart.find(item => {
            return item.id === productId;
        });

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                ...product,
                quantity: 1
            });

        }

        updateCartCount();
        displayCart();
    }
}

function updateCartCount() {
    cartCount.textContent = cart.length;
}

productsContainer.addEventListener("click", event => {

    if (event.target.classList.contains("add-cart-btn")) {

        const productId = Number(event.target.dataset.id);

        addToCart(productId);
    }
});
cartItems.addEventListener("click", event => {

    const productId = Number(event.target.dataset.id);

    const product = cart.find(item => {
        return item.id === productId;
    });

    if (!product) {
        return;
    }

    if (event.target.classList.contains("increase-btn")) {

        product.quantity++;

    }

    if (event.target.classList.contains("decrease-btn")) {

        if (product.quantity > 1) {
            product.quantity--;
        }

    }

    updateCartCount();
    displayCart();
});

function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Votre panier est vide.</p>";
        cartTotal.textContent = "0.00 $";
        return;
    }

    cart.forEach(product => {

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">

            <div>
                <h3>${product.title}</h3>

                <p>${product.price} $</p>

                <div class="quantity-controls">

                    <button class="decrease-btn" data-id="${product.id}">
                        -
                    </button>

                    <span>${product.quantity}</span>

                    <button class="increase-btn" data-id="${product.id}">
                        +
                    </button>

                </div>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    const total = cart.reduce((sum, product) => {
        return sum + (product.price * product.quantity);
    }, 0);

    cartTotal.textContent = `${total.toFixed(2)} $`;
}

cartBtn.addEventListener("click", () => {
    displayCart();
    cartDrawer.style.display = "block";
    overlay.style.display = "block";
});

closeCartBtn.addEventListener("click", () => {
    cartDrawer.style.display = "none";
    overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
    cartDrawer.style.display = "none";
    overlay.style.display = "none";
});

getProducts();