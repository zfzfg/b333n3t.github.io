/* =========================================================
   PLATTFORMEN – BALL-BOUNCE

   Die Plattform-Logos prallen wie ein
   DVD-Bildschirmschoner innerhalb ihrer
   Kachel hin und her. Läuft nur, während
   die Plattformen-Seite sichtbar ist
   (aktiv oder Zielseite), und pausiert bei
   reduzierter Bewegungspräferenz oder wenn
   der Tab im Hintergrund ist.
   ========================================================= */

(function () {

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const arenas = Array.from(
        document.querySelectorAll(".platform-arena")
    );

    if (reduceMotion || arenas.length === 0) {
        return;
    }

    const platformsPage =
        document.querySelector(".page-platforms");

    const balls = arenas.map((arena) => ({
        arena,
        ball: arena.querySelector(".platform-logo"),
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        maxX: 0,
        maxY: 0,
        ready: false
    }));

    /*
        Zufällige Startposition + -richtung
        je Ball, damit sie nicht synchron
        laufen.
    */

    function initBall(b) {

        if (!b.ball) {
            return;
        }

        const arenaRect =
            b.arena.getBoundingClientRect();

        const ballRect =
            b.ball.getBoundingClientRect();

        const maxX =
            Math.max(0, arenaRect.width - ballRect.width);

        const maxY =
            Math.max(0, arenaRect.height - ballRect.height);

        b.maxX = maxX;
        b.maxY = maxY;

        if (!b.ready) {

            b.x = Math.random() * maxX;
            b.y = Math.random() * maxY;

            const angle =
                Math.random() * Math.PI * 2;

            const speed = 34 + Math.random() * 22;

            b.vx = Math.cos(angle) * speed;
            b.vy = Math.sin(angle) * speed;

            b.ready = true;

        } else {

            b.x = Math.min(b.x, maxX);
            b.y = Math.min(b.y, maxY);

        }

    }

    balls.forEach(initBall);

    window.addEventListener("resize", () => {
        balls.forEach(initBall);
    });

    function isPlatformsPageVisible() {

        return Boolean(
            platformsPage &&
            (
                platformsPage.classList.contains("active") ||
                platformsPage.classList.contains("behind")
            )
        );

    }

    let lastTime = null;

    let rafRunning = false;

    /*
        Performance-Fix: Statt die rAF-Schleife
        dauerhaft ab dem ersten Seitenaufruf
        durchlaufen zu lassen (auch wenn die
        Connect-Seite nie angeschaut wird),
        läuft sie nur, während die Seite
        tatsächlich sichtbar ist, und stoppt
        sich danach komplett selbst – statt
        sich nur "leer" weiterzuplanen.
    */

    function ensureTickRunning() {

        if (rafRunning || !isPlatformsPageVisible()) {
            return;
        }

        rafRunning = true;
        lastTime = null;

        requestAnimationFrame(tick);

    }

    function tick(time) {

        if (!isPlatformsPageVisible()) {
            rafRunning = false;
            lastTime = null;
            return;
        }

        requestAnimationFrame(tick);

        if (lastTime === null) {
            lastTime = time;
            return;
        }

        /*
            Zeitdifferenz begrenzen, damit ein
            kurzzeitig inaktiver Tab beim
            Zurückkehren nicht zu einem riesigen
            Sprung führt.
        */

        const dt =
            Math.min(time - lastTime, 40) / 1000;

        lastTime = time;

        balls.forEach((b) => {

            if (!b.ball || (b.maxX <= 0 && b.maxY <= 0)) {
                return;
            }

            b.x += b.vx * dt;
            b.y += b.vy * dt;

            if (b.x <= 0) {
                b.x = 0;
                b.vx = Math.abs(b.vx);
            } else if (b.x >= b.maxX) {
                b.x = b.maxX;
                b.vx = -Math.abs(b.vx);
            }

            if (b.y <= 0) {
                b.y = 0;
                b.vy = Math.abs(b.vy);
            } else if (b.y >= b.maxY) {
                b.y = b.maxY;
                b.vy = -Math.abs(b.vy);
            }

            b.ball.style.transform =
                `translate3d(${b.x}px, ${b.y}px, 0)`;

        });

    }

    ensureTickRunning();

    /*
        Startet die Schleife neu, sobald die
        Connect-Seite wieder aktiv/Zielseite
        wird (Klassenwechsel durch die
        Seiten-Navigation).
    */

    if (platformsPage && "MutationObserver" in window) {

        new MutationObserver(ensureTickRunning)
            .observe(platformsPage, {
                attributes: true,
                attributeFilter: ["class"]
            });

    }

})();


