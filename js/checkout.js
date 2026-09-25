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


        // GET CUSTOMER NAME

        const name =
            document.getElementById(
                "customer-name"
            ).value.trim();


        // GET PAYMENT METHOD

        const selectedPayment =
            document.querySelector(
                'input[name="payment"]:checked'
            );


        const paymentMethod =
            selectedPayment
                ? selectedPayment.value
                : "cod";


        // CALCULATE TOTAL

        let grandTotal = 0;

        cart.forEach(function(product) {

            grandTotal +=
                product.price *
                product.quantity;

        });


        // CREATE ORDER ID

        const orderId =
            "ORD" +
            Date.now();


        // CREATE ORDER

        const newOrder = {

            orderId: orderId,

            customerName: name,

            paymentMethod: paymentMethod,

            date: new Date().toLocaleString(),

            items: cart,

            total: grandTotal

        };


        // GET PREVIOUS ORDERS

        const savedOrders =
            localStorage.getItem("orders");

        const orders =
            savedOrders
                ? JSON.parse(savedOrders)
                : [];


        // ADD NEW ORDER

        orders.push(newOrder);


        // SAVE ORDERS

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );


        // SHOW SUCCESS MESSAGE

        alert(
            "Thank you, " +
            name +
            "! Your order has been placed."
        );


        // CLEAR CART

        localStorage.removeItem(
            "cartProducts"
        );


        localStorage.removeItem(
            "cartProduct"
        );


        // GO TO SUCCESS PAGE

        window.location.href =
            "success.html";

    }
);