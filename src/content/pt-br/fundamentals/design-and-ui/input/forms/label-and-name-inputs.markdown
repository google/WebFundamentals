---
title: "Label and name inputs properly"
description: "Preencher formulários em celulares não é fácil. Os melhores formulários são aqueles com menos entradas."
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

### A importância das etiquetas

O elemento `label` fornece orientação para o usuário, dizendo qual
informação é necessária em um elemento de formulário.  Cada `label` é associado a um
elemento de entrada colocando-o dentro do elemento `label` ou usando o atributo "`for`"
.  Aplicar etiquetas para elementos de formulário também ajuda a melhorar o tamanho
alvo do toque: o usuário pode tocar na etiqueta ou entrada para colocar
foco no elemento de entrada.

{% include_code src=_code/order.html snippet=labels %}

### Posicionamento e dimensionamento da etiqueta

As etiquetas e entradas devem ser grandes o suficiente para facilitar a seleção.  Em portas de visualização
verticais, as etiquetas de campo devem estar acima dos elementos de entrada e ao lado deles na
horizontal.  Certifique-se de que as etiquetas de campo e as caixas de entrada correspondente estejam visíveis ao
mesmo tempo.  Tenha cuidado com os manipuladores de rolagem personalizados que podem rolar elementos
de entrada no topo da página ocultando a etiquetas ou teclado virtual pode ocultar etiquetas 
que estiverem abaixo dos elementos de entrada.

### Use espaços reservados

O atributo placeholder fornece uma dica para o usuário sobre o que é esperado na
entrada, geralmente exibindo o valor como texto claro até que o usuário
comece a digitar no elemento.

<input type="text" placeholder="MM-YYYY">

{% highlight html%}
<input type="text" placeholder="MM-YYYY" ...>
{% endhighlight %}


{% include shared/remember.liquid title="Remember" list=page.notes.use-placeholders %}

### Use metadados para habilitar o preenchimento automático

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


### Valores de atributo `name` e `autocomplete` de entrada recomendados


Os valores de atributo `autocomplete` fazem parte do [Padrão HTML WHATWG] atual(https://html.spec.whatwg.org/multipage/forms.html#autofill). Abaixo estão os atributos `autocomplete` usados com frequência.

Os atributos `autocomplete` podem vir acompanhados de um nome de seção, como **`shipping `**`given-name` ou **`billing `**`street-address`. O navegador preencherá automaticamente diferentes seções separadamente e não como formulário contínuo.

<table class="mdl-data-table mdl-js-data-table">
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

### O atributo `autofocus`

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


