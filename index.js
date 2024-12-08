const productContainer = document.getElementById("product_container");
// const productCard = document.getElementById("product_card");
const searchInput = document.getElementById('searchInput');
let productData = [];

async function getProductData() {
    const url = 'https://fakestoreapi.com/products';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        // console.log(json);
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

function highlightedText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi"); // Case-insensitive match
    return text.toString().replace(regex, `<span class="highlight">$1</span>`);
}

function renderProducts(products, query = "") {
    // console.log(products);
    productContainer.innerHTML = "";
    products.forEach(product => {
        const highlightedTitle = highlightedText(product.title, query);
        const highlightedDescription = highlightedText(product.description, query);
        const highlightedPrice = highlightedText(product.price, query);

        console.log(highlightedPrice);
        const productCardEl = document.createElement("div");
        productCardEl.classList.add("product_card");
        productCardEl.innerHTML = `
                <div class="product_image">
                    <img src="${product.image}" alt="product">
                </div>
                <div class="product_content" id="product_content">
                    <h2 id="product_title">${highlightedTitle}</h2>
                    <p id="product_description">${highlightedDescription.split(" ").slice(0, 20).join(" ")}</p>
                    <button>${highlightedPrice} $</button>
                </div>
                `;
        productContainer.appendChild(productCardEl);
    });
}

function filterProducts(query, queryAsNumber) {
    const filteredProducts = productData.filter((product) => {
        const title = product.title.toLowerCase();
        const description = product.description.toLowerCase();
        const price = product.price;
        console.log(price);
        // console.log(query);
        // console.log(!isNaN(queryAsNumber) && price <= queryAsNumber);
        return title.includes(query) || description.includes(query) ||
            (!isNaN(queryAsNumber) && price === queryAsNumber);
    });
    console.log(filteredProducts);
    renderProducts(filteredProducts, query);
}

document.addEventListener("DOMContentLoaded", async () => {
    productData = await getProductData();
    searchInput.value = "";
    // console.log(productData);
    renderProducts(productData);
});

searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const queryAsNumber = parseFloat(query);
    // console.log(queryAsNumber);
    filterProducts(query, queryAsNumber);
});
