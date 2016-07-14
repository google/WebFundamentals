---
title: "Unnötige Downloads vermeiden"
description: "Die schnellste und am besten optimierte Ressource ist eine Ressource, die gar nicht übertragen wird. Haben Sie Ihre Ressourcen vor Kurzem überprüft? Holen Sie dies ggf. nach und tun Sie es regelmäßig, um dafür zu sorgen, dass jede Ressource zu einer besseren Nutzererfahrung beiträgt."
updated_on: 2014-04-29
key-takeaways:
  eliminate-downloads:
    - "Führen Sie eine Bestandsaufnahme aller eigenen und fremden Inhalte auf Ihren Seiten durch."
    - "Messen Sie die Leistung eines jeden Inhaltselements: den Wert und die technische Leistungsfähigkeit."
    - "Ermitteln Sie, ob die Ressourcen ausreichenden Nutzen bringen."
---

<p class="intro">
  Die schnellste und am besten optimierte Ressource ist eine Ressource, die gar nicht übertragen wird. Haben Sie Ihre Ressourcen vor Kurzem überprüft? Holen Sie dies ggf. nach und tun Sie es regelmäßig, um dafür zu sorgen, dass jede Ressource zu einer besseren Nutzererfahrung beiträgt.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.eliminate-downloads %}

Die schnellste und am besten optimierte Ressource ist eine Ressource, die gar nicht übertragen wird. Dies scheint offensichtlich zu sein, wird in der Praxis jedoch häufig übersehen. Als leistungsorientierter Entwickler ist es Ihre Aufgabe, jede Gelegenheit für die Entfernung unnötiger Ressourcen aus Ihrer Anwendung zu erkennen. Es hat sich bewährt, die impliziten und expliziten Annahmen im Team in Frage zu stellen und regelmäßig auf den Prüfstand zu stellen. Einige Beispiele:

* Wir haben schon immer Ressource X in unsere Seiten aufgenommen, aber entsprechen die Kosten für das Herunterladen und die Anzeige dem Wert für den Nutzer? Wie können wir ihren Wert messen und nachweisen?
* Liefert die Ressource - insbesondere wenn sie von einem Drittanbieter kommt - eine beständige Leistung? Befindet sich die Ressource im kritischen Pfad? Wenn ja, ist das erforderlich? Wenn sich die Ressource im kritischen Pfad befindet: Könnte sie für unsere Website einen Single Point of Failure darstellen, d. h., würde sich ihre Nichtverfügbarkeit auf die Leistung und Nutzererfahrung unserer Seiten auswirken?
* Wird für diese Ressource ein SLA benötigt? Unterliegt diese Ressource bewährten leistungsorientierten Verfahren wie Komprimierung, Cachespeicherung und so weiter?

Allzu häufig enthalten Webseiten unnötige Ressourcen oder, noch schlimmer, beeinträchtigen die Leistung der Seiten, ohne für den Besucher oder den Website-Betreiber von großem Nutzen zu sein. Das gilt gleichermaßen für Ressourcen und Widgets von Erst- und Drittanbietern:

* Die Betreiber von Website A haben entschieden, auf der Homepage ein Fotokarussell anzuzeigen, damit die Besucher mehrere Fotos mit einem schnellen Klick in einer Vorschau betrachten können, d. h., alle Fotos werden beim Laden der Seite mitgeladen und der Nutzer kann durch die Fotos navigieren.
    * **Frage:** Wurde ermittelt, wie viele Nutzer mehrere Fotos im Karussell ansehen? Möglicherweise fallen hohe Unkosten für das Herunterladen unnötiger Ressourcen an, die von den meisten Besuchern niemals genutzt werden.
* Die Betreiber von Website B haben sich für die Installation eines Drittanbieter-Widgets entschieden, mit dem verwandte Inhalte angezeigt, die Interaktion verbessert und weitere Dienstleistungen bereitgestellt werden sollen.
    * **Frage:** Haben Sie verfolgt, wie viele Besucher das Widget nutzen oder die Inhalte abrufen, die vom Widget angeboten werden? Rechtfertigt die durch dieses Widget erzeugte Interaktion dessen Unkosten?

Wie Sie sehen, erscheint die Eliminierung unnötiger Downloads als triviale Selbstverständlichkeit, ist dies in der Praxis jedoch keinesfalls, weil sie sorgfältige Abwägung und Analyse erfordert. Im Sinne optimaler Resultate sollten Sie eine regelmäßige Bestandsaufnahme durchführen und diese Fragen immer wieder neu für jede einzelne Ressource auf Ihren Seiten stellen.



