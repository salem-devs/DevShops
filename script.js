const apiUrl = "https://fakestoreapi.com/products";

const productsContainer = document.getElementById("productsContainer");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("errorMessage");

let products = [];

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

getProducts();

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

getProducts();