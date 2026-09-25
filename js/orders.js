// =========================================
// GET SAVED ORDERS
// =========================================

const savedOrders =
    localStorage.getItem("orders");

const orders =
    savedOrders
        ? JSON.parse(savedOrders)
        : [];


// =========================================
// GET ORDERS CONTAINER
// =========================================

const ordersCard =
    document.querySelector(".orders-card");


// =========================================
// SHOW EMPTY ORDERS
// =========================================

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


// =========================================
// SHOW ORDERS
// =========================================

else {

    ordersCard.innerHTML = "";

    orders.forEach(function(order) {

        let itemsHTML = "";


        // =====================================
        // ORDER ITEMS
        // =====================================

        order.items.forEach(function(item) {

            const itemTotal =
                item.price * item.quantity;


            itemsHTML += `

                <div class="order-item">

                    <div class="order-item-details">

                        <strong>
                            ${item.name}
                        </strong>

                        <div class="order-item-info">

                            <span>
                                Size: ${item.size}
                            </span>

                            <span>
                                Quantity: ${item.quantity}
                            </span>

                        </div>

                    </div>

                    <strong class="order-item-price">
                        ₹${itemTotal}
                    </strong>

                </div>

            `;

        });


        // =====================================
        // COMPLETE ORDER CARD
        // =====================================

        ordersCard.innerHTML += `

            <div class="order-card">

                <!-- ORDER HEADER -->

                <div class="order-header">

                    <div class="order-header-left">

                        <span>
                            ORDER ID
                        </span>

                        <strong>
                            ${order.orderId}
                        </strong>

                    </div>


                    <div class="order-header-right">

                        <span>
                            DATE
                        </span>

                        <strong>
                            ${order.date}
                        </strong>

                    </div>

                </div>


                <!-- ORDER STATUS -->

                <div class="order-status">

                    <span class="order-status-main">
                        ORDER PLACED
                    </span>

                    <span class="order-payment">
                        ${order.paymentMethod === "online"
                            ? "Online Payment"
                            : "Cash on Delivery"}
                    </span>

                </div>


                <!-- ORDER ITEMS -->

                <div class="order-items">

                    ${itemsHTML}

                </div>


                <!-- ORDER TOTAL -->

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