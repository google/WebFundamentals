project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Você sempre deve proteger todos os seus sites com HTTPS, mesmo que eles não lidem com comunicações sigilosas. O HTTPS oferece segurança e integridade de dados fundamentais para sites e para as pessoas que confiam suas informações pessoais a eles.

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2015-11-23 #}

# Por que usar o HTTPS? {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iP75a1Y9saY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Você sempre deve proteger todos os sites com HTTPS, mesmo que eles
não lidem com comunicações sigilosas. Além de fornecer segurança e integridade
de dados fundamentais para o seu site e as informações pessoais dos seus usuários, o HTTPS é
uma exigência de muitos recursos dos novos navegadores, especialmente dos necessários para os
[aplicativos web progressivos](/web/progressive-web-apps/).

### TL;DR {: .hide-from-toc }

* Os intrusos, tanto malignos quanto benignos, exploram todos os recursos não protegidos que existirem entre o seu site e os usuários.
* Muitos intrusos ficam de olho na combinação de comportamento dos usuários para identificá-los. 
* O HTTPS não apenas bloqueia o uso mal intencionado do seu site. Ele é uma exigência de muitos dos recursos mais modernos, além de ser uma tecnologia que dá novas possibilidades para recursos inspirados nos aplicativos, como os service workers. 

## O HTTPS protege a integridade do seu website 

O HTTPS ajuda a evitar que intrusos adulterem as comunicações 
entre os websites e os navegadores dos usuários. Os intrusos incluem 
invasores intencionalmente maliciosos e empresas legítimas, mas intrusivas, 
como ISPs ou hotéis que incluem anúncios nas páginas.

Os intrusos exploram comunicações desprotegidas para convencer usuários a fornecer 
informações confidenciais, instalar malware ou inserir sua própria 
publicidade nos recursos do usuário. Por exemplo, alguns terceiros injetam 
em sites publicidade que possivelmente prejudica a experiência do usuário e 
cria vulnerabilidades de segurança.

Os intrusos exploram todos os recursos desprotegidos em trânsito entre o 
website e seus usuários. Imagens, cookies, scripts, HTML... tudo isso pode 
ser explorado. As invasões podem ocorrer em qualquer ponto da rede, inclusive na 
máquina do usuário, em um ponto de acesso de Wi-Fi ou em um ISP comprometido, entre outros. 

## O HTTPS protege a privacidade e a segurança de seus usuários

O HTTPS impede que os intrusos possam interceptar passivamente a
comunicação entre sites e usuários.

Um equívoco muito comum sobre o HTTPS é acreditar que os únicos sites 
que precisam de HTTPS são os que processam comunicações sigilosas. Toda 
solicitação HTTP desprotegida tem o potencial de revelar informações sobre 
comportamentos e identidades de usuários. Embora um único acesso a um 
site desprotegido possa parecer inofensivo, alguns intrusos examinam as 
atividades de navegação combinadas dos usuários para deduzir 
comportamentos e intenções e 
[quebrar o anonimato](https://en.wikipedia.org/wiki/De-anonymization){: .external}
de suas identidades. Por exemplo, 
funcionários podem revelar acidentalmente condições de saúde confidenciais a seus 
empregadores simplesmente lendo artigos médicos desprotegidos.

## O HTTPS é o futuro da Web

Ações inovadoras e avançadas da web, como tirar fotos ou gravar
áudio com `getUserMedia()`, permitir experiências off-line como a dos aplicativos com os service
workers ou criar aplicativos progressivos, exigem permissão explícita do usuário
antes de serem executadas. Muitas APIs antigas também estão sendo atualizadas para
exigir permissão para serem executadas, como a
[geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation){: .external}
API. O HTTPS é um componente essencial dos fluxos de trabalho de permissão, tanto para
esses novos recursos quanto para as APIs atualizadas.








{# wf_devsite_translation #}
