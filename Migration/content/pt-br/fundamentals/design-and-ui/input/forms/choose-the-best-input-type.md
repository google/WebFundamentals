---
title: "Choose the best input type"
description: "Agilize a entrada de informações usando o tipo de entrada correto. Os usuários gostam de sites que apresentem automaticamente teclados numéricos para inserir números de telefone ou quando os campos avançam automaticamente conforme são preenchidos. Procure por oportunidades de eliminar toques desnecessários em seus formulários."
updated_on: 2014-10-21
key-takeaways:
  choose-best-input-type:
    - "Selecione o tipo de entrada mais adequado para seus dados para simplificar a entrada."
    - "Ofereça sugestões conforme o usuário digita com o elemento <code>datalist</code>."
notes:
  use-placeholders:
    - "Os espaços reservados desaparecem assim que o foco é colocado em um elemento, portanto não substituem etiquetas. Eles devem ser usados como um auxílio para ajudar a orientar o usuário no formato e conteúdo exigidos."
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
  - g.co/mobilesiteprinciple14
  - g.co/mobilesiteprinciple15
---
<p class="intro">
  Agilize a entrada de informações usando o tipo de entrada correto. Os usuários gostam de sites que apresentem automaticamente teclados numéricos para inserir números de telefone ou quando os campos avançam automaticamente conforme são preenchidos. Procure por oportunidades de eliminar toques desnecessários em seus formulários.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.choose-best-input-type %}

### Tipos de entrada HTML5

O HTML5 introduziu vários tipos de entrada novos. Esses novos tipos de entrada dão dicas
para o navegador sobre qual tipo de layout de teclado exibir para teclados
na tela.  Os usuários podem inserir mais facilmente a informação solicitada sem
precisar alterar seu teclado e ver apenas as teclas adequadas para esse tipo de
entrada.

<table class="mdl-data-table mdl-js-data-table">
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

### Ofereça sugestões durante a entrada com o datalist

O elemento `datalist` não é um tipo de entrada, mas uma lista de valores de entrada sugeridos
para associar com um campo de formulário. Permite que o navegador sugira opções de
preenchimento automático conforme o usuário digita. Diferente de elementos select onde os usuários devem verificar longas
listas para encontrar o valor que estão procurando e os limita apenas a essas
listas, o elemento `datalist` fornece dicas conforme o usuário digita.

{% include_code src=_code/order.html snippet=datalist %}

{% include shared/remember.liquid title="Remember" list=page.notes.use-datalist %}


