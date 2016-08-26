project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Crie formulários eficientes evitando ações repetidas, perguntando apenas o necessária e oriente o usuário mostrando o ponto em que se encontra em formulários de várias partes.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Design efficient forms {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Crie formulários eficientes evitando ações repetidas, perguntando apenas o necessária e oriente o usuário mostrando o ponto em que se encontra em formulários de várias partes.


## TL;DR {: .hide-from-toc }
- Use dados existentes para oferecer sugestões ao preencher campos e certifique-se de habilitar o preenchimento automático.
- Use barras de progresso claramente indicadas para ajudar os usuários a finalizar formulários de várias partes.
- Forneça um calendário visual para que os usuários não precisem sair do seu site e ir para o aplicativo de calendário em seus smartphones.


## Minimize ações e campos repetidos

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

## Mostre ao usuário seu progresso

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


## Forneça calendários visuais ao selecionar datas

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


