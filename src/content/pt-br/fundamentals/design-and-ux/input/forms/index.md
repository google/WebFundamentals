project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Preencher formulários em celulares não é fácil. Os melhores formulários são aqueles com menos entradas.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-30 #}

# Crie formulários incríveis {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iYYHRwLqrKM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Preencher formulários em celulares não é fácil. Os melhores formulários são aqueles com menos entradas. Bons formulários fornecem tipos de entrada semântica. As teclas de acesso devem ser adaptadas aos tipo de entrada do usuário; o usuário escolhe uma data em um calendário. Mantenha seu usuário informado. O usuário deve ser notificado pelas ferramentas de validação sobre o que fazer antes de enviar o formulário.


## Crie formulários eficientes


Crie formulários eficientes evitando ações repetidas, perguntando apenas o necessário e oriente o usuário mostrando o ponto em que ele se encontra em formulários de várias partes.


### TL;DR {: .hide-from-toc }
- Use dados existentes para oferecer sugestões ao preencher campos e ative o preenchimento automático.
- Use barras de progresso claramente indicadas para ajudar o usuário a finalizar formulários de várias partes.
- Forneça um calendário visual para que os usuários não precisem sair do seu site e ir para o aplicativo de calendário em seus smartphones.


### Minimize ações e campos repetidos

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Mostre o progresso em formulários de várias partes">
  <figcaption>
    No site Progressive.com, a primeira informação solicitada ao usuário é o CEP e essa informação é preenchida automaticamente na próxima parte do formulário.
  </figcaption>
</figure>

Certifique-se de que seus formulários não tenham ações repetidas e apenas a quantidade necessária de campos 
e tire proveito do 
[preenchimento automático](/web/fundamentals/design-and-ux/input/forms/#use-metadata-to-enable-auto-complete),
para que o usuário possa facilmente preencher os formulários com dados sugeridos.

Busque oportunidades de sugerir informações já conhecidas ou que podem 
ser antecipadas para evitar que o usuário precise fornecê-las.  Por exemplo, 
pré-preencha o endereço de envio com o último endereço de envio fornecido pelo 
usuário.

<div style="clear:both;"></div>

### Mostre ao usuário seu progresso

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Mostre o progresso em formulários de várias partes">
  <figcaption>
    Use barras de progresso claramente rotuladas para ajudar os usuários a preencher formulários de várias partes.
  </figcaption>
</figure>

As barras de progresso e menus devem transmitir precisamente o progresso geral em 
formulários e processos de várias etapas.

Se você inserir um formulário complexo demais em uma etapa inicial, o usuário 
provavelmente sairá de seu site antes de terminar o processo. 

<div style="clear:both;"></div>

### Forneça calendários visuais ao selecionar datas

<figure class="attempt-right">
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="Site do hotel com facilidade de uso do calendário">
  <figcaption>
    Site do hotel com widget de calendário de fácil uso para selecionar datas.
  </figcaption>
</figure>

O usuário frequentemente precisa de mais contexto ao agendar compromissos e datas de viagem. 
Para facilitar o processo e evitar que o usuário saia do seu site para consultar o 
aplicativo de calendário, forneça um calendário visual com indicação clara para selecionar 
datas de início e término. 

<div style="clear:both;"></div>

## Escolha o melhor tipo de entrada

Agilize a entrada de informações usando o tipo de entrada correto. Os usuários gostam de
sites que apresentem automaticamente teclados numéricos para inserir números de telefone ou
quando os campos avançam automaticamente conforme são preenchidos. Procure oportunidades de eliminar
toques desnecessários em seus formulários.


### TL;DR {: .hide-from-toc }
- Selecione o tipo de entrada mais adequado para seus dados para simplificar a entrada.
- Ofereça sugestões conforme o usuário digita com o elemento  <code>datalist</code>.


### Tipos de entrada HTML5

O HTML5 introduziu vários tipos de entrada novos. Esses novos tipos de entrada dão dicas
para o navegador sobre qual tipo de layout de teclado exibir para teclados
na tela.  Os usuários podem inserir as informações necessárias com mais facilidade, sem
precisar alterar seu teclado e vendo apenas as teclas adequadas para esse tipo de
entrada.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Entrada <code>type</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> Para inserir um URL. Deve começar com um esquema de URI válido,
        como <code>http://</code>, <code>ftp://</code> ou  <code>mailto:</code>.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>Para inserir números de telefone. Esse elemento <b>não</b>
        força uma determinada sintaxe para validação, portanto, se você deseja garantir
        um determinado formato, é possível usar um padrão.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>Para inserir endereços de e-mail e dicas de que
        a @ deve ser mostrada no teclado por padrão. Você pode adicionar o
        atributo multiple se mais de um endereço de e-mail será fornecido.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>Um campo de entrada de texto formatado de forma que seja
        consistente com o campo de pesquisa da plataforma.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>Para entrada numérica, pode ser qualquer valor
         racional inteiro ou flutuante.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>Para entrada numérica, mas diferente do tipo de entrada
        de número, o valor é menos importante. É exibido para o usuário como um
        controle deslizante.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>Para inserir um valor de data e hora
        onde o fuso horário fornecido é o fuso horário local.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>Para inserir uma data (apenas) sem fuso
        horário.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>Para inserir uma hora (apenas) sem fuso
        horário.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>Para inserir uma semana (apenas) sem fuso 
        horário.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>Para inserir um mês (apenas) sem fuso 
        horário.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/month-ios.png" srcset="imgs/month-ios.png 1x, imgs/month-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>color</code><br>para selecionar uma cor.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/color-android.png" srcset="imgs/color-android.png 1x, imgs/color-android-2x.png 2x">
      </td>
    </tr>
  </tbody>
</table>

Warning: Lembre-se de ter a localização em mente ao escolher o tipo de entrada,
pois algumas localidades usam um ponto (.) como separador em vez de uma vírgula (,)

### Ofereça sugestões durante a entrada com o datalist

O elemento `datalist` não é um tipo de entrada, mas uma lista de valores de entrada sugeridos
para associar com um campo de formulário. Permite que o navegador sugira opções de
preenchimento automático conforme o usuário digita. Diferente de elementos select onde os usuários devem verificar longas
listas para encontrar o valor que estão procurando e os limita apenas a essas
listas, o elemento `datalist` fornece dicas conforme o usuário digita.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="datalist" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

Observação: Os valores  <code>datalist</code> são fornecidos como sugestões e o usuário não fica restrito às sugestões fornecidas.

## Rotule e nomeie as entradas corretamente

Preencher formulários em celulares não é fácil. Os melhores formulários são aqueles com menos entradas. Bons formulários fornecem tipos de entrada semântica. As teclas de acesso devem ser adaptadas aos tipo de entrada do usuário; o usuário escolhe uma data em um calendário. Mantenha seu usuário informado. O usuário deve ser notificado pelas ferramentas de validação sobre o que fazer antes de enviar o formulário.


### TL;DR {: .hide-from-toc }
- Sempre use  <code>label</code> em entradas de formulário e certifique-se de que elas estejam visíveis quando o campo estiver em foco.
- Use  <code>placeholder</code> para fornecer orientações sobre o que é esperado.
- Para ajudar o navegador a preencher automaticamente o formulário, use o  <code>name</code> estabelecido para elementos e inclua o atributo  <code>autocomplete</code>.


### A importância dos rótulos

O elemento `label` fornece orientações para o usuário, dizendo qual
informação é necessária em um elemento do formulário.  Cada `label` é associado a um
elemento de entrada colocando-o dentro do elemento `label` ou usando o atributo "`for`"
.  Aplicar rótulos em elementos de formulário também ajuda a melhorar o tamanho
de destino do toque: o usuário pode tocar no rótulo ou na entrada para colocar
o foco no elemento de entrada.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="labels" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### Posicionamento e dimensionamento do rótulo

Rótulos e entradas devem ser grandes o suficiente para facilitar a seleção.  Em portas de visualização
verticais, os rótulos de campo devem estar acima dos elementos de entrada e ao lado deles na
horizontal.  Certifique-se de que os rótulos de campo e as caixas de entrada correspondentes estejam visíveis ao
mesmo tempo.  Tenha cuidado com gerenciadores de rolagem personalizados que podem rolar elementos
de entrada no topo da página ocultando o rótulo ou o teclado virtual pode ocultar rótulos
que estiverem abaixo dos elementos de entrada.

### Use marcadores

O atributo placeholder fornece uma dica para o usuário sobre o que é esperado na
entrada, geralmente exibindo o valor como texto claro até que o usuário
comece a digitar no elemento.

<input type="text" placeholder="MM-YYYY">


    <input type="text" placeholder="MM-YYYY" ...>


Warning: Os marcadores desaparecem assim que o usuário começa a digitar em um elemento, portanto, não são uma substituição para rótulos.  Eles devem ser usados como um guia para ajudar a orientar o usuário no formato e conteúdo exigidos.

### Use metadados para ativar o preenchimento automático

O usuário gosta quando os sites economizam tempo preenchendo automaticamente campos
comuns como nomes, endereços de e-mail e outros campos usados com frequência. Além disso, isso ajuda
a reduzir possíveis erros de entrada, especialmente em teclados virtuais e
pequenos dispositivos.

Os navegadores podem usar heurística para determinar quais campos podem
[preencher automaticamente](https://support.google.com/chrome/answer/142893)
 [com base nos dados especificados anteriormente pelo usuário](https://support.google.com/chrome/answer/142893)
 e você pode dar dicas para o navegador com os atributos `name` e 
`autocomplete` em cada elemento de entrada.

Observação: O Chrome exige que elementos `input` sejam inseridos em uma tag `<form>` para ativar o
preenchimento automático. Se eles não estiverem inseridos em uma tag `form`, o Chrome oferecerá
sugestões, mas **não** preencherá o formulário.

Por exemplo, para avisar o navegador que ele deve preencher automaticamente o formulário com
o nome do usuário, endereço de e-mail e telefone, você deve usar:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="autocomplete" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }



### Valores de atributo `name` e `autocomplete` de entrada recomendados

Os valores de atributo `autocomplete` fazem parte do [Padrão HTML WHATWG](https://html.spec.whatwg.org/multipage/forms.html#autofill) atual. Abaixo estão os atributos `autocomplete` usados com frequência.

Os atributos `autocomplete` podem vir acompanhados de um nome de seção, como **`shipping `**`given-name` ou **`billing `**`street-address`. O navegador preencherá automaticamente diferentes seções de forma individual, não como um formulário contínuo.

<table>
  <thead>
    <tr>
      <th data-th="Content type">Tipo de conteúdo</th>
      <th data-th="name attribute">Atributo <code>name</code></th>
      <th data-th="autocomplete attribute">Atributo <code>autocomplete</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Content type">Nome</td>
      <td data-th="name attribute">
        <code>name</code>
        <code>fname</code>
        <code>mname</code>
        <code>lname</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>name</code> (nome completo)</li>
          <li><code>given-name</code> (primeiro nome)</li>
          <li><code>additional-name</code> (nome do meio)</li>
          <li><code>family-name</code> (sobrenome)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">E-mail</td>
      <td data-th="name attribute"><code>email</code></td>
      <td data-th="autocomplete attribute"><code>email</code></td>
    </tr>
    <tr>
      <td data-th="Content type">Endereço</td>
      <td data-th="name attribute">
        <code>address</code>
        <code>city</code>
        <code>region</code>
        <code>province</code>
        <code>state</code>
        <code>zip</code>
        <code>zip2</code>
        <code>postal</code>
        <code>country</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li>Para uma entrada de endereço:
            <ul>
              <li><code>street-address</code></li>
            </ul>
          </li>
          <li>Para duas entradas de endereço:
            <ul>
              <li><code>address-line1</code></li>
              <li><code>address-line2</code></li>
            </ul>
          </li>
          <li><code>address-level1</code> (estado ou província)</li>
          <li><code>address-level2</code> (cidade)</li>
          <li><code>postal-code</code> (código postal)</li>
          <li><code>country</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Telefone</td>
      <td data-th="name attribute">
        <code>phone</code>
        <code>mobile</code>
        <code>country-code</code>
        <code>area-code</code>
        <code>exchange</code>
        <code>suffix</code>
        <code>ext</code>
      </td>
      <td data-th="autocomplete attribute"><code>tel</code></td>
    </tr>
    <tr>
      <td data-th="Content type">Cartão de crédito</td>
      <td data-th="name attribute">
        <code>ccname</code>
        <code>cardnumber</code>
        <code>cvc</code>
        <code>ccmonth</code>
        <code>ccyear</code>
        <code>exp-date</code>
        <code>card-type</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>cc-name</code></li>
          <li><code>cc-number</code></li>
          <li><code>cc-csc</code></li>
          <li><code>cc-exp-month</code></li>
          <li><code>cc-exp-year</code></li>
          <li><code>cc-exp</code></li>
          <li><code>cc-type</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Nomes de usuário</td>
      <td data-th="name attribute">
        <code>username</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>username</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Senhas</td>
      <td data-th="name attribute">
        <code>password</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>current-password</code> (para formulários de login)</li>
          <li><code>new-password</code> (para formulários de inscrição e de alteração de senha)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


Observação: Use somente  <code>street-address</code> ou  <code>address-line1</code> e  <code>address-line2</code>. <code>address-level1</code> e <code>address-level2</code> são necessários apenas se forem exigidos pelo seu formato de endereço.


### O atributo `autofocus`

Em alguns formulários, como a página inicial do Google, onde a única coisa que
o usuário deve fazer é preencher um determinado campo, é possível adicionar o atributo `autofocus`
.  Quando ativado, o navegador desktop move o foco imediatamente para o campo
de entrada, tornando mais fácil para o usuário começar usar o formulário com mais rapidez.  Navegadores
móveis ignoram o atributo `autofocus`, para evitar que o teclado apareça
aleatoriamente.

Tenha cuidado ao usar o atributo autofocus porque ele roubará o foco do teclado
e possivelmente evitará que o caractere backspace seja usado para
navegação.


    <input type="text" autofocus ...>
    


## Forneça validação em tempo real

A validação de dados em tempo real não apenas ajuda a manter seus dados limpos, mas também ajuda a melhorar a experiência do usuário.  Os navegadores modernos têm várias ferramentas integradas para ajudar a fornecer validação de dados em tempo real e podem evitar que o usuário envie um formulário inválido.  Use dicas visuais para indicar se um formulário foi preenchido corretamente.


### TL;DR {: .hide-from-toc }
- Utilize os atributos de validação integrados do navegador, como  <code>pattern</code>,  <code>required</code>,  <code>min</code>,  <code>max</code> etc.
- Use JavaScript e Constraints Validation API para requisitos de validação mais complexos.
- Mostre erros de validação em tempo real e, se o usuário tentar enviar um formulário inválido, mostre todos os campos que precisam ser corrigidos.


### Use esses atributos para validar a entrada

#### O atributo `pattern`

O atributo `pattern` especifica uma [expressão regular](https://en.wikipedia.org/wiki/Regular_expression)
usada para validar um campo de entrada. Por exemplo, para validar um código postal dos EUA
(5 dígitos, algumas vezes seguido por um traço e mais 4 dígitos), precisaríamos definir
o `pattern` da seguinte forma:


    <input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

##### Padrões de expressão regular comuns

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Expressão regular</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Description">Endereço de correspondência</td>
      <td data-th="Regular expression"><code>[a-zA-Z\d\s\-\,\#\.\+]+</code></td>
    </tr>
    <tr>
      <td data-th="Description">Código postal (EUA)</td>
      <td data-th="Regular expression"><code>^\d{5,6}(?:[-\s]\d{4})?$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Endereço IP (IPv4)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Endereço IP (IPv6)</td>
      <td data-th="Regular expression"><code>^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Endereço IP (ambos)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Número do cartão de crédito</td>
      <td data-th="Regular expression"><code>^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Número do Seguro Social</td>
      <td data-th="Regular expression"><code>^\d{3}-\d{2}-\d{4}$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Número de telefone da América do Norte</td>
      <td data-th="Regular expression"><code>^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$</code></td>
    </tr>
  </tbody>
</table>

#### O atributo `required`

Se o atributo `required` estiver presente, o campo deve conter um valor para
que o formulário possa ser enviado. Por exemplo, para criar o código postal necessário, apenas
adicionamos o atributo necessário:


    <input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

#### Os atributos `min`, `max` e `step`

Para tipos de entrada numérica como um número ou intervalo, assim como entradas de data/hora, pode-se
especificar os valores mínimo e máximo, assim como quanto cada um deve
aumentar/diminuir quando ajustado pelo controle deslizante ou giratório.  Por exemplo, uma
entrada de tamanho de sapato define um tamanho mínimo de 1 e um tamanho máximo de 13, com incrementos
de 0,5


    <input type="number" min="1" max="13" step="0.5" ...>
    

#### O atributo `maxlength`

O atributo `maxlength` pode ser usado para especificar o comprimento máximo de uma entrada ou
caixa de texto e é útil para limitar o tamanho da informação que o
usuário pode fornecer. Por exemplo, se deseja limitar um nome de arquivo a 12 caracteres,
é possível usar o seguinte.


    <input type="text" id="83filename" maxlength="12" ...>
    

#### O atributo `minlength`

O atributo `minlength` pode ser usado para especificar o tamanho mínimo de uma entrada ou
caixa de texto e é útil para se especificar o tamanho mínimo que o usuário deve
fornecer. Por exemplo, se deseja especificar que um nome de arquivo deve ter pelo menos 
8 caracteres, é possível usar o seguinte.


    <input type="text" id="83filename" minlength="8" ...>
    

#### O atributo `novalidate`

Em alguns casos, você pode permitir que o usuário envie o formulário mesmo que ele contenha
entradas inválidas. Para isso, adicione o atributo `novalidate` ao elemento de
formulário ou campos de entrada individuais. Nesse caso, todas as pseudoclasses e
JavaScript APIs ainda permitirão que você verifique se o formulário é válido.


    <form role="form" novalidate>
      <label for="inpEmail">Email address</label>
      <input type="email" ...>
    </form>
    


Success: Mesmo com validação de entrada do lado do cliente, é importante validar dados no servidor para garantir consistência e segurança em seus dados.

### Use JavaScript para validações em tempo real mais complexas

Quando a validação integrada e as expressões regulares não são suficientes, você pode usar
a [Constraint Validation API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation),
uma excelente ferramenta para lidar com validação personalizada.  A API permite que você faça coisas
como definir um erro personalizado, verificar se um elemento é válido e determinar o
motivo pelo qual um elemento é inválido:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Validação de limitação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">Define uma mensagem de validação personalizada e a propriedade  <code>customError</code> do objeto  <code>ValidityState</code> para  <code>true</code>.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">Retorna uma cadeia de caracteres com o motivo da falha da entrada no teste de validação.</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">Retorna  <code>true</code> se o elemento atender a todas as exigências, caso contrário,  <code>false</code>. Decidir como a página responde quando a verificação retorna  <code>false</code> é responsabilidade do desenvolvedor.</td>
    </tr>
    <tr>
      <td data-th="API"><code>reportValidity()</code></td>
      <td data-th="Description">Retorna  <code>true</code> se o elemento atender a todas as exigências, caso contrário,  <code>false</code>. Quando a página responde  <code>false</code>, problemas de restrição são relatados ao usuário.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">Retorna um objeto  <code>ValidityState</code> que representa os estados de validação do elemento.</td>
    </tr>
  </tbody>
</table>



### Defina mensagens de validação personalizadas

Se a validação de um campo falhar, use `setCustomValidity()` para marcar o campo inválido
e explique porque o campo não foi validado.  Por exemplo, um formulário de inscrição pode
pedir que o usuário confirme seu endereço de email inserindo-o duas vezes.  Use o evento blur
na segunda entrada para validar as duas entradas e defina a resposta
adequada.  Por exemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="customvalidation" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### Impeça o envio de formulários inválidos

Como nem todos os navegadores impedem que o usuário envie o formulário se ele contiver
dados inválidos, você deve interceptar o evento submit e usar `checkValidity()`
no elemento form para determinar se o formulário é válido.  Por exemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="preventsubmission" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### Mostre feedback em tempo real

É útil fornecer uma indicação visual em cada campo para informar se
o usuário preencheu o formulário corretamente antes do envio.
O HTML5 também introduz diversas novas pseudoclasses que podem ser usadas para estilizar
as entradas com base em seus valores ou atributos.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Feedback em tempo real</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Pseudo-class"><code>:valid</code></td>
      <td data-th="Use">Define explicitamente o estilo de uma entrada a ser usado quando o valor atende todos os requisitos de validação.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:invalid</code></td>
      <td data-th="Use">Define explicitamente o estilo de uma entrada a ser usado quando o valor não atende todos os requisitos de validação.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:required</code></td>
      <td data-th="Use">Define explicitamente o estilo de um elemento de entrada que tem o atributo required definido.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:optional</code></td>
      <td data-th="Use">Define explicitamente o estilo de um elemento de entrada que não tem o atributo required definido.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:in-range</code></td>
      <td data-th="Use">Define explicitamente o estilo de um elemento de entrada numérica quando o valor está no intervalo.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:out-of-range</code></td>
      <td data-th="Use">Define explicitamente o estilo de um elemento de entrada numérica quando o valor não estiver dentro do intervalo.</td>
    </tr>
  </tbody>
</table>

A validação ocorre imediatamente, o que significa que quando a página é carregada, os campos
podem ser marcados como inválidos, mesmo se o usuário ainda não tiver terminado o preenchimento
.  Também significa que conforme o usuário digita, é possível que ele veja o
estilo inválido ao digitar. Para evitar esse problema, combine o CSS com
JavaScript para mostrar o estilo inválido apenas quando o usuário já tiver visitado o campo.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="invalidstyle" adjust_indentation="auto" %}
</pre>
<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="initinputs" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }


Success: Mostre ao usuário todos os problemas no formulário de uma vez em vez de um a um.




{# wf_devsite_translation #}
