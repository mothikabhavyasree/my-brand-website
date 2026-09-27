// =========================================
// GLOBAL CART COUNT
// =========================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cartProducts")
        ) || [];


    let totalQuantity = 0;


    cart.forEach(function (product) {

        totalQuantity +=
            Number(product.quantity) || 0;

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


updateCartCount();