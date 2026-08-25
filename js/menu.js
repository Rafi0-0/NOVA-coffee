// ==========================================
// NOVA COFFEE
// MENU JAVASCRIPT
// ==========================================


document.addEventListener("DOMContentLoaded", () => {


    // ======================================
    // CART
    // ======================================

    let cart =
        JSON.parse(
            localStorage.getItem("novaCart")
        ) || [];


    // ======================================
    // ELEMENTS
    // ======================================

    const products =
        document.querySelectorAll(
            ".menu-product"
        );

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const noResults =
        document.getElementById(
            "noResults"
        );

    const toast =
        document.getElementById(
            "cartToast"
        );

    const toastProduct =
        document.getElementById(
            "toastProduct"
        );

    const cartCount =
        document.querySelector(
            ".cart-count"
        );


    // ======================================
    // UPDATE CART COUNT
    // ======================================

    function updateCartCount() {

        const total =
            cart.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            );


        if (cartCount) {

            cartCount.textContent =
                total;

        }

    }


    updateCartCount();



    // ======================================
    // SAVE CART
    // ======================================

    function saveCart() {

        localStorage.setItem(
            "novaCart",
            JSON.stringify(cart)
        );

        updateCartCount();

    }



    // ======================================
    // SHOW TOAST
    // ======================================

    let toastTimer;


    function showToast(productName) {

        toastProduct.textContent =
            productName;


        toast.classList.add(
            "show"
        );


        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 3500);

    }



    // ======================================
    // ADD TO CART
    // ======================================

    document
        .querySelectorAll(".add-cart-btn")
        .forEach(button => {


            button.addEventListener(
                "click",
                () => {


                    const id =
                        button.dataset.id;

                    const name =
                        button.dataset.name;

                    const price =
                        Number(
                            button.dataset.price
                        );

                    const image =
                        button.dataset.image;


                    // Find existing product

                    const existingProduct =
                        cart.find(
                            item =>
                                item.id === id
                        );


                    if (existingProduct) {

                        existingProduct.quantity++;

                    } else {

                        cart.push({

                            id: id,

                            name: name,

                            price: price,

                            image: image,

                            quantity: 1

                        });

                    }


                    // Save

                    saveCart();


                    // Button animation

                    const originalText =
                        button.querySelector(
                            "span"
                        );


                    const originalIcon =
                        button.querySelector(
                            "i"
                        );


                    originalText.textContent =
                        "Added";

                    originalIcon.className =
                        "fa-solid fa-check";


                    button.classList.add(
                        "added"
                    );


                    // Show notification

                    showToast(name);


                    // Return button

                    setTimeout(() => {

                        originalText.textContent =
                            "Add to Cart";

                        originalIcon.className =
                            "fa-solid fa-plus";

                        button.classList.remove(
                            "added"
                        );

                    }, 1500);

                }
            );

        });



    // ======================================
    // FILTER PRODUCTS
    // ======================================

    let currentCategory = "all";


    function filterProducts() {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();


        let visibleProducts = 0;


        products.forEach(product => {


            const category =
                product.dataset.category;


            const name =
                product.dataset.name
                    .toLowerCase();


            const categoryMatch =
                currentCategory === "all" ||
                category === currentCategory;


            const searchMatch =
                name.includes(searchTerm);


            if (
                categoryMatch &&
                searchMatch
            ) {

                product.classList.remove(
                    "hidden"
                );

                visibleProducts++;

            } else {

                product.classList.add(
                    "hidden"
                );

            }

        });


        // No results

        if (visibleProducts === 0) {

            noResults.classList.add(
                "show"
            );

        } else {

            noResults.classList.remove(
                "show"
            );

        }

    }



    // ======================================
    // CATEGORY BUTTONS
    // ======================================

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {


                filterButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentCategory =
                    button.dataset.category;


                filterProducts();

            }
        );

    });



    // ======================================
    // SEARCH
    // ======================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterProducts
        );

    }



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


});