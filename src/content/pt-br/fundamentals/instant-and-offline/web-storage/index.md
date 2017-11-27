project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-09-28 #}
{# wf_published_on: 2016-09-28 #}

# Visão geral do armazenamento Web {: .page-title }

{% include "web/_shared/contributors/mco.html" %}

É importante escolher os mecanismos de armazenamento corretos
para armazenamento em dispositivos locais e em servidores baseados na nuvem.  Um bom mecanismo de armazenamento garante
que as informações sejam salvas com confiabilidade, reduz a largura de banda e aumenta
a capacidade de resposta. A estratégia correta de armazenamento em cache é um elemento básico essencial para
permitir experiências Web para dispositivos móveis off-line. 

Este artigo fornece uma fundamentação breve para a avaliação de APIs e
serviços de armazenamento. Em seguida, ofereceremos uma tabela comparativa e algumas orientações
gerais. Em breve, pretendemos adicionar recursos mais detalhados para
a compreensão de tópicos de armazenamento selecionados.

## Taxonomia do armazenamento

Vamos começar entendendo algumas dimensões que podemos usar para analisar o armazenamento
de dados em apps da Web. Posteriormente, usaremos essa estrutura para enumerar e avaliar
as diversas opções de armazenamento disponíveis para desenvolvedores Web.

### Modelo de dados

O modelo para armazenamento de unidades de dados determina como eles são organizados internamente.
Isso afeta a facilidade de uso, o custo e o desempenho das solicitações de armazenamento e
recuperação. 

* **Estruturados: **dados armazenados em tabelas com campos predefinidos, como é típico
em sistemas de gerenciamento de bancos de dados baseados em SQL. Ideal para consultas flexíveis e dinâmicas
em que o escopo completo dos tipos de consultas pode não ser conhecido
inicialmente. Um exemplo conhecido de um armazenamento de dados estruturado é o IndexedDB
no navegador.

* **Chave-valor:** o armazenamento de dados de chave-valor, e os bancos de dados NoSQL relacionados, oferecem a
capacidade de armazenar e recuperar dados não estruturados indexados por uma chave única.
O armazenamento de dados de chave-valor é semelhante a tabelas de hash, no sentido em que permitem acesso
a dados indexados e opacos com tempos constantes. Alguns exemplos conhecidos de armazenamento de dados chave-valor são
a Cache API no navegador e o Apache Cassandra no servidor.

* **Streams de bytes:** este modelo simples armazena dados como uma string de bytes opaca
de comprimento variável, deixando que a camada de aplicativos se encarregue de toda a organização
interna. Esse modelo é particularmente indicado para sistemas de arquivos e outros blobs
de dados organizados hierarquicamente. Os exemplos conhecidos de armazenamento de dados com streams de bytes incluem
sistemas de arquivos e serviços de armazenamento na nuvem.

### Persistência

Os métodos de armazenamento de apps da Web podem ser analisados de acordo com o escopo
da persistência dos dados.

* **Persistência de sessão: **os dados dessa categoria são retidos apenas enquanto
uma única sessão da Web ou guia de navegador permanecer ativa. Um exemplo de um mecanismo
de armazenamento com persistência de sessão é a Session Storage API.

* **Persistência de dispositivo:** os dados dessa categoria são retidos entre sessões e
guias/janelas de navegador em um determinado dispositivo. Um exemplo de um mecanismo
de armazenamento com persistência de dispositivo é a Cache API.

* **Persistência global:** os dados dessa categoria são retidos entre sessões e
dispositivos. Dessa forma, essa categoria é a forma mais robusta de persistência de dados. Um exemplo de
um mecanismo de armazenamento com persistência global é o Google Cloud Storage.

### Compatibilidade de navegadores

Os desenvolvedores devem escolher a API mais adequada ao domínio do problema. No entanto,
também deve considerar o fato que APIs padronizadas
e bem documentadas são preferíveis a interfaces personalizadas ou proprietárias porque
costumam ser mais duradouras e contar com mais suporte. Além disso, podem contar com
uma base de conhecimento mais ampla e uma ecossistema de desenvolvedores mais avançado.

### Transações

Muitas vezes, é importante que uma coleção de operações de armazenamento
relacionadas seja executada ou falhe de forma atômica. Tradicionalmente, os sistemas de gerenciamento de bancos de dados
oferecem esse recurso oferecendo o modelo de transações, em que atualizações relacionadas podem ser
agrupadas em unidades arbitrárias. Embora nem sempre necessário, esse é um recurso conveniente e,
algumas vezes, essencial em alguns domínios de problema.

### Síncrono/Assíncrono

Algumas APIs de armazenamento são síncronas, no sentido que as solicitações de armazenamento ou recuperação
bloqueiam o encadeamento ativo no momento até a conclusão da solicitação. Isso
é particularmente pesado em navegadores da Web, em que a solicitação de armazenamento compartilha
o encadeamento principal com a IU. Por motivos de eficiência e desempenho,
as APIs de armazenamento assíncronas são preferíveis.

## Comparação

Nesta seção, examinaremos as APIs disponíveis atualmente para desenvolvedores Web
e faremos uma comparação entre elas em relação às dimensões descritas acima.

<table>
  <thead>
    <th>API</th>
    <th>Modelo 
de dados</th>
    <th>Persistência</th>
    <th>Compatibilidade
de navegadores</th>
    <th>Transações</th>
    <th>Síncrono/Assíncrono</th>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/FileSystem">Sistemas de arquivos</a></td>
      <td>stream de bytes</td>
      <td>dispositivo</td>
      <td><a href="http://caniuse.com/#feat=filesystem">52%</a></td>
      <td>Não</td>
      <td>Assíncrono</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">Armazenamento local</a></td>
      <td>chave-valor</td>
      <td>dispositivo</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>Não</td>
      <td>Síncrono</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">Armazenamento de sessão</a></td>
      <td>chave-valor</td>
      <td>sessão</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>Não</td>
      <td>Síncrono</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies">Cookies</a></td>
      <td>estruturado</td>
      <td>dispositivo</td>
      <td>100%</td>
      <td>Não</td>
      <td>Síncrono</td>
    </tr>
    <tr>
      <td><a href="https://www.w3.org/TR/webdatabase/">WebSQL</a></td>
      <td>estruturado</td>
      <td>dispositivo</td>
      <td><a href="http://caniuse.com/#feat=sql-storage">77%</a></td>
      <td>Sim</td>
      <td>Assíncrono</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage">Cache</a></td>
      <td>chave-valor</td>
      <td>dispositivo</td>
      <td><a href="http://caniuse.com/#feat=serviceworkers">60%</a></td>
      <td>Não</td>
      <td>Assíncrono</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a></td>
      <td>híbrido</td>
      <td>dispositivo</td>
      <td><a href="http://caniuse.com/#feat=indexeddb">83%</a></td>
      <td>Sim</td>
      <td>Assíncrono</td>
    </tr>
    <tr>
      <td><a href="https://cloud.google.com/storage/">armazenamento na nuvem</a></td>
      <td>stream de bytes</td>
      <td>global</td>
      <td>100%</td>
      <td>Não</td>
      <td>Ambos</td>
    </tr>
  <tbody>
</table>

Como observado acima, é melhor escolher APIs com ampla compatibilidade com
o maior número de navegadores possível e que ofereçam modelos de chamadas assíncronas para maximizar
a interoperabilidade com a IU. Esses critérios levam naturalmente às seguintes
opções tecnológicas:

* Para armazenamento local de chave-valor em dispositivos, use a Cache API.

* Para armazenamento estruturado local em dispositivos, use o IndexedDB.

* Para armazenamento de streams de bytes globais, use um serviço de Cloud Storage.

Essa combinação atende às necessidades de armazenamento básico para muitos aplicativos Web para dispositivos móveis.
Fique atento para um artigo futuro em que falaremos detalhadamente sobre
como abordar padrões comuns de armazenamento, incluindo exemplos de código.

## Depuração de armazenamento no Chrome DevTools {: #devtools }

Consulte os documentos a seguir para saber mais sobre como usar o Chrome DevTools para
inspecionar e depurar sua API de armazenamento Web preferida. As APIs não mencionadas
aqui não são compatíveis com o DevTools ou não são aplicáveis.

* [Armazenamento local](/web/tools/chrome-devtools/manage-data/local-storage#local-storage)
* [Armazenamento de sessão](/web/tools/chrome-devtools/manage-data/local-storage#session-storage)
* [Cookies](/web/tools/chrome-devtools/manage-data/cookies)
* [Web SQL](/web/tools/chrome-devtools/manage-data/local-storage#web-sql)
* [Cache](/web/tools/chrome-devtools/progressive-web-apps#caches)
* [IndexedDB](/web/tools/chrome-devtools/manage-data/local-storage#indexeddb)

Se você usar várias APIs de armazenamento, verifique o recurso Clear Storage do
DevTools. Esse recurso permite apagar vários armazenamentos com um único clique de
botão. Consulte [Apagar service workers, armazenamento, bancos de dados e
caches](/web/tools/chrome-devtools/manage-data/local-storage#clear-storage) para
obter mais informações.

## O que fazer em seguida...

Examinamos aqui algumas formas relevantes de pensar sobre mecanismos
de armazenamento e comparamos as APIs e serviços mais populares disponíveis atualmente.
Adicionaremos em breve mais conteúdo para examinar mais detalhadamente um ou mais tópicos
interessantes:

* [Recomendações de armazenamento off-line para Progressive Web Apps](offline-for-pwa)

* Padrões comuns de armazenamento (em breve)

* Métodos recomendados de armazenamento de back-end (em breve)

* Informações detalhadas: IndexedDB (em breve)

* Informações detalhadas: Cache API (em breve)

* Análise de estruturas de armazenamento populares (em breve)


{# wf_devsite_translation #}
