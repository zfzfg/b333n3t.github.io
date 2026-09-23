/* =========================================================
   SCROLL

   Kernidee:

   - Solange progress === 0 ist (kein
     Spalt offen), startet jeder Scroll
     eine NEUE Geste in genau der Richtung,
     in die gerade gescrollt wird.

   - Läuft bereits eine Geste (progress > 0)
     und wird in dieselbe Richtung weiter-
     gescrollt, wächst der Spalt (progress
     steigt).

   - Läuft bereits eine Geste und wird in
     die ENTGEGENGESETZTE Richtung gescrollt,
     schließt sich der Spalt wieder
     (progress sinkt) - die Seite bleibt
     dieselbe. Erst wenn progress bei 0
     ankommt, kann eine neue Geste in der
     neuen Richtung beginnen.
   ========================================================= */

function handleScroll(delta) {

    if (delta === 0 || animating) {
        return;
    }


    const rawDirection =
        delta > 0 ? 1 : -1;


    const movement =
        Math.abs(delta) /
        OPEN_DISTANCE;


    if (progress === 0) {

        /*
            Keine Geste aktiv:
            neue Geste in Scrollrichtung
            starten.
        */

        direction =
            rawDirection;

        setupLayers(direction);

        progress =
            Math.min(1, movement);

    } else if (rawDirection === direction) {

        /*
            Gleiche Richtung:
            Spalt weiter öffnen.
        */

        progress =
            Math.min(1, progress + movement);

    } else {

        /*
            Entgegengesetzte Richtung:
            Spalt wieder schließen.
        */

        progress =
            Math.max(0, progress - movement);

    }


    if (progress === 0) {

        pages.forEach((page) => {

            page.classList.remove("behind");

            page.style.webkitMaskImage = "none";

            page.style.maskImage = "none";

        });

        pages[currentPage].classList.add("active");

        return;

    }


    updateMask();


    /*
        =====================================================
        VOLLSTÄNDIG GEÖFFNET
        =====================================================
    */

    if (
        progress >= 1 &&
        !animating
    ) {

        animating = true;


        setTimeout(() => {

            changePage();

            animating = false;

        }, 110);

    }

}


/* =========================================================
   MAUSRAD / TRACKPAD
   ========================================================= */

let pendingWheelDelta = 0;

let wheelRafScheduled = false;


function flushWheelDelta() {

    wheelRafScheduled = false;

    if (pendingWheelDelta === 0) {
        return;
    }

    const delta = pendingWheelDelta;

    pendingWheelDelta = 0;

    handleScroll(delta);

}


window.addEventListener(
    "wheel",
    (event) => {

        /*
            Modal offen: nichts scrollen,
            keine Seiten-Navigation auslösen.
        */

        if (videoModalOpen) {

            event.preventDefault();

            return;

        }


        const scrollable =
            findScrollableAncestor(event.target);


        if (scrollable) {

            const atTop =
                scrollable.scrollTop <= 0;

            const atBottom =
                Math.ceil(
                    scrollable.scrollTop +
                    scrollable.clientHeight
                ) >= scrollable.scrollHeight;

            const scrollingDown =
                event.deltaY > 0;


            /*
                Noch Platz in die gewünschte
                Richtung: normal scrollen lassen,
                Seiten-Navigation nicht auslösen.
            */

            if (
                (scrollingDown && !atBottom) ||
                (!scrollingDown && !atTop)
            ) {

                return;

            }

        }


        event.preventDefault();


        /*
            Mehrere Wheel-Events pro Bild
            (v. a. bei Trackpads) zu einem
            Update bündeln – flüssiger und
            spart unnötige Neuberechnungen.
        */

        pendingWheelDelta +=
            event.deltaY;

        if (!wheelRafScheduled) {

            wheelRafScheduled = true;

            requestAnimationFrame(flushWheelDelta);

        }

    },
    {
        passive: false
    }
);


/* =========================================================
   TASTATUR
   ========================================================= */

window.addEventListener(
    "keydown",
    (event) => {


        /*
            MODAL OFFEN

            Nur Escape schließt das Video,
            Navigationstasten werden ignoriert.
        */

        if (videoModalOpen) {

            if (event.key === "Escape") {

                closeVideoModal();

            }

            return;

        }


        /*
            NACH UNTEN
        */

        if (
            event.key === "ArrowDown" ||
            event.key === "PageDown" ||
            event.key === " "
        ) {

            event.preventDefault();

            handleScroll(100);

        }


        /*
            NACH OBEN
        */

        if (
            event.key === "ArrowUp" ||
            event.key === "PageUp"
        ) {

            event.preventDefault();

            handleScroll(-100);

        }

    }
);


/* =========================================================
   TOUCH

   Der Spalt folgt jetzt in Echtzeit der
   Fingerbewegung (touchmove), statt erst
   beim Loslassen (touchend) zu springen.
   Das macht die Animation spürbar flüssiger
   und an die tatsächliche Wisch-Geschwindigkeit
   gekoppelt. Updates werden per
   requestAnimationFrame gebündelt, damit bei
   sehr schnellen Touch-Events nicht mehr
   als einmal pro Bildwechsel neu gezeichnet
   wird.
   ========================================================= */

let touchStartY = 0;

let touchStartX = 0;

let touchLastY = 0;

let touchAxisLocked = null;

let pendingTouchDelta = 0;

let touchRafScheduled = false;


function flushTouchDelta() {

    touchRafScheduled = false;

    if (pendingTouchDelta === 0) {
        return;
    }

    const delta = pendingTouchDelta;

    pendingTouchDelta = 0;

    handleScroll(delta);

}


window.addEventListener(
    "touchstart",
    (event) => {

        touchStartY =
            event.touches[0].clientY;

        touchStartX =
            event.touches[0].clientX;

        touchLastY = touchStartY;

        touchAxisLocked = null;

        pendingTouchDelta = 0;

    },
    {
        passive: true
    }
);


window.addEventListener(
    "touchmove",
    (event) => {

        /*
            Modal offen: Touch löst keine
            Seiten-Navigation aus.
        */

        if (videoModalOpen) {
            return;
        }


        const touch =
            event.touches[0];

        const dx =
            touch.clientX -
            touchStartX;

        const dy =
            touch.clientY -
            touchStartY;


        /*
            Richtung der Geste erst nach
            ein paar Pixeln festlegen
            (horizontal = Kachel-Wisch,
            vertikal = Seiten-Navigation).
        */

        if (touchAxisLocked === null) {

            if (
                Math.abs(dx) < 10 &&
                Math.abs(dy) < 10
            ) {

                return;

            }

            touchAxisLocked =
                Math.abs(dx) > Math.abs(dy) ?
                    "x" :
                    "y";

        }


        /*
            Horizontale Geste: das ist ein
            Wisch durch die Kachel-Reihe,
            native Scroll übernimmt.
        */

        if (touchAxisLocked === "x") {
            return;
        }

        /*
            Vertikale Geste innerhalb eines echten
            Scrollbereichs (vor allem 05 / Termine):
            natives Touch-Scrollen hat Vorrang. Nur
            wenn der Bereich am oberen/unteren Ende
            angekommen ist, darf die Seiten-Geste
            übernehmen.
        */
        const touchScrollable =
            findScrollableAncestor(event.target);

        if (touchScrollable) {
            const atTop = touchScrollable.scrollTop <= 0;
            const atBottom = Math.ceil(
                touchScrollable.scrollTop +
                touchScrollable.clientHeight
            ) >= touchScrollable.scrollHeight;

            const fingerMovesUp =
                touch.clientY < touchLastY;

            if (
                (fingerMovesUp && !atBottom) ||
                (!fingerMovesUp && !atTop)
            ) {
                touchLastY = touch.clientY;
                return;
            }
        }

        event.preventDefault();


        const incrementalDelta =
            touchLastY -
            touch.clientY;

        touchLastY = touch.clientY;

        pendingTouchDelta +=
            incrementalDelta *
            TOUCH_SPALT_SENSITIVITY;


        if (!touchRafScheduled) {

            touchRafScheduled = true;

            requestAnimationFrame(flushTouchDelta);

        }

    },
    {
        passive: false
    }
);


window.addEventListener(
    "touchend",
    () => {

        touchAxisLocked = null;

        pendingTouchDelta = 0;

        touchRafScheduled = false;

    },
    {
        passive: true
    }
);


