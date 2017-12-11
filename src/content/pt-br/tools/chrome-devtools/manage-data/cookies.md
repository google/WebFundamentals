project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Inspecione e exclua cookies pelo painel Application.

{# wf_updated_on: 2016-07-28 #}
{# wf_published_on: 2015-04-13 #}

# Inspecionar e excluir cookies {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Inspecione e exclua cookies pelo
painel <strong>Application</strong>.

![painel cookies](imgs/cookies.png)


### TL;DR {: .hide-from-toc }
- Visualize informações detalhadas sobre um cookie, como nome, valor, domínio e tamanho, entre outras.
- Exclua um único cookie, cookies de um determinado domínio ou todos os cookies de todos os domínios.


## Visão geral {:#cookies}

Use o painel **Cookies** para visualizar e excluir cookies. Não é possível modificar os valores dos
cookies.

![painel cookies][cookies]

Os cookies são listados por domínio. Isto inclui o principal documento e todos
os quadros aninhados. Selecionar um destes "grupos de quadro" exibe todos os cookies de 
todos os recursos e quadros desse grupo. Há duas consequências deste
agrupamento que você deve conhecer:

* Cookies de diferentes domínios podem aparecer no mesmo grupo de quadros.
* O mesmo cookie pode aparecer em diversos grupos de quadros.

[cookies]: /web/tools/chrome-devtools/manage-data/imgs/cookies.png

## Campos {:#fields}

Os campos a seguir são fornecidos para cada cookie:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Campo do cookie &amp; Descrição</th>
    </tr>
  </thead>
  <tbody>
        <tr>
      <td data-th="Cookie Field">Name</td>
      <td data-th="Description">O nome do cookie.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Value</td>
      <td data-th="Description">O valor do cookie.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Domain</td>
      <td data-th="Description">O domínio do cookie.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Path</td>
      <td data-th="Description">O caminho do cookie.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Expires / Maximum Age</td>
      <td data-th="Description">O tempo de expiração, ou duração máxima, do cookie. Para cookies de sessão, este campo sempre deve ser "Session".</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Size</td>
      <td data-th="Description">O tamanho do cookie em bytes.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">HTTP</td>
      <td data-th="Description">Se presente, indica que os cookies devem ser usados somente com HTTP e que o JavaScript não pode ser modificado.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Secure</td>
      <td data-th="Description">Se presente, indica que a comunicação deste cookie deve ocorrer por uma transmissão criptografada.</td>
    </tr>
  </tbody>
</table>

## Excluir cookies {:#delete}

Você pode excluir cookies de várias formas:

* Selecione um cookie e pressione o botão **delete** 
  (![botão delete][delete]{:.inline}) para excluir apenas esse cookie.
* Pressione o botão **clear** (![botão clear][cos]{:.inline}) para excluir todos
  os cookies do grupo de quadros especificado.
* Clique com o botão direito no valor **Domain** de um cookie e selecione **Clear all
  from "..."** (onde **"..."** é o nome do domínio) para excluir todos os cookies
  desse domínio.

[delete]: imgs/delete.png
[cos]: imgs/clear-object-store.png


{# wf_devsite_translation #}
