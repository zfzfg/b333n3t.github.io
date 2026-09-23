/* Die Reihen scrollen nicht. Pfeile schieben auf schmalen
   Fenstern nur den sichtbaren Ausschnitt. */

function bindStrip(grid, itemSelector, navSelector, perPage) {
    if (!grid) {
        return;
    }
    const nav = document.querySelector(navSelector);
    let index = 0;

    function apply() {
        const items = [...grid.querySelectorAll(itemSelector)];
        const wide = window.matchMedia("(min-width: 801px)").matches;
        if (wide || items.length === 0) {
            grid.style.transform = "none";
            if (nav) {
                nav.hidden = true;
            }
            return;
        }
        const pages = Math.max(1, Math.ceil(items.length / perPage));
        if (index > pages - 1) {
            index = pages - 1;
        }
        if (index < 0) {
            index = 0;
        }
        if (nav) {
            nav.hidden = pages < 2;
        }
        const gap = 12;
        const step = items[0].getBoundingClientRect().width + gap;
        grid.style.transform = "translateX(" + (-index * perPage * step) + "px)";
    }

    if (nav) {
        nav.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", () => {
                index += Number(button.getAttribute("data-dir")) || 0;
                apply();
            });
        });
    }

    window.addEventListener("resize", apply);
    apply();
}

bindStrip(
    document.querySelector(".andere-grid"),
    ".andere-tile",
    ".andere-nav",
    1
);
bindStrip(
    document.querySelector(".youtube-grid"),
    ".youtube-card",
    ".youtube-nav",
    1
);
bindStrip(
    document.querySelector(".platforms-grid"),
    ".platform-tile",
    ".platforms-nav",
    2
);

const spotifyShield = document.querySelector(".spotify-shield");
const spotifyFrame = document.querySelector(".spotify-frame");

if (spotifyShield && spotifyFrame) {
    const spotifyEmbed = spotifyShield.parentElement;
    spotifyShield.addEventListener("click", () => {
        spotifyShield.hidden = true;
    });
    if (spotifyEmbed) {
        spotifyEmbed.addEventListener("pointerleave", () => {
            spotifyShield.hidden = false;
        });
    }
    window.addEventListener("hashchange", () => {
        spotifyShield.hidden = false;
    });
    document.querySelectorAll(".burger-link").forEach((link) => {
        link.addEventListener("click", () => {
            spotifyShield.hidden = false;
        });
    });
}
