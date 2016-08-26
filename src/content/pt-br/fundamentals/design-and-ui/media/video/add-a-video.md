project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Conheça as maneiras mais simples de adicionar vídeos ao seu site e garantir que os usuários tenham a melhor experiência possível em qualquer dispositivo.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Adicione um vídeo {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Conheça as maneiras mais simples de adicionar vídeos ao seu site e garantir que os usuários tenham a melhor experiência possível em qualquer dispositivo.



## TL;DR {: .hide-from-toc }
- 'Use o elemento de vídeo para carregar, decodificar e reproduzir vídeos no seu site.'
- Produza vídeos em diversos formatos para disponibilizá-los em várias plataformas de dispositivos móveis.
- Dimensione os vídeos corretamente e assegure-se de que eles não transbordem os recipientes.
- A acessibilidade é importante. Adicione o elemento de faixa como um derivado do elemento de vídeo.


## Adicione o elemento de vídeo

Adicione o elemento de vídeo para carregar, decodificar e reproduzir vídeos no seu site:

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>Este navegador não oferece suporte ao elemento de vídeo.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>Seu navegador não oferece suporte ao elemento de vídeo.</p>
    </video>
    

## Especifique diversos formatos de arquivo

Nem todos os navegadores aceitam os mesmos formatos de vídeo.
O elemento `<source>` permite especificar múltiplos formatos como opções de substituição, caso o navegador do usuário não aceite um deles.
Por exemplo:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/video-main.html" region_tag="sourcetypes" %}
</pre>

Ao analisar as tags `<source>`, o navegador usa o atributo `type` opcional para decidir qual arquivo deve ser acessado por download e reproduzido. Se o navegador for compatível com WebM, ele reproduzirá chrome.webm. Caso contrário, ele verificará se é possível reproduzir vídeos em MPEG-4.
Confira <a href='//www.xiph.org/video/vid1.shtml' title='Highly entertaining and informative video guide to digital video'>este guia de formatos digitais</a> para saber mais sobre como funcionam os formatos de áudio e vídeo na Web.

Essa abordagem apresenta inúmeras vantagens em relação à veiculação de diferentes códigos HTML ou scripts de servidores, especialmente em dispositivos móveis:

* Os desenvolvedores podem listar os formatos em ordem de preferência.
* A seleção nativa feita pelo cliente reduz a latência, já que apenas uma solicitação de conteúdo é feita.
* Deixar que o navegador escolha um formato é uma opção mais simples, mais rápida e possivelmente mais confiável do que usar um banco de dados de suporte do servidor com detecção de user-agent.
* Ao especificar o tipo de origem de cada arquivo, você melhora o desempenho da rede, já que o navegador pode selecionar uma origem de arquivo sem ter que fazer o download de parte do vídeo para verificar o formato.

Todos esses argumentos são ainda mais importantes em dispositivos móveis, nos quais a largura de banda e a latência são características valiosas e a paciência do usuário é mais limitada. 
A não inclusão de um atributo de tipo pode afetar o desempenho quando existem várias origens com tipos incompatíveis.

Use as ferramentas para desenvolvedor do seu navegador móvel para comparar a atividade da rede <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">com atributos de tipo</a> e <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/notype.html">sem atributos de tipo</a>.
Além disso, verifique os cabeçalhos de resposta nas ferramentas para desenvolvedor do navegador a fim de [garantir que o servidor informe o tipo correto de MIME](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types). Caso contrário, as verificações do tipo de origem dos vídeos não funcionarão.

## Especifique um horário de início e de término

Economize largura de banda e faça com que seu site seja mais responsivo: use a API dos fragmentos de mídia para adicionar horário de início e de término ao elemento de vídeo.

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>Este navegador não oferece suporte ao elemento de vídeo.</p>
</video>

Para adicionar um fragmento de mídia, adicione `#t=[start_time][,end_time]` ao URL da mídia. Por exemplo, para reproduzir o vídeo entre os segundos 5 e 10, especifique:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

A API dos fragmentos de mídia também pode ser usada para fornecer diversas visualizações do mesmo vídeo, como pontos de marcação em um DVD, sem ter que codificar e veicular diversos arquivos.

<!-- TODO: Verify note type! -->
Note: - 'A API dos fragmentos de mídia é compatível com a maioria das plataformas, mas não com iOS.'
- 'Certifique-se de que as solicitações de faixa sejam compatíveis com seu servidor. As solicitações de faixa são habilitadas por padrão na maioria dos servidores, mas alguns serviços de hospedagem podem desativá-las.'


Com as ferramentas para desenvolvedores do seu navegador, verifique `Accept-Ranges: bytes` nos cabeçalhos de resposta:

<img class="center" alt="Captura de tela das ferramentas para desenvolvedores do Google Chrome: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

## Inclua uma imagem em formato pôster

Adicione um atributo de pôster ao elemento de vídeo para que os usuários tenham uma ideia do conteúdo assim que o elemento é carregado, sem ter que fazer o download do vídeo nem iniciar a reprodução.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

Um pôster também pode ser usado como substituto se o `src` do vídeo estiver quebrado ou se nenhum formato de vídeo for compatível. A única desvantagem das imagens em formato de pôster é a necessidade de fazer uma solicitação adicional de arquivo, o que consome mais largura de banda e requer processamento. Para saber mais detalhes, consulte [Otimização de imagem](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

Veja uma comparação de vídeos sem e com uma imagem de pôster. A imagem está em escala de cinza para provar que não é o vídeo:

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Captura de tela do Google Chrome para Android, orientação retrato: sem imagem de pôster" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Captura de tela do Google Chrome para Android, orientação retrato: com imagem de pôster" src="images/Chrome-Android-video-poster.png">
  </div>
</div>



