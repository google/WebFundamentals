project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: You should always protect all of your websites with HTTPS, even if they don’t handle sensitive communications. HTTPS provides critical security and data integrity both for your websites and for the people that entrust your websites with their personal information.

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2015-11-23 #}

# Por que HTTPS é importante {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="9WuP4KcDBpI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Você deve sempre proteger todos os seus sites com HTTPS, mesmo que eles não
trabalhem com comunicações sensíveis. Além de oferecer segurança crítica e integridade dos dados
do seus sites e das informações pessoais de seus usuários, o HTTPS
Um requisito para muitos recursos dos navegador mais recentes, particularmente aqueles necessários 
em [aplicativos web progressivos](/web/progressive-web-apps/).

### TL;DR {: .hide-from-toc }

* Tanto intrusos malignos quanto benignos exploram todos os recursos desprotegidos entre seus sites e os usuários.
* Muitos intrusos analisam uma série de comportamentos para identificar seus usuários.
* O HTTPS não bloqueia apenas o mau uso do seu site. Ele Também é um requisito para muitos recursos de ponta e uma tecnologia habilitadora para recursos semelhantes a aplicativos, como os manipuladores de serviços.

## O HTTPS protege a integridade do teu website


O HTTPS ajuda a impedir que intrusos alterem a comunicação
Entre seus sites e os navegadores de seus usuários. O Intruso inclue
Intencionalmente atacantes maliciosos, e as empresas legítimas, mas intrusivas,
Como ISPs ou hotéis que injetam anúncios em páginas.

Os intrusos exploram as comunicações desprotegidas para enganar os seus usuários e leva-los 
a fornecer Informações confidenciais ou a instalação de malware, ou para inserir
Anúncios em seus recursos. Por exemplo, alguns Anúncios em sites que potencialmente
quebrem as experiências e Criam vulnerabilidades de segurança.

Os intrusos exploram todos os recursos desprotegidos que trafegam entre o
Site e seus usuários. Imagens, cookies, scripts, HTML ... eles são todos
exploráveis. As intrusões podem ocorrer em qualquer ponto da rede, incluindo
Uma máquina do usuário, um ponto de acesso Wi-Fi ou um ISP comprometido, apenas para citar alguns.

## O HTTPS protege a privacidade e segurança dos teus usuários 

O HTTPS evita que intrusos sejam capazes de ouvir passivamente a comunicação entre os teus sites e os teus usuários.


Um equívoco comum sobre HTTPS é que os únicos sites
Que precisam de HTTPS são aqueles que manipulam comunicações sensíveis. Cada
Solicitação HTTP desprotegida pode potencialmente revelar informações sobre o
Comportamentos e identidades de seus usuários. Embora uma única visita a um dos
Seus sites desprotegidos podem parecer benignos, alguns intrusos
olham para as atividades de navegação de seus usuários para fazer inferências sobre seus
Comportamentos e intenções [anonimizar](https://en.wikipedia.org/wiki/De-anonymization){: .external}
as suas entidades. Por exemplo,
Funcionários podem inadvertidamente revelar condições de saúde
Apenas lendo artigos médicos desprotegidos.

## HTTPS é o futuro da web 

Novos Recursos da plataforma web poderosos, como tirar fotos ou gravar áudio
Com `getUserMedia ()`, permitindo experiências de aplicativos off-line com os gerenciadores de serviço,
Ou a criação de aplicativos web progressivos, requerem permissão explícita do usuário
Antes de executar. Muitas APIs mais antigas também estão sendo atualizadas para exigir permissão de execução, assim como a API de [geolocalização](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation){: .external}
HTTPS é um componente chave para o fluxo de permissão tanto para esses novos recursos quanto as APIs atualizadas.
