project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: O Chrome DevTools permite ver diversas variáveis facilmente por todo o aplicativo.

{# wf_published_on: 2016-02-11 #}
{# wf_updated_on: 2016-02-11 #}

# Acompanhar variáveis no Sources {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

O Chrome DevTools permite ver diversas variáveis com facilidade por todo o aplicativo.
Observar variáveis dentro do Sources mantém você fora do console e com foco em melhorar o código.

O painel Sources fornece o recurso de acompanhar variáveis dentro do aplicativo.
Ele está localizado na seção de observação da barra lateral do depurador.
Com este recurso, você não precisa se preocupar em registrar objetos repetidamente no console.

![Seção de observação do depurador](imgs/sources-watch-variables-location.png)

## Adicionar variáveis

Para adicionar uma variável à lista de observação, use o ícone de adição à direita do título da seção.
Você verá uma entrada em linha onde deve fornecer o nome da variável a observar.
Em seguida, pressione <kbd>Enter</kbd> para adicioná-la à lista.

![Botão de adicionar à lista de observação](imgs/add-variable-to-watch.png)

O observador exibirá o valor atual da variável quando ela for adicionada.
Se a variável não estiver ativa ou não for encontrada, ele exibirá <samp>&lt;Not Available&gt;</samp> para o valor.

![Variável indefinida na lista de observação](imgs/undefined-variable-in-watch.png)

## Atualizar variáveis

O valor das variáveis pode mudar à medida que o aplicativo continua operando.
A lista de observação não é uma visualização ativa de variáveis, a menos que você percorra a execução.
Quando estiver percorrendo a execução usando [pontos de interrupção](add-breakpoints), os valores observados atualizarão automaticamente.
Para verificar as variáveis de novo manualmente na lista, pressione o botão de atualizar à direita do título da seção.

![Botão de atualizar variáveis em observação](imgs/refresh-variables-being-watched.png)

Quando a atualização é solicitada, o atual estado do aplicativo é verificado novamente.
Cada item observado será atualizado com os valores atuais.

![Variável atualizada em observação](imgs/updated-variable-being-watched.png)

## Remover variáveis

Para manter minimalista o que você está vendo, talvez seja preciso remover algumas variáveis da lista de observação.
Isto pode ser feito passando o cursor pela variável e clicando no ícone de remover que aparece à direita.

![Passe o cursor sobre a variável para removê-la da lista de observação](imgs/hover-to-delete-watched-variable.png)


{# wf_devsite_translation #}
