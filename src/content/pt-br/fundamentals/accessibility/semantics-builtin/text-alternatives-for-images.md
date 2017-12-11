project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Usando o atributo alt para fornecer alternativas em texto a imagens


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Alternativas em Texto Para Imagens {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



As imagens são um componente importante da maioria das páginas da Web, e
são, naturalmente, um ponto sensível para usuários de baixa visão. Devemos considerar a função de uma
imagem em uma página para descobrir que tipo de alternativa de texto ela deve ter.
 Veja esta imagem.

    <article>
      <h2>Study shows 9 out of 10 cats quietly judging their owners as they sleep</h2>
      <img src="imgs/160204193356-01-cat-500.jpg">
    </article>

<article>
  <h2>Study shows 9 out of 10 cats quietly judging their owners as they sleep</h2>
  <img src="imgs/160204193356-01-cat-500.jpg">
</article>

Na página, temos a imagem de um gato, ilustrando um artigo sobre o famoso
 comportamento crítico dos gatos. Um leitor de tela anunciaria esta imagem usando
seu nome literal, `"/160204193356-01-cat-500.jpg"`. Isso é exato, mas não tem
utilidade alguma.

Você pode usar o atributo `alt` para fornecer uma alternativa de texto útil a
esta imagem &mdash; por exemplo, "Um gato olhando ameaçadoramente para o espaço".

    <img src="/160204193356-01-cat-500.jpg" alt="Um gato encarando de forma ameaçadora">

Assim, o leitor de tela pode anunciar uma descrição sucinta da imagem (
vista na barra preta VoiceOver) e o usuário pode escolher se deseja ir para
o artigo.

![uma imagem com texto alternativo melhor](imgs/funioncat2.png)

Alguns comentários sobre `alt`:

 - `alt` permite que você especifique uma string simples a ser usada sempre que a
imagem não estiver disponível, por exemplo, quando a imagem não for carregada,
ou for acessada por robô de Web lento, ou for encontrada por um leitor de tela.
 - `alt` difere de `title`, ou qualquer tipo de legenda, na medida em que é utilizado *somente*
se a imagem não estiver disponível.

Escrever texto alternativo útil é quase uma forma de arte. Para que uma string seja uma alternativa utilizável
em texto, ela precisa transmitir o mesmo conceito que a imagem, no mesmo
contexto.

Considere uma imagem do logotipo vinculado no cabeçalho de uma página, como os mostrados acima.
Podemos descrever a imagem com bastante precisão como "O logotipo da Funion".

    <img class="logo" src="logo.jpg" alt="O logotipo da Funion">

Pode ser tentador dar-lhe uma alternativa de texto simples como "casa" ou "página
principal", mas isso é um desserviço a usuários de baixa visão e àqueles que enxergam.

Mas imagine um usuário de leitor de tela que deseja localizar o logotipo no cabeçalho
da página; atribuir um valor alternativa de "casa", na verdade, cria uma
experiência mais confusa. E um usuário que enxerga enfrenta o mesmo desafio &mdash; descobrir
o que clicar no logotipo do site faz &mdash; que um usuário de leitor de tela.

Por outro lado, nem sempre é útil para descrever uma imagem. Por exemplo,
considere uma imagem de lupa dentro de um botão de pesquisa que tem o texto
"Buscar". Se o texto não estivesse ali, você definitivamente daria a essa imagem um
valor alternativo "buscar". Mas, como temos o texto visível, o leitor de tela lerá
em voz alta a palavra "busca"; assim, um valor `alt` idêntico na
imagem é redundante.

No entanto, sabemos que, se deixarmos o texto `alt` de fora, provavelmente ouviremos
o nome do arquivo de imagem em vez disso, o que é inútil e potencialmente confuso. Neste
caso, você pode simplesmente usar um atributo `alt` vazio, e o leitor de tela
pulará a imagem completamente.

    <img src="magnifying-glass.jpg" alt="">

Resumindo, todas as imagens devem ter um atributo `alt`, mas nem todos eles precisam
conter texto. Imagens importantes devem ter texto alternativo descritivo que descreva
sucintamente o que a imagem é, enquanto imagens decorativas devem ter
 atributos alternativos vazios &mdash; ou seja, `alt=""`.


{# wf_devsite_translation #}
