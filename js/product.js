const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

const product = products[productId];


if (product) {

    document.title =
        product.name + " | My Brand";


    document.querySelector(
        ".product-info h1"
    ).textContent = product.name;


    document.querySelector(
        ".product-price"
    ).textContent = "₹" + product.price;


    document.querySelector(
        ".product-description"
    ).textContent = product.description;

}