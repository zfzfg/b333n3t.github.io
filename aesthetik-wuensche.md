# So würde b3nn3t die Ästhetik wollen

Rekonstruktion aus den Code-Kommentaren, die sehr wahrscheinlich eine KI im Namen von b3nn3t geschrieben hat. Quelle ist das Git-Repo `b333n3t/b333n3t.github.io` (Fork hier), Commits vom 15. Oktober 2025 bis 22. September 2026, Autor durchgehend `b333n3t`. Die Kommentare stehen in `index.html`, `styles.css`, `styles_nav_arrows.css`, `impressum.html`, `danke.html`, `kontakt.html`, den alten Seiten `gesehen` / `diskografie` / `plattformen` / `ueber-mich` / `aktuell` (heute nur noch Weiterleitungen), den Release-Seiten, `tv-intro.html`, `panel-patina.css` und `script.js`.

Die KI verrät sich am Ton: lange deutsche Begründungen, Banner aus Gleichheitszeichen, Häkchen, Formulierungen wie „dein vorhandener Code bleibt unverändert“, „falls du …“, „wie bei den anderen Seiten“, „FINAL“, „v2“, „v3“, „Feinschliff“, und datierte Blöcke, die eigene frühere Layouts wieder geradeziehen. Dazwischen stehen Wörter, die nach b3nn3t selbst klingen und von der KI nur festgehalten wurden: „kuck hier“, „vorsichern“, „erklärbär“, „uhr“ klein, „b3nn3t“ statt „bennet“.

**Lesehilfe.** Ein späterer Kommentar gewinnt. Steht ein Wunsch nur in einem alten Kommentar und ein jüngerer widerspricht ihm, ist der alte Wunsch ein verworfener Versuch der KI, kein aktueller Auftrag. Unten ist das so markiert.

---

## Was am Ende gelten soll

Stand nach dem letzten Ästhetik-Eingriff, dem Block `MOBILE PORTRAIT FEINSCHLIFF (2026-09-07)` in `index.html` (`c62cfeb`). Die Startseite ist seit dem 6. September 2026 eine einzige Fläche mit sechs Seiten hintereinander. Die alten Einzelseiten sind Weiterleitungen auf diese Fläche. Kontakt, Impressum, Danke, Intro und die Release-Seiten bleiben eigene Seiten und folgen der Regel vom 19. Dezember 2025: kein Glas, kein Grau, kein milchiger Schleier.

### Die Fläche

Jede Seite ist ein volles, flaches Farbfeld. Kein Foto hinter der Startseite, kein milchiges Panel, keine abgerundete Karte als Seitenrahmen. Die Schrift der Startseite ist Arial / Helvetica, nicht die Pixel-Schrift. Überschriften sind sehr groß, eng laufend (`letter-spacing` um `-0.07em` bis `-0.08em`), Zeilenhöhe um `0.85`. Der Seitentitel sitzt links, riesig, kleingeschrieben.

Die sechs Seiten, in der Reihenfolge der Spalt-Navigation:

| Seite | Name im Menü | Feld | Schrift |
| --- | --- | --- | --- |
| 1 | gespalten | Blau `#315f91` | weiß |
| 2 | die andere | Oliv `#788044` | fast schwarz `#111` |
| 3 | Spotify | fast schwarz `#151515` | weiß |
| 4 | YouTube | warmes Offwhite `#f2f2f0` | `#111` |
| 5 | drei | Markenrot `#930010` | weiß |
| 6 | Connect | dunkles Oliv, leicht verlaufend von `#10120b` über `#1d2012` | `#f2f2f0` |

`#930010` ist die Farbe, die bleiben soll. Sie taucht ab dem 19. Dezember 2025 als Footer- und Button-Farbe auf und wird am 6. September 2026 zur ganzen Seite „drei“.

Am rechten Rand jeder Seite steht ein senkrechter Hinweis, klein, kleingeschrieben, weit gesperrt (`letter-spacing` um `.18em`), um 90 Grad gedreht. Er darf den Inhalt nicht überlappen und nicht aus dem Bild laufen. Auf „gespalten“ und „drei“ sitzt er tiefer als die geometrische Mitte, unter bzw. mittig zum Videofenster. Auf YouTube bleibt rechts neben der Kartenreihe bewusst Luft für das Wort „anschauen“. Auf Connect bleibt rechts Luft für „links“. Die Reihe darf nicht bis an den Bildschirmrand stoßen.

### Der Spalt

Der Seitenwechsel ist das Bild, nach dem die Seite heißt. Vorwärts öffnet sich in der Mitte ein Spalt und wächst nach außen: die aktuelle Seite verschwindet von innen nach außen, die nächste kommt darunter zum Vorschein. Rückwärts läuft es umgekehrt, die Ränder werden zuerst durchsichtig, die vorherige Seite kommt von außen nach innen. Der Spalt folgt dem Finger in Echtzeit, nicht erst beim Loslassen. Scrollt man gegen die laufende Geste, schließt sich der Spalt wieder, statt sofort die Richtung zu wechseln. Über das Menü springt man direkt, ohne die Animation.

Waagerechtes Blättern (Kacheln, YouTube, Connect) und senkrechtes Seitenwechseln dürfen sich nicht in die Quere kommen. Solange in einer Reihe oder in der Terminliste noch Platz in die gewünschte Richtung ist, scrollt dieser Inhalt. Erst am Rand übernimmt die Seite. Ein eingebetteter Player darf die Wischfläche nicht vollständig schlucken, deshalb sind Spotify und die Reihen etwas schmaler als ihr Container. Die Termin-Kachel scrollt in sich, nicht die ganze Kachel. Alle Kacheln einer Reihe sind exakt gleich hoch. Ort und Uhrzeit eines Termins brechen so um, dass rechts nichts abgeschnitten wird.

Auf Seite 1 und auf „drei“ ist beim ersten Blick nur ein rundes Play-Zeichen zu sehen. Das Videofenster öffnet sich erst nach Klick oder Tipp. Kann der Browser Ton nicht von selbst starten, bleibt das Fenster da und der Start ist manuell. YouTube-Karten spielen im Overlay auf der Seite, sie verlinken nicht weg. Die Vorschaukarten bleiben kompakt, angelehnt an die alte Seite `gesehen.html`: ungefähr 320 Pixel breit, Vorschaubild fix etwa 167 Pixel hoch, auf jedem Gerät gleich, mit einem leichten Zoom beim Hover.

### Kacheln auf „die andere“

Eine waagerechte Reihe, auch auf dem Handy. Sechs Kacheln, Nummern und Namen kleingeschrieben im Inhalt, das kleine Label darüber in Versalien und weit gesperrt: `01 / über mich`, `02 / radio`, `03` Presse, `04` Artikel, `05 / termine`, `06 / kontakt`. Die Nummernzeile aller Kacheln steht auf einer Höhe. Bei Kontakt ist nur der Rest darunter zentriert, das Label nicht. Hover auf Kontakt ist ein hauchdünner dunkler Schleier (`rgba(0,0,0,.06)`), das Icon hebt sich um wenige Pixel.

„Über mich“ tippt sich beim ersten Erscheinen der Seite Zeichen für Zeichen. Der Satz, der nach einer KI-Korrektur gelten soll (7. September 2026, `7df3343`): „hallo ich bin b3nn3t, anfang 20 und künstler (oder so) aus st. gallen.“ Die Fassung „bennet“ und die Fassung „20 jahre“ sind verworfen.

Das Radio-Bild liegt vollständig im Rahmen (`object-fit: contain`), es wird nicht beschnitten. Dahinter ist `#111`.

### Connect

Die Plattform-Icons sind wieder flach. Tiefe bekommt nur die Kachel selbst, ein ruhiger Schatten, beim Hover ein kleines Anheben. In der Fläche über dem Namen prallt das Logo wie ein DVD-Bildschirmschoner. Jeder Ball startet an einem anderen Ort und in eine andere Richtung, damit sie nicht im Takt laufen. Die Bewegung pausiert, wenn die Seite nicht sichtbar ist, der Tab im Hintergrund liegt oder reduzierte Bewegung gewünscht ist. Namen der Plattformen sind kleingeschrieben, die Handlung darunter („öffnen“ o. Ä.) in kleinen Versalien. Zwei Kacheln müssen auf einem hochformatigen Handy vollständig im sichtbaren Bereich liegen, inklusive oberem und rechtem Rahmen. Die Link-Karte darf ihre alte Mindesthöhe nicht über den unteren Kachelrahmen hinausdrücken.

Pfeile an den Reihen sind eckige, linierte Quadrate, 42 Pixel, ohne Füllung, Schriftfarbe der Seite. Beim Hover füllen sie sich mit der Schriftfarbe und der Pfeil nimmt die Seitenfarbe an. Auf YouTube im Hochformat sitzen diese Pfeile rechts bündig mit dem Abschluss von „kanal ansehen →“.

### Menü

Oben rechts, immer da, über allen Seiten. Ein Klick oder Tipp klappt es nach unten auf. Verlässt die Maus das Menü, schließt es sich, aber erst nach einer kurzen Verzögerung: der Button ist schmaler als die Liste, und ohne Verzögerung würde die Lücke dazwischen das Menü schließen, bevor man einen Punkt trifft. Ein Klick daneben schließt es ebenfalls. Die aktuelle Seite ist im Menü kein Link mehr, nur noch Text, leicht hervorgehoben. Externe Ziele (Kontakt, Impressum) sind normale Links.

### Bewegung und Ruhe

Alles, was sich bewegt, soll sich auf dem Handy flüssig anfühlen, ohne dass sich das Aussehen ändert. Der Spalt, die Bälle und das Menü sind die einzigen dauerhaften Bewegungen der Startseite. Wer reduzierte Bewegung eingestellt hat, bekommt keine Bälle und auf der Release-Seite „gespalten“ keinen Riss.

### Was auf den übrigen Seiten gilt

Kontakt, Impressum, Danke und die Seiten, die noch `styles.css` laden, stehen seit dem 19. Dezember 2025 auf dieser Regel, Kommentar wörtlich: „MAIN – KEIN GLAS, KEIN GRAU“ und „ABSOLUTER GRAU-/GLAS-KILL“. Fläche und Scroll-Panel sind durchsichtig, ohne Unschärfe, ohne Schatten, ohne abgerundete Ecke. Karten ebenso: clean, kein Grau. Ein milchiger Schleier über Pseudo-Elementen wird abgeschaltet, auch wenn er aus einem älteren Stylesheet kommt. Das Layout aus `styles.css` bleibt, nur die Milch geht weg.

Die Schrift dieser Seiten ist die Pixel-Schrift `Press Start 2P`, seit dem 15./16. Oktober 2025. Das Menü ist davon ausgenommen: Arial, schwarz, Burger schwarz. Seitentext und der Name „b3nn3t“ im Kopf sind weiß. Überschriften sind festgezogen („H1 Schriftgröße FINAL“, 19. Dezember 2025): 2rem, auf dem Handy 1.6rem.

Hinter diesen Seiten liegt das Porträt, vollflächig, ohne Balken links und rechts. Der Kopf muss im Bild bleiben. Dafür wandert der Fokus nach oben, sobald das Fenster flach wird: Querformat etwa `center 24%`, große 16:10-Notebooks etwa `20%`, sehr flache Höhen etwa `18%`. Der Kommentar nennt das „Hintergrund-Fokus wie bei der weißen Version“. Auf dem Handy ein eigenes, leichteres Bild. Der Hintergrund ist eine fixe Ebene, schwarz dahinter, damit iOS beim Überziehen keine weißen oder schwarzen Balken zeigt. Der Body selbst ist durchsichtig.

Der Footer steht hochkant am rechten Rand, eine Zeile, ohne Umbruch, mit genug Tipfläche. Zwei Variablen schieben ihn: höher heißt kleinerer `--footer-top`, näher am rechten Rand heißt kleinerer `--footer-right`. Wird das Fenster zu niedrig, heftet er sich lieber unten an, als abgeschnitten oder „zu hoch“ zu schweben. Die rechte Wischzone darf ihn nicht blockieren. Die Farbe, die den späteren Kommentar überlebt, ist das Rot `#930010` (Danke-Seite, und der explizite Widerruf „Footer-Override auf weiß entfernt, damit rot bleibt“ auf der alten Plattformen-Seite, 19. Dezember 2025). Ein älterer Impressum-Kommentar sagt noch „Footer weiß“. Der Rot-Kommentar ist die Korrektur.

Seitenpfeile links, rechts und unten sind aus, auf Desktop und auf dem Handy. Ein älteres Stylesheet zeichnet sie noch als milchige Halbkreise. Das ist der verworfene Stand vom 17. Oktober 2025.

Das Logo-Bild im Kopf ist aus. Der Name „b3nn3t“ sitzt als Text, etwas rechts der linken Hälfte (etwa bei einem Viertel der Breite). Ein extra „Zur Startseite“-Link ist aus.

Abstände sind eine wiederholte Bitte, kein Dekor. Wo b3nn3t „kein Abstand“ sagt, ist keiner. Wo er einen Abstand wie eine normale Textzeile will, ist es genau das und nicht ein großer Blockabstand. Akkordeons (Alben, EPs, Singles, Neuigkeiten) haben spürbar Luft zwischen den Titeln, innerhalb eines Textes kann ein Absatz direkt am nächsten kleben.

### Kontakt

Der Hintergrund ist der helle SoundCloud-Hintergrund, auf dem Handy derselbe wie auf dem Desktop. Ältere mobile Hintergrundbilder werden überschrieben. Text ist schwarz, nicht weiß. Formularrahmen, Text und Platzhalter sind dunkelgrau. Der Button ist weiß mit Schrift `#930010`. Die Checkbox ist dunkel, nicht weiß. Der Titel „kontakt“ klappt nicht mehr auf, er ist immer offen und sieht aus wie ein Menüpunkt.

### Release-Seiten

Eigene, ruhige Farbflächen, kleingeschriebene Überschriften, viel Luft, aber keine Extra-Lücken an den Stellen, die b3nn3t benannt hat.

- „drei“ (`release-3.html`, Januar 2026): Video statt Standbild. Abstand von „kuck hier:“ zu den Icons etwas größer. Abstand von „vorsichern“ zum Button wie beim „erklärbär“, ohne zusätzlichen Abstand. Kein großes Loch zwischen Streaming-Block und „mehr…“. Die Icons selbst haben danach keinen Abstand.
- „drei-viertel“ (Februar 2026): Fläche `#587fa6`, Systemschrift, Video mit stark gerundeten Ecken (22px), weißer Pill-Button in der Flächenfarbe. Darüber ein Vollbild-Fadenkreuz aus langen, dünnen weißen Linien.
- „desigual“ (Ende Juli 2026): dieselbe Familie, helle Fläche, kleingeschriebene UI. Kaum erklärende Kommentare, die Seite folgt dem Muster der anderen Releases.
- „gespalten“ (August 2026): das Cover bricht als Riss auf. Der Mobile-Button rückt leicht nach rechts, damit er mit dem Riss fluchtet. Reduzierte Bewegung schaltet Riss, Play-Knopf und Verbinder aus und zeigt das Video direkt.

### Intro

`tv-intro.html` (Juni/Juli 2026, Vorläufer seit Oktober 2025) ist ein anderer Raum als die Website: Vollfläche `#930010`, darüber ein feines, leicht driftendes Vektor-Gitter wie ein Oszilloskop der 80er. Linien weiß, hauchdünn, mit einem sehr schwachen Cyan- und Magenta-Saum. Das Gitter zieht sich als Tunnel nach innen. Kanten sind auf Pixel gerastert, keine weiche Kantenglättung. Wer reduzierte Bewegung will oder das Intro überspringt, ist sofort durch. Das Intro ist einmalig, kein Teil des Alltags-Looks der Seiten.

---

## Zeitreihe

Jüngeres ersetzt Älteres. Die KI hat mehrfach einen Look gebaut, den b3nn3t danach wieder hat entfernen lassen. Die Kommentare der Entfernung sind der eigentliche Wunsch.

### 15.–18. Oktober 2025 — erster Look, später verworfen

Erster Commit `75a639a` am 15. Oktober. `Press Start 2P` kommt am 15./16. Oktober ins Projekt (`cf57bb1`, `a4cb022`, `95d3f5b`). Am 16. Oktober (`2f787de`, danach `e802eb0`) beschreibt `styles.css` den Look, den die KI zuerst für richtig hielt:

- Porträt als Hintergrund, `cover`, Fokus etwas über der Mitte (`center 45%`), im Querformat und auf flachen Notebooks noch höher, damit der Kopf sichtbar bleibt. Keine Balken links und rechts.
- Ruhiges Mitlaufen des Hintergrunds beim Scrollen. Das wird am 19. Dezember durch eine fixe Ebene ersetzt.
- Ein großes Inhaltsfeld aus transparentem Weißgrau. Zuerst `rgba(255,255,255,0.55)` und `blur(8px)`, am 16. Oktober schon zurückgenommen auf `0.32` und `blur(2px)`, Schatten leichter. Kommentar: „transparenteres Weiß-Grau“, „weicher Glas-Effekt“.
- Karten enger und auf dem Handy schmaler, Eckenradius leicht kleiner (14px).
- Pfeile schwarz, ohne Hintergrund, ohne Schatten. Footer leicht transparent, dann eine Zeile, nah am Rand, iOS-sicher, Links schwarz. Logo-Icon im Kopf aus. Name etwas nach rechts. Startseiten-Link aus.

Am 16. Oktober entsteht parallel das „Retro Panel (Patina Look)“ (`panel-patina.css`, `850c9d4` und Nachbarn, `index_patina.html`). Beige Fläche `#e7dec8` bis `#d0c3a6`, Rausch-Textur, schwarze Drehregler, `IBM Plex Sans` im Panel, `Press Start 2P` in der Überschrift. Das Panel wird von keiner heutigen Seite eingebunden. `panel-panel.css` blendet es auf kleinen Breiten aus. Es ist ein liegengebliebenes Experiment, kein Wunsch, der die Startseite überlebt hat.

### 17.–29. Oktober 2025 — Glas-Pfeile, schon am selben Tag im Widerspruch

Am 17. Oktober (`e057a53`) bekommen die Navigationspfeile in `styles_nav_arrows.css` den Kommentar „transparente Halbkreise mit Glas-/Blur-Effekt“: halbtransparentes Weiß, Unschärfe, kleiner als die erste Fassung (von 44×88 auf 26×52). `styles.css` sagt zur gleichen Zeit weiter „Schwarz, ohne Hintergrund“. Beide Kommentare liegen bis heute in den Dateien. Ab dem 19. Dezember ist der gültige Satz ein dritter: Pfeile links, rechts und unten sind komplett aus. Die Halbkreise sind der verworfene Zwischenstand.

Am 24. Oktober steht im alten `index.html` noch „FIXED Glas-Overlay: exakt wie gesehen.html“. `gesehen` ist in dieser Phase die Referenzseite, an der sich Karten, Intro-Button und später die YouTube-Maße orientieren. Der Glas-Satz wird im Dezember ausdrücklich getötet.

### 19.–26. Dezember 2025 — die Korrektur, die bleibt

Am 19. Dezember (`e2bea08` für `styles.css`, `f9428e6` und die Seitenedits danach) schreibt die KI den Wunsch um, den sie im Oktober selbst eingebaut hatte:

- „KEIN GLAS, KEIN GRAU.“
- „Cards – clean, kein Grau.“
- „ABSOLUTER GRAU-/GLAS-KILL“ auf `.main` und `.scroll-panel`, inklusive Pseudo-Elementen.
- „H1 Schriftgröße FINAL.“
- Hintergrund als fixe Ebene, schwarz, damit iOS keine Balken zeigt. Fokus „wie bei der weißen Version“, noch höher als im Oktober.
- Pro Seite ein „WHITE THEME“: Name und Seitentext weiß, Menü und Burger bleiben schwarz, Menü in Arial. Karten, wo sie eine helle Fläche haben, bleiben schwarz auf weiß und lesbar.
- Scroll-Panel unsichtbar. Die Seite selbst scrollt nicht, nur das Panel.
- Footer hochkant rechts, mit den zwei Schiebe-Variablen und dem Fallback nach unten.
- „Footer-Override auf weiß entfernt (damit rot bleibt).“ `#930010` ist seit `e2bea08` / `2453d40` im Projekt.
- „NUR der große Content-Block soll keinen Glas-Schleier haben.“ Pseudo-Elemente, die den milchigen Look erzeugen, auf Deckkraft 0.
- Impressum: „KEIN Glas/Blur mehr“, „kein milchiger Block“, „Pseudo-Panel wirklich abschalten“, Abstände wie `ueber-mich`, Schrift wie die anderen Seiten, Listenabstände „hübsch“. Der Satz „grauer Container mit Abstand“ im selben Impressum-Kommentar ist der ältere Auftrag und gilt nicht mehr, sobald der Glas-Kill darunter steht.

Bis zum 26. Dezember wird dieser Block auf `gesehen`, `diskografie`, `plattformen`, `ueber-mich`, `aktuell`, `kontakt` und `danke` kopiert. Der am häufigsten wiederholte Wunsch dieser Tage ist nicht eine neue Farbe, sondern Gleichheit: „EXAKT wie index“, „IDENTISCH zu ueber-mich“, „1:1“, „wie bei den anderen Seiten“. Eine Seite, die anders ausieht als ihre Nachbarin, ist ein Fehler.

Sichtbar bleibt aus dieser Phase auch die Bitte um konkrete Abstände: mehr Luft zwischen den Akkordeon-Titeln, ein kleiner Extra-Abstand nur zwischen „Singles“ und „kontakt“, und Absätze, zwischen denen ausdrücklich keiner sein soll.

### Januar bis August 2026 — Releases, ohne die Dezember-Regel zu öffnen

Die Startseiten-Ästhetik bleibt. Neu sind die Release-Flächen, jede mit einer eigenen Grundfarbe, aber mit derselben Sprache: klein, luftig, keine zusätzlichen Löcher, Button als klare Fläche.

- 7. Januar und die Tage davor, `release-3.html`: die Abstands-Kommentare mit b3nn3ts Wörtern („kuck hier“, „vorsichern“, „erklärbär“, „mehr…“). Ein Abstand, den die KI vorher eingebaut hatte („zusätzlicher Abstand bei vorsichern“), wird wieder entfernt.
- Februar, `release-drei-viertel.html`: Fläche `#587fa6`, Vollbild-Fadenkreuz aus langen Linien.
- 12. Juni bis 27. Juli, `tv-intro.html`: das 80er-Vektor-Gitter auf `#930010`. Ältere Intro-Varianten (`tv-intro_1.html`, `tv-intro - Sicherung.html`) werden gelöscht. Es bleibt eine Fassung.
- Ende Juli, `release-desigual.html`.
- 4. August, `kontakt.html`: Formular wird auf den hellen SoundCloud-Hintergrund umgestellt. Weiße Felder waren falsch. Rahmen, Text, Platzhalter und Checkbox werden dunkel, der Button weiß mit `#930010`.
- 8.–14. August, `release-gespalten.html`: der Riss. Der Button wird auf dem Handy leicht nach rechts geschoben, damit er mit dem Riss fluchtet. Am 10. August wird an anderer Stelle „Uhr“ zu „uhr“ (`982d428`). Kleinschreibung ist auch in den Daten ein Wunsch, nicht nur in der UI.

### 6.–7. September 2026 — die Startseite wird neu gebaut, und noch am selben Tag korrigiert

Am 6. September (`fed73bc`, „Add files via upload“) ersetzt ein neuer `index.html` die alte Startseite. Die Kommentare darin sind eine durchgehende KI-Stimme: der Spalt, die sechs Farbfelder, die senkrechten Wörter, der Typewriter, die DVD-Bälle, „dezente Tiefe für die Kachel selbst, seit die Icons wieder flach sind“. Der letzte Halbsatz ist eine Korrektur innerhalb derselben Datei. Eine frühere Fassung der Connect-Icons hatte Tiefe. Flach ist der gültige Stand, der Schatten darf nur an der Kachel bleiben.

Dieselbe Datei enthält unter dem ersten Layout drei Korrekturblöcke, die die KI gegen ihre eigenen vorherigen Maße geschrieben hat. Sie stehen absichtlich nach dem Grundlayout, damit sie es überschreiben:

1. `AKTUELLE ANPASSUNGEN` — Video und Play auf „gespalten“ und „drei“ um ein Drittel Richtung Mitte. YouTube-Randtext weiter nach rechts. Radio-Bild ganz im Rahmen, nicht beschnitten.
2. `MOBILE PORTRAIT + LANDSCAPE FIXES (2026-09-06)` — senkrechte Randtexte immer innerhalb des sichtbaren Bereichs. Termine scrollen in einem eigenen Kasten, nicht die ganze Kachel. Auf kleinen Handys im Querformat ist die Höhe der knappe Wert.
3. `MOBILE / DESKTOP CORRECTIONS v2 (2026-09-06)` — Termine auch auf dem Desktop so umbrechen, dass Ort und Zeit nie rechts abgeschnitten werden. Alle Kacheln, inklusive Termine, exakt gleich hoch. Gedrehte Texte über einen inneren Mittelpunkt verankern, damit am Rand nichts fehlt. YouTube lässt rechts vom vertikalen Wort bewusst Platz. Randtext von Seite 1 und „drei“ vollständig innerhalb des Displays. Spotify nutzt im Querformat fast die gesamte Höhe. Das YouTube-Label sitzt rechts außerhalb der Kartenreihe.
4. `SPOTIFY LANDSCAPE HEIGHT FIX v3` — auf kleinen Handys im Querformat braucht das Spotify-Embed mindestens etwa 352 Pixel Höhe, sonst sieht man nur den kompakten Player und nicht die Songliste. Der Seitencontainer darf dafür senkrecht scrollen, wenn die Browserleisten den Viewport klein machen. Das ist die eine erlaubte Ausnahme von „die Seite scrollt nicht“.

Am 6. September ändert `4205fb2` keine Kommentare, aber den Über-mich-Satz von „b3nn3t“ zu „bennet“ und sortiert Termine um. Das ist ein Fehler. Am 7. September stellt `7df3343` den Satz richtig: „hallo ich bin b3nn3t, anfang 20 und künstler (oder so) aus st. gallen.“

Am 7. September hängt `c62cfeb` den letzten Block an, `MOBILE PORTRAIT FEINSCHLIFF (2026-09-07)`, nur Hochformat:

- Connect: zwei Kacheln sauber in der sichtbaren Breite, oberer und rechter Rahmen nicht abgeschnitten.
- Die Link-Karte darf nicht durch ihre bisherige Mindesthöhe über den unteren Kachelrahmen hinausdrücken.
- YouTube: Pfeile rechts bündig zum Ende von „kanal ansehen →“.
- Auf „gespalten“ den senkrechten Text etwas tiefer, damit er optisch mittiger zum Videofenster steht.

Danach, am 22. September, ändern sich nur noch Menü-Links und das Impressum. Kein neuer Ästhetik-Kommentar.

---

## Verworfen, nicht wieder einbauen

Diese Sätze stehen noch im Code oder standen dort lange. Sie beschreiben den Fehler, nicht den Wunsch.

| Wann | Was die KI gebaut hat | Wann es zurückgenommen wurde | Gültig stattdessen |
| --- | --- | --- | --- |
| 16. Okt 2025 | Milchiges Weißgrau, Unschärfe, Schatten, runde Inhaltsfläche | 19. Dez 2025, „GLAS-KILL“ | Durchsichtige Fläche, kein Schatten, keine Rundung auf den Textseiten |
| 16. Okt 2025 | Patina-Panel, Beige, Rauschen, Drehregler | nie in die echte Seite übernommen | Die sechs Farbfelder bzw. die klare Textseite |
| 17. Okt 2025 | Glas-Halbkreis-Pfeile | 19. Dez 2025, „Pfeile komplett AUS“ | Keine Seitenpfeile. Reihen-Pfeile auf der neuen Startseite sind eckige Linien-Quadrate |
| 24. Okt 2025 | Glas-Overlay „exakt wie gesehen“ | 19. Dez 2025 | Kein Schleier über dem Inhalt. `gesehen` bleibt nur als Maß für die YouTube-Kartengröße |
| Dez 2025, Impressum | „grauer Container“ | derselbe Kommentarblock: „KEIN Glas/Blur“, transparentes Panel | Kein grauer Kasten |
| Dez 2025, Impressum | „Footer weiß“ | derselbe Zeitraum: „damit rot bleibt“, Danke-Seite `#930010` | Footer und Aktion in `#930010` |
| vor dem 6. Sep 2026 | Connect-Icons mit eigener Tiefe | Kommentar „seit die Icons wieder flach sind“ | Icons flach, Schatten nur an der Kachel |
| 6. Sep 2026, erstes Layout | Randtexte abgeschnitten, Kacheln unterschiedlich hoch, Radio beschnitten, Spotify im Querformat zu niedrig, Connect-Rahmen abgeschnitten, YouTube-Pfeile nicht bündig | v2, v3 am 6. Sep, Feinschliff am 7. Sep | Nichts ragt aus dem Feld. Gleiche Kachelhöhe. Bild vollständig. Songliste sichtbar. Rahmen ganz. Pfeile bündig |
| 6. Sep 2026, `4205fb2` | „hallo ich bin bennet, 20 jahre“ | 7. Sep 2026, `7df3343` | „hallo ich bin b3nn3t, anfang 20 …“ |
| Jan 2026, Release „drei“ | Extra-Abstand vor „vorsichern“ | derselbe Monat, Kommentar „GEÄNDERT: … entfernt“ | Abstand wie eine normale Zeile, wie beim „erklärbär“ |
| vor Aug 2026, Kontakt | Weiße Formularfelder | 4. Aug 2026 | Dunkelgrau auf hellem SoundCloud-Grund, Button weiß / `#930010` |

Die Pixel-Schrift ist nicht verworfen. Sie gilt auf den Seiten, die `styles.css` laden. Sie gilt nicht auf der neuen Startseite. Dort ist der Wunsch seit dem 6. September eine neutrale Grotesk, riesig und eng.

Ein Play-Knopf auf der Startseite hat noch eine leichte Unschärfe von 4 Pixeln und einen fast durchsichtigen weißen Kreis. Das ist die einzige Glas-Stelle, die den Dezember-Kill überlebt hat, und sie sitzt nur auf dem runden Play, nicht auf der Fläche.

---

## Regeln, die in fast jedem Kommentar wiederkommen

So würde er es einer KI sagen, wenn man die Kommentare zu einem Auftrag zusammenzieht.

Die Seite ist ruhig, flach und vollständig. Nichts wird abgeschnitten, nichts klebt an einem Rand, nichts schwebt zu hoch, wenn das Fenster niedrig ist. Farbe ist Fläche, nicht Schleier. `#930010`, das Blau `#315f91`, das Oliv `#788044` und das Offwhite `#f2f2f0` sind die Stimmen. Schwarz und Weiß wechseln je nach Feld, damit der Text sitzt. Grau als Kasten, Milch, Unschärfe und großer Schatten sind Fehler, außer dem einen leisen Schatten unter einer Connect-Kachel und dem einen Play-Kreis.

Schrift ist klein und weit, wo sie bezeichnet, und riesig und eng, wo sie der Seitenname ist. Fast alles ist kleingeschrieben, auch „uhr“ und der Künstlername `b3nn3t`. Versalien nur für die kleinen Labels über Kacheln, für „kanal ansehen“ und für die Handlungszeile unter einem Plattformnamen. Der Name wird nicht zu „bennet“ aufgelöst. Das Alter heißt „anfang 20“, nicht eine feste Jahreszahl.

Jede Seite sieht aus wie ihre Schwester. Wer eine neue Seite baut, kopiert Abstände, Menü, Footer und Schrift von der bestehenden, und erfindet keine zweite Optik. Das Menü bleibt schwarz und in einer normalen Schrift, auch wo der Seitentext weiß oder pixelig ist.

Bewegung hat eine Richtung und lässt sich zurücknehmen. Der Spalt folgt dem Finger. Inhalt scrollt zuerst in sich, die Seite wechselt erst am Rand. Wer keine Bewegung will, bekommt sie nicht. Auf dem Handy ist Flüssigkeit wichtiger als ein neuer Effekt, und das Aussehen bleibt dasselbe.

Abstände sind einzeln gewollt. Ein genannter Abstand ist genau dieser Abstand. Ein entfernter Abstand bleibt entfernt. Bilder von Releases und vom Radio bleiben ganz im Rahmen. Der Kopf auf dem Porträt der Textseiten bleibt im Bild, auch im Querformat und auf flachen Notebooks.

Der Riss, das Fadenkreuz und das Oszilloskop-Gitter gehören zu einzelnen Stücken (Release „gespalten“, Release „drei-viertel“, TV-Intro). Sie sind nicht der Look der Website selbst.
