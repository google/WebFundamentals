project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Preencher formulários em celulares não é fácil. Os melhores formulários são aqueles com menos entradas.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-04-30 #}

# Create Amazing Forms {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



Preencher formulários em celulares não é fácil. Os melhores formulários são aqueles com menos entradas. Bons formulários fornecem tipos de entrada semântica. As teclas de acesso devem ser adaptadas aos tipo de entrada do usuário; o usuário escolhe uma data em um calendário. Mantenha seu usuário informado. O usuário deve ser notificado pelas ferramentas de validação sobre o que fazer antes de enviar o formulário.

Para obter uma visão geral dos guias sobre como criar formulários eficientes, veja o vídeo abaixo.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iYYHRwLqrKM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>



## Design efficient forms 




Crie formulários eficientes evitando ações repetidas, perguntando apenas o necessária e oriente o usuário mostrando o ponto em que se encontra em formulários de várias partes.


### TL;DR {: .hide-from-toc }
- Use dados existentes para oferecer sugestões ao preencher campos e certifique-se de habilitar o preenchimento automático.
- Use barras de progresso claramente indicadas para ajudar os usuários a finalizar formulários de várias partes.
- Forneça um calendário visual para que os usuários não precisem sair do seu site e ir para o aplicativo de calendário em seus smartphones.


### Minimize ações e campos repetidos

Certifique-se de que seus formulários não têm ações repetidas, e apenas a quantidade de campos 
necessária e tire proveito do 
[preenchimento automático](/web/fundamentals/input/form/label-and-name-inputs.html#use-metadata-to-enable-auto-complete),
para que o usuário possa facilmente preencher os formulários com dados sugeridos.

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Mostre o progresso em formulários de várias partes">
  <figcaption>
    No site Progressive.com, a primeira informação solicitada ao usuário é o CEP. Dessa forma, a próxima parte do formulário é preenchida automaticamente.
  </figcaption>
</figure>

Busque oportunidades de sugerir informações já conhecidas ou que podem
ser antecipadas para evitar que o usuário precise fornecê-las.  Por exemplo, 
sugerir o endereço de envio com o último endereço de envio fornecido pelo
usuário.

### Mostre ao usuário seu progresso

As barras de progresso e menus devem transmitir precisamente o progresso geral em 
formulários e processos de várias etapas.

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Mostre o progresso em formulários de várias partes">
  <figcaption>
    - Use barras de progresso claramente indicadas para ajudar o usuário a finalizar formulários de várias partes.
  </figcaption>
</figure>

Se você inserir um formulário complexo demais em uma etapa inicial, o usuário 
provavelmente sairá de seu site antes de terminar o processo. 


### Forneça calendários visuais ao selecionar datas

O usuário frequentemente precisa de maior contexto ao para agendamentos e datas de viagem. 
Para facilitar e evitar que saiam do seu site para verificar o 
aplicativo de calendário, forneça um calendário visual com indicação clara para selecionar 
datas de início e término. 

<figure>
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="Site do hotel com facilidade de uso do calendário">
  <figcaption>
    Site do hotel com facilidade de uso do widget de calendário para selecionar datas.
  </figcaption>
</figure>




## Choose the best input type 



Agilize a entrada de informações usando o tipo de entrada correto. Os usuários gostam de sites que apresentem automaticamente teclados numéricos para inserir números de telefone ou quando os campos avançam automaticamente conforme são preenchidos. Procure por oportunidades de eliminar toques desnecessários em seus formulários.


### TL;DR {: .hide-from-toc }
- Selecione o tipo de entrada mais adequado para seus dados para simplificar a entrada.
- Ofereça sugestões conforme o usuário digita com o elemento <code>datalist</code>.


#### Tipos de entrada HTML5

O HTML5 introduziu vários tipos de entrada novos. Esses novos tipos de entrada dão dicas
para o navegador sobre qual tipo de layout de teclado exibir para teclados
na tela.  Os usuários podem inserir mais facilmente a informação solicitada sem
precisar alterar seu teclado e ver apenas as teclas adequadas para esse tipo de
entrada.

<table>
  <thead>
    <tr>
      <th data-th="Input type">Entrada <code>type</code></th>
      <th data-th="Typical keyboard">Teclado comum</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> Para inserir uma URL. Deve começar com um esquema de URI válido,
        por exemplo, <code>http://</code>, <code>ftp://</code> ou <code>mailto:</code>.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>Para inserir números de telefone. <b>Não</b>
        força uma determinada sintaxe para validação, portanto, se você deseja garantir
        um determinado formato, é possível usar um padrão.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>Para inserir endereços de email e dicas de que
        a @ deve ser mostrada no teclado por padrão. Você pode adicionar o
        atributo multiple se mais de um endereço de email será fornecido.
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

#### Ofereça sugestões durante a entrada com o datalist

O elemento `datalist` não é um tipo de entrada, mas uma lista de valores de entrada sugeridos
para associar com um campo de formulário. Permite que o navegador sugira opções de
preenchimento automático conforme o usuário digita. Diferente de elementos select onde os usuários devem verificar longas
listas para encontrar o valor que estão procurando e os limita apenas a essas
listas, o elemento `datalist` fornece dicas conforme o usuário digita.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="datalist" adjust_indentation="auto" %}
</pre>

Note: Os valores <code>datalist</code> são fornecidos como sugestões e o usuário não fica restrito às sugestões fornecidas.


---
title: "Label and name inputs properly"
updated_on: 2015-03-27
key-takeaways:
  label-and-name:
    - "Sempre use <code>label</code> em entradas de formulário e certifique-se de que estão visíveis quando o campo estiver em foco."
    - "Use <code>placeholder</code> para fornecer orientações sobre o que é esperado."
    - "Para ajudar o navegador a preencher automaticamente o formulário, use o <code>name</code> estabelecido para elementos e inclua o atributo <code>autocomplete</code>."
notes:
  use-placeholders:
    - "Os espaços reservados desaparecem assim que o usuário começa a digitar em um elemento, portanto, eles não são uma substituição para etiquetas.  Eles devem ser usados como um auxílio para ajudar a orientar o usuário no formato e conteúdo exigidos."
  recommend-input:
    - "Use apenas <code>street-address</code> ou <code>address-line1</code> e <code>address-line2</code>"
    - "<code>address-level1</code> e <code>address-level2</code> são necessários apenas se forem exigidos pelo seu formato de endereço."
  use-datalist:
    - "Os valores <code>datalist</code> são fornecidos como sugestões e o usuário não fica restrito às sugestões fornecidas."
  provide-real-time-validation:
    - "Mesmo com validação de entrada do lado do cliente, é importante validar dados no servidor para garantir consistência e segurança em seus dados."
  show-all-errors:
    - Mostre ao usuário todos os problemas no formulário de uma vez ao invés de mostrá-los um a um.
  request-auto-complete-flow:
    - "Ao solicitar qualquer tipo de informação pessoal ou dados de cartão de crédito, certifique-se de que a página é disponibilizada via SSL.  Caso contrário, o diálogo avisará o usuário que suas informações podem não estar seguras."
comments:
  # OBSERVAÇÃO: Se os títulos da seção ou URL mudarem, os seguintes shortlinks devem ser atualizados
  - g.co/mobilesiteprinciple17a
---
<p class="intro">
  Preencher formulários em celulares não é fácil. Os melhores formulários são aqueles com menos entradas. Bons formulários fornecem tipos de entrada semântica. As teclas de acesso devem ser adaptadas aos tipo de entrada do usuário; o usuário escolhe uma data em um calendário. Mantenha seu usuário informado. O usuário deve ser notificado pelas ferramentas de validação sobre o que fazer antes de enviar o formulário.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.label-and-name %}

#### A importância das etiquetas

O elemento `label` fornece orientação para o usuário, dizendo qual
informação é necessária em um elemento de formulário.  Cada `label` é associado a um
elemento de entrada colocando-o dentro do elemento `label` ou usando o atributo "`for`"
.  Aplicar etiquetas para elementos de formulário também ajuda a melhorar o tamanho
alvo do toque: o usuário pode tocar na etiqueta ou entrada para colocar
foco no elemento de entrada.

{% include_code src=_code/order.html snippet=labels %}

#### Posicionamento e dimensionamento da etiqueta

As etiquetas e entradas devem ser grandes o suficiente para facilitar a seleção.  Em portas de visualização
verticais, as etiquetas de campo devem estar acima dos elementos de entrada e ao lado deles na
horizontal.  Certifique-se de que as etiquetas de campo e as caixas de entrada correspondente estejam visíveis ao
mesmo tempo.  Tenha cuidado com os manipuladores de rolagem personalizados que podem rolar elementos
de entrada no topo da página ocultando a etiquetas ou teclado virtual pode ocultar etiquetas 
que estiverem abaixo dos elementos de entrada.

#### Use espaços reservados

O atributo placeholder fornece uma dica para o usuário sobre o que é esperado na
entrada, geralmente exibindo o valor como texto claro até que o usuário
comece a digitar no elemento.

<input type="text" placeholder="MM-YYYY">

{% highlight html%}
<input type="text" placeholder="MM-YYYY" ...>
{% endhighlight %}


{% include shared/remember.liquid title="Remember" list=page.notes.use-placeholders %}

#### Use metadados para habilitar o preenchimento automático

O usuário gosta quando os sites economizam tempo preenchendo automaticamente campos
comuns como nomes, endereços de email e outros campos usados com frequência. Além disso, ajuda
a reduzir possíveis erros de entrada, especialmente em teclados virtuais e
pequenos dispositivos.

Os navegadores podem usar heurística para determinar quais campos podem
[preencher automaticamente](https://support.google.com/chrome/answer/142893) [com base nos
dados especificados anteriormente pelo
usuário](https://support.google.com/chrome/answer/142893) e você pode dar dicas
para o navegador com os atributos name e autocomplete
em cada elemento de entrada.

Por exemplo, para avisar o navegador que ele deve preencher automaticamente o formulário com
o nome do usuário, endereço de email e telefone, você deve usar:

{% include_code src=_code/order.html snippet=autocomplete %}


#### Valores de atributo `name` e `autocomplete` de entrada recomendados


Os valores de atributo `autocomplete` fazem parte do [Padrão HTML WHATWG] atual(https://html.spec.whatwg.org/multipage/forms.html#autofill). Abaixo estão os atributos `autocomplete` usados com frequência.

Os atributos `autocomplete` podem vir acompanhados de um nome de seção, como **`shipping `**`given-name` ou **`billing `**`street-address`. O navegador preencherá automaticamente diferentes seções separadamente e não como formulário contínuo.

<table>
    <thead>
    <tr>
      <th data-th="Content type">Tipo de conteúdo</th>
      Atributo <th data-th="name attribute"><code>name</code></th>
      Atributo <th data-th="autocomplete attribute"><code>autocomplete</code></th>
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
      <td data-th="Content type">Email</td>
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
  </tbody>
</table>

{% include shared/remember.liquid title="Remember" list=page.remember.recommend-input %}

#### O atributo `autofocus`

Em alguns formulários, por exemplo, a página inicial do Google, onde a única coisa que
o usuário deve fazer é preencher um determinado campo, é possível adicionar o atributo `autofocus`
.  Quando ativado, o navegador desktop move o foco imediatamente para o campo
de entrada, tornando mais fácil para o usuário começar usar o formulário com mais rapidez.  Navegadores
móveis ignoram o atributo `autofocus`, para evitar que o teclado apareça
aleatoriamente.

Tenha cuidado ao usar o atributo autofocus porque roubará o foco do teclado
e possivelmente evitará que o caractere backspace seja usado para
navegação.

{% highlight html %}
<input type="text" autofocus ...>
{% endhighlight %}


---
title: "Provide real-time validation"
updated_on: 2014-10-21
key-takeaways:
  provide-real-time-validation:
    - "Tire partido de atributos de validação integrados do navegador como <code>pattern</code>, <code>required</code>, <code>min</code>, <code>max</code>, etc."
    - "Use JavaScript e a API do Constraints Validation para requisitos de validação mais complexos."
    - "Mostre erros de validação em tempo real e se o usuário tentar enviar um formulário inválido, mostre todos os campos que precisam ser corrigidos."
notes:
  use-placeholders:
    - "Os espaços reservados desaparecem assim que o foco é colocado em um elemento, portanto não substituem etiquetas.  Eles devem ser usados como um auxílio para ajudar a orientar o usuário no formato e conteúdo exigidos."
  recommend-input:
    - "O preenchimento automático funciona apenas quando o método de formulário é mensagem."
  use-datalist:
    - "Os valores <code>datalist</code> são fornecidos como sugestões e o usuário não fica restrito às sugestões fornecidas."
  provide-real-time-validation:
    - "Mesmo com validação de entrada do lado do cliente, é importante validar dados no servidor para garantir consistência e segurança em seus dados."
  show-all-errors:
    - "Mostre ao usuário todos os problemas no formulário de uma vez ao invés de mostrá-los um a um."
  request-auto-complete-flow:
    - "Ao solicitar qualquer tipo de informação pessoal ou dados de cartão de crédito, certifique-se de que a página é disponibilizada via SSL.  Caso contrário, o diálogo avisará o usuário que suas informações podem não estar seguras."
comments:
  # OBSERVAÇÃO: Se os títulos da seção ou URL mudarem, os seguintes shortlinks devem ser atualizados
  - g.co/mobilesiteprinciple17b
---

<p class="intro">
  A validação de dados em tempo real não apenas ajuda a manter seus dados limpos, mas também ajuda a melhorar a experiência do usuário.  Os navegadores modernos têm várias ferramentas integradas para ajudar a fornecer validação de dados em tempo real e podem evitar que o usuário envie um formulário inválido.  Use dicas visuais para indicar se um formulário foi preenchido corretamente.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.provide-real-time-validation %}

#### Use esses atributos para validar a entrada

##### O atributo `pattern`

O atributo `pattern` especifica uma [expressão
regular](http://en.wikipedia.org/wiki/Regular_expression) usada para validar um
campo de entrada. Por exemplo, para validar um código postal dos EUA (5 dígitos, algumas vezes
seguido por um traço e mais 4 dígitos), precisaríamos definir o `pattern` como 
a seguir:

{% highlight html %}
<input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

###### Padrões de expressão regular comum

<table>
  <thead>
    <tr>
      <th data-th="Description">Descrição</th>
      <th data-th="Regular expression">Expressão regular</th>
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
      <td data-th="Description">Endereço de IP (IPv4)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$</code></td>
    </tr>
    
<tr>
      <td data-th="Description">Endereço de IP (IPv6)</td>
      <td data-th="Regular expression"><code>^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    
<tr>
      <td data-th="Description">Endereço de IP (ambos)</td>
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

##### O atributo `required`

Se o atributo `required` estiver presente, o campo deve conter um valor antes
que o formulário seja enviado. Por exemplo, para criar o código postal necessário, apenas
adicionamos o atributo necessário:

{% highlight html %}
<input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

##### Os atributos `min`, `max` e `step`

Para tipos de entrada numérica como número ou intervalo, assim como entradas de data/hora, pode-se
especificar os valores mínimo e máximo, assim como quanto cada um deve
aumentar/diminuir quando ajustado pelo controle deslizante ou giratório.  Por exemplo, uma
entrada de tamanho de sapato define um tamanho mínimo de 1 e um tamanho máximo de 13, com uma diferença
de 0,5

{% highlight html %}
<input type="number" min="1" max="13" step="0.5" ...>
{% endhighlight %}

##### O atributo `maxlength`

O atributo `maxlength` pode ser usado para especificar o comprimento máximo de uma entrada ou
caixa de texto e é útil para se limitar o comprimento da informação que o
usuário pode fornecer. Por exemplo, se deseja limitar um nome de arquivo para 12 caracteres,
é possível usar o seguinte.

{% highlight html %}
<input type="text" id="83filename" maxlength="12" ...>
{% endhighlight %}

##### O atributo `minlength`

O atributo `minlength` pode ser usado para especificar o comprimento mínimo de uma entrada ou
caixa de texto e é útil para se especificar o comprimento mínimo que o usuário deve
fornecer. Por exemplo, se deseja especificar que um nome de arquivo exige pelo menos 
8 caracteres, é possível usar o seguinte.

{% highlight html %}
<input type="text" id="83filename" minlength="8" ...>
{% endhighlight %}

##### O atributo `novalidate`

Em alguns casos, pode permitir que o usuário envie o formulário mesmo contendo
 entradas inválidas. Para isso, adicione o atributo `novalidate` ao elemento de
formulário ou campos de entrada individuais. Nesse caso, todas as pseudo classes e
APIs do JavaScript ainda permitirão que você verifique se o formulário é válido.

{% highlight html %}
<form role="form" novalidate>
  <label for="inpEmail">Email address</label>
  <input type="email" ...>
</form>
{% endhighlight %}

{% include shared/remember.liquid title="Remember" list=page.notes.provide-real-time-validation %}

#### Use JavaScript para validação em tempo real mais complexa

Quando a validação integrada e as expressões regulares não são suficientes, você pode usar
a [API do Constraint Validation](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation),
uma excelente ferramenta para lidar com validação personalizada.  A API permite que você faça coisas
como definir um erro personalizado, verificar se um elemento é válido e determinar o
motivo pelo qual um elemento é inválido:

<table>
  <thead>
    <tr>
      <th data-th="API">API</th>
      <th data-th="Description">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">Define uma mensagem de validação personalizada e a propriedade <code>customError</code> do objeto <code>ValidityState</code> para <code>true</code>.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">Retorna uma cadeia de caracteres com o motivo da falha da entrada no teste de validação.</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">Retorna <code>true</code> se o elemento atender todas as exigências, caso contrário, <code>false</code>. Decidir como a página responde quando a verificação retorna <code>false</code> é responsabilidade do desenvolvedor.</td>
    </tr>
    <tr>
      <td data-th="API"><code>reportValidity()</code></td>
      <td data-th="Description">Retorna <code>true</code> se o elemento atender todas as exigências, caso contrário, <code>false</code>. Quando a página responde <code>false</code>, problemas de restrição são relatados ao usuário.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">Retorna um objeto <code>ValidityState</code> quem representam os estados de validação do elemento.</td>
    </tr>
  </tbody>
</table>

##### Defina mensagens de validação personalizadas

Se a validação de um campo falhar, use `setCustomValidity()` para marcar o campo inválido
e explique porquê o campo não foi validado.  Por exemplo, um formulário de inscrição pode
pedir que o usuário confirme seu endereço de email inserindo-o duas vezes.  Use o evento blur
na segunda entrada para validar as duas entradas e defina a resposta
adequada.  Por exemplo:

{% include_code src=_code/order.html snippet=customvalidation lang=javascript %}

##### Evite o envio de formulários inválidos

Como nem todos os navegadores evitam que o usuário envie o formulário se houver
dados inválidos, você deve verificar o evento de envio e usar `checkValidity()`
no elemento form para determinar se o formulário é válido.  Por exemplo:

{% include_code src=_code/order.html snippet=preventsubmission lang=javascript %}

#### Mostre comentários em tempo real

Recomenda-se fornecer uma indicação visual em cada campo que indica se
o usuário concluiu o formulário corretamente antes de enviar.
O HTML5 também introduz uma variedade de pseudo-classes que podem ser usadas para entradas de
estilo com base em seu valor ou atributos.

<table>
  <thead>
    <tr>
      <th data-th="Pseudo-class">Pseudo-classe</th>
      <th data-th="Use">Use</th>
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

{% include_code src=_code/order.html snippet=invalidstyle lang=css %}
{% include_code src=_code/order.html snippet=initinputs lang=javascript %}

{% include shared/remember.liquid title="Important" list=page.remember.show-all-errors %}




## Simplify checkout with requestAutocomplete API 




Embora o <code>requestAutocomplete</code> tenha sido criado para ajudar o usuário a preencher qualquer formulário, seu uso mais comum nos dias de hoje é no eCommerce, onde o abandono do carrinho de compras na Web móvel <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>pode ser de até 97%</a>. Imagine 97% das pessoas em um supermercado, com um carrinho cheio de coisas, deixando-o e indo embora.


### TL;DR {: .hide-from-toc }
- O <code>requestAutocomplete</code> pode simplificar muito o processo de finalização da compra e melhorar a experiência do usuário.
- Se <code>requestAutocomplete</code> estiver disponível, oculte o formulário de finalização da compra e direcione o usuário diretamente para a página de confirmação.
- Certifique-se de que os campos de entrada incluem o atributo autocomplete adequado.


Em vez confiar em um determinado provedor de pagamentos,
o `requestAutocomplete` solicita detalhes de pagamento (como nome, endereço e informação do cartão de
crédito) a partir do navegador, onde são opcionalmente armazenados
assim como outros campos de preenchimento automático.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="ljYeHwGgzQk"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

#### fluxo do `requestAutocomplete`

A experiência ideal mostra a caixa de diálogo `requestAutocomplete` em vez de carregar a
página que exibe o formulário de finalização da compra. Se tudo correr bem, o usuário não vê
o formulário.  Pode-se adicionar facilmente `requestAutocomplete` aos formulários existentes
sem alteração alguma nos nomes de campos.  Basta adicionar o atributo `autocomplete`
a cada elemento do formulário com o valor adequado e adicionar a função
`requestAutocomplete()` no elemento do formulário. O navegador fará
o resto.

<img src="imgs/rac_flow.png" class="center" alt="Fluxo da solicitação de preenchimento automático">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/rac.html" region_tag="rac"   adjust_indentation="auto" %}
</pre>

A função `requestAutocomplete` no elemento `form` indica que o
navegador deve preencher o formulário.  Como um recurso de segurança, a função
deve ser chamada através de um gesto do usuário, como um toque ou um clique do mouse. Uma caixa de diálogo é
mostrada pedindo a permissão do usuário para preencher os campos e quais detalhes
ele deseja utilizar.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/rac.html" region_tag="handlerac"   adjust_indentation="auto" %}
</pre>

Depois da conclusão do `requestAutocomplete`, a função acionará o evento
`autocomplete` se tiver concluído com êxito ou `autocompleteerror` se
não foi possível preencher o formulário.  Se for concluído com êxito e o formulário
estiver de acordo com as suas necessidades, basta enviá-lo e continuar com a confirmação
final.

Note: Ao solicitar qualquer tipo de informação pessoal ou dados de cartão de crédito, certifique-se de que a página é disponibilizada via SSL.  Caso contrário, o diálogo avisará o usuário que suas informações podem não estar seguras.


