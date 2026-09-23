/* =========================================================
   INNERES SCROLLEN ERKENNEN

   Manche Kacheln (Termine, YouTube-Grid, ...)
   haben eigenen Inhalt zum Scrollen. Befindet
   sich der Mauszeiger über so einem Bereich
   und ist dort noch Scrollraum in die gewünschte
   Richtung vorhanden, soll normal gescrollt
   werden statt die Seite umzublättern.
   ========================================================= */

function findScrollableAncestor(element) {

    /*
        Performance-Fix: Statt bei jedem
        Wheel-Event den DOM-Baum manuell mit
        getComputedStyle() hochzulaufen (das
        erzwingt bei jedem Schritt ein Style-
        Recalc – "Forced Reflow"), nutzen wir
        das native, günstige closest() und
        prüfen nur an EINER Stelle die reinen
        Geometrie-Werte. Es gibt im Projekt nur
        zwei bewusst scrollbare Container.
    */

    const scrollable =
        element.closest(
            ".termine-responsive, .andere-tile, .page-3-content"
        );

    if (
        scrollable &&
        scrollable.scrollHeight > scrollable.clientHeight
    ) {
        return scrollable;
    }

    return null;

}


/* =========================================================
   KLICK-UND-ZIEHEN MIT DER NORMALEN MAUS
   Erlaubt horizontales Scrollen der
   Kacheln bzw. der YouTube-Reihe auch
   ganz ohne Mausrad/Trackpad – einfach
   klicken, halten und ziehen. Reagiert
   nur auf echte Mausereignisse (nicht
   auf Touch, das läuft nativ).
   ========================================================= */

function makeDraggable(el) {

    if (!el) {
        return;
    }

    let isDown = false;
    let dragged = false;
    let startX = 0;
    let startScrollLeft = 0;

    /*
        Performance-Fix: pointermove/-up/
        -cancel werden erst WÄHREND eines
        Drags an window gehängt (statt
        dauerhaft für jede der 3 Kachel-
        Reihen zu lauschen) – spart auf
        jeder normalen Mausbewegung drei
        überflüssige Funktionsaufrufe.
    */

    function onPointerMove(event) {

        if (!isDown || event.pointerType !== "mouse") {
            return;
        }

        const dx = event.clientX - startX;

        if (Math.abs(dx) > 4) {
            dragged = true;
        }

        if (dragged) {
            event.preventDefault();
            el.scrollLeft = startScrollLeft - dx;
        }

    }

    function endDrag(event) {

        if (event && event.pointerType && event.pointerType !== "mouse") {
            return;
        }

        if (isDown && dragged) {

            /*
                Verhindert, dass der Klick
                nach dem Ziehen noch ein
                Video öffnet oder einen
                Link auslöst.
            */

            const suppressClick = (clickEvent) => {
                clickEvent.preventDefault();
                clickEvent.stopPropagation();
                el.removeEventListener(
                    "click",
                    suppressClick,
                    true
                );
            };

            el.addEventListener(
                "click",
                suppressClick,
                true
            );

        }

        isDown = false;
        dragged = false;

        el.classList.remove("dragging");

        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", endDrag);
        window.removeEventListener("pointercancel", endDrag);

    }

    el.addEventListener("pointerdown", (event) => {

        if (event.pointerType !== "mouse") {
            return;
        }

        isDown = true;
        dragged = false;

        startX = event.clientX;
        startScrollLeft = el.scrollLeft;

        el.classList.add("dragging");

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", endDrag);
        window.addEventListener("pointercancel", endDrag);

    });

}


/* =========================================================
   VIDEO-MODAL (INLINE-WIEDERGABE)

   Beim Klick auf eine YouTube-Karte wird
   das Video direkt in einem Overlay
   abgespielt, statt zu YouTube zu
   verlinken.
   ========================================================= */

let videoModalOpen = false;

const videoModal =
    document.getElementById("video-modal");

const videoModalIframe =
    document.getElementById("video-modal-iframe");


function openVideoModal(embedSrc) {

    if (!videoModal || !videoModalIframe) {
        return;
    }

    const separator =
        embedSrc.indexOf("?") === -1 ? "?" : "&";

    videoModalIframe.src =
        embedSrc + separator + "autoplay=1&rel=0";

    videoModal.classList.add("open");

    videoModal.setAttribute("aria-hidden", "false");

    videoModalOpen = true;

}


function closeVideoModal() {

    if (!videoModal || !videoModalIframe) {
        return;
    }

    videoModal.classList.remove("open");

    videoModal.setAttribute("aria-hidden", "true");


    /*
        Iframe-Quelle leeren, damit das
        Video wirklich stoppt und nicht
        nur unsichtbar weiterläuft.
    */

    videoModalIframe.src = "";

    videoModalOpen = false;

}


document.querySelectorAll(".youtube-card").forEach((card) => {

    card.addEventListener("click", () => {

        const embedSrc =
            card.getAttribute("data-embed-src");

        if (embedSrc) {
            openVideoModal(embedSrc);
        }

    });


    card.addEventListener("keydown", (event) => {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();

            card.click();

        }

    });

});


if (videoModal) {

    videoModal
        .querySelectorAll("[data-close]")
        .forEach((el) => {

            el.addEventListener(
                "click",
                closeVideoModal
            );

        });

}


/* =========================================================
   SEITE 2 – HORIZONTALES SCROLLEN DER KACHELN

   Die vier Kacheln liegen nebeneinander
   und werden per Mausrad (vertikal
   umgesetzt), Trackpad-Geste, Touch-Wisch
   oder den Pfeil-Buttons durchblättert.
   Nur an den Rändern der Kachel-Reihe
   übernimmt die normale Seiten-Navigation.
   ========================================================= */

const andereGrid =
    document.querySelector(".andere-grid");

makeDraggable(andereGrid);


if (andereGrid) {

    andereGrid.addEventListener(
        "wheel",
        (event) => {

            /*
                Ein Element mit eigenem
                vertikalem Scrollraum
                (z. B. die offene Termine-Liste)
                hat Vorrang.
            */

            const verticalScrollable =
                findScrollableAncestor(event.target);

            if (verticalScrollable) {

                const atTop =
                    verticalScrollable.scrollTop <= 0;

                const atBottom =
                    Math.ceil(
                        verticalScrollable.scrollTop +
                        verticalScrollable.clientHeight
                    ) >= verticalScrollable.scrollHeight;

                const scrollingDown =
                    event.deltaY > 0;

                if (
                    (scrollingDown && !atBottom) ||
                    (!scrollingDown && !atTop)
                ) {
                    return;
                }

            }


            /*
                Horizontales Scrollen der Reihe.
                Trackpad-Geste (deltaX) hat Vorrang,
                sonst wird das vertikale Mausrad
                in horizontales Scrollen übersetzt.
            */

            const delta =
                (event.deltaX !== 0 ?
                    event.deltaX :
                    event.deltaY) *
                H_SCROLL_SENSITIVITY;

            const maxScrollLeft =
                andereGrid.scrollWidth -
                andereGrid.clientWidth;

            if (maxScrollLeft <= 0) {
                return;
            }

            const atStart =
                andereGrid.scrollLeft <= 0;

            const atEnd =
                andereGrid.scrollLeft >=
                maxScrollLeft - 1;

            const scrollingForward =
                delta > 0;


            /*
                Am Rand der Kachel-Reihe:
                weiterreichen an die
                Seiten-Navigation.
            */

            if (
                (scrollingForward && atEnd) ||
                (!scrollingForward && atStart)
            ) {
                return;
            }

            event.preventDefault();

            event.stopPropagation();

            andereGrid.scrollLeft += delta;

        },
        { passive: false }
    );

}


document.querySelectorAll(".andere-nav-btn").forEach((button) => {

    button.addEventListener("click", () => {

        if (!andereGrid) {
            return;
        }

        const dir =
            Number(button.getAttribute("data-dir"));

        const tile =
            andereGrid.querySelector(".andere-tile");

        const step =
            tile ?
                tile.getBoundingClientRect().width + 18 :
                andereGrid.clientWidth * 0.8;

        andereGrid.scrollBy({
            left: dir * step,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   SEITE 4 – HORIZONTALES SCROLLEN DER YOUTUBE-REIHE

   Gleiches Prinzip wie bei den Kacheln
   auf Seite 2: Mausrad (vertikal
   umgesetzt), Trackpad-Geste, Touch-Wisch
   oder die Pfeil-Buttons blättern die
   Videos durch. Erst an den Rändern der
   Reihe übernimmt die Seiten-Navigation.
   ========================================================= */

const youtubeGrid =
    document.querySelector(".youtube-grid");

makeDraggable(youtubeGrid);


if (youtubeGrid) {

    youtubeGrid.addEventListener(
        "wheel",
        (event) => {

            const delta =
                (event.deltaX !== 0 ?
                    event.deltaX :
                    event.deltaY) *
                H_SCROLL_SENSITIVITY;

            const maxScrollLeft =
                youtubeGrid.scrollWidth -
                youtubeGrid.clientWidth;

            if (maxScrollLeft <= 0) {
                return;
            }

            const atStart =
                youtubeGrid.scrollLeft <= 0;

            const atEnd =
                youtubeGrid.scrollLeft >=
                maxScrollLeft - 1;

            const scrollingForward =
                delta > 0;


            /*
                Am Rand der Video-Reihe:
                weiterreichen an die
                Seiten-Navigation.
            */

            if (
                (scrollingForward && atEnd) ||
                (!scrollingForward && atStart)
            ) {
                return;
            }

            event.preventDefault();

            event.stopPropagation();

            youtubeGrid.scrollLeft += delta;

        },
        { passive: false }
    );

}


document.querySelectorAll(".youtube-nav-btn").forEach((button) => {

    button.addEventListener("click", () => {

        if (!youtubeGrid) {
            return;
        }

        const dir =
            Number(button.getAttribute("data-dir"));

        const card =
            youtubeGrid.querySelector(".youtube-card");

        const step =
            card ?
                card.getBoundingClientRect().width + 18 :
                youtubeGrid.clientWidth * 0.8;

        youtubeGrid.scrollBy({
            left: dir * step,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   SEITE 6 – HORIZONTALES SCROLLEN DER PLATTFORM-KACHELN
   ========================================================= */

const platformsGrid =
    document.querySelector(".platforms-grid");

makeDraggable(platformsGrid);

if (platformsGrid) {

    platformsGrid.addEventListener(
        "wheel",
        (event) => {

            const delta =
                (event.deltaX !== 0 ?
                    event.deltaX :
                    event.deltaY) *
                H_SCROLL_SENSITIVITY;

            const maxScrollLeft =
                platformsGrid.scrollWidth -
                platformsGrid.clientWidth;

            if (maxScrollLeft <= 0) {
                return;
            }

            const atStart =
                platformsGrid.scrollLeft <= 0;

            const atEnd =
                platformsGrid.scrollLeft >=
                maxScrollLeft - 1;

            const scrollingForward =
                delta > 0;

            if (
                (scrollingForward && atEnd) ||
                (!scrollingForward && atStart)
            ) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            platformsGrid.scrollLeft += delta;

        },
        { passive: false }
    );

}


document.querySelectorAll(".platforms-nav-btn").forEach((button) => {

    button.addEventListener("click", () => {

        if (!platformsGrid) {
            return;
        }

        const dir =
            Number(button.getAttribute("data-dir"));

        const tile =
            platformsGrid.querySelector(".platform-tile");

        const step =
            tile ?
                tile.getBoundingClientRect().width + 18 :
                platformsGrid.clientWidth * 0.8;

        platformsGrid.scrollBy({
            left: dir * step,
            behavior: "smooth"
        });

    });

});


