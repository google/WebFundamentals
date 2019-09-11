project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A importância da ordem padrão do DOM


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# A Ordem do DOM É Importante {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



Trabalhar com elementos nativos é uma ótima forma de aprender sobre o comportamento de foco
porque eles são automaticamente inseridos na ordem na guia com base
em sua posição no DOM.

Por exemplo, você pode ter três elementos de botão, um após o outro no
DOM. Pressionar `Tab` foca cada botão na ordem. Tente clicar no bloco de código
abaixo para mover o ponto inicial do foco de navegação, depois pressione `Tab` para mover o foco
entre os botões.

    <button>I Should</button>
    <button>Be Focused</button>
    <button>Last!</button>

{% framebox height="80px" %}
<button>I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

No entanto, é importante observar que, ao utilizar CSS, é possível as coisas
existirem em uma ordem no DOM, mas aparecerem em uma ordem diferente na tela. Por exemplo,
se você usar uma propriedade CSS como `float` para mover um botão para a direita,
os botões aparecem numa ordem diferente na tela. Porém, como sua ordem no
DOM permanece a inalterada, o mesmo ocorre com sua ordem de guias. Quando o usuário percorre as
guias através a página, os botões são focados em uma ordem não intuitiva. Tente clicar no
bloco de código abaixo para mover o ponto inicial do foco de navegação, depois pressione `Tab` para
mover o foco entre os botões.

    <button style="float: right">I Should</button>
    <button>Be Focused</button>
    <button>Last!</button>

{% framebox height="80px" %}
<button style="float: right;">I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

Cuidado ao mudar a posição visual de elementos na tela usando CSS.
Isso pode fazer a ordem de guias para saltar ao redor, aparentemente de forma aleatória, confundindo
os usuários que usam o teclado. Por esta razão, a lista de verificação do Web AIM afirma,
[na seção 1.3.2] (http://webaim.org/standards/wcag/checklist#sc1.3.2){: .external }
que a ordem de leitura e de navegação, determinada pela ordem do código, deve ser
lógica e intuitiva.

Como regra geral, tente percorrer as guias de suas páginas de vez em quando, só
para ter certeza de que você não cancelou acidentalmente a ordem das guias. Este é um bom hábito a se adotar,
e não requer muito esforço.

## Conteúdo fora da tela
E se você tiver conteúdo que não está sendo exibido no momento, mas ainda precisa estar
no DOM, tal como uma navegação lateral responsiva? Quando se tem elementos como este, que
recebe foco quando estão fora da tela, pode parecer que o foco está
desaparecendo e reaparecendo conforme o usuário percorre as guias da página &mdash; obviamente
um efeito indesejável. Idealmente, devemos impedir que o painel seja
focado quando está fora da tela, e permitir que ele seja focado somente quando o usuário pode
interagir com ele.

![um painel deslizante fora da tela pode roubar o foco](imgs/slide-in-panel.png)

Às vezes você precisa fazer um pouco de trabalho de detetive para descobrir
para onde foi o foco. Você pode usar `document.activeElement` a partir do console para descobrir qual
elemento está focado no momento.

Depois de saber que elemento fora da tela está sendo focado, você pode configurá-lo para
`display: none` ou `visibility: hidden` e, em seguida, configurá-lo de volta para `display:
block` ou `visibility: visible` antes de mostrá-lo para o usuário.

![um painel deslizante configurado para não exibir nada](imgs/slide-in-panel2.png)

![um painel deslizante configurado para exibir bloco](imgs/slide-in-panel3.png)

Em geral, incentivamos os desenvolvedores a percorrer as guias de seus sites antes
de cada publicação para ver se a ordem das guias não desaparece ou sai de uma
sequência lógica. Se isso acontecer, você deve certificar que está ocultando adequadamente
 conteúdo fora da tela com `display: none` ou `visibility: hidden`, ou que
 reorganiza as posições físicas dos elementos no DOM para que estejam em
uma ordem lógica.


{# wf_devsite_translation #}
