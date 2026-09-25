// GET ORDERS

const savedOrders =
    localStorage.getItem("orders");

const orders =
    savedOrders
        ? JSON.parse(savedOrders)
        : [];


// GET ORDERS CONTAINER

const ordersCard =
    document.querySelector(".orders-card");


// SHOW EMPTY ORDERS

if (orders.length === 0) {

    ordersCard.innerHTML = `

        <div class="orders-empty-icon">
            📦
        </div>

        <h2>
            No Orders Yet
        </h2>

        <p>
            You haven't placed any orders yet.
            Start shopping and your orders will
            appear here.
        </p>

        <a href="shop.html"
           class="orders-shop-button">

            Start Shopping

        </a>

    `;

}


// SHOW ORDERS

else {

    ordersCard.innerHTML = "";

    orders.forEach(function(order) {

        let itemsHTML = "";


        order.items.forEach(function(item) {

            const itemTotal =
                item.price * item.quantity;


            itemsHTML += `

                <div class="order-item">

                    <div>

                        <strong>
                            ${item.name}
                        </strong>

                        <small>
                            Size: ${item.size}
                        </small>

                        <small>
                            Quantity: ${item.quantity}
                        </small>

                    </div>

                    <strong>
                        ₹${itemTotal}
                    </strong>

                </div>

            `;

        });


        ordersCard.innerHTML += `

            <div class="order-card">

                <div class="order-header">

                    <div>

                        <span>
                            ORDER ID
                        </span>

                        <strong>
                            ${order.orderId}
                        </strong>

                    </div>

                    <div>

                        <span>
                            DATE
                        </span>

                        <strong>
                            ${order.date}
                        </strong>

                    </div>

                </div>


                <div class="order-status">

                    <span>
                        ORDER PLACED
                    </span>

                    <span>
                        ${order.paymentMethod === "online"
                            ? "Online Payment"
                            : "Cash on Delivery"}
                    </span>

                </div>


                <div class="order-items">

                    ${itemsHTML}

                </div>


                <div class="order-total">

                    <span>
                        Order Total
                    </span>

                    <strong>
                        ₹${order.total}
                    </strong>

                </div>

            </div>

        `;

    });

}