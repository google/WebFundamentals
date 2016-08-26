project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Agilize a entrada de informações usando o tipo de entrada correto. Os usuários gostam de sites que apresentem automaticamente teclados numéricos para inserir números de telefone ou quando os campos avançam automaticamente conforme são preenchidos. Procure por oportunidades de eliminar toques desnecessários em seus formulários.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Choose the best input type {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Agilize a entrada de informações usando o tipo de entrada correto. Os usuários gostam de sites que apresentem automaticamente teclados numéricos para inserir números de telefone ou quando os campos avançam automaticamente conforme são preenchidos. Procure por oportunidades de eliminar toques desnecessários em seus formulários.


## TL;DR {: .hide-from-toc }
- Selecione o tipo de entrada mais adequado para seus dados para simplificar a entrada.
- Ofereça sugestões conforme o usuário digita com o elemento <code>datalist</code>.


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

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="datalist" %}
</pre>

<!-- TODO: Verify note type! -->
Note: Os valores <code>datalist</code> são fornecidos como sugestões e o usuário não fica restrito às sugestões fornecidas.


