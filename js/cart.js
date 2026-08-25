// ==========================================
// NOVA COFFEE
// CART JAVASCRIPT
// ==========================================


document.addEventListener(
    "DOMContentLoaded",
    () => {


        // ======================================
        // CART DATA
        // ======================================

        let cart =
            JSON.parse(
                localStorage.getItem(
                    "novaCart"
                )
            ) || [];


        // ======================================
        // ELEMENTS
        // ======================================

        const cartItems =
            document.getElementById(
                "cartItems"
            );

        const emptyCart =
            document.getElementById(
                "emptyCart"
            );

        const orderSummary =
            document.getElementById(
                "orderSummary"
            );

        const subtotalElement =
            document.getElementById(
                "subtotal"
            );

        const deliveryElement =
            document.getElementById(
                "delivery"
            );

        const discountElement =
            document.getElementById(
                "discount"
            );

        const totalElement =
            document.getElementById(
                "total"
            );

        const itemsCount =
            document.getElementById(
                "itemsCount"
            );

        const cartCount =
            document.querySelector(
                ".cart-count"
            );


        // ======================================
        // CONFIRM MODAL
        // ======================================

        const confirmOverlay =
            document.getElementById(
                "confirmOverlay"
            );

        const confirmClose =
            document.getElementById(
                "confirmClose"
            );

        const cancelRemove =
            document.getElementById(
                "cancelRemove"
            );

        const confirmRemove =
            document.getElementById(
                "confirmRemove"
            );


        let productToRemove = null;



        // ======================================
        // SAVE CART
        // ======================================

        function saveCart() {

            localStorage.setItem(
                "novaCart",
                JSON.stringify(cart)
            );

        }



        // ======================================
        // UPDATE CART COUNT
        // ======================================

        function updateCartCount() {

            const totalQuantity =
                cart.reduce(
                    (total, item) =>
                        total + item.quantity,
                    0
                );


            if (cartCount) {

                cartCount.textContent =
                    totalQuantity;

            }

        }



        // ======================================
        // FORMAT PRICE
        // ======================================

        function formatPrice(price) {

            return `${price.toFixed(0)} SAR`;

        }



        // ======================================
        // RENDER CART
        // ======================================

        function renderCart() {


            cartItems.innerHTML = "";


            // Empty cart

            if (cart.length === 0) {

                emptyCart.classList.add(
                    "show"
                );

                orderSummary.style.display =
                    "none";

                itemsCount.textContent =
                    "0 items";

                updateCartCount();

                return;

            }


            emptyCart.classList.remove(
                "show"
            );


            orderSummary.style.display =
                "block";


            // Create products

            cart.forEach(
                (item, index) => {


                    const itemElement =
                        document.createElement(
                            "article"
                        );


                    itemElement.className =
                        "cart-item";


                    itemElement.style.animationDelay =
                        `${index * 0.05}s`;


                    itemElement.innerHTML = `

                        <div class="cart-item-image">

                            <img
                                src="${item.image}"
                                alt="${item.name}"
                            >

                        </div>


                        <div class="cart-item-info">

                            <p class="cart-item-category">
                                NOVA COFFEE
                            </p>

                            <h3 class="cart-item-name">
                                ${item.name}
                            </h3>

                            <p class="cart-item-price">
                                ${formatPrice(item.price)}
                                each
                            </p>

                        </div>


                        <div class="cart-item-actions">

                            <div class="quantity-control">

                                <button
                                    class="quantity-btn decrease"
                                    data-id="${item.id}"
                                    aria-label="Decrease quantity"
                                >
                                    <i class="fa-solid fa-minus"></i>
                                </button>


                                <span class="quantity-value">
                                    ${item.quantity}
                                </span>


                                <button
                                    class="quantity-btn increase"
                                    data-id="${item.id}"
                                    aria-label="Increase quantity"
                                >
                                    <i class="fa-solid fa-plus"></i>
                                </button>

                            </div>


                            <strong class="cart-item-total">
                                ${formatPrice(
                                    item.price *
                                    item.quantity
                                )}
                            </strong>


                            <button
                                class="remove-item"
                                data-id="${item.id}"
                                aria-label="Remove ${item.name}"
                            >

                                <i class="fa-solid fa-trash"></i>

                            </button>

                        </div>

                    `;


                    cartItems.appendChild(
                        itemElement
                    );

                }
            );


            // Attach events

            addCartEvents();


            updateTotals();

        }



        // ======================================
        // CART EVENTS
        // ======================================

        function addCartEvents() {


            // Increase

            document
                .querySelectorAll(
                    ".increase"
                )
                .forEach(button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const id =
                                button.dataset.id;


                            const product =
                                cart.find(
                                    item =>
                                        item.id === id
                                );


                            if (product) {

                                product.quantity++;

                                saveCart();

                                renderCart();

                            }

                        }
                    );

                });



            // Decrease

            document
                .querySelectorAll(
                    ".decrease"
                )
                .forEach(button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const id =
                                button.dataset.id;


                            const product =
                                cart.find(
                                    item =>
                                        item.id === id
                                );


                            if (product) {


                                if (
                                    product.quantity > 1
                                ) {

                                    product.quantity--;

                                } else {

                                    openRemoveModal(
                                        id
                                    );

                                    return;

                                }


                                saveCart();

                                renderCart();

                            }

                        }
                    );

                });



            // Remove

            document
                .querySelectorAll(
                    ".remove-item"
                )
                .forEach(button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const id =
                                button.dataset.id;


                            openRemoveModal(
                                id
                            );

                        }
                    );

                });

        }



        // ======================================
        // OPEN REMOVE MODAL
        // ======================================

        function openRemoveModal(id) {

            productToRemove = id;


            confirmOverlay.classList.add(
                "show"
            );


            document.body.style.overflow =
                "hidden";

        }



        // ======================================
        // CLOSE REMOVE MODAL
        // ======================================

        function closeRemoveModal() {

            productToRemove = null;


            confirmOverlay.classList.remove(
                "show"
            );


            document.body.style.overflow =
                "";

        }



        // ======================================
        // CONFIRM REMOVE
        // ======================================

        confirmRemove.addEventListener(
            "click",
            () => {


                if (!productToRemove) {

                    closeRemoveModal();

                    return;

                }


                cart =
                    cart.filter(
                        item =>
                            item.id !==
                            productToRemove
                    );


                saveCart();

                closeRemoveModal();

                renderCart();

            }
        );



        // ======================================
        // CANCEL REMOVE
        // ======================================

        cancelRemove.addEventListener(
            "click",
            closeRemoveModal
        );


        confirmClose.addEventListener(
            "click",
            closeRemoveModal
        );



        // Click outside

        confirmOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    confirmOverlay
                ) {

                    closeRemoveModal();

                }

            }
        );



        // ======================================
        // UPDATE TOTALS
        // ======================================

        function updateTotals() {


            const subtotal =
                cart.reduce(
                    (total, item) => {

                        return (
                            total +
                            item.price *
                            item.quantity
                        );

                    },
                    0
                );


            // Delivery

            const delivery =
                subtotal === 0
                    ? 0
                    : subtotal >= 100
                        ? 0
                        : 15;


            // Discount

            const discount = 0;


            // Total

            const total =
                subtotal +
                delivery -
                discount;


            // Update HTML

            subtotalElement.textContent =
                formatPrice(subtotal);


            deliveryElement.textContent =
                delivery === 0
                    ? "FREE"
                    : formatPrice(delivery);


            discountElement.textContent =
                `- ${formatPrice(discount)}`;


            totalElement.textContent =
                formatPrice(total);


            // Items

            const quantity =
                cart.reduce(
                    (total, item) =>
                        total +
                        item.quantity,
                    0
                );


            itemsCount.textContent =
                quantity === 1
                    ? "1 item"
                    : `${quantity} items`;


            updateCartCount();

        }



        // ======================================
        // CHECKOUT
        // ======================================

        const checkoutBtn =
            document.getElementById(
                "checkoutBtn"
            );


        checkoutBtn.addEventListener(
            "click",
            () => {


                if (cart.length === 0) {

                    return;

                }


                /*
                    Checkout will be created
                    in the next step.
                */


                window.location.href =
                    "checkout.html";

            }
        );



        // ======================================
        // MOBILE NAVIGATION
        // ======================================

        const menuBtn =
            document.getElementById(
                "menuBtn"
            );

        const navLinks =
            document.getElementById(
                "navLinks"
            );


        if (menuBtn && navLinks) {

            menuBtn.addEventListener(
                "click",
                () => {

                    navLinks.classList.toggle(
                        "active"
                    );


                    const icon =
                        menuBtn.querySelector(
                            "i"
                        );


                    if (
                        navLinks.classList.contains(
                            "active"
                        )
                    ) {

                        icon.classList.remove(
                            "fa-bars"
                        );

                        icon.classList.add(
                            "fa-xmark"
                        );

                    } else {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }
            );

        }



        // ======================================
        // INITIALIZE
        // ======================================

        renderCart();

    }
);