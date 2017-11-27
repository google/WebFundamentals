project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Google e AnswerLab realizaram um estudo examinando como os usuários interagem com um conjunto diverso de sites móveis. O objetivo era responder à seguinte pergunta: 'o que torna um site móvel bom?'

{# wf_published_on: 2014-08-08 #}
{# wf_updated_on: 2017-07-12 #}

# O Que Torna um Site Móvel Bom? {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

A Google e a AnswerLab conduziram um [estudo de pesquisa](https://www.google.com/think/multiscreen/whitepaper-sitedesign.html?utm_source=web-fundamentals&utm_term=chrome&utm_content=ux-landing&utm_campaign=web-fundamentals) para responder a essa pergunta. 

>Usuários de dispositivos móveis têm objetivos muito definidos. Eles esperam poder obter o que
>precisam imediatamente e à sua maneira.  

O estudo foi conduzido em sessões de usabilidade presenciais de 119 horas com
 participantes dos EUA. Os participantes foram solicitados a realizar tarefas essenciais
em um conjunto diverso de sites móveis. Usuários Android e iOS foram
incluídos e eles testaram os sites em seus próprios celulares. Para cada site, os participantes foram
solicitados a dar suas opiniões em voz alta quando concluíssem tarefas com foco
em conversão, como uma compra ou o agendamento de uma reserva.

O estudo descobriu 25 princípios de design de sites móveis, agrupados em cinco
categorias.

## Navegação na página inicial e no site

Success: Direcione o foco da sua página inicial para dispositivos móveis a conectar os usuários com o conteúdo que buscam.

### Mantenha as chamadas para ação em destaque

Disponibilize tarefas secundárias por meio de [menus](/web/fundamentals/design-and-ux/responsive/)
 ou "abaixo da dobra" (a parte da página que não pode ser vista sem rolar para baixo).

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-cta-good.png">
    <figcaption class="success">
      <b>CERTO</b>: Facilitar o acesso às tarefas mais comuns dos usuários.
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-cta-bad.png">
    <figcaption class="warning">
      <b>ERRADO</b>: Desperdiçar espaço preciso acima da dobra com chamadas para ação vagas, como "saiba mais".
</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Reduza os menus

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-menus-good.png">
    <figcaption class="success">
      <b>CERTO</b>: Reduzir os menus.
     </figcaption>
  </figure>
</div>

Usuários de dispositivos móveis não têm paciência para navegar por uma
longa lista de opções até encontrarem o que desejam. Reorganize seu menu para usar a menor quantidade possível de itens
sem sacrificar a usabilidade.

<div style="clear:both;"></div>

### Facilite o retorno à página inicial

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-hp-good.png">
    <figcaption class="success">
      <b>CERTO</b>: Facilitar o retorno à página inicial.
     </figcaption>
  </figure>
</div>

Os usuários esperam voltar à página inicial quando tocarem no logotipo no canto superior esquerdo
de uma página para dispositivos móveis e, quando esse recurso não está disponível ou operacional, eles se frustram.

<div style="clear:both;"></div>

### Não deixe que promoções roubem a cena

Grandes intersticiais de instalação de aplicativo (como promoções de página
inteira que ocultam o conteúdo e incentivam o usuário a instalar um aplicativo)
 irritam os usuários e dificultam a realização de tarefas. Além disso, sites que usam intersticiais de instalação de aplicativos são 
reprovados no
[Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly),
o que pode afetar negativamente seus rankings de pesquisa.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-promo-good.png">
    <figcaption class="success">
      <b>CERTO</b>: As promoções devem ser fáceis de divulgar e não distrair o usuário da experiência.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-promo-bad.png">
    <figcaption class="warning">
      <b>ERRADO</b>: Intersticiais frequentemente irritam os usuários e prejudicam a usabilidade do site.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

## Pesquisa no site

Success: Ajude os usuários de dispositivos móveis a encontrar o que procuram rapidamente.

### Deixe o recurso de pesquisa no site visível

Usuários que procuram informações geralmente utilizam a pesquisa, portanto, o campo de pesquisa
deve ser uma das primeiras coisas que eles avistam em suas páginas. Não esconda a caixa de
pesquisa em um menu.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-search-good.jpg">
    <figcaption class="success">
      <b>CERTO</b>: Deixar o recurso de pesquisa visível
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-search-bad.jpg">
    <figcaption class="warning">
      <b>ERRADO</b>: Ocultar o recurso de pesquisa em menus flutuantes
</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Garanta que os resultados de pesquisas no seu site sejam relevantes

Os usuários não verificam várias páginas de resultados para encontrar
o que procuram. Facilite o trabalho dos usuários preenchendo consultas automaticamente, corrigindo
erros de digitação e sugerindo consultas relacionadas. Em vez de reinventar a
roda, considere produtos robustos como a [Pesquisa personalizada do Google](https://cse.google.com/cse/){: .external }.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-relevant-good.png">
    <figcaption class="success">
      <b>CERTO</b>: A Macy's retorna apenas itens infantis.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-relevant-bad.png">
    <figcaption class="warning">
      <b>ERRADO</b>: Retornar resultados para qualquer coisa que tenha a palavra infantil.
</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


### Implemente filtros para refinar os resultados

Os participantes do estudo utilizam [filtros](/custom-search/docs/structured_search)
 para encontrar o que buscam e abandonam sites que não têm
filtros eficazes. Coloque filtros acima dos resultados de pesquisa e ajude os usuários exibindo
quando resultados serão retornados quando um determinado filtro for aplicado.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-filters-good.jpg">
    <figcaption class="success">
      <b>CERTO</b>: Facilite o uso de filtros.
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-filters-bad.jpg">
    <figcaption class="warning">
      <b>ERRADO</b>: Ocultar o recurso de filtragem.
</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Oriente os usuários a obterem resultados de pesquisa melhores

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-guide-good.png" alt="A Zappos orienta os usuários perguntando o que eles estão procurando.">
    <figcaption class="success">
      <b>CERTO</b>: Ajudar os usuários a encontrar o que procuram direcionando-os para o caminho certo.
</figcaption>
  </figure>
</div>

Para sites com segmentos de clientes diversificados, faça algumas perguntas antes
de apresentar a caixa de pesquisa e use as respostas do cliente como filtros
de consulta de pesquisa para garantir que os resultados apresentados sejam do segmento mais relevantes.

<div style="clear:both;"></div>

## Comércio e conversão

Success: Entenda as jornadas dos seus clientes e deixe que os usuários realizem conversões como quiserem.  

### Deixe que os usuários explorem antes de se comprometer

Participantes de um estudo ficaram frustrados com sites que exigiam registros
imediatos para que o conteúdo fosse visualizado, principalmente quando não conheciam a marca. Apesar de as informações
do cliente serem essenciais para sua empresa, solicitá-las cedo demais
pode reduzir o número de registros.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/cc-gates-good.png">
    <figcaption class="success">
      <b>CERTO</b>: Permitir que os usuários naveguem pelo site sem exigir que façam login.
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-gates-bad.png">
    <figcaption class="warning">
      <b>ERRADO</b>: Exigir o login ou registro cedo demais em um site.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


### Deixe que os usuários façam compras como convidados

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-purchase-guest-good.png">
    <figcaption class="success">
      <b>CERTO</b>: Permitir que os usuários façam compras com uma conta de convidado.
</figcaption>
  </figure>
</div>

Participantes de um estudo consideraram compras realizadas como convidados
algo "conveniente", "simples", "fácil" e "rápido". Os usuários se irritam com sites que os forçam a criar uma
conta ao fazer uma compra, principalmente quando o benefício de ter um conta
não é claro.

<div style="clear:both;"></div>

### Use as informações existentes para maximizar a conveniência

Lembre e
[pré-preencha as preferências](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly)
 de usuários registrados. Ofereça serviços de compra de terceiros conhecidos para novos usuários.

### Use botões click-to-call para tarefas complexas

Em dispositivos com recursos de chamada,
[links click-to-call](/web/fundamentals/native-hardware/click-to-call/) permitem
que os usuários façam uma chamada telefônica ao tocar em um link. Na maioria dos dispositivos móveis, o
usuário recebe uma confirmação antes de o número ser discado ou um menu
surge perguntando ao usuário como o número deve ser utilizado.

### Facilite a conclusão em outro dispositivo

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-other-device-good.png">
    <figcaption class="success">
      <b>CERTO</b>: Fornecer maneiras fáceis para que os usuários continuem navegando ou comprando em outro dispositivo.
</figcaption>
  </figure>
</div>

Os usuários sempre querem concluir tarefas em outros dispositivos. Por exemplo, eles
podem querer ver um item em uma tela maior. Ou podem ficar ocupados e concluir
a tarefa depois. Ofereça suporte a essas jornadas dos clientes permitindo que os usuários
[compartilhem links em redes sociais](/web/fundamentals/discovery-and-monetization/social-discovery/),
ou enviem e-mails a si mesmos diretamente pelo site.

<div style="clear:both;"></div>

## Entrada de formulário

Success: Forneça uma experiência de conversão tranquila e sem qualquer problema com formulários utilizáveis.


### Otimize a entrada de informações

Avance automaticamente para o próximo campo quando um usuário pressionar Enter. Em geral,
quando menos toques o usuário precisar realizar, melhor.

### Escolha a interação mais simples

Use o [tipo de interação mais apropriado](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type)
 para cada cenário. Use elementos como
[`datalist`](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type#offer-suggestions-during-input-with-datalist)
 para fornecer valores sugeridos para um campo.

### Forneça um calendário visual para a seleção de datas

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-calendar-good.png">
    <figcaption class="success">
      <b>CERTO</b>: use widgets de calendário quando possível.
</figcaption>
  </figure>
</div>

Identifique com clareza as datas de início e fim. Os usuários não devem precisar sair de um site e
consultar um aplicativo de calendário para agendar um compromisso.

<div style="clear:both;"></div>

### Minimize os erros de formulário com identificação e validação em tempo real

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-multipart-good.png">
    <figcaption class="success">
      <b>CERTO</b>: Pré-preencher o conteúdo quando possível.
</figcaption>
  </figure>
</div>

Identifique as entradas corretamente e valide-as em tempo real.

<div style="clear:both;"></div>

### Crie formulários eficientes 

Utilize o recurso de [preenchimento automático](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly#use-metadata-to-enable-auto-complete)
 para que os usuários possam preencher formulários com facilidade com dados pré-preenchidos. Pré-preencha
campos com informações que você já tem. Por exemplo, ao recuperar endereços
de entrega e cobrança, tente usar
[`requestAutocomplete`](/web/fundamentals/design-and-ux/input/forms/use-request-auto-complete)
 ou permita que os usuários copiem o endereço de entrega para o endereço de cobrança (ou vice-versa). 

## Usabilidade e formato

Success: Alegre seus usuários de dispositivos móveis com pequenas mudanças que aprimorem a experiência.

### Otimize todo o seu site para dispositivos móveis

Use um [layout responsivo](/web/fundamentals/design-and-ux/responsive/) que
mude de acordo com o tamanho e os recursos do dispositivo do usuário. Participantes
do estudo consideraram sites que misturavam páginas otimizadas para
computadores e dispositivos móveis ainda mais difíceis de usar do que sites destinados a apenas computadores.

### Não force os usuários a usarem gestos de pinça para controlar o zoom

Os usuários estão acostumados a navegar verticalmente em sites, mas não horizontalmente.
Evite elementos grandes com largura fixa. Use
[consultas de mídia CSS](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness)
 para aplicar diferentes estilos para diferentes telas. Não crie conteúdo que só seja
exibido corretamente em uma
[largura de janela de visualização](/web/fundamentals/design-and-ux/responsive/#set-the-viewport) específica.
Sites que forçam os usuários a navegar horizontalmente são reprovados no
[Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly),
o que pode afetar negativamente suas classificações de pesquisa.

### Permita que imagens de produtos possam ser ampliadas

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-make-images-expandable-good.png">
    <figcaption class="success">
      <b>CERTO</b>: Permita que as imagens de produtos sejam expandidas e visualizadas em detalhes com facilidade.
</figcaption>
  </figure>
</div>

Os clientes de varejo esperam que os sites permitam
[visualizações de closes de alta resolução](/web/fundamentals/design-and-ux/media/images#make-product-images-expandable)
de seus produtos. Participantes do estudo se frustraram quando não conseguiam ver
o que estavam comprando.

<div style="clear:both;"></div>

### Diga aos usuários qual orientação funciona melhor

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/us-orientation.jpg">
    <figcaption class="success">
      <b>CERTO</b>: Diga ao usuário qual orientação funciona melhor.
</figcaption>
  </figure>
</div>

Participantes do estudo tendiam a ficar na mesma orientação até que
algo os incentivasse a trocar. Crie designs para as orientações de paisagem e retrato
ou incentive os usuários a trocar para a orientação ideal. Certifique-se de que suas
chamadas para ação importantes possam ser executadas pelo que os usuários
ignorem a sugestão de trocar a orientação.

<div style="clear:both;"></div>

### Mantenha o usuário em uma só janela de navegador

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-single-browser-good.png">
    <figcaption class="success">
      <b>CERTO</b>: A Macy's mantém os usuários no seu site fornecendo cupons internamente.
</figcaption>
  </figure>
</div>

Os usuários podem ter problemas para alternar entre janelas de navegador
e podem não conseguir voltar ao site. Evite chamadas para ação que abram novas janelas.
Identifique jornadas que possam fazer com que um usuário saia do seu site e
forneça recursos para mantê-lo no site. Por exemplo, se você aceitar cupons,
ofereça-os diretamente no site em vez de forçar os usuários a procurar
promoções em outros sites.

<div style="clear:both;"></div>

### Evite a identificação "site completo"

Quando os participantes do estudo viram uma opção para acessar o "site completo"
(site para computador), em vez de um "site para dispositivos móveis", eles
pensaram que o site para dispositivos móveis era incompleto e escolheram a versão "completa", sendo direcionados para o site para computador.


### Seja claro ao indicar por que precisa da localização do usuário

Os usuários devem sempre entender por que você está solicitando a
[localização](/web/fundamentals/native-hardware/user-location/) deles. Participantes
do estudo que tentavam reservar um hotel em outra cidade ficaram confusos
quando um site de viagens detectou sua localização e ofereceu hotéis em
sua cidade atual. Deixe os campos de localização em branco por padrão e permita que os usuários os
preencham com uma chamada para ação clara, como "Encontrar em locais próximos".

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>CERTO</b>: Sempre solicitar acesso à localização em resposta a um gesto do usuário.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>ERRADO</b>: Solicitar a localização imediatamente na página inicial conforme o site carrega resulta em uma experiência desagradável para o usuário.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


{# wf_devsite_translation #}
