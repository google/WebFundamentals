project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Introdução à árvore de acessibilidade


{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-10-04 #}

# A árvore de acessibilidade {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Imagine que você esteja construindo uma interface de usuário *somente para
usuários de leitores de tela*. Aqui, você não precisa criar nenhuma interface
visual, mas apenas fornecer informações suficiente para o leitor de tela usar.

O que você estaria criando seria uma espécie de API descrevendo a estrutura da
página, similar à API DOM, mas podendo usar menos informações e menos
nós, porque muitas dessas informações são úteis apenas para a apresentação visual. Ela
pode ter uma aparência assim.

![simulação de DOM API para leitor de tela](imgs/treestructure.jpg)

Isso é basicamente o que o navegador apresenta ao leitor de tela. O
navegador pega a árvore do DOM e a modifica para uma forma útil para
a tecnologia assistiva. Referimo-nos a esta árvore modificada como a *Árvore de
Acessibilidade*.

Você pode visualizar a árvore acessibilidade como tendo a aparência semelhante
à de uma página da Web antiga dos anos 1990: poucas imagens, muitos links, talvez um campo e um botão.

![uma página da Web no estilo da década de 1990](imgs/google1998.png)

Fazer uma varredura visual por uma página como neste caso, fornece uma
experiência semelhante àquela que um usuário de leitor de tela teria. A interface está presente, mas é simples e
direta, muito parecida com uma interface de árvore de acessibilidade.

É com a árvore de acessibilidade que a maioria das tecnologias assistivas interage. O
o fluxo é algo assim.

 1. Um aplicativo (o navegador ou outro aplicativo) expõe uma versão semântica
    de sua IU de Tecnologia Assistiva por meio de uma API.
 1. A tecnologia assistiva pode utilizar as informações lidas através da API para
    criar uma apresentação de interface de usuário alternativa para o usuário. Por exemplo,
    um leitor de tela cria uma interface na qual o usuário ouve uma
    representação falada do aplicativo.
 1. A tecnologia assistiva pode também permitir ao usuário interagir com o app
    de uma forma diferente. Por exemplo, a maioria dos leitores de tela fornecem ganchos
    para permitir que um usuário simule facilmente um clique do mouse ou toque do dedo.
 1. A tecnologia assistiva retransmite a intenção do usuário (como "clique") de
    volta para o aplicativo por meio da API de acessibilidade. Em seguida, o aplicativo tem a responsabilidade
    de interpretar a ação adequada no contexto da interface inicial.

Para navegadores da Web, há um passo extra em cada direção, porque o
navegador é, na verdade, uma plataforma para aplicativos da Web que são executados dentro dele. Assim, o navegador precisa
traduzir o app da Web em uma árvore acessibilidade, e deve certificar-se
de que os eventos apropriados sejam acionados em JavaScript com base nas
ações do usuário que entram pela tecnologia assistiva.

Mas isso é tudo responsabilidade do navegador. Nosso trabalho, como desenvolvedores de Web, é apenas
estar cientes de que isso está acontecendo, e desenvolver páginas da Web que aproveitam
este processo para criar uma experiência acessível para nossos usuários.

Fazemos isso garantindo que expressamos a semântica das nossas páginas
corretamente: garantindo que os elementos importantes na página tenham as
 funções, estados e propriedades acessíveis corretos e que especificamos nomes
e descrições acessíveis. O navegador pode então permitir que a tecnologia assistiva acesse
tais informações para criar uma experiência personalizada.

## Semântica em HTML nativo

Um navegador pode transformar a árvore do DOM em uma árvore de
acessibilidade, pois muito do DOM tem significado semântico *implícito*. Ou seja, o DOM usa elementos de HTML
nativo que são reconhecidos pelos navegadores e funcionam de maneira previsível
em uma variedade de plataformas. Assim, a acessibilidade para elementos de HTML nativos, como links ou botões,
é gerenciada automaticamente. Podemos aproveitar essa acessibilidade integrada
escrevendo HTML que expresse a semântica dos elementos de nossa página.

Contudo, às vezes usamos elementos que parecem elementos nativos, mas não o são.
Por exemplo, este "botão" não é um botão.

{% framebox height="60px" %}
<style>
    .fancy-btn {
        display: inline-block;
        background: #BEF400;
        border-radius: 8px;
        padding: 10px;
        font-weight: bold;
        user-select: none;
        cursor: pointer;
    }
</style>
<div class="fancy-btn">Give me tacos</div>
{% endframebox %}

Ele pode ser construído em HTML de diversas maneiras; uma maneira é mostrado abaixo.


    <div class="button-ish">Give me tacos</div>
    

Quando não usamos um elemento de botão real, o leitor de tela não tem como
saber o que encontrou. Além disso, teríamos que fazer o trabalho extra [de adicionar
tabindex](/web/fundamentals/accessibility/focus/using-tabindex) para torná-lo utilizável
para usuários apenas de teclado porque, da maneira como está codificado
agora, ele pode ser usado somente com um mouse.

Podemos facilmente corrigir isso usando um elemento `button` regular em vez de um `div`.
Usar um elemento nativo também tem a vantagem de cuidar das interações
 por teclado. E lembre-se de que você não precisa perder seus efeitos visuais
elegantes só porque usa um elemento nativo; é possível estilizar elementos nativos
para fazê-los ter a aparência desejada e ainda manter a semântica e comportamento
 implícitos.

Anteriormente, observamos que os leitores de tela anunciam a função, nome,
estado e valor de um elemento. Ao utilizar o elemento de semântica correto, a função, estado
e valor estão cobertos, mas também precisamos garantir que tornamos o nome
de um elemento detectável.

De modo geral, existem dois tipos de nomes:

 - *Rótulos visíveis*, que são usados por todos os usuários para associar o
significado a um elemento, e
 - *Alternativas em texto*, que são usadas apenas quando não há necessidade
de um rótulo visual.

Para elementos em nível de texto, não é precisa fazer nada, porque, por
definição, eles terão algum conteúdo de texto. Todavia, para interação ou elementos de controle, e
conteúdo visual, como imagens, precisamos certificar que especificamos um nome. Na verdade,
fornecer alternativas em texto para qualquer conteúdo não
textual é [o primeiro item da lista de verificação do WebAIM](http://webaim.org/standards/wcag/checklist#g1.1).

Uma maneira de fazê-lo é seguir sua recomendação de que "Entradas de formulário
tenham rótulos de texto associados". Há duas maneiras de associar um rótulo a um elemento
de formulário, como uma caixa de seleção. Qualquer um dos métodos faz com que o texto do rótulo também se torne
um alvo de cliques para a caixa de seleção, o que também é útil para usuários
de mouse ou tela sensível ao toque. Para associar um rótulo a um elemento,

 - Coloque o elemento de interação dentro de um elemento de rótulo

<div class="clearfix"></div>

    <label>
      <input type="checkbox">Receber ofertas promocionais?</input>
    </label>


{% framebox height="60px" %}
<div style="margin: 10px;">
    <label style="font-size: 16px; color: #212121;">
        <input type="checkbox">Receber ofertas promocionais?</input>
    </label>
</div>
{% endframebox %}


ou

 - Use o atributo `for` do rótulo e remeta ao `id` do elemento

<div class="clearfix"></div>

    <input id="promo" type="checkbox"></input>
    <label for="promo">Receber ofertas promocionais?</label>


{% framebox height="60px" %}
<div style="margin: 10px;">
    <input id="promo" type="checkbox"></input>
    <label for="promo">Receber ofertas promocionais?</label>
</div>
{% endframebox %}
    

Quando a caixa de seleção tiver sido rotulada corretamente, o leitor de tela pode
relatar que o elemento tem uma função de caixa de seleção, está em um
estado marcado, e tem o nome "Receber ofertas promocionais?".

![saída de texto em tela do VoiceOver, mostrando o rótulo falado de uma caixa de seleção](imgs/promo-offers.png)

Success: Você pode realmente usar o leitor de tela para encontrar rótulos associados
indevidamente tabulando pela página e verificando as funções, estados e
nomes falados.




{# wf_devsite_translation #}
