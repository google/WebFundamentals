project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: WebVR

{# wf_updated_on: 2016-12-12 #}
{# wf_published_on: 2016-12-12 #}

# WebVR {: .page-title }

Aviso: a WebVR ainda é experimental e, por isso, está sujeita a mudanças.

A WebVR é uma JavaScript API que se beneficia de qualquer fone de ouvido de RV e de um dispositivo compatível com RV dos usuários — como o [fone Daydream](https://vr.google.com/daydream/) e o celular Pixel — para criar experiências 3D totalmente imersivas no navegador.

<img src="img/getting-started-with-webvr.jpg" alt="Primeiros passos com a WebVR" />

## Suporte e disponibilidade

Hoje, a WebVR API está disponível no:

* Chrome Beta (M56+) com um [Teste na origem](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md).
* Firefox Nightly.
* Navegador Samsung Internet do Gear VR (observação: compatível com uma versão mais antiga da especificação da WebVR).

Para navegadores que não oferecem suporte à WebVR ou que talvez tenham versões antigas das APIs, você pode voltar para o [Polyfill da WebVR](https://github.com/googlevr/webvr-polyfill). Porém, não se esqueça de que a RV está *fortemente ligada a desempenho* e os polyfills normalmente têm custo de desempenho relativamente alto, por isso, pode ser uma boa ideia avaliar se você realmente quer usar o polyfill para um usuário que não tem suporte nativo à WebVR.

Se estiver em dúvida, evite dar às pessoas sensação de náusea com experiências de desempenho ruim!

[Fique por dentro das novidades da WebVR.](./status/)

## Criar conteúdo para a WebVR

Para criar conteúdo para a WebVR, você precisa fazer uso de algumas APIs novas e de tecnologias já estabelecidas, como a [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial) e a [Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), além de levar em consideração diversos tipos de interação e fones de ouvido.

<div class="attempt-left">
  <h3>Primeiros passos com a WebVR</h3>
  <a href="./getting-started-with-webvr/">
    <img src="img/getting-started-with-webvr.jpg" alt="Primeiros passos com a WebVR" />
  </a>
  <p>
    Comece dez passos à frente na WebVR pegando uma cena WebGL e adicionando APIs de RV.<br>
    <a href="./getting-started-with-webvr/">Saiba mais</a>
  </p>
</div>
<div class="attempt-right">
  <h3>Adicionar interação a uma cena da WebVR</h3>
  <a href="./adding-input-to-a-webvr-scene/">
    <img src="img/adding-input-to-a-webvr-scene.jpg" alt="Adicionar interação a uma cena da WebVR" />
  </a>
  <p>
    Interação é fundamental para uma experiência envolvente e imersiva.<br>
    <a href="./adding-input-to-a-webvr-scene/">Primeiros passos</a>
  </p>
</div>

<div class="clearfix"></div>

### Mais materiais

Há alguns materiais excelentes sobre a WebVR aparecendo em toda a internet.

* [Conheça as WebVR APIs](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API)
* [Veja os exemplos da WebVR](https://webvr.info/samples/)
* [Como projetar para o Google Cardboard](https://www.google.com/design/spec-vr/designing-for-google-cardboard/a-new-dimension.html)

## Controle o seu desempenho

<img src="img/oce.png" class="attempt-right" alt="Desempenho da WebVR" />

Para minimizar o desconforto das pessoas que usufruem de experiências da WebVR, é preciso manter a taxa de quadros constante (e alta). Sem isso, os usuários podem ficar enjoados com os movimentos.

Em dispositivos móveis, a taxa de atualização é normalmente de 60 Hz, o que significa que a meta é 60 fps (ou 16 ms por quadro *incluindo* a sobrecarga do navegador por quadro). Nos computadores, a meta normalmente é 90 Hz (11 ms incluindo a sobrecarga).

Para chegar a esses números, você precisará testar [regularmente nos dispositivos de destino](/web/tools/chrome-devtools/remote-debugging/) e deverá [usar a Timeline do Chrome DevTools para medir o consumo por quadro](/web/tools/chrome-devtools/evaluate-performance/timeline-tool).

## Receba o Progressive Enhancement de braços abertos

<img src="img/touch-input.png" class="attempt-right" alt="Use o Progressive Enhancement para maximizar o alcance" />

O que você faz se os usuários não tiverem um dispositivo de realidade virtual para a cabeça (HMD) ou dispositivo compatível com RV? A melhor resposta é: use o Progressive Enhancement.

1. Presuma que o usuário esteja usando dispositivo de entrada tradicional, como teclado, mouse ou tela tátil, e não tenha acesso a um fone de ouvido de RV.
2. Adapte a mudanças na interação e na disponibilidade de fones de ouvido em tempo de execução.

Graças às [WebVR APIs](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API), podemos detectar mudanças no ambiente de RV para descobrir e adaptar-nos a mudanças na interação e nas opções de visualização no dispositivo do usuário.

Presumindo um ambiente sem RV primeiro, é possível maximizar o alcance das suas experiências e garantir que você ofereça a melhor experiência possível, seja qual for o equipamento usado pelos usuários.

Para saber mais, leia nosso guia sobre [como adicionar interação a uma cena da WebVR](./adding-input-to-a-webvr-scene/).


{# wf_devsite_translation #}
