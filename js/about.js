/* =========================================================
   SEITE 2 – TYPEWRITER "ÜBER MICH"

   Tippt die Zeilen in #about-typewriter
   nacheinander Zeichen für Zeichen,
   sobald die Seite zum ersten Mal
   sichtbar wird.
   ========================================================= */

let aboutTypewriterStarted = false;

function startAboutTypewriter() {

    if (aboutTypewriterStarted) {
        return;
    }


    const container =
        document.getElementById("about-typewriter");


    if (!container) {
        return;
    }


    aboutTypewriterStarted = true;


    const lines =
        Array.from(
            container.querySelectorAll(".type-line")
        );


    const CHAR_SPEED = 26;

    const LINE_PAUSE = 350;


    function typeLine(line, onDone) {

        const text =
            line.getAttribute("data-full") || "";

        let i = 0;

        line.textContent = "";


        (function step() {

            if (i <= text.length) {

                line.textContent =
                    text.slice(0, i);

                i++;

                setTimeout(step, CHAR_SPEED);

            } else if (onDone) {

                onDone();

            }

        })();

    }


    function typeNext(index) {

        if (index >= lines.length) {
            return;
        }

        typeLine(
            lines[index],
            () =>
                setTimeout(
                    () => typeNext(index + 1),
                    LINE_PAUSE
                )
        );

    }


    typeNext(0);

}


