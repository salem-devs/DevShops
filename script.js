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


