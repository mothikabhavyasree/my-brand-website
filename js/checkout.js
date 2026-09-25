const checkoutProduct =
    document.getElementById("checkout-product");

const checkoutTotal =
    document.getElementById("checkout-total");


// GET CART

const savedCart =
    localStorage.getItem("cartProducts");

const cart =
    savedCart
        ? JSON.parse(savedCart)
        : [];


// SHOW ORDER

if (cart.length === 0) {

    checkoutProduct.innerHTML = `
        <p>Your cart is empty.</p>

        <a href="shop.html">
            Continue Shopping
        </a>
    `;

    checkoutTotal.textContent = "₹0";

}


// SHOW PRODUCTS

else {

    let grandTotal = 0;

    checkoutProduct.innerHTML = "";


    cart.forEach(function(product) {

        const total =
            product.price * product.quantity;

        grandTotal += total;


        checkoutProduct.innerHTML += `

            <div class="checkout-item">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Size: ${product.size}
                </p>

                <p>
                    Quantity: ${product.quantity}
                </p>

                <p>
                    Price: ₹${product.price}
                </p>

                <p>
                    Item Total: ₹${total}
                </p>

            </div>

            <hr>

        `;

    });


    checkoutTotal.textContent =
        "₹" + grandTotal;

}



// PAYMENT METHOD

const paymentOptions =
    document.querySelectorAll(
        'input[name="payment"]'
    );

const placeOrderButton =
    document.querySelector(".place-order");


paymentOptions.forEach(function(payment) {

    payment.addEventListener("change", function() {

        if (payment.value === "online") {

            placeOrderButton.textContent =
                "PAY NOW";

        } else {

            placeOrderButton.textContent =
                "PLACE ORDER";

        }

    });

});



// PLACE ORDER

const checkoutForm =
    document.getElementById("checkout-form");


checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "customer-name"
            ).value;


        alert(
            "Thank you, " +
            name +
            "! Your order has been placed."
        );


        localStorage.removeItem(
            "cartProducts"
        );


        localStorage.removeItem(
            "cartProduct"
        );


        window.location.href =
            "success.html";

    }
);