---
title: "Provide real-time validation"
description: "A validação de dados em tempo real não apenas ajuda a manter seus dados limpos, mas também ajuda a melhorar a experiência do usuário.  Os navegadores modernos têm várias ferramentas integradas para ajudar a fornecer validação de dados em tempo real e podem evitar que o usuário envie um formulário inválido.  Use dicas visuais para indicar se um formulário foi preenchido corretamente."
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

### Use esses atributos para validar a entrada

#### O atributo `pattern`

O atributo `pattern` especifica uma [expressão
regular](http://en.wikipedia.org/wiki/Regular_expression) usada para validar um
campo de entrada. Por exemplo, para validar um código postal dos EUA (5 dígitos, algumas vezes
seguido por um traço e mais 4 dígitos), precisaríamos definir o `pattern` como 
a seguir:

{% highlight html %}
<input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

##### Padrões de expressão regular comum

<table class="mdl-data-table mdl-js-data-table">
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

#### O atributo `required`

Se o atributo `required` estiver presente, o campo deve conter um valor antes
que o formulário seja enviado. Por exemplo, para criar o código postal necessário, apenas
adicionamos o atributo necessário:

{% highlight html %}
<input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

#### Os atributos `min`, `max` e `step`

Para tipos de entrada numérica como número ou intervalo, assim como entradas de data/hora, pode-se
especificar os valores mínimo e máximo, assim como quanto cada um deve
aumentar/diminuir quando ajustado pelo controle deslizante ou giratório.  Por exemplo, uma
entrada de tamanho de sapato define um tamanho mínimo de 1 e um tamanho máximo de 13, com uma diferença
de 0,5

{% highlight html %}
<input type="number" min="1" max="13" step="0.5" ...>
{% endhighlight %}

#### O atributo `maxlength`

O atributo `maxlength` pode ser usado para especificar o comprimento máximo de uma entrada ou
caixa de texto e é útil para se limitar o comprimento da informação que o
usuário pode fornecer. Por exemplo, se deseja limitar um nome de arquivo para 12 caracteres,
é possível usar o seguinte.

{% highlight html %}
<input type="text" id="83filename" maxlength="12" ...>
{% endhighlight %}

#### O atributo `minlength`

O atributo `minlength` pode ser usado para especificar o comprimento mínimo de uma entrada ou
caixa de texto e é útil para se especificar o comprimento mínimo que o usuário deve
fornecer. Por exemplo, se deseja especificar que um nome de arquivo exige pelo menos 
8 caracteres, é possível usar o seguinte.

{% highlight html %}
<input type="text" id="83filename" minlength="8" ...>
{% endhighlight %}

#### O atributo `novalidate`

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

### Use JavaScript para validação em tempo real mais complexa

Quando a validação integrada e as expressões regulares não são suficientes, você pode usar
a [API do Constraint Validation](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation),
uma excelente ferramenta para lidar com validação personalizada.  A API permite que você faça coisas
como definir um erro personalizado, verificar se um elemento é válido e determinar o
motivo pelo qual um elemento é inválido:

<table class="mdl-data-table mdl-js-data-table">
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

#### Defina mensagens de validação personalizadas

Se a validação de um campo falhar, use `setCustomValidity()` para marcar o campo inválido
e explique porquê o campo não foi validado.  Por exemplo, um formulário de inscrição pode
pedir que o usuário confirme seu endereço de email inserindo-o duas vezes.  Use o evento blur
na segunda entrada para validar as duas entradas e defina a resposta
adequada.  Por exemplo:

{% include_code src=_code/order.html snippet=customvalidation lang=javascript %}

#### Evite o envio de formulários inválidos

Como nem todos os navegadores evitam que o usuário envie o formulário se houver
dados inválidos, você deve verificar o evento de envio e usar `checkValidity()`
no elemento form para determinar se o formulário é válido.  Por exemplo:

{% include_code src=_code/order.html snippet=preventsubmission lang=javascript %}

### Mostre comentários em tempo real

Recomenda-se fornecer uma indicação visual em cada campo que indica se
o usuário concluiu o formulário corretamente antes de enviar.
O HTML5 também introduz uma variedade de pseudo-classes que podem ser usadas para entradas de
estilo com base em seu valor ou atributos.

<table class="mdl-data-table mdl-js-data-table">
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


