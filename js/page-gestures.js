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

let progressTarget = 0;
let glideRaf = 0;
let glideLast = 0;
let releaseTimer = 0;
let settling = false;

function clearOpenSpalt() {
    progress = 0;
    progressTarget = 0;
    lastMaskProgress = -1;
    pages.forEach((page) => {
        page.classList.remove("behind");
        page.style.webkitMaskImage = "none";
        page.style.maskImage = "none";
    });
    pages[currentPage].classList.add("active");
}

function finishOpen() {
    progress = 1;
    progressTarget = 0;
    animating = true;
    settling = false;
    clearTimeout(releaseTimer);
    setTimeout(() => {
        changePage();
        animating = false;
    }, 40);
}

function tweenSpalt(target) {
    settling = true;
    const from = progress;
    const start = performance.now();
    const duration = 320;
    function step(now) {
        if (!settling) {
            return;
        }
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        progress = from + (target - from) * eased;
        progressTarget = progress;
        updateMask();
        if (t < 1) {
            glideRaf = requestAnimationFrame(step);
            return;
        }
        settling = false;
        if (target >= 1) {
            finishOpen();
            return;
        }
        clearOpenSpalt();
    }
    cancelAnimationFrame(glideRaf);
    glideRaf = requestAnimationFrame(step);
}

function onRelease() {
    if (animating || settling || progressTarget <= 0) {
        return;
    }
    if (progressTarget <= CLOSE_BELOW) {
        tweenSpalt(0);
    } else if (progressTarget >= OPEN_ABOVE) {
        tweenSpalt(1);
    }
}

function armRelease() {
    clearTimeout(releaseTimer);
    releaseTimer = setTimeout(onRelease, 120);
}

function glideSpalt(now) {
    if (animating || settling) {
        return;
    }
    if (!glideLast) {
        glideLast = now;
    }
    const dt = Math.min(0.05, (now - glideLast) / 1000);
    glideLast = now;
    const gap = progressTarget - progress;
    const follow = 1 - Math.exp(-dt / 0.09);
    if (Math.abs(gap) < 0.004) {
        progress = progressTarget;
    } else {
        progress += gap * follow;
    }
    if (progress <= 0.004 && progressTarget === 0) {
        clearOpenSpalt();
        glideLast = 0;
        return;
    }
    updateMask();
    if (progress > 0.985 && progressTarget >= 1) {
        glideLast = 0;
        finishOpen();
        return;
    }
    if (Math.abs(progressTarget - progress) >= 0.004) {
        glideRaf = requestAnimationFrame(glideSpalt);
    } else {
        glideLast = 0;
    }
}

function handleScroll(delta) {

    if (delta === 0 || animating) {
        return;
    }


    const rawDirection =
        delta > 0 ? 1 : -1;


    if (settling) {
        settling = false;
        cancelAnimationFrame(glideRaf);
    }

    const movement = Math.abs(delta) / OPEN_DISTANCE;

    if (progressTarget === 0 && progress === 0) {

        direction = rawDirection;

        setupLayers(direction);

        progressTarget = Math.min(1, movement);

    } else if (rawDirection === direction) {

        progressTarget = Math.min(1, progressTarget + movement);

    } else {

        progressTarget = Math.max(0, progressTarget - movement);

    }

    cancelAnimationFrame(glideRaf);
    glideLast = 0;
    glideRaf = requestAnimationFrame(glideSpalt);
    armRelease();

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


