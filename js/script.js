// ==========================================
// NOVA COFFEE
// MAIN JAVASCRIPT
// ==========================================


document.addEventListener("DOMContentLoaded", () => {


    // ======================================
    // CART COUNT
    // ======================================

    function updateCartCount() {

        const cartCount =
            document.querySelector(".cart-count");

        if (!cartCount) return;


        const cart =
            JSON.parse(
                localStorage.getItem("novaCart")
            ) || [];


        const totalItems =
            cart.reduce(
                (total, item) =>
                    total + item.quantity,
                0
            );


        cartCount.textContent =
            totalItems;

    }


    updateCartCount();



    // ======================================
    // MOBILE MENU
    // ======================================

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");


    if (menuBtn && navLinks) {

        menuBtn.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle(
                    "active"
                );


                const icon =
                    menuBtn.querySelector("i");


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


        // Close menu after clicking link

        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "active"
                        );


                        const icon =
                            menuBtn.querySelector("i");


                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }
                );

            });

    }



    // ======================================
    // NAVBAR SCROLL
    // ======================================

    const navbar =
        document.getElementById("navbar");


    if (navbar) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 70) {

                    navbar.classList.add(
                        "scrolled"
                    );

                } else {

                    navbar.classList.remove(
                        "scrolled"
                    );

                }

            }
        );

    }



    // ======================================
    // SCROLL REVEAL
    // ======================================

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    function revealOnScroll() {

        const windowHeight =
            window.innerHeight;


        revealElements.forEach(
            element => {

                const elementTop =
                    element
                        .getBoundingClientRect()
                        .top;


                if (
                    elementTop <
                    windowHeight - 80
                ) {

                    element.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        revealOnScroll
    );


    revealOnScroll();

});