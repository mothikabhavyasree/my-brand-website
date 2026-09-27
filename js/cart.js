const cartContainer =
    document.getElementById("cart-container");

const cartTotal =
    document.getElementById("cart-total");

const cartTotalDisplay =
    document.getElementById("cart-total-display");


// GET CART

const savedCart =
    localStorage.getItem("cartProducts");

const cart =
    savedCart
        ? JSON.parse(savedCart)
        : [];


// =========================================
// UPDATE CART COUNT
// =========================================

function updateCartCount() {

    let totalQuantity = 0;


    cart.forEach(function(product) {

        totalQuantity +=
            Number(product.quantity) || 0;

    });


    const cartIcons =
        document.querySelectorAll(".cart-icon");


    cartIcons.forEach(function(cartIcon) {

        let count =
            cartIcon.querySelector(".cart-count");


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



// DISPLAY CART

function displayCart() {

    // EMPTY CART

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your Shopping Bag Is Empty
                </h2>

                <p>
                    Add something beautiful
                    to your cart.
                </p>

                <a href="shop.html">
                    Continue Shopping
                </a>

            </div>

        `;

        cartTotal.textContent = "₹0";

        cartTotalDisplay.textContent = "₹0";

        updateCartCount();

        return;
    }


    // CART HAS PRODUCTS

    let grandTotal = 0;

    cartContainer.innerHTML = "";


    cart.forEach(function(product, index) {

        const total =
            product.price * product.quantity;

        grandTotal += total;


        cartContainer.innerHTML += `

            <div class="cart-product">

                <div class="cart-product-image">
                    Product Image
                </div>


                <div class="cart-product-info">

                    <h2>
                        ${product.name}
                    </h2>

                    <p>
                        Price: ₹${product.price}
                    </p>

                    <p>
                        Size: ${product.size}
                    </p>


                    <div class="cart-quantity">

                        <span>
                            Quantity:
                        </span>


                        <button
                            onclick="decreaseQuantity(${index})">

                            −

                        </button>


                        <span class="cart-quantity-number">

                            ${product.quantity}

                        </span>


                        <button
                            onclick="increaseQuantity(${index})">

                            +

                        </button>

                    </div>


                    <button
                        class="remove-cart"
                        onclick="removeProduct(${index})">

                        Remove

                    </button>

                </div>


                <div class="cart-product-total">

                    ₹${total}

                </div>

            </div>

        `;

    });


    // UPDATE BOTH TOTALS

    cartTotal.textContent =
        "₹" + grandTotal;

    cartTotalDisplay.textContent =
        "₹" + grandTotal;


    // UPDATE CART ICON COUNT

    updateCartCount();

}



// INCREASE QUANTITY

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

}



// DECREASE QUANTITY

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    saveCart();

}



// REMOVE PRODUCT

function removeProduct(index) {

    cart.splice(index, 1);

    saveCart();

}



// SAVE CART

function saveCart() {

    localStorage.setItem(
        "cartProducts",
        JSON.stringify(cart)
    );

    displayCart();

}



// LOAD CART

displayCart();