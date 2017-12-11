project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A quantidade de dados baixados por aplicativos continua a crescer com o tempo. Para oferecer um ótimo desempenho, é necessário otimizar o máximo possível a entrega de dados.


{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# Otimizar eficiência do conteúdo {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Nossos aplicativos da Web continuam a crescer em escopo, ambição e funcionalidade. Isso é bom. No entanto, o avança implacável rumo a uma Web mais avançada gera outra tendência: a quantidade de dados baixada pelos aplicativos continua a crescer regularmente. Para oferecer um desempenho ideal, precisamos otimizar a entrega de todos os bytes.

Qual a aparência de um aplicativo da Web moderno? O [HTTP Archive](http://httparchive.org/){: .external } pode nos ajudar a responder essa pergunta. O projeto acompanha a forma como a Web é criada, rastreando periodicamente os sites mais populares (mais de 300.000 da lista de um milhão de sites mais importantes do Alexa) e registrando e agregando análises sobre número de recursos, tipos de conteúdo e outros metadados para cada destino individual.

<img src="images/http-archive-trends.png"  alt="Tendências do HTTP Archive">

<table class="">
<colgroup><col span="1"><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th></th>
    <th>50º percentil</th>
    <th>75º percentil</th>
    <th>90º percentil</th>
  </tr>
</thead>
<tr>
  <td data-th="type">HTML</td>
  <td data-th="50%">13 KB</td>
  <td data-th="75%">26 KB</td>
  <td data-th="90%">54 KB</td>
</tr>
<tr>
  <td data-th="type">Imagens</td>
  <td data-th="50%">528 KB</td>
  <td data-th="75%">1213 KB</td>
  <td data-th="90%">2384 KB</td>
</tr>
<tr>
  <td data-th="type">JavaScript</td>
  <td data-th="50%">207 KB</td>
  <td data-th="75%">385 KB</td>
  <td data-th="90%">587 KB</td>
</tr>
<tr>
  <td data-th="type">CSS</td>
  <td data-th="50%">24 KB</td>
  <td data-th="75%">53 KB</td>
  <td data-th="90%">108 KB</td>
</tr>
<tr>
  <td data-th="type">Outros</td>
  <td data-th="50%">282 KB</td>
  <td data-th="75%">308 KB</td>
  <td data-th="90%">353 KB</td>
</tr>
<tr>
  <td data-th="type"><strong>Total</strong></td>
  <td data-th="50%"><strong>1054 KB</strong></td>
  <td data-th="75%"><strong>1985 KB</strong></td>
  <td data-th="90%"><strong>3486 KB</strong></td>
</tr>
</table>

Os dados acima capturam a tendência de crescimento do número de bytes baixados em destinos populares na Web entre janeiro de 2013 e janeiro de 2014. Naturalmente, nem todo site cresce com a mesma velocidade ou exige a mesma quantidade de dados. É por isso que destacamos os quartis diferentes na distribuição: 50º (mediana), 75º e 90º.

Um site na mediana, no início de 2014, consistia em 75 solicitações que acumulavam um total de até 1.054 KB de bytes transferidos. O número total de bytes (e solicitações) cresceu com um ritmo constante no ano anterior. Isso não deve ser uma grande surpresa, mas traz implicações de desempenho importantes. Sim, as velocidades da Internet estão aumentando, mas aumentam com taxas diferentes em países diferentes e muitos usuários ainda estão sujeitos e limites de dados e planos limitados de alto custo, particularmente em dispositivos móveis.

Ao contrário de seus equivalentes no desktop, os aplicativos da Web não exigem um processo de instalação separado, basta inserir o URL e começar a usar. Isso é um recurso importante da Web. No entanto, para que isso aconteça, **muitas vezes temos de recuperar dezenas ou, algumas vezes, centenas de recursos diversificados, que podem chegar a megabytes de dados e devem ser recebidos juntos em centenas de milissegundos para facilitar a experiência da Web instantânea que todos queremos.**

Alcançar essa experiência da Web instantânea, considerando esses requisitos, não é uma tarefa trivial. É por isso que a otimização da eficiência do conteúdo é crítica: eliminação de downloads desnecessários, otimização da codificação de transferência de cada recurso por meio de várias técnicas de compressão e aproveitamento de armazenamento em cache sempre que possível para eliminar downloads redundantes.


{# wf_devsite_translation #}
