project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Nem todos os formatos de vídeo são compatíveis com todas as plataformas. Verifique quais formatos são aceitos pelas principais plataformas e faça com que seu vídeo seja exibido corretamente em cada um deles.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Forneça alternativas para plataformas legadas {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Nem todos os formatos de vídeo são compatíveis com todas as plataformas. Verifique quais formatos são aceitos pelas principais plataformas e faça com que seu vídeo seja exibido corretamente em cada um deles.



## Verifique quais formatos são compatíveis

Use `canPlayType()` para descobrir quais formatos de vídeo são compatíveis. O método usa um argumento de string que consiste em um `mime-type` e codecs opcionais e retorna um dos seguintes valores:

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Valor retornado</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Valor retornado">(string vazia)</td>
      <td data-th="Descrição">O recipiente e/ou o codec não são compatíveis.</td>
    </tr>
    <tr>
      <td data-th="Valor retornado"><code>maybe</code></td>
      <td data-th="Descrição">
        O recipiente e os codecs podem ser compatíveis, mas o navegador
        precisará fazer o download de partes dos vídeos para verificar.
      </td>
    </tr>
    <tr>
      <td data-th="Valor retornado"><code>probably</code></td>
      <td data-th="Descrição">O formato parece ser compatível.
      </td>
    </tr>
  </tbody>
</table>

Veja alguns exemplos de argumentos `canPlayType()` e valores retornados quando executados no Google Chrome:


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Tipo</th>
      <th>Resposta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Tipo"><code>video/xyz</code></td>
      <td data-th="Resposta">(string vazia)</td>
    </tr>
    <tr>
      <td data-th="Tipo"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Resposta">(string vazia)</td>
    </tr>
    <tr>
      <td data-th="Tipo"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Resposta">(string vazia)</td>
    </tr>
    <tr>
      <td data-th="Tipo"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Resposta"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Tipo"><code>video/webm</code></td>
      <td data-th="Resposta"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Tipo"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Resposta"><code>probably</code></td>
    </tr>
  </tbody>
</table>


## Produza vídeos em vários formatos

Inúmeras ferramentas podem ser usadas para salvar o mesmo vídeo em diferentes formatos:

* Ferramentas para computador: [FFmpeg](//ffmpeg.org/)
* Aplicativos para interface do usuário: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Serviços on-line de codificação/transcodificação: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## Verifique qual formato foi usado

Quer saber qual formato de vídeo foi escolhido pelo navegador?

Em JavaScript, use a propriedade `currentSrc` para retornar a origem usada.

Para ver isto em ação, confira <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">esta demonstração</a>: Google Chrome e Firefox escolhem o `chrome.webm` (porque esta é a primeira opção na lista de possíveis origens que os navegadores aceitam), enquanto o Safari escolhe `chrome.mp4`.



