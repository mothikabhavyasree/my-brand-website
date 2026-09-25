const searchInput =
    document.getElementById("search-input");

const filterButtons =
    document.querySelectorAll(".filter-button");

const products =
    document.querySelectorAll(".shop-products .product");

const productCount =
    document.getElementById("product-count");


const urlParams =
    new URLSearchParams(window.location.search);

let selectedCategory =
    urlParams.get("category") || "all";


filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        selectedCategory =
            button.dataset.category;

        filterProducts();

    });

});


searchInput.addEventListener(
    "input",
    function() {

        filterProducts();

    }
);


function filterProducts() {

    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();


    let visibleProducts = 0;


    products.forEach(function(product) {

        const category =
            product.dataset.category;

        const name =
            product.dataset.name
            .toLowerCase();


        const categoryMatch =
            selectedCategory === "all" ||
            category === selectedCategory;


        const searchMatch =
            name.includes(searchText);


        if (categoryMatch && searchMatch) {

            product.style.display = "block";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    productCount.textContent =
        visibleProducts;

}

filterProducts();