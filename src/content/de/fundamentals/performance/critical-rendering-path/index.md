project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Den kritischen Rendering-Pfad über die Priorisierung der Anzeige von Inhalten optimieren, die sich auf die primäre Aktion beziehen, die der Nutzer auf einer Seite durchführen möchte

{# wf_updated_on: 2014-04-27 #}
{# wf_published_on: 2014-03-31 #}

# Kritischer Rendering-Pfad {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Die Optimierung des kritischen Rendering-Pfads ist für die Verbesserung der Leistung unserer Seiten entscheidend: Unser Ziel ist es, die Inhalte zu priorisieren und darzustellen, die sich auf die primäre Aktion beziehen, die der Nutzer auf einer Seite durchführen möchte.

Für die Bereitstellung einer schnellen Weberfahrung muss der Browser eine Menge leisten. Diese Arbeit bleibt uns als Webentwicklern weitgehend verborgen: Wir schreiben das Markup und eine hübsche Seite erscheint auf dem Bildschirm. Aber wie genau verarbeitet der Browser unsere HTML-, CSS- und JavaScript-Elemente zu gerenderten Pixeln auf dem Bildschirm?

Die Leistungsoptimierung setzt das Verstehen der Vorgänge zwischen dem Empfang der HTML-, CSS- und JavaScript-Bytes und deren Verarbeitung in gerenderte Pixel voraus - das ist der **kritische Rendering-Pfad**.

<img src="images/progressive-rendering.png" class="center" alt="Progressives Seitenrendering">

Über die Optimierung des kritischen Rendering-Pfads können wir die benötigte Zeit für das erste Rendering unserer Seiten erheblich verkürzen. Darüber hinaus ist das Verständnis des Rendering-Pfads auch eine Voraussetzung für die Erstellung leistungsfähiger interaktiver Anwendungen. Der Prozess für die Verarbeitung interaktiver Updates ist tatsächlich identisch, er wird nur in einer Dauerschleife und idealerweise mit 60 Frames pro Sekunde durchgeführt! Aber wir wollen hier nicht vorgreifen. Zunächst wollen wir uns einen grundsätzlichen Überblick darüber verschaffen, wie im Browser eine einfache Seite dargestellt wird.


{% include "web/_shared/udacity/ud884.html" %}




