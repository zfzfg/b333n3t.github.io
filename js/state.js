/* =========================================================
   GESPALTEN
   BIDIREKTIONALE NAVIGATION
   ========================================================= */


/*
    Alle Seiten
*/

const pages = Array.from(
    document.querySelectorAll(".page")
);


/*
    Aktuelle Seite

    0 = gespalten
    1 = die andere
    2 = Spotify
    3 = YouTube
    4 = Drei
    5 = Connect
*/

let currentPage = 0;


/*
    Fortschritt des Spalts

    0 = geschlossen
    1 = komplett geöffnet
*/

let progress = 0;


/*
    Richtung

     1 = nach unten
    -1 = nach oben
*/

let direction = 1;


/*
    Animation läuft gerade
*/

let animating = false;


/*
    Scrollgeschwindigkeit
*/

const OPEN_DISTANCE = 900;

/*
    Empfindlichkeit des horizontalen
    Scrollens (Kacheln / YouTube-Reihe).
    Werte über 1 verstärken jede
    Maus-, Trackpad- oder Touch-Geste,
    damit schon ein leichtes Wischen
    bzw. ein kleiner Wheel-Ausschlag
    spürbar etwas bewegt.
*/

const H_SCROLL_SENSITIVITY = 2.6;

/*
    Zusätzliche Verstärkung nur für die
    vertikale Spalt-Geste (Seitenwechsel)
    per Touch. Höher als 1 bedeutet: der
    Spalt öffnet/schließt sich schneller
    und flüssiger, bei gleicher Wisch-
    distanz mit dem Finger.
*/

const TOUCH_SPALT_SENSITIVITY = 1.7;



