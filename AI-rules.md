# Regeln für KI-Arbeit an dieser Website

Statische Website von b3nn3t, ausgeliefert als GitHub Pages. Es gibt keinen Build, kein Framework und keinen Bundler. Eine Änderung ist fertig, wenn die Dateien im Browser unter einem lokalen statischen Server dasselbe tun wie vorher, plus genau das, was verlangt wurde.

Ästhetik nicht aus alten Kommentaren neu erraten. Die gültige Fassung steht in `aesthetik-wuensche.md`. Ein späterer Kommentar gewinnt. Glas, Grau, Patina-Panel, milchige Flächen und die alte Mehrseiten-Reihenfolge sind verworfene Versuche.

## Zwei Oberflächen, nicht eine

**Startseite** (`index.html`, Ordner `css/` und `js/`): sechs volle Farbflächen, Schrift Arial/Helvetica, Wechsel durch den Spalt.

| Hash | Fläche | Feld | Schrift |
| --- | --- | --- | --- |
| `#page=0` | gespalten | `#315f91` | weiß |
| `#page=1` | die andere | `#788044` | `#111` |
| `#page=2` | Spotify | `#151515` | weiß |
| `#page=3` | YouTube | `#f2f2f0` | `#111` |
| `#page=4` | drei | `#930010` | weiß |
| `#page=5` | Connect | `#10120b` → `#1d2012` | `#f2f2f0` |

**Übrige Seiten** (Kontakt, Impressum, Danke, Intro, Release-Seiten): `styles.css`. Schrift `Press Start 2P`, Fläche durchsichtig, kein Glas, kein Grau, kein Schatten, keine abgerundete Inhaltsfläche. Menü und Burger bleiben schwarz und in Arial. Footer hochkant rechts, Farbe `#930010`. Portrait dahinter, Kopf bleibt im Bild. Diese Pixel-Schrift nicht auf die Startseite ziehen, und die Flächenfarben der Startseite nicht auf die Textseiten.

`#930010` ist die Markenfarbe. Sie bleibt.

## Dateien

`index.html` ist nur das Markup. Stil und Verhalten nicht wieder inline hinein schreiben.

CSS der Startseite, in dieser Reihenfolge, weil spätere Dateien frühere Maße überschreiben:

1. `css/base.css`
2. `css/page-gespalten.css` (Seite 1 und die senkrechten Randtexte)
3. `css/page-andere.css`
4. `css/page-spotify.css`
5. `css/page-youtube.css`
6. `css/page-drei.css`
7. `css/page-connect.css`
8. `css/responsive.css`
9. `css/video-modal.css`
10. `css/burger.css`
11. `css/mobile.css`

`css/mobile.css` bleibt zuletzt. Die Blöcke vom 6. und 7. September 2026 korrigieren die KI-Fehler davor: nichts abgeschnitten, Kacheln gleich hoch, Radio-Bild vollständig, Spotify im Querformat hoch genug für die Songliste, Connect-Rahmen ganz, YouTube-Pfeile bündig.

JS der Startseite, klassische Scripts, in dieser Reihenfolge:

1. `js/state.js`
2. `js/navigation.js`
3. `js/about.js`
4. `js/media.js`
5. `js/horizontal-scroll.js`
6. `js/platform-balls.js`
7. `js/page-gestures.js`
8. `js/menu.js`

`js/menu.js` bleibt zuletzt. Dort hängen Burger, Hash und der Start (`setupLayers`, `updateMask`, `applyPageFromHash`).

Nicht anfassen, außer der Auftrag sagt es:

- `styles.css`, `styles_nav_arrows.css` — Textseiten. In `styles_nav_arrows.css` keine zweite Klammer hinter `!important` setzen.
- `script.js`, `swipe-nav.js` — alte Reihenfolge `index → ueber-mich → diskografie → kontakt → aktuell → gesehen → plattformen`. Die Ziele außer Kontakt sind nur noch Weiterleitungen. Diese Skripte nicht wieder in `index.html` oder `kontakt.html` einbinden. `swipe-nav.js` schickt sonst auf die Produktionsdomain.
- `panel-patina.css`, `panel-panel.css`, `index_patina.html` — liegengebliebenes Experiment, nicht die Seite.
- `index_snippet_*.html` — Schnipsel, keine live Seite.

`ueber-mich.html`, `diskografie.html`, `aktuell.html`, `gesehen.html`, `plattformen.html` leiten mit relativem `index.html#page=N` weiter. Die Hashes nicht umdeuten und nicht wieder auf `https://www.b3nn3t.com/...` festnageln. Der Kommentartext auf diesen Seiten bleibt.

## Verhalten, das schon gilt

- Hash und Zurück-Knopf wählen die Fläche direkt, ohne Spalt-Animation. Ungültige Nummern ignorieren. `applyPageFromHash` läuft beim Laden und bei `hashchange`.
- Vorwärts öffnet sich der Spalt von der Mitte. Rückwärts löst sich die Seite von den Rändern. Gegenläufiges Scrollen schließt den Spalt, statt sofort die Richtung zu wechseln. Ist der Spalt zu (`progress === 0`), ist keine zweite Seite mehr `behind` und die Maske ist leer.
- Senkrechtes Rad und senkrechter Finger wechseln die Fläche, auch über Kacheln, YouTube-Karten, Connect und der Terminliste. Jedes Rad bewegt den Spalt sofort (`OPEN_DISTANCE` 900). Unter 25 % Offenheit fällt er zu, über 75 % läuft er auf die nächste Fläche. In den mittleren 50 % bleibt er genau so weit offen, wie gescrollt wurde. Es gibt keine seitlichen Scroll-Reihen. Auf breiten Fenstern stehen die Stücke im Raster, auf schmalen schieben die Pfeile den Ausschnitt per `transform`. Das Spotify-Embed hat eine durchsichtige Schicht, damit das Rad die Seite trifft; ein Klick gibt den Player frei.
- YouTube spielt im Overlay. Solange es offen ist, gibt es keinen Seitenwechsel. Escape schließt und stoppt das Video.
- Seite 1 und „drei“ zeigen zuerst nur das Play-Zeichen. Das Video startet nach Klick oder Tipp.
- Connect-Icons sind flach. Schatten nur an der Kachel. Die Logos prallen wie ein DVD-Schoner und stehen still bei `prefers-reduced-motion`, im Hintergrund-Tab und wenn die Fläche nicht sichtbar ist.
- Burger oben rechts. Schließen mit Verzögerung, damit die Lücke zwischen Button und Liste nicht vorher zumacht. Klick daneben und Escape schließen auch. Menüsprung ohne Spalt-Animation.
- Kontakt: kein Seitenwechsel durch Wisch, Rad oder Pfeiltaste. Formularfelder dunkel auf dem hellen SoundCloud-Hintergrund, Button weiß mit Schrift `#930010`. Dieselbe Hintergrunddatei auf Desktop und Handy.
- Auf den Release-Seiten „drei“ und „drei-viertel“ den Countdown-`timer` mit `let` anlegen, bevor `updateCountdown` ihn benutzt. Das Datum liegt in der Vergangenheit, der erste Aufruf trifft sonst die Temporal Dead Zone.
- Reduzierte Bewegung schaltet auf der Release-Seite „gespalten“ den Riss aus.

## Sprache und Inhalt

Kleinschreibung, auch „uhr“. Der Name ist `b3nn3t`, nicht „bennet“. Der Über-mich-Satz lautet: „hallo ich bin b3nn3t, anfang 20 und künstler (oder so) aus st. gallen.“

Songtexte, Termine, Release-Daten und sichtbare Sätze nicht umschreiben, sortieren oder glätten, außer der Auftrag verlangt genau das. Abstände, die ein Kommentar als gewollt oder als wieder entfernt bezeichnet, nicht neu erfinden. Wörter wie „kuck hier“, „vorsichern“ und „erklärbär“ sind Absicht.

## Wie man ändert

- Nur das ändern, was der Auftrag braucht. Keine neue Seite, keine neue Animation, kein zweites Menüsystem, kein Modul-Bundler.
- Die JS-Dateien sind keine Module. `let` und `const` aus `js/state.js` gelten in den später geladenen Scripts nur, weil es klassische Scripts ohne `type="module"` sind. Nichts davon auf `window` umbauen und nichts doppelt deklarieren. Eine neue Datei kommt an die Stelle in der Liste, an der ihre Werte schon existieren und ihre Aufrufe noch nicht gelaufen sind.
- Neue Startseiten-CSS kommt in die passende Datei unter `css/`. Korrekturen, die ältere Maße überschreiben sollen, nach `css/mobile.css` oder an dessen Ende, nicht davor.
- Pfade bleiben relativ zur Domainwurzel (`css/...`, `js/...`, `assets/...`), damit Fork und Produktionshost dieselben Dateien laden.
- Nichts in den Publish-Baum legen, was kein Teil der Seite ist: `node_modules`, Prüfskripte, Screenshot-Ordner. GitHub Pages liefert das Repository aus.
- Kommentare kurz halten. Keine neuen Ästhetik-Aufsätze in den Code schreiben. Bestehende Korrektur-Kommentare nicht löschen, solange die Regel, die sie festhalten, noch gilt.

## Prüfen

Nach einer Änderung an `index.html`, `css/` oder `js/` die Seite lokal ausliefern und im Browser ansehen, nicht nur die Datei lesen.

Mindestens:

- `#page=0` bis `#page=5` zeigen je eine aktive Fläche
- Hash wechseln und Zurück führen auf die richtige Fläche
- Spalt öffnet und schließt, ohne eine zweite Fläche liegend zu lassen
- Burger öffnet und schließt
- Konsole ohne neue Fehler, keine neuen 404 für `css/` und `js/`
- Desktop und ein schmales Hochformat

Kontakt, Impressum oder eine Release-Seite nur mitprüfen, wenn die Änderung sie betrifft. Danach muss Kontakt auf demselben Host bleiben.
