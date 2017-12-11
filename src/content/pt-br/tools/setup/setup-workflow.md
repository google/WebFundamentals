project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Configure criação persistente no Chrome DevTools para poder ver as mudanças imediatamente e salvá-las no disco.

{# wf_updated_on: 2015-07-30 #}
{# wf_published_on: 2015-07-08 #}

# Configurar persistência com os Espaços de trabalho do DevTools {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Configure criação persistente no Chrome DevTools para poder ver as mudanças imediatamente e salvá-las no disco.

O Chrome DevTools permite alterar elementos e estilos
em uma página web e ver as mudanças imediatamente.
Por padrão, atualize o navegador para apagar as mudanças,
a menos que você tenha as copiado e colado manualmente em um editor externo.

Espaços de trabalho permitem persistir essas mudanças no disco
sem precisar sair do Chrome DevTools.
Mapeie recursos fornecidos por um servidor web local em arquivos de um disco
e visualize mudanças promovidas nesses arquivos como se elas estivessem sendo fornecidas.


### TL;DR {: .hide-from-toc }
- Não copie mudanças para arquivos locais manualmente. Use espaços de trabalho para manter mudanças feitas no DevTools para os recursos locais.
- Organize seus arquivos locais no navegador. Mapeie arquivos em URLs.
- Depois de configurar os espaços de trabalho persistentes, as mudanças de estilo promovidas no painel Elements são mantidas automaticamente, mas as mudanças do DOM não são. Em vez disso, mantenha mudanças de elemento no painel Sources.


## Adicionar arquivos-fonte locais ao espaço de trabalho

Para tornar editáveis arquivos-fontes de uma pasta local no painel Sources:

1. Clique com o botão direito no painel à esquerda.
2. Selecione **Add Folder to Workspace**.
3. Escolha o local da pasta local que deseja mapear.
4. Clique em **Allow** para dar ao Chrome acesso à pasta. 

![Adicionar pasta ao espaço de trabalho](imgs/addfolder.png)

Normalmente, a pasta local contém os arquivos-fonte originais do site que foram usados para preencher o servidor com dados do site. Se você não deseja alterar esses arquivos originais pelo espaço de trabalho, faça uma cópia da pasta e especifique-a como a pasta do espaço de trabalho.

## Organizar mudanças persistidas

Você já mapeou sua pasta local para o espaço de trabalho,
mas o navegador ainda está fornecendo os conteúdos de rede da pasta.
Para organizar mudanças persistentes automaticamente no navegador,
mapeie os arquivos locais da pasta em um URL:

1. Clique com o botão direito ou segure Ctrl e clique em um arquivo no painel esquerdo de Sources.
2. Escolha **Map to File System Resource**.
3. Selecione o arquivo local no espaço de trabalho persistente.
4. Recarregue a página no Chrome.

![Mapear arquivo em URL](imgs/maptoresource.png)

Depois disso,
o Chrome carrega o URL mapeado,
exibindo os conteúdos do espaço de trabalho
em vez dos conteúdos de rede.
Trabalhe diretamente nos arquivos locais sem precisar
alternar repetidamente entre o Chrome e um editor externo.

## Limitações

Mesmo com o poder dos Espaços de trabalho, há algumas limitações que você deve conhecer.

* Somente mudanças de estilo promovidas no painel Elements são mantidas. Mudanças no DOM não são mantidas.

* Somente estilos definidos em um arquivo CSS externo podem ser salvos. Mudanças a `element.style` ou a estilos embutidos não são mantidas (se houver estilos embutidos, você pode alterá-los no painel Sources).

* Mudanças de estilo no painel Elements são mantidas imediatamente sem precisar salvá-las explicitamente — 
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd> ou <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd> (Mac) — se você tiver o recurso CSS mapeado em um arquivo local.

* Se estiver mapeando arquivos com um servidor remoto em vez de com um servidor local, ao atualizar a página, o Chrome a recarregará a partir do servidor remoto. Suas mudanças ainda se manterão no disco e serão reaplicadas se você continuar editando em Espaços de trabalho.

* Você deve usar o caminho completo para um arquivo mapeado no navegador. Até os arquivos de índice devem incluir .html no URL para ser possível ver a versão organizada.

## Gerenciamento de arquivos locais

Além de editar arquivos existentes,
você também pode adicionar e excluir arquivos
na pasta local mapeada que estiver usando nos Espaços de trabalho.

### Adicionar arquivo

Para adicionar um arquivo:

1. Clique com o botão direito em uma pasta no painel esquerdo de Sources.
2. Selecione **New File**.
3. Dê um nome ao novo arquivo incluindo sua extensão (por exemplo, `newscripts.js`) e pressione **Enter**, o arquivo será adicionado à pasta local.

### Excluir arquivo

Para excluir o arquivo:

1. Clique com o botão direito no arquivo no painel esquerdo de Sources.
2. Selecione **Delete** e clique em **Yes** para confirmar.

### Fazer cópia de segurança de um arquivo

Antes de promover mudanças substanciais em um arquivo,
é válido duplicar o original para fins de segurança.

Para duplicar um arquivo:

1. Clique com o botão direito no arquivo no painel esquerdo de Sources.
2. Selecione **Make a Copy...**.
3. Dê um nome ao arquivo incluindo sua extensão (por exemplo, `mystyles-org.css`) e pressione **Enter**.

### Atualizar

Ao criar ou excluir arquivos diretamente nos Espaços de trabalho,
a pasta Sources atualiza automaticamente para exibir as mudanças de arquivo.
Para forçar uma atualização em qualquer momento, clique com o botão direito em uma pasta e selecione **Refresh**.

Isso também é útil se você alterar arquivos que estão abertos simultaneamente em um editor externo e quiser que as mudanças apareçam no DevTools. Normalmente, o DevTools captura essas mudanças automaticamente, mas se você quiser ter certeza, basta atualizar a página conforme descrito acima.

### Buscar arquivos ou texto

Para buscar um arquivo carregado no DevTools,
pressione <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd> ou <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd> (Mac)
para abrir uma caixa de diálogo de busca.
Você ainda pode fazer isso em Espaços de trabalho,
mas a busca englobará tanto arquivos remotos carregados
quanto arquivos locais na pasta do Espaço de trabalho.

Para buscar uma string dentre arquivos:

1. Abra a janela de busca: clique no botão **Show Drawer**![Exibir gaveta](imgs/show_drawer_button.png){:.inline} e, em seguida, clique em **Search** ou pressione
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">F</kbd> ou <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">F</kbd> (Mac).
2. Digite a string no campo de busca e pressione **Enter**.
3. Se a string for uma expressão regular ou precisar ser indiferente a letras maiúsculas e minúsculas, marque a caixa correta.

![Buscar strings dentre arquivos](imgs/searchacross.png)

Os resultados da busca são exibidos na gaveta Console, listados por nome de arquivo, com o número de correspondências em cada arquivo indicado. Use as setas **Expand** ![Expand](imgs/expand_button.png){:.inline} e **Collapse** ![Collapse](imgs/collapse_button.png){:.inline} para expandir ou recolher os resultados de um determinado arquivo.



{# wf_devsite_translation #}
