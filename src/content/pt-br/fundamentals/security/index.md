project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Segurança é um assunto importante: ter conhecimento sobre HTTPS, por que é importante e como é possível implementá-lo nos servidores.

{# wf_updated_on: 2016-09-09 #}
{# wf_published_on: 2015-09-08 #}

# Segurança e identidade {: .page-title }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="pgBQn_z3zRE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Segurança é um assunto importante. Por isso, veja algumas coisas para começar. 

<div class="clearfix"></div>


## Criptografia de dados em trânsito

<img src="/web/images/content-https-2x.jpg" class="attempt-right">

Um dos recursos de segurança mais importantes, exigido por muitas APIs modernas e [aplicativos web progressivos](/web/progressive-web-apps/) é o [HTTP seguro, também chamado de HTTPS](encrypt-in-transit/why-https). Um equívoco frequente sobre o HTTPS é a crença de que os sites que precisam dele são somente os que lidam com comunicação sigilosa. Se privacidade e segurança não fossem motivos suficientes para proteger os usuários, muitos novos recursos dos navegadores, como os service workers e a Payment Request API, exigem HTTPS.

[Como usar o HTTPS nos servidores](/web/fundamentals/security/encrypt-in-transit/enable-https)

<div class="attempt-left">
  <h2>Política de segurança de conteúdo</h2>
  <p>
    A Política de segurança de conteúdo, ou CSP, fornecem um amplo conjunto de diretivas que
   permitem controle granular sobre os recursos que uma página tem permissão para carregar
    e sobre o local de onde são carregados.<br>
    <a href="csp/">Saiba mais</a>
  </p>
</div>
<div class="attempt-right">
  <h2>Evitar conteúdo misto</h2>
  <p>
    Uma das tarefas mais demoradas na implementação do HTTPS é encontrar e
    tratar de conteúdo que misture HTTPs e HTTP. Felizmente, há ferramentas
    que ajudam nisso.<br>
    <a href="prevent-mixed-content/what-is-mixed-content">Primeiros passos</a>
  </p>
</div>

<div style="clear:both"></div>

## Materiais relacionados

### Chrome DevTools

* [Entendendo problemas de segurança](/web/tools/chrome-devtools/security)





{# wf_devsite_translation #}
