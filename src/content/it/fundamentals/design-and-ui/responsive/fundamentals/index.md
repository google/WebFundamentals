project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Gran parte del Web non è ottimizzata per l'utilizzo di dispositivi multipli. Apprendi i concetti fondamentali e ottimizza il sito per dispositivi mobili, PC desktop o su qualsiasi altro dispositivo dotato di schermo.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Nozioni di base sul Responsive Web Design {: .page-title }

{% include "_shared/contributors/TODO.html" %}


L'impiego di dispositivi mobili per la navigazione sul Web è in forte aumento, ma gran parte del Web non è ancora ottimizzata in tal senso. Spesso i dispositivi mobili soffrono di limitazioni in termini di formato dello schermo e richiedono un nuovo approccio per la disposizione dei contenuti.


{% comment %}
<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="oK09n_PGhTo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>
{% endcomment %}


## Responsive Web Design Fundamentals
<!-- TODO: Verify Udacity course fits here -->
<div class="attempt-right">
  <figure>
    <img src="imgs/udacity-rwd.png">
  </figure>
</div>

Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more.

[View Course](https://udacity.com/ud893){: .external }



I formati dello schermo utilizzati da telefoni, 'phablet', tablet, desktop, console per videogiochi, TV e dispositivi indossabili sono molteplici. I formati dello schermo sono in continua evoluzione ed è quindi importante creare un sito capace di adattarsi a qualsiasi formato futuro.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Il Responsive Web Design, creato da [Ethan Marcotte in A List Apart](http://alistapart.com/article/responsive-web-design/) risponde alle esigenze di utenti e dispositivi impiegati. La disposizione dei contenuti varia in base alle dimensioni e alle caratteristiche del dispositivo. Ad esempio, un telefono visualizza i contenuti su una sola colonna mentre un tablet ne adopera due.



