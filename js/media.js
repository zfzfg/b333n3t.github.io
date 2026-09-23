/* =========================================================
   VIDEO-STARTER AUF SEITE 1 UND SEITE "DREI"

   Beim ersten Aufruf ist nur das Play-Zeichen sichtbar.
   Erst nach Klick/Tap wird das Videofenster geöffnet
   und das jeweilige Video gestartet.
   ========================================================= */

document.querySelectorAll(".video-launcher").forEach((launcher) => {

    const button =
        launcher.querySelector(".video-play-trigger");

    const video =
        launcher.querySelector("video");

    if (!button || !video) {
        return;
    }

    button.addEventListener("click", () => {

        launcher.classList.add("is-open");

        video.setAttribute("controls", "controls");

        const playPromise =
            video.play();

        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {
                /* Browser kann Autoplay mit Ton blockieren.
                   In diesem Fall bleibt das Videofenster sichtbar
                   und der Nutzer kann manuell starten. */
            });
        }

    });

});


/* =========================================================
   SEITE 2 – RADIO KACHEL

   Klick auf "02 / radio" spielt die lokale MP3
   assets/radio/catfish-radio.mp3 ab bzw. pausiert sie.
   ========================================================= */

const radioCard =
    document.getElementById("article-radio");

const radioAudio =
    document.getElementById("radio-audio");

if (radioCard && radioAudio) {

    radioCard.addEventListener("click", () => {

        if (radioAudio.paused) {

            radioAudio
                .play()
                .then(() => {
                    radioCard.classList.add("is-playing");
                    radioCard.setAttribute(
                        "aria-label",
                        "The Weekly Catch – Radio Feature pausieren"
                    );
                })
                .catch(() => {
                    radioCard.classList.remove("is-playing");
                });

        } else {

            radioAudio.pause();

            radioCard.classList.remove("is-playing");

            radioCard.setAttribute(
                "aria-label",
                "The Weekly Catch – Radio Feature abspielen"
            );

        }

    });

    radioAudio.addEventListener("ended", () => {

        radioCard.classList.remove("is-playing");

        radioCard.setAttribute(
            "aria-label",
            "The Weekly Catch – Radio Feature abspielen"
        );

    });

}


/* =========================================================
   SEITE 2 – TERMINE AKKORDEON
   ========================================================= */

document.querySelectorAll(".sub-toggle").forEach((button) => {

    button.addEventListener("click", () => {

        const expanded =
            button.getAttribute("aria-expanded") === "true";

        const content =
            document.getElementById(
                button.getAttribute("aria-controls")
            );

        button.setAttribute(
            "aria-expanded",
            String(!expanded)
        );


        if (content) {
            content.hidden = expanded;
        }


        const arrow =
            button.querySelector(".arrow");

        if (arrow) {

            arrow.textContent =
                expanded ? "►" : "▼";

        }

    });

});


