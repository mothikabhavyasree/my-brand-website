// =========================================
// PRODUCT QUANTITY
// =========================================

let quantity = 1;

const quantityDisplay =
    document.querySelector(".quantity-box span");

const quantityButtons =
    document.querySelectorAll(".quantity-box button");

if (quantityDisplay && quantityButtons.length >= 2) {

    quantityButtons[0].addEventListener("click", function () {

        if (quantity > 1) {
            quantity--;

            quantityDisplay.textContent =
                quantity;
        }

    });


    quantityButtons[1].addEventListener("click", function () {

        quantity++;

        quantityDisplay.textContent =
            quantity;

    });

}



// =========================================
// SIZE SELECTION
// =========================================

const sizeButtons =
    document.querySelectorAll(".sizes button");

let selectedSize = null;

sizeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        sizeButtons.forEach(function (btn) {

            btn.style.background = "white";
            btn.style.color = "#222";

        });


        button.style.background = "#222";
        button.style.color = "white";

        selectedSize =
            button.textContent;

    });

});



// =========================================
// GET CURRENT PRODUCT
// =========================================

const params =
    new URLSearchParams(
        window.location.search
    );

const productId =
    params.get("id");

const currentProduct =
    products[productId];



// =========================================
// CREATE PRODUCT
// =========================================

function createCartProduct() {

    return {

        id: productId,

        name:
            currentProduct.name,

        price:
            currentProduct.price,

        size:
            selectedSize,

        quantity:
            quantity

    };

}



// =========================================
// UPDATE CART COUNT
// =========================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cartProducts")
        ) || [];


    let totalQuantity = 0;


    cart.forEach(function (product) {

        totalQuantity +=
            product.quantity;

    });


    const cartIcons =
        document.querySelectorAll(
            ".cart-icon"
        );


    cartIcons.forEach(function (cartIcon) {

        let count =
            cartIcon.querySelector(
                ".cart-count"
            );


        if (!count) {

            count =
                document.createElement("span");

            count.className =
                "cart-count";

            cartIcon.appendChild(count);

        }


        if (totalQuantity > 0) {

            count.textContent =
                totalQuantity;

            count.style.display =
                "flex";

        } else {

            count.style.display =
                "none";

        }

    });

}



// =========================================
// ADD TO CART
// =========================================

const addCartButton =
    document.querySelector(".add-cart");

if (addCartButton) {

    addCartButton.addEventListener(
        "click",
        function () {

            if (!selectedSize) {

                alert(
                    "Please select a size."
                );

                return;

            }


            const newProduct =
                createCartProduct();


            let cart =
                JSON.parse(
                    localStorage.getItem(
                        "cartProducts"
                    )
                ) || [];


            const existingProduct =
                cart.find(
                    function (product) {

                        return (

                            product.id ===
                                newProduct.id &&

                            product.size ===
                                newProduct.size

                        );

                    }
                );


            if (existingProduct) {

                existingProduct.quantity +=
                    newProduct.quantity;

            } else {

                cart.push(
                    newProduct
                );

            }


            localStorage.setItem(
                "cartProducts",
                JSON.stringify(cart)
            );


            updateCartCount();


            alert(
                "Product added to cart!"
            );

        }
    );

}



// =========================================
// BUY NOW
// =========================================

const buyNowButton =
    document.querySelector(".buy-now");

if (buyNowButton) {

    buyNowButton.addEventListener(
        "click",
        function () {

            if (!selectedSize) {

                alert(
                    "Please select a size."
                );

                return;

            }


            const buyNowProduct =
                createCartProduct();


            localStorage.setItem(
                "cartProducts",
                JSON.stringify(
                    [buyNowProduct]
                )
            );


            updateCartCount();


            window.location.href =
                "checkout.html";

        }
    );

}



// =========================================
// INITIAL CART COUNT
// =========================================

updateCartCount();