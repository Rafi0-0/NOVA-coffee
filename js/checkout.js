// ==========================================
// NOVA COFFEE
// CHECKOUT JAVASCRIPT
// ==========================================


document.addEventListener(
    "DOMContentLoaded",
    () => {


        // ======================================
        // CART
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

        const checkoutItems =
            document.getElementById(
                "checkoutItems"
            );

        const subtotalElement =
            document.getElementById(
                "checkoutSubtotal"
            );

        const deliveryElement =
            document.getElementById(
                "checkoutDelivery"
            );

        const totalElement =
            document.getElementById(
                "checkoutTotal"
            );

        const checkoutForm =
            document.getElementById(
                "checkoutForm"
            );

        const successOverlay =
            document.getElementById(
                "successOverlay"
            );

        const orderNumber =
            document.getElementById(
                "orderNumber"
            );

        const placeOrderBtn =
            document.getElementById(
                "placeOrderBtn"
            );

        const terms =
            document.getElementById(
                "terms"
            );

        const termsError =
            document.getElementById(
                "termsError"
            );



        // ======================================
        // IF CART EMPTY
        // ======================================

        if (cart.length === 0) {

            window.location.href =
                "menu.html";

            return;

        }



        // ======================================
        // FORMAT PRICE
        // ======================================

        function formatPrice(price) {

            return `${price.toFixed(0)} SAR`;

        }



        // ======================================
        // RENDER ITEMS
        // ======================================

        function renderItems() {


            checkoutItems.innerHTML = "";


            cart.forEach(item => {


                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    "checkout-item";


                element.innerHTML = `

                    <div class="checkout-item-image">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                        <span
                            class="checkout-item-quantity"
                        >
                            ${item.quantity}
                        </span>

                    </div>


                    <div class="checkout-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <span>
                            ${formatPrice(item.price)}
                            each
                        </span>

                    </div>


                    <strong
                        class="checkout-item-price"
                    >
                        ${formatPrice(
                            item.price *
                            item.quantity
                        )}
                    </strong>

                `;


                checkoutItems.appendChild(
                    element
                );

            });

        }



        // ======================================
        // CALCULATE TOTALS
        // ======================================

        function calculateTotals() {


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


            const delivery =
                subtotal >= 100
                    ? 0
                    : 15;


            const total =
                subtotal +
                delivery;


            subtotalElement.textContent =
                formatPrice(subtotal);


            deliveryElement.textContent =
                delivery === 0
                    ? "FREE"
                    : formatPrice(delivery);


            totalElement.textContent =
                formatPrice(total);


            return {
                subtotal,
                delivery,
                total
            };

        }



        // ======================================
        // INPUT VALIDATION
        // ======================================

        function showError(
            input,
            message
        ) {

            input.classList.add(
                "error"
            );


            const group =
                input.closest(
                    ".form-group"
                );


            if (group) {

                const error =
                    group.querySelector(
                        ".error-message"
                    );


                if (error) {

                    error.textContent =
                        message;

                }

            }

        }



        function clearError(input) {

            input.classList.remove(
                "error"
            );


            const group =
                input.closest(
                    ".form-group"
                );


            if (group) {

                const error =
                    group.querySelector(
                        ".error-message"
                    );


                if (error) {

                    error.textContent =
                        "";

                }

            }

        }



        // ======================================
        // VALIDATE FORM
        // ======================================

        function validateForm() {


            let valid = true;


            const firstName =
                document.getElementById(
                    "firstName"
                );


            const lastName =
                document.getElementById(
                    "lastName"
                );


            const phone =
                document.getElementById(
                    "phone"
                );


            const email =
                document.getElementById(
                    "email"
                );


            const city =
                document.getElementById(
                    "city"
                );


            const address =
                document.getElementById(
                    "address"
                );



            // First name

            if (
                firstName.value.trim()
                    .length < 2
            ) {

                showError(
                    firstName,
                    "Please enter your first name."
                );

                valid = false;

            } else {

                clearError(
                    firstName
                );

            }



            // Last name

            if (
                lastName.value.trim()
                    .length < 2
            ) {

                showError(
                    lastName,
                    "Please enter your last name."
                );

                valid = false;

            } else {

                clearError(
                    lastName
                );

            }



            // Phone

            const phoneRegex =
                /^[0-9]{9}$/;


            if (
                !phoneRegex.test(
                    phone.value.trim()
                )
            ) {

                showError(
                    phone,
                    "Enter a valid 9-digit Saudi number."
                );

                valid = false;

            } else {

                clearError(
                    phone
                );

            }



            // Email

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailRegex.test(
                    email.value.trim()
                )
            ) {

                showError(
                    email,
                    "Please enter a valid email."
                );

                valid = false;

            } else {

                clearError(
                    email
                );

            }



            // City

            if (
                city.value === ""
            ) {

                showError(
                    city,
                    "Please select your city."
                );

                valid = false;

            } else {

                clearError(
                    city
                );

            }



            // Address

            if (
                address.value.trim()
                    .length < 5
            ) {

                showError(
                    address,
                    "Please enter your address."
                );

                valid = false;

            } else {

                clearError(
                    address
                );

            }



            // Terms

            if (!terms.checked) {

                termsError.textContent =
                    "Please accept the terms.";

                valid = false;

            } else {

                termsError.textContent =
                    "";

            }


            return valid;

        }



        // ======================================
        // CLEAR ERRORS WHILE TYPING
        // ======================================

        document
            .querySelectorAll(
                "#checkoutForm input, #checkoutForm select, #checkoutForm textarea"
            )
            .forEach(input => {

                input.addEventListener(
                    "input",
                    () => {

                        clearError(
                            input
                        );

                    }
                );

                input.addEventListener(
                    "change",
                    () => {

                        clearError(
                            input
                        );

                    }
                );

            });



        // ======================================
        // PAYMENT OPTIONS
        // ======================================

        document
            .querySelectorAll(
                ".payment-option"
            )
            .forEach(option => {


                option.addEventListener(
                    "click",
                    () => {


                        document
                            .querySelectorAll(
                                ".payment-option"
                            )
                            .forEach(
                                item => {

                                    item.classList.remove(
                                        "active"
                                    );

                                }
                            );


                        option.classList.add(
                            "active"
                        );

                    }
                );

            });



        // ======================================
        // SUBMIT ORDER
        // ======================================

        checkoutForm.addEventListener(
            "submit",
            event => {


                event.preventDefault();


                if (
                    !validateForm()
                ) {

                    return;

                }



                // Loading

                placeOrderBtn.classList.add(
                    "loading"
                );


                placeOrderBtn.querySelector(
                    "span"
                ).textContent =
                    "Processing...";


                placeOrderBtn.querySelector(
                    "i"
                ).className =
                    "fa-solid fa-spinner fa-spin";



                // Simulate order processing

                setTimeout(
                    () => {

                        createOrder();

                    },
                    1500
                );

            }
        );



        // ======================================
        // CREATE ORDER
        // ======================================

        function createOrder() {


            const totals =
                calculateTotals();


            // Generate order number

            const randomNumber =
                Math.floor(
                    1000 +
                    Math.random() *
                    9000
                );


            const generatedOrder =
                `NOVA-${randomNumber}`;


            orderNumber.textContent =
                generatedOrder;



            // Collect customer information

            const orderData = {

                orderNumber:
                    generatedOrder,

                customer: {

                    firstName:
                        document.getElementById(
                            "firstName"
                        ).value.trim(),

                    lastName:
                        document.getElementById(
                            "lastName"
                        ).value.trim(),

                    phone:
                        "+966" +
                        document.getElementById(
                            "phone"
                        ).value.trim(),

                    email:
                        document.getElementById(
                            "email"
                        ).value.trim(),

                    city:
                        document.getElementById(
                            "city"
                        ).value,

                    address:
                        document.getElementById(
                            "address"
                        ).value.trim(),

                    building:
                        document.getElementById(
                            "building"
                        ).value.trim(),

                    postalCode:
                        document.getElementById(
                            "postalCode"
                        ).value.trim(),

                    notes:
                        document.getElementById(
                            "notes"
                        ).value.trim()

                },


                payment:
                    document.querySelector(
                        'input[name="payment"]:checked'
                    ).value,


                items:
                    cart,


                totals: totals,


                createdAt:
                    new Date().toISOString()

            };



            // Save last order

            localStorage.setItem(
                "novaLastOrder",
                JSON.stringify(
                    orderData
                )
            );



            // Empty cart

            localStorage.removeItem(
                "novaCart"
            );



            // Show success

            successOverlay.classList.add(
                "show"
            );


            document.body.style.overflow =
                "hidden";


        }



        // ======================================
        // INITIALIZE
        // ======================================

        renderItems();

        calculateTotals();

    }
);