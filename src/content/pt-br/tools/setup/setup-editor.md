project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: O editor de código é a sua principal ferramenta de desenvolvimento: você o usa para escrever e salvar linhas de código. Escreva código melhor e mais rápido conhecendo os atalhos do editor e instalando plug-ins importantes.

{# wf_updated_on: 2015-04-13 #}
{# wf_published_on: 2014-05-28 #}

# Configurar seu editor {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

O editor de código é a sua principal ferramenta de desenvolvimento: você o usa para escrever e salvar linhas de código. Escreva código melhor e mais rápido conhecendo os atalhos do editor e instalando plug-ins importantes.


### TL;DR {: .hide-from-toc }
- Escolha um editor que permita personalizar atalhos e tenha diversos plug-ins para ajudar você a escrever um código melhor.
- Use o gerenciador de pacotes para facilitar a descoberta, a instalação e a atualização de plug-ins.
- Instale plug-ins que ajudem a manter a sua alta produtividade durante o desenvolvimento. Comece com as recomendações deste guia.


## Instalar o editor de texto Sublime

O [Sublime](http://www.sublimetext.com/){: .external } é um excelente editor de texto com um nível básico de
funcionalidade sólido que torna escrever código uma atividade prazerosa. Você pode instalar um gerenciador
de pacotes para facilitar a instalação de plug-ins e a adição de novas funcionalidades.

No momento há duas opções de download do Sublime Text, são elas: [versão 2](http://www.sublimetext.com/2) ou [versão 3](http://www.sublimetext.com/3). A versão 3 é bem estável e dará a você acesso aos pacotes não disponíveis no Sublime Text 2, no entanto, você pode achar a versão 2 mais confiável.

Observação: A <a href='http://robdodson.me/blog/2012/06/23/sublime-text-2-tips-and-shortcuts/'>postagem do blog</a> de Rob Dodson sobre como aprender a usar e amar o Sublime é uma ótima referência para extrair o máximo do seu editor. Os conceitos são aplicáveis a qualquer editor de textos, não apenas ao Sublime.

## Por que usar um gerenciador de pacotes?

Os gerenciadores de pacote facilitam a descoberta, a instalação e a atualização de pacotes
e plug-ins.

<img src="imgs/package_control.png" class="center" alt="Imagem do controle de pacotes dos editores de texto Sublime"/>

Você pode instalar um Gerenciador de pacotes para o Sublime seguindo estas instruções
[https://packagecontrol.io/installation](https://packagecontrol.io/installation).

Você só precisa fazer isso uma vez e, depois, dê uma olhada na nossa lista de
plug-ins recomendados.

## Instalar plug-ins

Os plug-ins ajudam a manter você com boa produtividade. Que coisas fazem você voltar
a outras ferramentas para fazer?

Linting - tem um plug-in para isso. Exibir as mudanças que não foram confirmadas
- tem plug-ins para isso. Integração com outras ferramentas, como o GitHub:
tem plug-ins para isso.

Gerenciadores de pacote facilitam demais a descoberta, a instalação e a atualização de plug-ins:

1. No editor Sublime Text, abra o gerenciador de pacotes (ctrl+shift+p).
2. Insira "Install Package".
3. Insira o nome do plug-in que está procurando (ou procure em
    todos os plug-ins).

Confira estas [listas de plug-ins populares do
Sublime Text](https://packagecontrol.io/browse) Aqui estão os plug-ins que amamos e
recomendamos que você instale para ajudar a acelerar o desenvolvimento:

### Autoprefixer

Se quiser um jeito rápido de adicionar prefixos de provedor ao seu CSS, você pode fazê-lo com
este plug-in muito útil.

Escreva CSS, ignorando prefixos de provedor e, quando quiser adicioná-los, aperte
`ctrl+shift+p` e digite `Autoprefix CSS`.

[Abordamos como automatizar isso no seu processo
de compilação](/web/tools/setup/setup-buildtools),
dessa forma, seu CSS continua simples e você não precisa se lembrar de pressionar
`ctrl+shift+p`.

<img src="imgs/sublime-autoprefixer.gif" alt="Exemplo de plug-in de prefixador automático do Sublime" />

### ColorPicker

Selecione qualquer cor da paleta e adicione-a ao CSS com `ctrl+shift+c`.

<img src="imgs/sublime-color-picker.png" alt="Plug-in de seletor de cor do Sublime" />

### Emmet

Adicione alguns atalhos de teclado úteis e fragmentos ao seu editor de texto. Confira
o vídeo em [Emmet.io](http://emmet.io/){: .external } para ver uma introdução ao que ele pode fazer (um favorito
pessoal é o comando "Toggle Comment").

<img src="imgs/emmet-io-example.gif" alt="Demonstração do plug-in Emmet.io" />

### HTML-CSS-JS prettify

Esta extensão oferece um comando para formatar HTML, CSS e JS. Você ainda pode
embelezar os arquivos sempre que salvar um.

<img src="imgs/sublime-prettify.gif" alt="Gif do plug-in de embelezamento do Sublime" />

### Git Gutter

Adicione um marcador na calha sempre que houver uma mudança em um arquivo.

<img src="imgs/sublime-git-gutter.png" alt="Imagem do plug-in Git Gutter do Sublime" />

### Gutter Color

Observação: Isto só está disponível no Sublime Text 3

O Gutter Color exibe uma amostra de cores pequena perto do CSS.

<img src="imgs/sublime-gutter-color.png" alt="Imagem do Gutter Color do Sublime" />

O plug-in requer ImageMagick. Se você for usuário do Mac OS X, recomendamos experimentar o
instalador do [CactusLabs](http://cactuslab.com/imagemagick/){: .external } (talvez seja necessário
reiniciar a máquina para fazê-lo funcionar).





{# wf_devsite_translation #}
