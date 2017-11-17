project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A quebra de simetria proporciona contraste aos seus projetos e os torna mais atraentes. Saiba quando e como aplicar esse recurso aos seus projetos.

{# wf_updated_on: 2014-10-21 #}
{# wf_published_on: 2014-08-08 #}

# Precisão de animação assimétrica {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

A precisão de animação assimétrica melhora a experiência do usuário, permitindo que você expresse personalidade ao mesmo tempo em que responde rapidamente às interações do usuário. Ela também proporciona um sensação de contraste, o que torna a interface mais visualmente atraente.

### TL;DR {: .hide-from-toc }
* Use a precisão de animação assimétrica para proporcionar personalidade e contraste ao seu trabalho.
* Sempre dê preferência à interação do usuário; use durações curtas ao responder a toques ou cliques e reserve durações mais longas para quando não houver resposta.


Como na maioria das "regras" de animação, você deve testar para descobrir o que funciona para o seu aplicativo, mas, quando o assunto é a experiência do usuário, eles são sempre muito impacientes. A regra geral é sempre **responder à interação do usuário rapidamente**. Dito isso, na maioria dos casos, a ação do usuário é assimétrica e, portanto, a animação também pode ser.

Por exemplo, quando um usuário toca para exibir uma navegação de barra lateral, você deve exibi-la o mais rapidamente possível, com uma duração de cerca de 100 ms. No entanto, quando o usuário recolhe o menu, você pode animar a exibição um pouco mais lentamente, digamos, em cerca de 300 ms.

Por outro lado, quando você exibe em uma visualização modal, normalmente, uma mensagem de erro ou alguma outra mensagem crítica será exibida. Nesses casos, recomenda-se exibir a visualização um pouco mais lentamente, novamente em cerca de 300 ms. No entanto, o recolhimento, que é acionado pelo usuário, deve acontecer muito rapidamente.

A regra geral é a seguinte:

* Animações da interface do usuário acionadas por uma interação do usuário, como as transições de visualização ou a exibição de um elemento, têm introdução rápida (curta duração) e saída lenta (duração mais longa).
* Animações da interface do usuário acionadas pelo seu código, como erros ou exibições modais, têm introdução mais lenta (duração mais longa) e saída rápida (duração curta).


{# wf_devsite_translation #}
