project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: O volume de dados transferidos por aplicativos continua a crescer. Para proporcionar um bom desempenho, é preciso otimizar a exibição de absolutamente todos os bytes.

{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2014-03-31 #}

# Otimização da eficiência do conteúdo {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}



A funcionalidade, as pretensões e o escopo dos aplicativos da Web continuam a crescer e isso é bom. No entanto, a incessante caminhada em direção a uma Web mais avançada leva a outra tendência: o volume de dados transferidos por cada aplicativo continua a crescer em ritmo constante. Para proporcionar um bom desempenho, é preciso otimizar a exibição de absolutamente todos os bytes.


Como são os atuais aplicativos da Web? O site [HTTP Archive](http://httparchive.org/){: .external } pode ajudar a responder a essa pergunta. Trata-se de um projeto que monitora como a Web está organizada fazendo o rastreamento periódico dos sites mais populares (mais de 300.000 sites da lista dos 1 milhão de sites mais acessados do ranking Alexa), registrando e agregando dados analíticos sobre recursos, tipos de conteúdo e outros metadados de cada destino individual.

<img src="images/http-archive-trends.png" class="center" alt="Tendências do HTTP Archive">

<table>
<thead>
  <tr>
    <th></th>
    <th>50º percentil</th>
    <th>75º percentil</th>
    <th>90º percentil</th>
  </tr>
</thead>
<tr>
  <td data-th="tipo">HTML</td>
  <td data-th="50%">13 KB</td>
  <td data-th="75%">26 KB</td>
  <td data-th="90%">54 KB</td>
</tr>
<tr>
  <td data-th="tipo">Imagens</td>
  <td data-th="50%">528 KB</td>
  <td data-th="75%">1.213 KB</td>
  <td data-th="90%">2.384 KB</td>
</tr>
<tr>
  <td data-th="tipo">JavaScript</td>
  <td data-th="50%">207 KB</td>
  <td data-th="75%">385 KB</td>
  <td data-th="90%">587 KB</td>
</tr>
<tr>
  <td data-th="tipo">CSS</td>
  <td data-th="50%">24 KB</td>
  <td data-th="75%">53 KB</td>
  <td data-th="90%">108 KB</td>
</tr>
<tr>
  <td data-th="tipo">Outro</td>
  <td data-th="50%">282 KB</td>
  <td data-th="75%">308 KB</td>
  <td data-th="90%">353 KB</td>
</tr>
<tr>
  <td data-th="tipo"><strong>Total</strong></td>
  <td data-th="50%"><strong>1.054 KB</strong></td>
  <td data-th="75%"><strong>1.985 KB</strong></td>
  <td data-th="90%"><strong>3.486 KB</strong></td>
</tr>
</table>

Os dados acima refletem a tendência no crescimento do número de bytes transferidos nos sites mais populares da Web entre janeiro de 2013 e janeiro de 2014. É evidente que nem todos os sites crescem na mesma velocidade ou requerem o mesmo volume de dados e, por isso, destacamos os diferentes quantis da distribuição: 50º (mediano), 75º e 90º.

No início de 2014, um site mediano era composto de 75 solicitações que somavam um total de 1.054 KB de bytes transferidos, e o número total de bytes (e solicitações) havia crescido em um ritmo constante no ano anterior. Isoladamente esse fato não chega a ser uma surpresa, mas ele apresenta importantes implicações de desempenho. De fato, a velocidade da Internet está aumentando, mas esse aumento depende do país, e muitos usuários ainda dependem de planos caros, monitorados e com limites de dados, especialmente para dispositivos móveis.

Ao contrário dos aplicativos para computadores, os aplicativos da Web não exigem um processo de instalação separado: basta digitar o URL e começar a usar. Essa é uma das principais características da Web. No entanto, para tornar isso possível, **geralmente precisamos de dúzias ou até centenas de recursos variados que juntos resultam em megabytes de dados que precisam ser reunidos em questão de milissegundos para possibilitar a experiência instantânea que buscamos na Web.**

Alcançar essa experiência instantânea na Web com todas essas limitações não é tarefa fácil e, por isso, é fundamental otimizar a eficiência do conteúdo por meio: da eliminação de downloads desnecessários, da otimização da codificação de transferência dos recursos por meio de várias técnicas de compactação e da utilização do armazenamento em cache sempre que possível para evitar downloads redundantes.


