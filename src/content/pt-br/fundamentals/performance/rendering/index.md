project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Os usuários percebem se os sites e aplicativos não funcionam bem. Por isso, é essencial otimizar o desempenho da renderização.

{# wf_updated_on: 2015-03-20 #}
{# wf_published_on: 2015-03-20 #}

# Desempenho da renderização {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

O usuário da web de hoje em dia
[espera que as páginas que acessam sejam interativas e simples](https://paul.kinlan.me/what-news-readers-want/),
e esse é o ponto que você precisa concentrar cada vez mais seu tempo e esforço. Além
de carregar rapidamente, as páginas também devem funcionar bem. A rolagem deve
acompanhar o dedo imediatamente e as animações e interações devem ser muito fluidas.

Para criar sites e aplicativos de alto desempenho, você precisa saber como o HTML, JavaScript e CSS são tratado pelo navegador e certifique-se de que o código que escrever (e outro código de terceiros que incluir) funcione da forma mais eficaz possível.

## 60 fps e as taxas de atualização dos dispositivos

<div class="attempt-right">
  <figure>
    <img src="images/intro/response.jpg" alt="Usuário interagindo com um website.">
  </figure>
</div>

Atualmente, a maioria dos dispositivos atualiza as telas **60 vezes por segundo**. Se há
uma animação ou transição em execução ou se o usuário está rolando as páginas, o
navegador precisa acompanhar a taxa de atualização do dispositivo e enviar uma nova imagem,
ou quadro, para cada atualização da tela.


Cada um desses quadros tem uma cota de apenas 16 ms (1 segundo/60 = 16,66 ms).
Mas, na verdade, o navegador tem que arrumar tudo, então todo o seu
trabalho deve ser concluído em **10 ms**. Se você estourar essa
cota, a taxa de quadros cairá e o conteúdo travará na tela. Isso é muitas
vezes chamado de **instabilidade** (jank) e impacta negativamente a experiência do usuário.

## O funil de pixels

Há cinco áreas principais que você precisa conhecer e considerar enquanto
trabalha. Essas áreas são aquelas sobre as quais você tem maior controle e consistem nos pontos principais do funil
de fornecimento de pixels à tela:

<img src="images/intro/frame-full.jpg"  alt="O pipeline de pixels completo">

* **JavaScript**. Geralmente, o JavaScript é usado para tratar o trabalho que resultará em mudanças visuais, seja na função `animate` do jQuery, classificando um conjunto de dados ou adicionando elementos DOM à página. No entanto, não é necessariamente o JavaScript que aciona uma mudança visual: animações CSS, transições e Web Animations API também são bastante usados.
* **Cálculos de estilo**. Esse é o processo de descoberta de que regras CSS se aplicam a que elementos com base nos seletores de correspondência, como por exemplo, `.headline` ou `.nav > .nav__item`. A partir deste ponto, quando as regras são conhecidas, elas são aplicadas e os estilos finais de cada elemento são calculados.
* **Layout**. Quando o navegador sabe quais regras aplicar a um elemento, pode começar a calcular quanto espaço ocupa e onde está na tela. O modelo de layout da web indica que um elemento pode afetar outros. Por exemplo, a largura do elemento `<body>` normalmente afeta o comprimento de seus secundários, e assim por diante em toda a extensão da árvore, por isso, o processo pode exigir muito do navegador.
* **Coloração**. A coloração é o processo de preencher os pixels. Esse processo envolve desenhar texto, cores, imagens, bordas e sombras. Basicamente, toda a parte visual dos elementos. O desenho é geralmente realizado em várias superfícies, frequentemente chamadas de camadas.
* **Composição**. Como as partes da página foram possivelmente desenhadas em várias camadas, elas precisam ser desenhadas na tela na ordem correta para que a página seja renderizada corretamente. Isso é especialmente importante para elementos sobrepostos, pois um erro pode resultar em um elemento aparecendo incorretamente acima de outro.

Cada uma dessas partes do pipeline é uma oportunidade de introduzir instabilidade. Portanto, é importante compreender exatamente quais as partes do pipeline acionadas pelo seu código.

Às vezes, você pode ouvir o termo "rasterizar" junto com gravação.
Isso porque a gravação são, na verdade, duas tarefas: 1) criar uma lista de chamadas
de desenho e 2) preencher com pixels.

A segunda é chamada de "rasterização" e sempre que você vir registros de gravação no
DevTools, pense neles considerando a rasterização (em algumas
arquiteturas, a criação da lista de chamadas de desenho e a rasterização são feitas
encadeamentos diferentes, mas isso não está sob o controle do desenvolvedor).

Você nem sempre precisará mexer em todas as partes do funil de cada quadro.
Na verdade, o funil _geralmente_ trabalha de três formas para um determinado quadro
quando se realiza uma mudança visual: com o JavaScript, o CSS ou o Web
Animations:

### 1. JS / CSS > Style > Layout > Paint > Composite

<img src="images/intro/frame-full.jpg"  alt="O pipeline de pixels completo">

Se você alterar uma propriedade "layout" de forma que ela altere a geometria de um
elemento, como sua largura, altura ou posição à esquerda ou no topo, o navegador precisará verificar
todos os outros elementos e executar um reestruturar o fluxo da página. Todas as áreas
afetadas precisarão ser coloridas novamente e os elementos coloridos finais precisarão
ser compostos novamente.

### 2. JS / CSS > Style > Paint > Composite

<img src="images/intro/frame-no-layout.jpg" alt="O pipeline de pixels sem layout.">

Se você alterou uma propriedade "paint only", como uma imagem de fundo, a cor de um texto ou
sombras, ou seja, propriedades que não afetam o layout da página, o navegador pulará
o layout, mas ainda fará a gravação.

### 3. JS / CSS > Style > Composite

<img src="images/intro/frame-no-layout-paint.jpg" alt="O pipeline de pixels sem layout ou pintura.">

Se você alterar uma propriedade que não exige layout nem gravação, o navegador
executará apenas a composição.

Essa versão final é a mais barata e a melhor para pontos críticos do ciclo
de vida de um aplicativo, como animações ou rolagem.

Observação: Para saber qual das três versões acima será acionada quando se alterar qualquer propriedade CSS, acesse [CSS Triggers](https://csstriggers.com). E se você quiser um atalho para obter animações de alto desempenho, leia a seção sobre [como alterar as propriedades compositor-only](stick-to-compositor-only-properties-and-manage-layer-count).

O desempenho é a arte de evitar trabalho e fazer com que todo trabalho realizado seja o mais
eficiente possível. Em muitos casos, basta trabalhar a favor do navegador, e não
contra ele. É importante lembrar que o trabalho listado acima no funil
é diferente em termos de custo computacional: algumas tarefas exigem mais do
que outras.

Vamos detalhar as diferentes partes do pipeline. Vamos dar uma olhada
nos problemas comuns e também em como diagnosticá-los e corrigi-los.

{% include "web/_shared/udacity/ud860.html" %}


{# wf_devsite_translation #}
