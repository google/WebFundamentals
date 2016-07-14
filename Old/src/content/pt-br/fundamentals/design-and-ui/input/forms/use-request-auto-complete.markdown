---
title: "Simplify checkout with requestAutocomplete API"
description: "Embora o <code>requestAutocomplete</code> tenha sido criado para ajudar o usuário a preencher qualquer formulário, seu uso mais comum nos dias de hoje é no eCommerce, onde o abandono do carrinho de compras na Web móvel <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>pode ser de até 97%</a>."
updated_on: 2014-10-21
key-takeaways:
  use-request-auto-complete:
    - "O <code>requestAutocomplete</code> pode simplificar muito o processo de finalização da compra e melhorar a experiência do usuário."
    - "Se <code>requestAutocomplete</code> estiver disponível, oculte o formulário de finalização da compra e direcione o usuário diretamente para a página de confirmação."
    - "Certifique-se de que os campos de entrada incluem o atributo autocomplete adequado."
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
---

<p class="intro">
  Embora o <code>requestAutocomplete</code> tenha sido criado para ajudar o usuário a preencher qualquer formulário, seu uso mais comum nos dias de hoje é no eCommerce, onde o abandono do carrinho de compras na Web móvel <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>pode ser de até 97%</a>. Imagine 97% das pessoas em um supermercado, com um carrinho cheio de coisas, deixando-o e indo embora.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.use-request-auto-complete %}

Em vez confiar em um determinado provedor de pagamentos,
o `requestAutocomplete` solicita detalhes de pagamento (como nome, endereço e informação do cartão de
crédito) a partir do navegador, onde são opcionalmente armazenados
assim como outros campos de preenchimento automático.

{% ytvideo ljYeHwGgzQk %}

### fluxo do `requestAutocomplete`

A experiência ideal mostra a caixa de diálogo `requestAutocomplete` em vez de carregar a
página que exibe o formulário de finalização da compra. Se tudo correr bem, o usuário não vê
o formulário.  Pode-se adicionar facilmente `requestAutocomplete` aos formulários existentes
sem alteração alguma nos nomes de campos.  Basta adicionar o atributo `autocomplete`
a cada elemento do formulário com o valor adequado e adicionar a função
`requestAutocomplete()` no elemento do formulário. O navegador fará
o resto.

<img src="imgs/rac_flow.png" class="center" alt="Fluxo da solicitação de preenchimento automático">

{% include_code src=_code/rac.html snippet=rac lang=javascript %}

A função `requestAutocomplete` no elemento `form` indica que o
navegador deve preencher o formulário.  Como um recurso de segurança, a função
deve ser chamada através de um gesto do usuário, como um toque ou um clique do mouse. Uma caixa de diálogo é
mostrada pedindo a permissão do usuário para preencher os campos e quais detalhes
ele deseja utilizar.

{% include_code src=_code/rac.html snippet=handlerac lang=javascript %}

Depois da conclusão do `requestAutocomplete`, a função acionará o evento
`autocomplete` se tiver concluído com êxito ou `autocompleteerror` se
não foi possível preencher o formulário.  Se for concluído com êxito e o formulário
estiver de acordo com as suas necessidades, basta enviá-lo e continuar com a confirmação
final.

{% include shared/remember.liquid title="Remember" list=page.notes.request-auto-complete-flow %}


