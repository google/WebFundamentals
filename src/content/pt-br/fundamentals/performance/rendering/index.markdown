---
title: "Rendering Performance"
description: "O usuário percebem se os sites e aplicativos não funcionam bem, portanto, otimizar o desempenho da renderização é fundamental."
updated_on: 2015-03-20
notes:
  csstriggers:
    "Para saber qual das três versões acima que está alterando qualquer propriedade CSS acionará o cabeçalho para <a href='http://csstriggers.com'>Acionadores CSS</a>. Se deseja um atalho para animações de alto desempenho, leia a seção sobre <a href='stick-to-compositor-only-properties-and-manage-layer-count'>como alterar as propriedades compositor-only</a>."
  rasterize:
    "Algumas vezes você ouve o termo 'rasterizar' usadc em conjunto com tinta. Isso ocorre porque a pintura é composta realmente por duas tarefas: 1) criar uma lista de todas as chamadas de desenho e 2) preencher os pixels.

    O último é chamado de 'rasterização' e, portanto, sempre que você vê registros de tinta no DevTools, considere como inclusão de rasterização. (Em algumas arquiteturas, a criação de uma lista de chamadas de desenho e rasterização acontece em diferentes threads, mas isso não é algo que foge ao controle do desenvolvedor.)"
udacity:
  id: ud860
  title: Otimização da Renderização do Navegador
  description: "Deseja se aprofundar em Desempenho da Renderização? Veja o curso que acompanha e saiba como o navegador converte HTML, CSS e JavaScript em pixels na tela, como usar as DevTools para medir o desempenho e como otimizar a renderização das suas páginas."
  image: images/rp-udacity.jpg
---
<p class="intro">
  O usuário da Web de hoje <a href=\"http://paul.kinlan.me/what-news-readers-want\">espera que as páginas visitadas sejam interativas e simples</a> e é esse o ponto que você precisa enfatizar cada vez mais com seu tempo e esforço. As páginas devem não apenas carregar rapidamente, mas também funcionar bem; a rolagem deve ser rápida de acordo com o dedo e as animações e interações devem ser suaves.
</p>

<img src="images/intro/response.jpg" class="center" alt="Usuário interagindo com um site.">

Para criar sites e aplicativos de alto desempenho, você precisa saber como o HTML, JavaScript e CSS são tratado pelo navegador e certifique-se de que o código que escrever (e outro código de terceiros que incluir) funcione da forma mais eficaz possível.

## 60 fps e taxas de atualização do dispositivo

A maioria dos dispositivos de hoje atualiza suas telas **60 vezes por segundo**. Se há uma animação ou transição em execução ou se o usuário está rolando as páginas, o navegador precisa corresponder a taxa de atualização do dispositivo e colocar até 1 nova imagem, ou frame, para cada atualização de tela.

Cada frame tem um orçamento de apenas um pouco mais de 16 ms (1 segundo/60 = 16,66 ms). No entanto, na realidade o navegador precisa se reorganizar, portanto, todo o seu trabalho precisa ser concluído dentro de **10 ms**. Quando você não atender esse orçamento, a taxa de frames cai e o conteúdo trepida na tela. Isso é geralmente chamado de **jank** e impacta negativamente a experiência do usuário.

## O pixel pipeline
Há cinco grandes áreas que você precisa conhecer e considerar enquanto trabalha. São as áreas que você tem um maior controle e os principais pontos no pixels-para-tela pipeline:

<img src="images/intro/frame-full.jpg" class="center" alt="O pixel pipeline completo">

* **JavaScript**. Geralmente o JavaScript é usado para lidar com o trabalho que resultará em mudanças visuais, seja na sua função `animate` do jQuery, classificando um conjunto de dados ou adicionando elementos DOM à página. Mudanças visuais não precisam acionadas pelo JavaScript, mas: Animações CSS, Transições e API de Animações da Web também são amplamente usados.
* **Cálculos de estilo**. Esse é o processo de descoberta de quais regras CSS se aplicam a quais elementos com base nos seletores de correspondência, como por exemplo, `.headline` ou `.nav > .nav__item`. A partir deste ponto, quando as regras são conhecidas, elas são aplicadas e os estilos finais de cada elemento são calculados.
* **Layout**. Quando o navegador sabe quais regras aplicar a um elemento, pode começar a calcular quanto espaço ocupa e onde está na tela. O modelo de layout da Web significa que um elemento pode afetar outros, por exemplo, a largura do elemento `<body>` geralmente afeta suas larguras secundárias e assim continuamente em toda árvore. Portanto, o processo pode solicitar muito o navegador.
* **Pintar**. Pintura é o processo de preenchimento em pixels. Envolve desenhar texto, cores, imagens, bordas e sombras. Basicamente toda parte visual dos elementos. O desenho é geralmente realizado em várias superfícies, frequentemente chamadas de camadas.
* **Composição**. Como as partes da página foram desenhadas possivelmente em várias camadas, elas precisam ser desenhadas na tela na ordem correta para que a página seja renderizada corretamente. Isso é especialmente importante para os elementos que são sobrepostos, porque um erro pode resultar em um elemento aparecendo incorretamente acima de outro.

Cada uma dessas partes do pipeline representa uma oportunidade para introduzir jank. Portanto, é importante compreender exatamente quais partes do pipeline seu código aciona.

{% include shared/remember.liquid title="Note" list=page.notes.rasterize %}

Você não precisa mexer em todas as partes do pipeline em todos os frames. Na verdade, o pipeline _geralmente_ trabalha de três formas para um determinado frame quando você realiza uma mudança visual: com o JavaScript, o CSS ou as Animações da Web:

### 1. JS / CSS > Estilo > Layout > Pintar > Compor

<img src="images/intro/frame-full.jpg" class="center" alt="O pixel pipeline completo">

Se alterar uma propriedade “layout”, para que ela altere uma geometria do elemento, como sua largura, altura ou posição à esquerda ou topo, o navegador precisará verificar todos os outros elementos e “recarregar” a página. Qualquer área afetada precisará ser repintada e os elementos pintados finais precisarão ser compostos novamente.

### 2. JS / CSS > Estilo > Pintar > Compor

<img src="images/intro/frame-no-layout.jpg" class="center" alt="O pixel pipeline sem layout.">

Se você alterou uma propriedade “paint only”, como uma imagem de fundo, cor de texto ou sombras, isto é, coisas que não afetam o layout da página, o navegador pula o layout, mas ainda fará a pintura.

### 3. JS / CSS > Estilo > Compor

<img src="images/intro/frame-no-layout-paint.jpg" class="center" alt="O pixel pipeline sem layout ou pintura.">

Se alterar uma propriedade que não exige layout ou pintura. o navegador pula apenas para fazer a composição.

Essa versão final é a mais barata e desejada para pontos de alta pressão em um ciclo de vida do aplicativo, como animações ou rolagem.

{% include shared/remember.liquid title="Note" list=page.notes.csstriggers %}

O desempenho é a arte de evitar trabalho e fazer com que qualquer trabalho realizado seja o mais eficiente possível. Em muitos casos, basta trabalhar a favor do navegador, não contra ele. É importante lembrar que o trabalho listado acima, no pipeline, é diferente em termos de custo computacional; algumas tarefas são mais caras do que outras.

Vamos detalhar as diferentes partes do pipeline. Olharemos os problemas comuns e também como diagnosticar e corrigi-los.

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title image=page.udacity.image description=page.udacity.description %}

