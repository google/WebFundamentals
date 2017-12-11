project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Organize recursos por quadro, domínio, tipo ou outros critérios.

{# wf_updated_on: 2016-07-28 #}
{# wf_published_on: 2015-04-13 #}

# Inspecionar recursos {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Organize recursos por quadro, domínio, tipo ou outros
critérios.


### TL;DR {: .hide-from-toc }
- Use a seção <strong>Frames</strong> do painel <strong>Application</strong> para organizar recursos por quadro.
- Você também pode visualizar recursos por quadro no painel <strong>Sources</strong> desativando a opção <strong>group by folder</strong>.
- Para visualizar recursos por domínio e pasta, use o painel <strong>Sources</strong>.
- Filtre recursos por nome ou outro critério no painel <strong>Network</strong>.


## Organizar recursos por quadro {:#frames}

Use a seção **Frames** do painel **Application** para ver uma representação dos recursos da página
organizada por quadros.

![detalhe dos quadros][frames]

* O nível superior (`top` na imagem acima) é o documento principal.
* Abaixo dele (por exemplo, `widget2` na imagem acima) são subquadros do
  documento principal. Expanda um desses subquadros para visualizar os recursos
  que originaram esse quadro.
* Abaixo dos subquadros ficam as imagens, scripts e outros recursos do
  documento principal.
* Por último, o próprio documento principal.

Clique em um recurso para ver sua visualização.

Clique com o botão direito em um recurso para vê-lo no painel **Network**, abri-lo em uma
nova guia, copiar seu URL ou salvá-lo.

![visualizar recurso][resource]

Você também pode visualizar recursos por quadro no painel **Sources** clicando
no menu flutuante do navegador e desativando a opção **Group by folder**
para interromper o agrupamento de recursos por pasta.

![opção group by folder](imgs/group-by-folder.png)

Os recursos serão listados apenas por quadro.

![sem pastas](imgs/no-folders.png)

[frames-pane]: /web/tools/chrome-devtools/manage-data/imgs/frames-pane.png
[frames]: /web/tools/chrome-devtools/manage-data/imgs/frames.png
[resource]: /web/tools/chrome-devtools/manage-data/imgs/resource.png

## Organizar recursos por domínio e pasta {:#sources}

Para visualizar recursos organizados por domínio e diretório, use o painel
**Sources**.

![painel sources](imgs/sources.png)

## Filtrar recursos por nome, tipo ou outros critérios {:#filter}

Use o painel **Network** para filtrar recursos por nome, tipo e uma grande variedade
de outros critérios. Confira o guia abaixo para saber mais.

{# include shared/related_guides.liquid inline=true list=page.related-guides.filter #}


{# wf_devsite_translation #}
