project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Het kritieke weergavepad optimaliseren door de weergave prioriteit te geven voor die inhoud die verband houdt met de primaire actie die een gebruiker op de pagina wil uitvoeren.

{# wf_review_required #}
{# wf_updated_on: 2014-04-27 #}
{# wf_published_on: 2014-03-31 #}

# Het kritieke weergavepad {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Het optimaliseren van het kritieke weergavepad is cruciaal voor het verbeteren van de prestaties van onze pagina's: ons doel is om die inhoud prioriteit te geven en weer te geven die verband houd met de primaire actie die een gebruiker op een pagina wil uitvoeren.

Een internetbrowser moet veel werk leveren om een snelle webervaring te bieden. Veel van dit werk gebeurt zonder dat we het zien: de webontwikkelaars schrijven de opmaak en op het scherm wordt een mooie webpagina weergegeven. Maar hoe wordt HTML, CSS en JavScript door de browsers verwerkt om pixels op een scherm weer te geven?

Het belangrijkste voor het optimaliseren van prestaties is dat u begrijpt wat er tussen het ontvangen van de HTML-, CSS- en JavaScript-bytes en de vereiste verwerking gebeurt waardoor deze opdrachten als pixels worden weergegeven. Dit noemen we het **kritieke weergavepad**.

<img src="images/progressive-rendering.png" class="center" alt="progressieve paginaweergave">

Door het kritieke weergavepad te optimaliseren kunnen we de tijd om onze pagina`s voor het eerst weer te geven aanzienlijk verbeteren. Daarnaast helpt een goede kennis van het kritieke weergavepad ook als een basis voor het maken van goed presterende, interactieve apps. En het blijkt dat het proces voor het verwerken van interactieve updates hetzelfde is, alleen wordt dit in een continue cirkel en het liefst met 60 frames per seconde gedaan. Maar laten we nog niet op de zaken vooruit lopen. Eerst zullen we een opbouwend overzicht bekijken van hoe een browser een eenvoudige pagina weergeeft.


## Website Performance Optimization
<!-- TODO: Verify Udacity course fits here -->
<div class="attempt-right">
  <figure>
    <img src="images/crp-udacity.png">
  </figure>
</div>

Interested in taking a deep dive into the Critical Rendering Path? Check out or companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the Critical Rendering Path of your pages.

[View Course](https://udacity.com/ud884){: .external }




