project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Embora o <code>requestAutocomplete</code> tenha sido criado para ajudar o usuário a preencher qualquer formulário, seu uso mais comum nos dias de hoje é no eCommerce, onde o abandono do carrinho de compras na Web móvel <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>pode ser de até 97%</a>.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Simplify checkout with requestAutocomplete API {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Embora o <code>requestAutocomplete</code> tenha sido criado para ajudar o usuário a preencher qualquer formulário, seu uso mais comum nos dias de hoje é no eCommerce, onde o abandono do carrinho de compras na Web móvel <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>pode ser de até 97%</a>. Imagine 97% das pessoas em um supermercado, com um carrinho cheio de coisas, deixando-o e indo embora.


## TL;DR {: .hide-from-toc }
- O <code>requestAutocomplete</code> pode simplificar muito o processo de finalização da compra e melhorar a experiência do usuário.
- 'Se <code>requestAutocomplete</code> estiver disponível, oculte o formulário de finalização da compra e direcione o usuário diretamente para a página de confirmação.'
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

### fluxo do `requestAutocomplete`

A experiência ideal mostra a caixa de diálogo `requestAutocomplete` em vez de carregar a
página que exibe o formulário de finalização da compra. Se tudo correr bem, o usuário não vê
o formulário.  Pode-se adicionar facilmente `requestAutocomplete` aos formulários existentes
sem alteração alguma nos nomes de campos.  Basta adicionar o atributo `autocomplete`
a cada elemento do formulário com o valor adequado e adicionar a função
`requestAutocomplete()` no elemento do formulário. O navegador fará
o resto.

<img src="imgs/rac_flow.png" class="center" alt="Fluxo da solicitação de preenchimento automático">

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/input/forms/_code/rac.html" region_tag="rac" lang=javascript %}
</pre>

A função `requestAutocomplete` no elemento `form` indica que o
navegador deve preencher o formulário.  Como um recurso de segurança, a função
deve ser chamada através de um gesto do usuário, como um toque ou um clique do mouse. Uma caixa de diálogo é
mostrada pedindo a permissão do usuário para preencher os campos e quais detalhes
ele deseja utilizar.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/input/forms/_code/rac.html" region_tag="handlerac" lang=javascript %}
</pre>

Depois da conclusão do `requestAutocomplete`, a função acionará o evento
`autocomplete` se tiver concluído com êxito ou `autocompleteerror` se
não foi possível preencher o formulário.  Se for concluído com êxito e o formulário
estiver de acordo com as suas necessidades, basta enviá-lo e continuar com a confirmação
final.

<!-- TODO: Verify note type! -->
Note: Ao solicitar qualquer tipo de informação pessoal ou dados de cartão de crédito, certifique-se de que a página é disponibilizada via SSL.  Caso contrário, o diálogo avisará o usuário que suas informações podem não estar seguras.


