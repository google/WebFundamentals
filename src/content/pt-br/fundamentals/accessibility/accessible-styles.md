project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Uso do estilo adequado para aprimorar a acessibilidade


{# wf_updated_on: 2018-05-23 #}
{# wf_published_on: 2016-10-04 #}

# Estilos acessíveis {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



Exploramos dois dos pilares fundamentais da acessibilidade, foco e semântica.
Agora vamos tratar do terceiro, estilo. É um tema amplo, que podemos cobrir
em três seções.

 - Garantir que os elementos sejam estilizados de modo a apoiar nossos esforços de acessibilidade
   adicionando estilos ao foco e vários estados ARIA.
 - Estilizar nossas IUs para a flexibilidade de modo que possam ser ampliadas ou redimensionadas para
   acomodar usuários que podem ter problemas com texto pequeno.
 - Escolher as cores e o contraste certos para evitar a transmissão de informações
   apenas pela cor.

## Estilização de foco

Geralmente, a qualquer momento que focamos um elemento, contamos com o
anel integrado de foco do navegador anel (a propriedade CSS `outline`) para estilizar o elemento. O anel de foco é útil
porque, sem ele, é impossível para um usuário de teclado dizer qual elemento
tem o foco. A [lista de verificação
WebAIM](http://webaim.org/standards/wcag/checklist){: .external } certifica
isso, exigindo que "É visualmente aparente qual elemento da página tem o
foco do teclado no momento (ou seja, à medida que percorre a página, você pode ver
onde está)."

![elementos de formulário com um anel de foco](imgs/focus-ring.png)

No entanto, às vezes o anel de foco pode parecer distorcido ou simplesmente pode não caber no
seu design da página. Alguns desenvolvedores removem este estilo completamente, definindo
o `outline` do elemento como `0` ou `none`. Porém, sem um indicador de foco, como
um usuário de teclado pode saber com qual item está interagindo?

Aviso: Nunca defina o contorno como 0 ou nenhum sem fornecer uma alternativa foco!

Você pode estar familiarizado com a adição de estados de passar cursor
aos seus controles usando a *pseudoclasse* `:hover`. Por exemplo, você pode usar `:hover` em um elemento de link para
alterar sua cor ou fundo quando o mouse está sobre ele. Similarmente a
`:hover`, você pode usar a pseudoclasse `:focus` para direcionar um elemento quando ele tem
foco.

    /* At a minimum you can add a focus style that matches your hover style */
    :hover, :focus {
      background: #c0ffee;
    }

Uma solução alternativa para o problema da remoção do anel de foco é dar ao
seu elemento de os mesmos estilos em passar cursor e foco, o que resolve
o problema "onde está o foco?" para usuários de teclado. Como sempre, melhorar a
experiência de acessibilidade melhora a experiência de todos.

### Modalidade de interação

![um botão HTML nativo com um anel de foco](imgs/sign-up.png){: .attempt-right }

Para elementos nativos como `button`, os navegadores podem detectar se a interação do usuário
ocorreu pelo mouse ou pressionando o teclado e, tipicamente exibe o
anel de foco para interação por teclado. Por exemplo, quando você clica em um
`button` nativo com o mouse, não há anel de foco, mas quando chega a pele percorrendo pelo
teclado, o anel de foco aparece.

A lógica aqui é que usuários de mouse são menos propensos a precisar o anel
de foco, porque sabem em que elemento clicaram. Infelizmente, atualmente não há
uma única solução para todos os navegadores que produza esse mesmo comportamento. Como resultado, se
você atribuir um estilo `:focus` a qualquer elemento, esse estilo será exibido
quando o usuário clicar no elemento *ou* focá-lo com o teclado. Experimente clicar
neste botão falso e observe que o estilo `:focus` é sempre aplicado.

    <style>
      fake-button {
        display: inline-block;
        padding: 10px;
        border: 1px solid black;
        cursor: pointer;
        user-select: none;
      }

      fake-button:focus {
        outline: none;
        background: pink;
      }
    </style>
    <fake-button tabindex="0">Click Me!</fake-button>

{% framebox height="80px" %}
<style>
  fake-button {
    display: inline-block;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    user-select: none;
  }

  fake-button:focus {
    outline: none;
    background: pink;
  }
</style>
<fake-button tabindex="0">Click Me!</fake-button>
{% endframebox %}

Isso pode ser um pouco irritante, e muitas vezes o desenvolvedor recorre ao uso
do JavaScript com controles personalizados para ajudar a diferenciar entre foco
pelo mouse e pelo teclado.

No Firefox, a pseudoclasse CSS `:-moz-focusring` permite que você escreva um estilo
de foco que só é aplicado quando o elemento é focado pelo teclado, um recurso
bastante útil. Embora esta pseudoclasse seja suportada apenas no Firefox atualmente,
[no momento há trabalho em andamento para transformá-la em um
padrão](https://github.com/wicg/modality){: .external }.

Também há [este ótimo artigo de Alice Boxhall e Brian
Kardell](https://www.oreilly.com/ideas/proposing-css-input-modality){: .external }
que explora o tema da modalidade e contém protótipo de código para
diferenciar entre interação por mouse e por teclado. Você pode usar a solução deles
agora, e depois incluir a pseudoclasse do anel de foco mais tarde, quando ela tiver
suporte mais generalizado.

## Estilização de estados com ARIA

Ao compilar componentes, é prática comum refletir seu estado e, assim,
sua aparência, utilizando classes CSS controladas com JavaScript.

Por exemplo, considere um botão de alternância que vai para um estado visual
"pressionado" quando clicado e mantém esse estado até ser clicado novamente. Para estilizar o
estado, seu JavaScript pode adicionar uma classe `pressed` ao botão. E, como
quer boa semântica em todos os seus controles, você também definiria o
estado `aria-pressed` para o botão como `true`.

Uma técnica útil para empregar aqui é remover a classe totalmente e usar
apenas os atributos ARIA para estilizar o elemento. Agora você pode atualizar o seletor
CSS para o estado pressionado do botão deste


    .toggle.pressed { ... }
    

para este.


    .toggle[aria-pressed="true"] { ... }
    

Isso cria uma lógica e uma relação semântica entre o estado ARIA e
a aparência do elemento, e também reduz o código extra.

## Design responsivo para vários dispositivos

Sabemos que é uma boa ideia fazer design de modo responsivo a fim de proporcionar
a melhor experiência para vários dispositivos, mas o design responsivo também produz uma conquista em termos de
acessibilidade.

Considere um site como [Udacity.com](https://www.udacity.com/courses/all):

![Udacity.com em ampliação de 100%](imgs/udacity.jpg)

Um usuário de baixa visão que tem dificuldade para ler letras pequenas pode aumentar o zoom da página,
talvez até 400%. Como o site foi feito com design responsivo, a IU vai
se reorganizar para a "janela de visualização menor" (na verdade, para a página maior),
o que é ótimo para usuários de desktop que necessitam de ampliação da tela e
também para usuários de leitor de tela em celular. É vantajoso para todos. Eis a mesma página ampliada para
400%:

![Udacity.com em ampliação de 400%](imgs/udacity-zoomed.jpg)

Na verdade, apenas através do design responsivo, estamos cumprindo [regra 1.4.4 da lista de verificação
do WebAIM](http://webaim.org/standards/wcag/checklist#sc1.4.4){: .external },
que afirma que uma página "... deve ser legível e funcional quando o tamanho
do texto é dobrado".

Analisar o design responsivo como um todo está fora do escopo deste guia, mas
aqui estão alguns tópicos importantes que beneficiarão sua experiência responsiva
e fornecerão a seus usuários um melhor acesso ao seu conteúdo.

 - Primeiro, certifique-se de sempre usar a meta tag `viewport` adequada.<br>
   `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
   <br>Configurar `width=device-width`
   se adaptará à largura da tela em pixels independentes de dispositivos, e configurar
   `initial-scale=1` estabelece uma relação 1:1 entre pixels CSS e
   pixels independentes de dispositivos. Fazê-lo instrui o navegador a ajustar seu
   conteúdo ao tamanho da tela, de modo que os usuários não vejam apenas um monte de texto
   sobreposto.

![uma tela de telefone sem e com a meta tag da janela de visualização](imgs/scrunched-up.jpg)

Aviso: Ao usar a meta tag da janela de visualização, certifique-se de não definir
maximum-scale=1 nem definir user-scaleable=no.

 - Outra técnica para ter em mente é fazer o design com uma grade responsiva. Como você
   viu no site Udacity, fazer design com uma grade significa que seu conteúdo
   sofrerá refluxo quando a página mudar de tamanho. Muitas vezes, estes layouts são produzidos usando
   unidades relativas como porcentagens, ems ou rems em vez de valores pixel
   rígidos. A vantagem de fazê-lo assim é que o texto e o conteúdo
   podem se ampliar e forçar outros itens para baixo na página. Assim, a ordem de DOM e a ordem de
   leitura permanecem iguais, mesmo se o layout mudar por causa da ampliação.

 - Além disso, considere usar de unidades relativas como `em` ou `rem` para coisas como tamanho de
   texto, em vez de valores de pixel. Alguns navegadores suportam redimensionamento de texto somente nas
   preferências do usuário, e se você estiver usando um valor de pixel para o texto, esta configuração
   não afetará a sua cópia. Contudo, se tiver usado unidades relativas
   por toda parte, a cópia local será atualizada para refletir a preferência do usuário.

 - Finalmente, quando seu design é exibido em um dispositivo móvel, você deve
   garantir que elementos interativos, como botões ou links são suficientemente grandes e têm espaço
   suficiente ao seu redor, para torná-los fáceis de pressionar sem
   sobreposição acidental com outros elementos. Isso beneficia todos os usuários, mas é especialmente
útil para pessoas com deficiência motora.

Um tamanho mínimo recomendado para alvo de toque é de cerca de 48 pixels independentes de dispositivo
em um site com uma janela de visualização móvel configurada corretamente. Por exemplo, enquanto um ícone pode
ter uma largura e uma altura de apenas 24px, você pode usar preenchimento adicional para aumentar
o tamanho do alvo de toque até 48px. A área de 48x48 pixel corresponde a cerca de 9 mm,
que é aproximadamente o tamanho da área de toque do dedo de uma pessoa.

![um diagrama que mostra alguns alvos de toque de 48 pixels](imgs/touch-target.jpg)

Alvos de toque também devem ter um espaço de cerca de 8 pixels
entre si, tanto horizontal como verticalmente, de modo que o dedo de um
usuário pressionando um alvo de toque não pressione outro alvo de toque sem querer.

## Cor e contraste

Se você tem boa visão, é fácil supor que todos percebem as cores, ou a
legibilidade do texto, da mesma forma que você &mdash; mas é claro que este não é o caso.
Vamos concluir analisando como podemos efetivamente usar cor e contraste
para criar designs agradáveis que sejam acessíveis a todos.

Como você pode imaginar, algumas combinações de cores que são de fácil
leitura para algumas pessoas são difíceis ou impossíveis para outras. Isso geralmente se deve a *cor
contraste *, a relação entre a *luminância* das cores em primeiro plano e
do fundo. Quando as cores são semelhantes, a relação de contraste é baixa; quando
elas são diferentes, a relação de contraste é alta.

As [diretrizes WebAIM](http://webaim.org/standards/wcag/){: .external }
recomendam uma relação AA (mínima) de contraste de 4,5: 1 para todos os textos. Uma exceção é
feita para textos muito grandes (120-150% maiores que o corpo de texto padrão),
para os quais a relação pode descer até 3:1. Observe a diferença nas relações de contraste
mostradas abaixo.

![comparação de várias relações de contraste](imgs/contrast-ratios.jpg)

A relação de contraste de 4,5:1 foi escolhida como nível AA porque compensa a
perda da sensibilidade ao contraste geralmente experimentada por usuários com
perda de visão equivalente a cerca de 20/40 de visão. 20/40 geralmente é relatada como a
acuidade visual típica de pessoas com aproximadamente 80 anos. Para usuários com dificuldades de visão subnormal
ou deficiências de cor, podemos aumentar o contraste até 7:1 para o corpo de texto.

Você pode usar a [extensão Accessibility
DevTools](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb){: .external }
para Chrome para identificar relações de contraste. Uma vantagem de usar Chrome DevTools
é que elas sugerem alternativas AA e AAA (avançado) às suas cores atuais,
e você pode clicar nos valores para visualizá-los no seu aplicativo.

Para executar uma auditoria de cor/contraste, siga estes passos básicos.

 1. Após instalar a extensão, clique em `Audits`
 1. Desmarque tudo, exceto `Accessibility`
 1. Clique em `Audit Present State`
 1. Observe quaisquer avisos de contraste

![a caixa de diálogo de contraste devtools](imgs/contrast-audit.png)

O próprio WebAIM fornece um [verificador de cor
e contraste](http://webaim.org/resources/contrastchecker/){: .external } útil que você pode usar
para examinar o contraste de qualquer par de cores.

### Não transmita informações somente pela cor

Há cerca de 320 milhões de usuários com deficiência na visão de cores. Cerca de 1 em 12
homens e 1 em cada 200 mulheres têm alguma forma de "daltonismo"; isso significa
que aproximadamente 1/20, ou 5%, de seus usuários não terão a experiência
pretendida por seu site. Quando confiamos nas cores para transmitir informações,
levamos esse número para níveis inaceitáveis.

Observação: O termo "daltonismo" muitas vezes é usado para descrever uma condição
visual onde uma pessoa tem problema para distinguir cores; na verdade,
muito poucas pessoas são totalmente cegas para cores. A maioria das pessoas com deficiências para cores podem ver algumas
ou a maioria das cores, mas têm dificuldade em distinguir entre certas cores,
como vermelhos e verdes (a mais comum), marrons e laranjas, e azuis e roxos.

Por exemplo, em um formulário de interação, um número de telefone pode ser sublinhado
em vermelho para mostrar que é inválido. Mas, para um usuário deficiente em cores ou que utiliza o leitor de
tela, essa informação não é bem transmitida e, às vezes, nem é percebida. Assim, você deve sempre tentar
fornecer vários caminhos para que o usuário acesse informações críticas.

![um formulário de interação com um erro sublinhado em vermelho](imgs/input-form1.png)

A [lista de verificação WebAIM afirma, na seção
1.4.1](http://webaim.org/standards/wcag/checklist#sc1.4.1){: .external } que
"cor não deve ser utilizada como único método de transmissão de conteúdo de
distinguir elementos visuais". Ela também observa que "a cor por si só não deve
ser usada para distinguir links do texto ao redor", a menos que cumpra
certas requisitos de contraste. Em vez disso, a lista de verificação recomenda adicionar um
indicador adicional, como um sublinhado (usando a propriedade
CSS `text-decoration`) para indicar quando o link está ativo.

Uma maneira fácil de corrigir o exemplo anterior é adicionar uma mensagem
extra ao campo, anunciando que ele é inválido e por quê.

![um formulário de interação com uma mensagem de erro adicionada para maior clareza](imgs/input-form2.png)

Ao construir um aplicativo, tenha esse tipo de coisa em mente e atente para
 áreas onde possa estar dependendo demais da cor para transmitir informações
importantes.

Caso esteja curioso sobre como pessoas diferentes visualizam seu site, ou caso conte
muito com o uso da cor em sua interface de usuário, você pode usar a [extensão NoCoffee
do Chrome](https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl){: .external }
para simular várias formas de deficiência visual, incluindo diferentes tipos
de daltonismo.

### Modo de alto contraste

O modo de alto contraste permite que um usuário inverta as cores do
primeiro plano e do fundo, o que geralmente ajuda o texto a se destacar melhor. Para alguém com uma deficiência
que causa baixa visão, o modo de alto contraste pode facilitar muito a navegação
pelo conteúdo da página. Existem algumas maneiras de obter uma configuração de alto contraste em sua máquina.

Sistemas operacionais como o Mac OSX e Windows oferecem modos de alto contraste que podem ser
ativados para tudo no nível do sistema. Ou os usuários podem instalar uma extensão,
como a [extensão High Contrast
do Chrome](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph){: .external }
para ativar o alto contraste somente nesse aplicativo específico.

Um exercício útil é ativar as configurações de alto contraste e verificar se
toda a IU no seu aplicativo ainda é visível e utilizável.

Por exemplo, uma barra de navegação pode usar uma cor de fundo sutil para indicar
qual página está selecionada no momento. Se você a visualizar em uma extensão de alto
contraste, essa sutileza desaparece completamente, e, com ela, também a
compreensão do leitor de qual página está ativa.

![uma barra de navegação no modo de alto contraste](imgs/tab-contrast.png)

Da mesma forma, se você considerar o exemplo da lição anterior, o sublinhado
vermelho no campo de número de telefone inválido pode ser exibido em uma 
cor azul-esverdeada difícil de distinguir.

![um formulário com um campo de erro no modo de alto contraste](imgs/high-contrast.jpg)

Se está seguindo as relações de contraste citadas nas lições anteriores,
você não precisa se preocupar quando se trata de suporte ao modo de alto contraste. Porém, para ficar
mais tranquilo, considere instalar a extensão High Contrast do Chrome e dar uma
olhada geral na sua página apenas para verificar se tudo funciona como esperado
e tem a aparência desejada.


{# wf_devsite_translation #}
