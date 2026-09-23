/* =========================================================
   RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    updateMask
);


/* =========================================================
   BURGER-MENÜ
   Permanent oben rechts. Öffnet per Klick;
   bewegt sich die Maus vom geöffneten Menü
   weg (nach unten hinaus), schließt es sich
   automatisch wieder. Die Links springen
   direkt zur gewählten Seite, ohne die
   Spalt-Animation abzuspielen.
   ========================================================= */

const burgerMenu =
    document.getElementById("burger-menu");

const burgerBtn =
    document.getElementById("burger-btn");

const burgerDropdown =
    document.getElementById("burger-dropdown");

function openBurgerMenu() {

    if (!burgerMenu || !burgerBtn) {
        return;
    }

    burgerMenu.classList.add("open");

    burgerBtn.setAttribute("aria-expanded", "true");

}

function closeBurgerMenu() {

    if (!burgerMenu || !burgerBtn) {
        return;
    }

    burgerMenu.classList.remove("open");

    burgerBtn.setAttribute("aria-expanded", "false");

}

if (burgerBtn) {

    burgerBtn.addEventListener("click", (event) => {

        event.stopPropagation();

        if (burgerMenu.classList.contains("open")) {
            closeBurgerMenu();
        } else {
            openBurgerMenu();
        }

    });

}

if (burgerMenu) {

    /*
        Verlässt die Maus das Menü, schließt
        es sich wieder – aber erst mit
        kurzer Verzögerung. Der Button ist
        kleiner als die aufgeklappte Liste
        darunter; ohne Verzögerung würde die
        Lücke dazwischen das Menü sofort
        schließen, bevor man einen Punkt
        anklicken kann.
    */

    let closeTimer = null;

    function scheduleBurgerClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(closeBurgerMenu, 300);
    }

    function cancelBurgerClose() {
        clearTimeout(closeTimer);
    }

    burgerMenu.addEventListener("mouseleave", scheduleBurgerClose);
    burgerBtn.addEventListener("mouseenter", cancelBurgerClose);

    if (burgerDropdown) {
        burgerDropdown.addEventListener("mouseenter", cancelBurgerClose);
    }

}

/*
    Klick außerhalb des Menüs schließt es
    ebenfalls (z. B. für Touch-Geräte).
*/

document.addEventListener("click", (event) => {

    if (!burgerMenu) {
        return;
    }

    if (
        burgerMenu.classList.contains("open") &&
        !burgerMenu.contains(event.target)
    ) {
        closeBurgerMenu();
    }

});

/*
    Direktsprung zu einer Seite über das
    Menü, ohne die Spalt-Animation.
*/

function jumpToPage(index) {

    if (
        index === currentPage ||
        !pages[index] ||
        animating
    ) {
        return;
    }

    currentPage = index;
    progress = 0;

    setupLayers(direction);

    pages.forEach((page) => {
        page.style.webkitMaskImage = "none";
        page.style.maskImage = "none";
    });

    if (currentPage === 1) {
        startAboutTypewriter();
    }

}

document.querySelectorAll(".burger-link").forEach((link) => {

    link.addEventListener("click", (event) => {

        event.stopPropagation();

        const pageAttr =
            link.getAttribute("data-page");

        /*
            Nur interne Seiten (mit
            data-page) springen per JS;
            externe Links wie Kontakt/
            Impressum navigieren normal.
        */

        if (pageAttr !== null) {

            event.preventDefault();

            jumpToPage(Number(pageAttr));

        }

        closeBurgerMenu();

    });

});


/* =========================================================
   TIEFENVERLINKUNG (#page=N)

   Erlaubt externen Seiten wie kontakt.html
   oder impressum.html, gezielt auf eine
   Unterseite zu verlinken, z. B.
   gespalten.html#page=1 für "die andere".
   ========================================================= */

function applyPageFromHash() {

    const match =
        location.hash.match(/page=(\d+)/);

    if (!match) {
        return;
    }

    const index = Number(match[1]);

    if (!pages[index]) {
        return;
    }

    currentPage = index;

    progress = 0;

    animating = false;

    pages.forEach((page) => {

        page.classList.remove("active");

        page.classList.remove("behind");

        page.style.webkitMaskImage = "none";

        page.style.maskImage = "none";

    });

    pages[currentPage].classList.add("active");

    if (currentPage === 1) {
        startAboutTypewriter();
    }

}

window.addEventListener("hashchange", applyPageFromHash);


/* =========================================================
   INITIALISIERUNG
   ========================================================= */

setupLayers(direction);

updateMask();

applyPageFromHash();

