const checkoutProduct =
    document.getElementById("checkout-product");

const checkoutTotal =
    document.getElementById("checkout-total");


// =========================================
// GET CART
// =========================================

const savedCart =
    localStorage.getItem("cartProducts");

const cart =
    savedCart
        ? JSON.parse(savedCart)
        : [];


// =========================================
// SHOW ORDER
// =========================================

if (cart.length === 0) {

    checkoutProduct.innerHTML = `
        <p>Your cart is empty.</p>

        <a href="shop.html">
            Continue Shopping
        </a>
    `;

    checkoutTotal.textContent = "₹0";

}


// =========================================
// SHOW PRODUCTS
// =========================================

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


// =========================================
// LOAD SAVED CUSTOMER DETAILS
// =========================================

const savedCustomer =
    localStorage.getItem("customerDetails");


if (savedCustomer) {

    const customer =
        JSON.parse(savedCustomer);


    document.getElementById(
        "customer-name"
    ).value =
        customer.name || "";


    document.getElementById(
        "customer-phone"
    ).value =
        customer.phone || "";


    document.getElementById(
        "customer-email"
    ).value =
        customer.email || "";


    document.getElementById(
        "customer-address"
    ).value =
        customer.address || "";


    document.getElementById(
        "customer-city"
    ).value =
        customer.city || "";


    document.getElementById(
        "customer-state"
    ).value =
        customer.state || "";


    document.getElementById(
        "customer-pincode"
    ).value =
        customer.pincode || "";

}


// =========================================
// PAYMENT METHOD
// =========================================

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


// =========================================
// PLACE ORDER
// =========================================

const checkoutForm =
    document.getElementById("checkout-form");


checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // =====================================
        // GET CUSTOMER DETAILS
        // =====================================

        const name =
            document.getElementById(
                "customer-name"
            ).value.trim();


        const phone =
            document.getElementById(
                "customer-phone"
            ).value.trim();


        const email =
            document.getElementById(
                "customer-email"
            ).value.trim();


        const address =
            document.getElementById(
                "customer-address"
            ).value.trim();


        const city =
            document.getElementById(
                "customer-city"
            ).value.trim();


        const state =
            document.getElementById(
                "customer-state"
            ).value.trim();


        const pincode =
            document.getElementById(
                "customer-pincode"
            ).value.trim();


        // =====================================
        // CHECK SAVE DETAILS OPTION
        // =====================================

        const saveDetails =
            document.getElementById(
                "save-details"
            ).checked;


        if (saveDetails) {

            const customerDetails = {

                name: name,

                phone: phone,

                email: email,

                address: address,

                city: city,

                state: state,

                pincode: pincode

            };


            localStorage.setItem(
                "customerDetails",
                JSON.stringify(customerDetails)
            );

        } else {

            localStorage.removeItem(
                "customerDetails"
            );

        }


        // =====================================
        // GET PAYMENT METHOD
        // =====================================

        const selectedPayment =
            document.querySelector(
                'input[name="payment"]:checked'
            );


        const paymentMethod =
            selectedPayment
                ? selectedPayment.value
                : "cod";


        // =====================================
        // CALCULATE TOTAL
        // =====================================

        let grandTotal = 0;


        cart.forEach(function(product) {

            grandTotal +=
                product.price *
                product.quantity;

        });


        // =====================================
        // CREATE ORDER ID
        // =====================================

        const orderId =
            "ORD" +
            Date.now();


        // =====================================
        // CREATE ORDER
        // =====================================

        const newOrder = {

            orderId: orderId,

            customerName: name,

            customerPhone: phone,

            customerEmail: email,

            deliveryAddress: address,

            city: city,

            state: state,

            pincode: pincode,

            paymentMethod: paymentMethod,

            date: new Date().toLocaleString(),

            items: cart,

            total: grandTotal

        };


        // =====================================
        // GET PREVIOUS ORDERS
        // =====================================

        const savedOrders =
            localStorage.getItem("orders");


        const orders =
            savedOrders
                ? JSON.parse(savedOrders)
                : [];


        // =====================================
        // ADD NEW ORDER
        // =====================================

        orders.push(newOrder);


        // =====================================
        // SAVE ORDERS
        // =====================================

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );


        // =====================================
        // SUCCESS MESSAGE
        // =====================================

        alert(
            "Thank you, " +
            name +
            "! Your order has been placed."
        );


        // =====================================
        // CLEAR CART
        // =====================================

        localStorage.removeItem(
            "cartProducts"
        );


        localStorage.removeItem(
            "cartProduct"
        );


        // =====================================
        // GO TO SUCCESS PAGE
        // =====================================

        window.location.href =
            "success.html";

    }
);