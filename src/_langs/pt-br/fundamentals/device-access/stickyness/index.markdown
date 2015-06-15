---
layout: section
title: "Add To Home Screen"
description: "Quase todos os grandes fornecedores de navegadores permitem que os usuários fixem ou instalem seus aplicativos da Web. A chamada “fixação” é um argumento comum para aplicativos nativos mas que pode ser obtida com apenas alguns ajustes em sua marcação."
introduction: "Quase todos os grandes fornecedores de navegadores permitem que os usuários fixem ou instalem seus aplicativos da Web. A chamada “fixação” é um argumento comum para aplicativos nativos mas que pode ser obtida com apenas alguns ajustes em sua marcação."
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 1
id: stickyness
collection: device-access
authors:
  - pbakaus
priority: 1
---
{% wrap content%}

Para o usuário, a funcionalidade “adicionar à tela inicial” funciona de forma semelhante à uma 
marcação supercarregada; mas, sem dar instruções ao navegador sobre como 
exibir seu aplicativo, os navegadores móveis realizarão o favicon ou instantâneo da sua 
página para o marcador e mostrarão a interface de usuário padrão do navegador quando o usuário iniciar
seu aplicativo da Web pela tela inicial. Vamos analisar as formas de se melhorar o
comportamento integrado.

Chrome e Safari suportam uma sintaxe muito semelhante usando as tags `<meta>` e `<link>`
no `<head>` de sua página e mantêm o recurso geral relativamente
leve.

O Internet Explorer 10 introduziu “Sites Fixos", um conceito que oferece 
funcionalidade adicional como alterar a apresentação do ícone e as 
notificações e, enquanto suporta o estilo de tag `<meta>` familiar, favorece 
arquivos XML vinculados que servem como configuração.

Observação: as APIs do Firefox e os recursos que são exclusivos do Firefox OS não são abordados aqui. 
Em vez disso, consulte a [documentação do Firefox OS] oficial(https://developer.mozilla.org/en-US/Apps/Quickstart).

{% include modules/nextarticle.liquid %}

{% endwrap %}
