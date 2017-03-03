project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Depois da eliminação de downloads de recursos desnecessários, o melhor que podemos fazer para aprimorar a velocidade da carga é minimizar o tamanho geral do download otimizando e comprimindo os recursos restantes.

{# wf_updated_on: 2016-08-26 #}
{# wf_published_on: 2014-03-31 #}

# Otimizar codificação e tamanho de ativos baseados em texto destinados a transferência {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Depois da eliminação de downloads de recursos desnecessários, o melhor que se pode fazer para aprimorar a velocidade da carga é minimizar o tamanho geral do download otimizando e comprimindo os recursos restantes.


## Introdução à compressão de dados

Depois de eliminar todos os recursos desnecessários, a próxima etapa é comprimir os recursos restantes que o navegador tem de baixar. Dependendo do tipo de recurso&mdash;texto, imagens, fontes, e assim por diante&mdash;existem muitas técnicas diferentes à escolha: ferramentas genéricas que podem ser ativadas no servidor, otimizações de pré-processamento para tipos de conteúdo específicos e otimizações de recursos específicos que exigem interação do desenvolvedor.

O fornecimento do melhor desempenho exige uma combinação de todas essas técnicas.

### TL;DR {: .hide-from-toc }
* A compressão é o processo de codificar informações usando menos bits.
* A eliminação de dados desnecessários sempre proporciona os melhores resultados.
* Há diversas técnicas e algoritmos de compressão diferentes.
* Serão necessárias diversas técnicas para conseguir a melhor compressão.


O processo de reduzir o tamanho dos dados é a *compressão de dados*. Muitas pessoas contribuíram com algoritmos, técnicas e otimizações para melhorar as taxas de compressão, velocidade e requisitos de memória de vários compressores. Uma discussão completa sobre a compressão de dados está além do escopo deste tópico. No entanto, é importante entender, em um nível elevado, como funciona a compressão e as técnicas que você pode usar para reduzir o tamanho de vários ativos que suas páginas exigem.

Para ilustrar os princípios fundamentais destas técnicas, considere o processo de otimização de um formato de mensagem de texto simples que foi inventado apenas para este exemplo:

    # Below is a secret message, which consists of a set of headers in
    # key-value format followed by a newline and the encrypted message.
    format: secret-cipher
    date: 08/25/16
    AAAZZBBBBEEEMMM EEETTTAAA

1. As mensagens podem conter anotações arbitrárias, indicadas pelo prefixo "#". As anotações não afetam o significado ou qualquer outro comportamento da mensagem.
2. As mensagens podem conter *cabeçalhos*, que são pares de chave-valor (separados por ":") e que devem aparecer no início da mensagem.
3. As mensagens podem conter cargas úteis de texto.

O que você pode fazer para reduzir o tamanho da mensagem acima, que atualmente é de 200 caracteres?

1. O comentário é interessante, mas, na verdade, não afeta o significado da mensagem. Elimine-o ao transmitir a mensagem.
2. Existem boas técnicas para codificar cabeçalhos de uma maneira eficiente. Por exemplo, se você sabe que todas as mensagens têm "format" e "date", você pode convertê-los em IDs inteiros curtos e apenas enviar esses IDs. No entanto, não sabemos se isso é verdade, então não faremos nada por enquanto.
3. A carga útil é apenas texto e, embora o seu conteúdo real seja desconhecido (aparentemente, é uma "mensagem secreta"), basta olhar o texto para perceber que existe muita redundância. Em vez de enviar letras repetidas, talvez você possa contar o número de letras repetidas e codificá-las com mais eficiência. Por exemplo, "AAA" torna-se "3A", o que representa uma sequência de três As.


Combinar estas técnicas produz o seguinte resultado:  

    format: secret-cipher
    date: 08/25/16
    3A2Z4B3E3M 3E3T3A

A nova mensagem tem 56 caracteres, o que significa que você comprimiu a mensagem original em impressionantes 72%.

Ótimo, mas como isso pode ajudar a otimizar nossas páginas da Web? Não tentaremos inventar nossos algoritmos de compressão, mas, como você verá, podemos usar exatamente as mesmas técnicas e processos de pensamento ao otimizar vários recursos em nossas páginas: pré-processamento, otimizações específicas ao contexto e algoritmos diferentes para diferentes conteúdo.


## Minimização: pré-processamento e otimizações específicas por contexto

### TL;DR {: .hide-from-toc }
- As otimizações específicas por conteúdo podem reduzir substancialmente o tamanho dos recursos entregues.
- Elas são melhor aplicadas como parte do ciclo de compilação/versão.


A melhor forma de comprimir dados redundantes ou desnecessários é eliminá-los totalmente. Não podemos simplesmente excluir dados arbitrários. No entanto, em alguns contextos em que temos conhecimento específico do conteúdo do formato de dados e de suas propriedades, muitas vezes é possível reduzir consideravelmente o tamanho da carga útil sem afetar seu significado real.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minify.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/optimizing-content-efficiency/minify.html){: target="_blank" .external }

Considere a página HTML simples acima e os três tipos de conteúdo diferentes que contém: marcação HTML, estilos CSS e JavaScript. Cada um desses tipos de conteúdo tem regras diferentes para o que constitui conteúdo válido, regras diferentes para indicar comentários e assim por diante. Como podemos reduzir o tamanho dessa página?

* Os comentários de código ajudam muito aos desenvolvedores, mas o navegador não precisa deles. A simples eliminação dos comentários CSS (`/* … */`), HTML (`<!-- … -->`) e JavaScript (`// …`) pode reduzir substancialmente o tamanho total da página.
* Um compressor de CSS "inteligente" pode notar que estamos usando uma forma ineficiente de definir regras para ".awesome-container" e consolidar as duas declarações em uma, sem afetar os outros estilos e economizando mais bytes.
* O espaço em branco (espaços e tabulações) são convenientes para desenvolvedores no HTML, no CSS e no JavaScript. Um compressor adicional pode eliminar todas as tabulações e espaços.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minified.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/optimizing-content-efficiency/minified.html){: target="_blank" .external }

Após aplicar as etapas acima, a página diminui de 406 para 150 caracteres, uma economia de compressão de 63%. Sim, não é muito legível. Mas não precisa ser: você pode manter a página original como sua "versão de desenvolvimento" e aplicar as etapas acima sempre que a página estiver pronta para ser enviada ao seu website.

Voltando um pouco, o exemplo acima ilustra um ponto importante: um compressor genérico&mdash;como, por exemplo, um compressor projetado para comprimir texto arbitrário&mdash; provavelmente pode comprimir a página acima com eficiência, mas não saberia como eliminar comentários, consolidar as regras CSS ou executar dezenas de outras otimizações específicas do conteúdo. É por isso que pré-processamento/minimização /otimização sensível a contexto pode ser uma ferramenta tão poderosa.

Observação: Um bom exemplo é a versão de desenvolvimento não comprimida da biblioteca JQuery, que está se aproximando ~300 KB. A mesma biblioteca minimizada (comentários removidos etc.) é cerca de 3 vezes menor: aproximadamente 100 KB.

Da mesma forma, as técnicas descritas acima podem ser estendidas para além de simples ativos baseados em texto. Imagens, vídeo e outros tipos de conteúdo contêm suas próprias formas de metadados e diversas cargas úteis. Por exemplo, sempre que você tira uma fotografia com uma câmera, a foto normalmente incorpora várias informações adicionais: configurações da câmera, localização e assim por diante. Dependendo do aplicativo, esses dados podem ser essenciais (por exemplo, um site de compartilhamento de fotos) ou totalmente inúteis e você deve considerar se vale a pena removê-los. Na prática, esses metadados podem chegar a dezenas de kilobytes para cada imagem.

Resumindo, como primeira etapa na otimização da eficiência dos ativos, crie um inventário dos diferentes tipos de conteúdo e considere quais tipos de otimizações específicas podem ser aplicados a esses tipos de conteúdo para reduzir seu tamanho. Então, depois que descobriu o que são, automatize essas otimizações, adicionando-as aos seus processos de construção e de lançamento para garantir que as otimizações sejam aplicadas.

## Compressão de texto com GZIP

### TL;DR {: .hide-from-toc }
- O GZIP tem melhor desempenho em ativos baseados em texto: CSS, JavaScript e HTML.
- Todos os navegadores modernos são compatíveis com a compressão GZIP e a solicitam automaticamente.
- Seu servidor deve ser configurado para ativar a compressão GZIP.
- Algumas CDNs exigem atenção especial para garantir que o GZIP está ativado.


[GZIP](https://en.wikipedia.org/wiki/Gzip) é um compressor genérico que pode ser aplicado a qualquer fluxo de bytes. Nos bastidores, ele lembra de alguns dos conteúdos previamente vistos e tenta localizar e substituir fragmentos de dados duplicados de forma eficiente. (Caso tenha curiosidade, eis uma [ótima explicação de baixo nível de GZIP](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s).) No entanto, na prática, o GZIP tem seu melhor desempenho com conteúdo baseado em texto, conseguindo muitas vezes taxas de compressão de até 70% a 90% nos arquivos maiores. Por outro lado, a execução do GZIP em ativos que já estão comprimidos com outros algoritmos (por exemplo, a maioria dos formatos de imagem) proporciona pouca ou nenhuma melhoria.

Todos os navegadores modernos suportam e automaticamente negociam a compressão GZIP para todas as solicitações de HTTP. Você deve garantir que o servidor esteja configurado corretamente para servir o recurso comprimido quando o cliente solicita.


<table>
<thead>
  <tr>
    <th>Biblioteca</th>
    <th>Tamanho</th>
    <th>Tamanho comprimido</th>
    <th>Taxa de compressão</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="library">jquery-1.11.0.js</td>
  <td data-th="size">276 KB</td>
  <td data-th="compressed">82 KB</td>
  <td data-th="savings">70%</td>
</tr>
<tr>
  <td data-th="library">jquery-1.11.0.min.js</td>
  <td data-th="size">94 KB</td>
  <td data-th="compressed">33 KB</td>
  <td data-th="savings">65%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.js</td>
  <td data-th="size">729 KB</td>
  <td data-th="compressed">182 KB</td>
  <td data-th="savings">75%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.min.js</td>
  <td data-th="size">101 KB</td>
  <td data-th="compressed">37 KB</td>
  <td data-th="savings">63%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.css</td>
  <td data-th="size">118 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">85%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.min.css</td>
  <td data-th="size">98 KB</td>
  <td data-th="compressed">17 KB</td>
  <td data-th="savings">83%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.css</td>
  <td data-th="size">186 KB</td>
  <td data-th="compressed">22 KB</td>
  <td data-th="savings">88%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.min.css</td>
  <td data-th="size">146 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">88%</td>
</tr>
</tbody>
</table>

A tabela acima mostra as economias que a compressão do GZIP produz para algumas bibliotecas JavaScript e frameworks CSS mais populares. As economias variam de 60% a 88%, e a combinação de arquivos minimizados (identificados por ".min" nos seus nomes de arquivo) com o GZIP oferece economia ainda maior.

1. **Aplique antes as otimizações específicas do conteúdo: Minimizadores CSS, JS e HTML.**
1. **Aplique o GZIP para compactar a saída minimizada.**

Ativar GZIP é uma das otimizações mais simples e mais recompensadoras a implementar e, no entanto, muitas pessoas não implementam. A maioria dos servidores da Web compactam o conteúdo por você. Basta verificar se o servidor está configurado corretamente para compactar todos os tipos de conteúdo que se beneficiam com a compactação do GZIP.

O projeto HTML5 Boilerplate contém [exemplos de arquivos de configuração](https://github.com/h5bp/server-configs) para todos os servidores mais populares, com comentários detalhados para cada sinalizador e definição da configuração. Para determinar a melhor configuração para seu servidor, faça o seguinte: 
* Encontre seu servidor favorito na lista.
* Procure a seção GZIP.
* Confirme se seu servidor está configurado com as configurações recomendadas.

<img src="images/transfer-vs-actual-size.png"  alt="Demonstração de tamanho real vs tamanho de transferência no DevTools">

Uma forma rápida e simples de ver o GZIP funcionando é abrir o Chrome DevTools e examinar a coluna "Size / Content" no painel Network: "Size" indica o tamanho da transferência do ativo e "Content" o tamanho não comprimido do ativo. Para o ativo HTML no exemplo anterior, GZIP economizou 98,8 KB durante a transferência.

Observação: Às vezes, GZIP aumenta o tamanho do ativo. Normalmente, isso ocorre quando o ativo é muito pequeno e a sobrecarga do dicionário do GZIP é maior que a economia da compressão ou se o recurso já está bem comprimido. Para evitar este problema, alguns servidores permitem especificar um limite mínimo de tamanho de arquivo.

Finalmente, embora a maioria dos servidores compacte automaticamente os ativos ao servi-los para o usuário, algumas CDNs exigem cuidados especiais e esforço manual para garantir que o ativo do GZIP seja servido. Audite o site e verifique se os ativos estão realmente [sendo comprimidos](http://www.whatsmyip.org/http-compression-test/).


{# wf_devsite_translation #}
