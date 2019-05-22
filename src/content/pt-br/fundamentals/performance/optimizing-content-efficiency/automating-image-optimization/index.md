project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Formatos de imagem.

{# wf_updated_on: 2019-02-06#}
{# wf_published_on: 2017-11-16 #}
{# wf_blink_components: Blink>Image,Internals>Images,Internals>Images>Codecs #}

# Automatizar a otimização da imagem {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

**Todos deveríamos automatizar a compressão de imagens.**

Em 2017, a otimização da imagem deve ser automatizada. Isso é fácil de esquecer, já que
as práticas recomendadas mudam e o conteúdo que não passa por um canal de versão
acaba passando despercebido. Para automatizar: Use [imagemin](https://github.com/imagemin/imagemin)
ou [libvps](https://github.com/jcupitt/libvips) no seu processo de criação. Há
muitas alternativas disponíveis.

A maioria dos CDNs (ex.:
[Akamai](https://www.akamai.com/us/en/solutions/why-akamai/image-management.jsp))
e soluções de terceiros, como [Cloudinary](https://cloudinary.com),
[imgix](https://imgix.com), [Image
Optimizer da Fastly](https://www.fastly.com/io/), [
SmartVision da Instart Logic](https://www.instartlogic.com/technology/machine-learning/smartvision)
ou [ImageOptim API](https://imageoptim.com/api), oferecem soluções abrangentes e automatizadas para
otimização de imagens.

O tempo que você gastará lendo postagens de blogs e aprimorando sua configuração será
maior do que a taxa mensal de um serviço (o Cloudinary tem um nível
[gratuito](http://cloudinary.com/pricing)). Se você não quiser terceirizar esse
trabalho por questões de custo ou preocupações com latência, as opções de código aberto acima são confiáveis.
Projetos, como o [Imageflow](https://github.com/imazen/imageflow) ou o
[Thumbor](https://github.com/thumbor/thumbor), oferecem alternativas auto-hospedadas.

**Todos deveriam comprimir suas imagens de modo eficaz.**

No mínimo, use [ImageOptim](https://imageoptim.com/). Ele pode reduzir
significativamente o tamanho das imagens e preservar a qualidade visual. Também há
[alternativas](https://imageoptim.com/versions.html) do Windows e Linux.

Mais especificamente: execute seus JPEGs no
[MozJPEG](https://github.com/mozilla/mozjpeg) (é recomendável usar `q=80` ou anterior para conteúdo da
Web) e considere o suporte do [Progressive
JPEG](http://cloudinary.com/blog/progressive_jpegs_and_green_martians),
execute PNGs no [pngquant](https://pngquant.org/) e SVGs no
[SVGO](https://github.com/svg/svgo). Elimine explicitamente os metadados (`--strip`
para pngquant) a fim de evitar a ocupação excessiva. Em vez de GIFs extremamente grandes, envie
[H.264](https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC) vídeos (ou
[WebM](https://www.webmproject.org/) para Chrome, Firefox e Opera)! Se não
for possível, pelo menos use [Giflossy](https://github.com/pornel/giflossy). Caso você possa
ter ciclos adicionais de CPU, precise de uma qualidade superior à média da Web e aceite
tempos de codificação mais lentos, experimente
[Guetzli](https://research.googleblog.com/2017/03/announcing-guetzli-new-open-source-jpeg.html).

Alguns navegadores anunciam suporte para formatos de imagem no cabeçalho de solicitação Accept.
Isso pode ser usado para disponibilizar condicionalmente formatos. Ex.: lossy
[WebP](/speed/webp/) para navegadores baseados em Blink, como o Google
Chrome e fallbacks, como JPEG/PNG para outros navegadores.

Você pode sempre fazer mais. Há ferramentas para gerar e disponibilizar `srcset`
pontos de interrupção. A seleção de recursos pode ser automatizada em navegadores baseados em Blink com
[client-hints](/web/updates/2015/09/automating-resource-selection-with-client-hints)
. Além disso, é possível enviar menos bytes para usuários que optaram pela economia de dados no navegador
tendo cuidado com a dica
[Save-Data](/web/updates/2016/02/save-data).


Quanto menor o tamanho do arquivo de imagens, melhor será a experiência de
rede que você poderá oferecer aos usuários, especialmente em dispositivos móveis. Neste artigo,
veremos maneiras de reduzir o tamanho da imagem com técnicas modernas de compressão
que afetam minimamente a qualidade da imagem.

## Introdução {: #introduction }

**Imagens ainda são a causa nº 1 de ocupação excessiva na Web.**

As imagens consomem muita largura de banda porque frequentemente são arquivos
muito grandes. De acordo com o [HTTP Archive](http://httparchive.org/), 60%
dos dados transferidos para buscar uma página da Web são imagens compostas por JPEGs, PNGs
e GIFs. Em julho de 2017, as imagens foram responsáveis por
[1,7 MB](http://httparchive.org/interesting.php#bytesperpage) do conteúdo
carregado em um site com média de 3,0 MB.

Segundo Tammy Everts, adicionar imagens a uma página ou aumentar imagens existentes
são técnicas
[comprovadas](https://calendar.perfplanet.com/2014/images-are-king-an-image-optimization-checklist-for-everyone-in-your-organization/)
para aumentar as taxas de conversão. É pouco provável que as imagens deixem de ser usadas. Assim,
investir em uma estratégia de compressão para minimizar a ocupação excessiva é
importante.


<img src="images/Modern-Image00.jpg" alt="Menos imagens por página criam mais
        conversões. 19 imagens por página em média convertem melhor do que 31
        imagens por página em média." />

Segundo [Soasta/Pesquisa
Google](https://www.thinkwithgoogle.com/marketing-resources/experience-design/mobile-page-speed-load-time/),
desde 2016, as imagens foram o segundo maior indicador de conversões, sendo que as melhores
páginas tinham 38% menos imagens.


A otimização de imagens consiste de medidas diferentes que podem reduzir o tamanho do arquivo
das imagens. Ela basicamente depende da fidelidade visual de que suas imagens
precisam.


<img src="images/image-optimisation.jpg" alt="A otimização de imagens abrange uma série de
        técnicas diferentes" /> <strong>Otimização de imagens:</strong> Escolha o
        formato certo, comprima cuidadosamente e priorize imagens essenciais em vez
        daquelas que podem ser carregadas de modo lento.


As otimizações de imagens comuns incluem compressão, disponibilizar as imagens
de modo responsivo com base no tamanho da tela usada
[`<picture>`](/web/fundamentals/design-and-ux/responsive/images)/[`<img
srcset>`](/web/fundamentals/design-and-ux/responsive/images)
e redimensioná-las para reduzir os custos de decodificação de imagens.


<img src="images/chart_naedwl.jpg" alt="Um histograma das possíveis economias de imagem
       do HTTP Archive valida 30 KB de possíveis economias de imagem a
       95%." /> Segundo o [HTTP
       Archive](http://jsfiddle.net/rviscomi/rzneberp/embedded/result/),
       95% das economias por imagem (no eixo Função
       distribuição acumulada, CDF na sigla em inglês) são de 30 KB!</strong>


Temos espaço de sobra para otimizarmos melhor as imagens.


<img src="images/image-optim.jpg" alt="ImageOptim usado no Mac com uma série de
        imagens que foram comprimidas oferecendo economias superiores a 50%" />

O ImageOptim é gratuito e reduz o tamanho de imagens com técnicas modernas de compressão e
pela eliminação de metadados EXIF desnecessários.



Se você for designer, também há um [plug-in do ImageOptim para o
Sketch](https://github.com/ImageOptim/Sketch-plugin) que otimiza seus
recursos na exportação. Para mim, ele trouxe uma grande economia de tempo.

### Como saberei quando devo otimizar minhas imagens? {: #do-my-images-need-optimization }

Faça uma auditoria do site no [WebPageTest.org](https://www.webpagetest.org/) e
ele destacará oportunidades para melhor otimizar suas imagens (veja “Comprimir
imagens”).


O <img src="images/Modern-Image1.jpg" alt="teste WebPage é compatível com auditoria de
        compressão de imagens por meio da seção “Comprimir imagens”" />

A seção “Comprimir imagens” de um relatório do WebPageTest indica as imagens que podem ser
comprimidas de modo mais eficaz e as economias de tamanho de arquivo previstas ao fazer isso.

<img src="images/Modern-Image2.jpg" alt="recomendações de compressão de imagens do
        webpagetest" />



[Lighthouse](/web/tools/lighthouse/) faz a auditoria de práticas recomendadas de desempenho. Ele
inclui auditorias de otimização de imagens e sugere imagens
para serem comprimidas ainda mais ou aponta as que estão fora da tela e poderiam ser
carregadas lentamente.

A partir do Chrome 60, o Lighthouse agora é compatível com o [painel
“Audits”](/web/updates/2017/05/devtools-release-notes#lighthouse) no Chrome
DevTools:


<img src="images/hbo.jpg" alt="O Lighthouse faz a auditoria para a
        HBO.com e exibe recomendações de otimização de imagens" /> O Lighthouse
        pode fazer auditoria dos recursos Web Performance, Best Practices e
        Progressive Web App.



Você também já deve conhecer outras ferramentas de auditoria, como [PageSpeed
Insights](/speed/pagespeed/insights/) ou [Website Speed
Test](https://webspeedtest.cloudinary.com/) pela Cloudinary, que inclui uma
auditoria com análise detalhada de imagens.

## <a id="choosing-an-image-format" href="#choosing-an-image-format">Como escolho um formato de imagem?</a>

Ilya Grigorik observa no seu excelente [guia
de otimização de imagens](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) que
o “formato certo" de uma imagem é uma combinação dos resultados visuais desejados e dos
requisitos funcionais. Você trabalha com imagens raster ou vetoriais?


<img src="images/rastervvector.png" alt="imagens vetoriais x raster"
         />



Os [gráficos de raster](https://en.wikipedia.org/wiki/Raster_graphics) representam
imagens pela codificação dos valores de cada pixel dentro de uma grade retangular de pixels.
Eles não são independentes da resolução nem do zoom. WebP ou formatos amplamente utilizados, como
JPEG ou PNG, lidam bem com esses gráficos em que o fotorrealismo é uma necessidade.
Guetzli, MozJPEG e outras ideias que abordamos se aplicam bem aos gráficos de raster.

[Os gráficos vetoriais](https://en.wikipedia.org/wiki/Vector_graphics) usam pontos,
linhas e polígonos para representar imagens e formatos usando formas geométricas simples
(ex.: logotipos), oferecendo alta resolução e zoom como o SVG, que lida melhor com esse
caso de uso.

O formato errado pode sair caro. O fluxo lógico para escolher o formato certo
pode ser repleto de riscos. Assim, experimente com cuidado as economias que outros formatos podem
oferecer.

Jeremy Wagner abordou os
[prós e contras](http://jlwagner.net/talks/these-images/#/2/2) a levar em consideração
ao avaliar formatos nas suas palestras sobre otimização de imagens.

## O modesto JPEG {: #the-humble-jpeg }

O [JPEG](https://en.wikipedia.org/wiki/JPEG) talvez seja o formato de imagem
mais usado no mundo todo. Como anteriormente observado, [45% das
imagens](http://httparchive.org/interesting.php) vistas em sites rastreados pelo HTTP
Archive são JPEGs. Basicamente, tudo
é compatível com esse codec, inclusive seu smartphone, sua câmera digital SLR e aquela webcam antiga. O JPEG também é bem antigo. Ele foi lançado pela primeira vez em
1992. Nessa época, havia um corpus enorme de
pesquisa que tentava aprimorar o que o JPEG oferecia.

O JPEG é um algoritmo de compressão com perdas, que descarta informações para economizar
espaço. Muitos dos esforços que foram empreendidos depois dele tentaram preservar a fidelidade
visual e manter os tamanhos de arquivos os menores possíveis.

**Qual qualidade de imagem é aceitável para seu caso de uso?**

Formatos como o JPEG são os mais adequados para fotos ou imagens com uma série de
regiões de cores. A maioria das ferramentas de otimização permite definir o nível de
compressão da sua preferência. Taxas mais altas de compressão reduzem o tamanho do arquivo, mas podem
introduzir artefatos, auréolas ou degradações com blocos.


<img src="images/Modern-Image5.jpg" alt="Os artefatos de compressão de JPEG são mais
        perceptíveis à medida que passamos da melhor para a pior qualidade" />

JPEG: os artefatos de compressão de JPEG perceptíveis podem aumentar à medida que passamos da melhor
qualidade para a pior. Os graus de qualidade de imagem em uma ferramenta podem ser muito
diferentes aos graus de qualidade de outras ferramentas.


Ao escolher a configuração de qualidade, leve em consideração o intervalo de qualidade a que sua
imagem pertence:

*   **Melhor qualidade** – quando a qualidade é mais importante do que a largura de banda. Isso pode ser o caso
    porque a imagem tem mais importância no seu design ou é exibida na resolução
    total.
*   **Boa qualidade** – quando você deseja enviar tamanhos de arquivo menores, mas
    não quer afetar negativamente a qualidade da imagem. Os usuários ainda se importam
    com um certo nível de qualidade da imagem.
*   **Baixa qualidade** – quando a largura de banda é mais importante para você e não há problema se houver
    degradação da imagem. Essas imagens são adequadas para condições de rede
    instáveis/fracas.
*   **Pior qualidade** – economias na largura de banda são essenciais. Os usuários querem uma experiência
    satisfatória. Desse modo, eles aceitam uma experiência inferior pela vantagem de ter
    um carregamento de páginas mais rápido.

Em seguida, falaremos sobre os modos de compressão do JPEG, já que eles têm um grande impacto
no desempenho percebido.

Note: às vezes superestimamos a qualidade da imagem de que os usuários
precisam. A qualidade da imagem poderia ser considerada um desvio de uma fonte não comprimida e
ideal. Isso também pode ser subjetivo.

## Modos de compressão de JPEG {: #jpeg-compression-modes }

O formato de imagem em JPEG tem uma série de [modos de
compressão](http://cs.haifa.ac.il/~nimrod/Compression/JPEG/J5mods2007.pdf) diferentes. Os três
modos mais usados são o padrão (sequencial), o JPEG progressivo (PJPEG) e o sem perdas.


**Qual é a diferença entre JPEG padrão (ou sequencial) e JPEG progressivo?**

JPEGs padrão (é o modelo parâmetro da maioria das ferramentas de otimização e edição de imagens) são
codificados e decodificados de uma maneira relativamente simples: de cima para baixo. Quando JPEGs
padrão carregam em conexões lentas ou instáveis, os usuários veem o topo da imagem e o restante é exibido
à medida que a imagem carrega. JPEGs sem perda são parecidos, mas possuem uma proporção de
compressão menor.



<img src="images/Modern-Image6.jpg" alt="JPEGs padrão carregam de cima para baixo" />
        JPEGs padrão carregam de cima para baixo enquanto JPEGs progressivos carregam de um estado
        desfocado para nítido.


JPEGs progressivos dividem a imagem em uma série de varreduras. A primeira varredura mostra
a imagem fora de foco ou com uma configuração de baixa qualidade e as varreduras seguintes aprimoram a qualidade da
imagem. Nesse modo, pense que ele está “progressivamente” aprimorando a imagem. Cada “varredura" de uma imagem
acrescenta um nível maior de detalhe. Quando combinados, eles criam uma imagem de
qualidade máxima.


<img src="images/Modern-Image7.jpg" alt="JPEGs progressivos carregam a partir de uma
        resolução baixa para uma resolução alta" /> </picture> JPEGs padrão carregam
        imagens de cima para baixo. PJPEGs carregam a partir de uma baixa resolução (desfocada) para
        uma alta resolução. Pat Meenan escreveu uma [ferramenta
        interativa](http://www.patrickmeenan.com/progressive/view.php?img=https%3A%2F%2Fwww.nps.gov%2Fplanyourvisit%2Fimages%2FGrandCanyonSunset_960w.jpg)
        para testar as varreduras de JPEG progressivo e também aprender sobre elas.


A otimização de JPEG sem perda pode ser realizada pela [remoção de dados
EXIF](http://www.verexif.com/en/), que são adicionados por câmeras ou editores digitais
e, assim, otimizar as [tabelas
Huffman](https://en.wikipedia.org/wiki/Huffman_coding) de uma imagem ou fazer nova varredura da imagem.
Ferramentas, como a [jpegtran](http://jpegclub.org/jpegtran/), oferecem a compressão
sem perda pela reorganização dos dados comprimidos sem a degradação da imagem.
[jpegrescan](https://github.com/kud/jpegrescan),
[jpegoptim](https://github.com/tjko/jpegoptim) e
[mozjpeg](https://github.com/mozilla/mozjpeg) (falaremos sobre elas em seguida) também
oferecem compatibilidade com a compressão JPEG sem perda.


### Benefícios de JPEGs progressivos {: #the-advantages-of-progressive-jpegs }

A capacidade de PJPEGs de oferecer “visualizações” de baixa resolução de uma imagem conforme ela
carrega aprimora o desempenho perceptível, já que os usuários conseguem perceber que a imagem está carregando
mais rapidamente do que imagens adaptativas.

Em conexões 3G mais lentas, isso permite que usuários vejam (aproximadamente) o conteúdo da imagem
quando somente parte do arquivo foi recebido e, assim, decidir se querem esperar
que ela carregue completamente. Isso pode ser mais agradável do que a exibição de cima para baixo
das imagens oferecida por JPEGs padrão.


<img src="images/pjpeg-graph.png" alt="impacto do tempo de espera de mudar para
        jpeg progressivo" /> Em 2015, o [Facebook mudou para PJPEG (no app
        iOS)](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/)
        e teve uma redução de 10% no uso de dados. Eles conseguiram exibir uma imagem de
        boa qualidade 15% mais rápido do que antes, otimizando o tempo de
        carregamento perceptível, conforme mostrado na imagem acima.


PJPEGs podem aprimorar a compressão, consumindo de
[2 a 10%](http://www.bookofspeed.com/chapter5.html) menos largura de banda do que
JPEGs padrão/simples para imagens com mais de 10 KB. A proporção de compressão mais alta se
deve ao fato de que cada varredura no JPEG consegue ter a própria
[tabela Huffman](https://en.wikipedia.org/wiki/Huffman_coding) exclusiva. Codificadores modernos de
JPEG (ex.: [libjpeg-turbo](http://libjpeg-turbo.virtualgl.org/), MozJPEG
etc.) aproveitam a flexibilidade do PJPEG para empacotar melhor os dados.

Note: por que PJPEGs comprimem melhor? Os blocos de JPEG padrão são codificados um de cada
vez. Com PJPEGs, coeficientes de [Transformada
discreta de cosseno](https://en.wikipedia.org/wiki/Discrete_cosine_transform) parecidos
em mais de um bloco podem ser codificados juntos, o que oferece uma melhor
compressão.

### Quem usa JPEGs progressivos na produção? {: #whos-using-progressive-jpegs-in-production }

*   [Twitter.com envia JPEGs
    progressivos](https://www.webpagetest.org/performance_optimization.php?test=170717_NQ_1K9P&run=2#compress_images)
    com uma referência de qualidade de 85%. Eles mediram a latência percebida pelo usuário
    (tempo para primeira varredura e tempo total de carregamento) e descobriram que, em geral, PJPEGs eram
    competitivos em atender aos requisitos para tamanhos de arquivo pequenos, tempos de
    transcodificação e decodificação aceitáveis.
*   [Facebook envia JPEGs progressivos para o app
    no iOS](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/).
    Eles observaram que esse modo reduzia o uso de dados em 15% e permitia exibir uma imagem
    de qualidade boa 15% mais rápido.
*   [Yelp mudou para JPEGs
    progressivos](https://engineeringblog.yelp.com/2017/06/making-photos-smaller.html)
    e descobriu que eles eram parcialmente responsáveis por aproximadamente 4,5% das economias de redução de tamanho de
    imagem. Eles também economizaram outros 13,8% com MozJPEG

### Desvantagens dos JPEGs progressivos {: #the-disadvantages-of-progressive-jpegs }

PJPEGs podem ser mais lentos para decodificar do que JPEGs padrão, às vezes demorando 3 vezes
mais. Em máquinas desktop com CPUs eficazes, isso talvez não seja um problema, mas
é preocupante em dispositivos móveis menos eficazes e com recursos limitados. Exibir
camadas incompletas requer trabalho, já que você basicamente estará decodificando a imagem várias vezes. Essas
várias passadas podem consumir ciclos da CPU.

Além disso, os JPEGs progressivos nem *sempre* são menores. Para imagens muito pequenas (como
miniaturas), os JPEGs progressivos podem ser maiores do que os equivalentes padrão.
No entanto, para essas miniaturas pequenas, a renderização progressiva talvez não ofereça
tantas vantagens.

Isso significa que ao decidir entre enviar ou não PJPEGs, você precisará
testar e encontrar o equilíbrio certo de tamanho de arquivo, latência de rede e uso de
ciclos de CPU.

Note: os PJPEGs (e todos os JPEGs) às vezes podem ser decodificados pelo hardware em dispositivos
móveis. Isso não melhora o impacto sobre a RAM, mas pode anular algumas das preocupações
com a CPU. Nem todos os dispositivos Android possuem suporte de aceleração para hardware, mas dispositivos de alta
capacidade e todos os dispositivos iOS oferecem esse suporte.

Alguns usuários talvez considerem o carregamento progressivo uma desvantagem, já que pode ser
difícil determinar quando uma imagem terminou de carregar. Como isso varia
muito de acordo com o audience, avalie o que faz mais sentido para seus usuários.

### Como criar JPEGs progressivos? {: #how-to-create-progressive-jpegs }

Ferramentas e bibliotecas como [ImageMagick](https://www.imagemagick.org/),
[libjpeg](http://libjpeg.sourceforge.net/),
[jpegtran](http://jpegclub.org/jpegtran/),[
jpeg-recompress](http://jpegclub.org/jpegtran/) e
[imagemin](https://github.com/imagemin/imagemin) oferecem suporte para exportar JPEGs
progressivos. Se você já tiver um canal de otimização de imagens, há uma boa
probabilidade de que acrescentar o suporte para carregamento progressivo seja simples:

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images', function () {
    return gulp.src('images/*.jpg')
        .pipe(imagemin({
            progressive: true

        }))
        .pipe(gulp.dest('dist'));
});
```

Por padrão, a maioria das ferramentas de edição salva imagens como arquivos JPEG padrão.


<img src="images/photoshop.jpg" alt="o photoshop oferece suporte para exportação de jpeg
        progressivo a partir do menu “export”" /> Por padrão, a maioria das ferramentas de edição salva imagens
        como arquivos JPEG padrão. Você pode salvar qualquer imagem criada no
        Photoshop como JPEG progressivo, acessando “File” -> “Export” -> “Save for
        Web (legacy)” e clicar na opção “Progressive”. O Sketch também
        oferece suporte para exportação de JPEGs progressivos. Exporte a imagem como JPG e marque a
        caixa de seleção “Progressive” ao salvar suas imagens.

### Chroma subsampling (ou cor) {: #chroma-subsampling }

Nossos olhos têm menos capacidade para notar a perda de detalhes de cor de uma imagem (chroma)
do que notar a perda de luminância (ou luma, uma medida de brilho). [Chroma
subsampling](https://en.wikipedia.org/wiki/Chroma_subsampling) é um modo de
compressão que reduz a precisão de cor em um sinal e prioriza a luma.
Isso reduz o tamanho do arquivo, em alguns casos em até
[15 a 17%](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/),
sem afetar negativamente a qualidade da imagem e é uma opção disponível para imagens
JPEG. O subsampling também pode reduzir o uso de memória da imagem.



<img src="images/luma-signal.jpg" alt="sinal = chroma + luma" />


Como o contraste é responsável por criar as formas que vemos em uma imagem, a luma,
que define o contraste, é muito importante. Fotos mais antigas ou com filtro preto e branco
podem não ter cor, mas graças à luma, elas oferecem o mesmo nível de detalhes de que
suas equivalentes coloridas. Chroma (cor) tem menos impacto na percepção visual.


<img src="images/no-subsampling.jpg"
     alt="JPEG inclui suporte para vários tipos de subsampling: nenhuma, horizontal, e horizontal e vertical." />

JPEG inclui suporte para vários tipos de subsampling: nenhuma, horizontal, e
horizontal e vertical. Esse diagrama foi retirado de [“JPEG for the horseshoe
crabs”](http://frdx.free.fr/JPEG_for_the_horseshoe_crabs.pdf) de Frédéric Kayser.


Há uma série de amostras comuns discutidas ao se falar sobre subsampling.
Em geral, `4:4:4`, `4:2:2` e `4:2:0`. Mas, o que elas representam? Digamos que
uma subsample tenha o formato A:B:C. A é o número de pixels em uma linha e para
JPEGs, esse número geralmente é igual a 4. B representa a quantidade de cor da primeira linha e C
é a quantidade de cor na segunda linha.

* `4:4:4` não tem compressão, então cor e luma são completamente transportadas.
* `4:2:2` tem metade de sampling na horizontal e sampling total na vertical.
* `4:2:0` faz o sampling das cores da metade dos pixels da primeira linha e ignora a
  segunda linha.

Note: jpegtran e cjpeg oferecem suporte para configuração distinta de qualidade de luminância e
chroma. Isso pode ser feito adicionando a sinalização `-sample` (ex.: `-sample 2x1`).

Algumas boas regras gerais:  subsampling (`-sample 2x2`) é ótimo para fotos.
no-subsampling (`-sample 1x1`) é melhor para capturas de tela, banners e botões.
Por fim, também há o meio-termo (`2x1`) se você não souber qual usar.</aside>

Ao reduzir os pixels em nossos componentes de chroma, é possível reduzir significativamente o tamanho de componentes de
cor e, assim, reduzindo o tamanho do byte.


<img src="images/subsampling.jpg" alt="Configurações de subsampling do Chrome para um
        JPEG com qualidade 80." /> Configurações de chroma subsampling para um JPEG com
        qualidade 80.


Vale a pena considerar a chroma subsampling para a maioria dos tipos de imagem. Mas, ela tem
algumas exceções importantes. Como a subsampling depende das limitações de nossos olhos, ela não é
adequada para comprimir imagens em que os detalhes de cor sejam tão importantes quanto a
luminância (ex.: imagens médicas).

As imagens com fontes também podem ser afetadas negativamente, já que uma subsampling de baixa qualidade do texto pode
diminuir sua legibilidade. Bordas mais nítidas são mais difíceis de comprimir com JPEG, já que foram
projetadas para lidar melhor com cenas fotográficas com transições mais suaves.



<img src="images/Screen_Shot_2017-08-25_at_11.06.27_AM.jpg" alt="Tenha cuidado ao
        usar subsampling pesado com imagens que tenham texto" /> [Understanding
        JPEG “Entender JPEG”](http://compress-or-die.com/Understanding-JPG/) recomenda usar
        uma subsampling de 4:4:4 (1 x 1) ao trabalhar com imagens que contenham
        texto.


Quiz: o método de Chroma subsampling não foi definido nas especificações de
JPEG, então decodificadores diferentes oferecem abordagens distintas. MozJPEG e
libjpeg-turbo usam o mesmo método de escalonamento. Versões mais antigas de libjpeg usam um
método diferente que acrescenta artefatos de toque em cores.

Note: o Photoshop define automaticamente a Chroma subsampling ao usar o recurso “Save for
web”. Quando a qualidade da imagem está definida para 51-100, a subsampling
não é usada (`4:4:4`). Quando a qualidade está abaixo disso, uma subsampling `4:2:0` é
usada. Esse é um motivo para observar uma redução de um tamanho de arquivo muito maior
ao trocar a qualidade de 51 para 50.

Note: nas discussões de subsampling, o termo
[YCbCr](https://en.wikipedia.org/wiki/YCbCr) é frequentemente mencionado. Ele é um modelo
que pode representar espaços de cor
com correção de gama [RGB](https://en.wikipedia.org/wiki/RGB_color_model). Y é
luminância com correção de gama, Cb é o componente chroma da cor azul e Cr é o componente chroma da
cor vermelha. Se você analisar ExifData, você verá YCbCr ao lado dos
níveis de amostragem.

Para ler mais sobre Chroma Subsampling, veja [Why aren’t your images using
Chroma
subsampling? (Por que suas imagens não usam o Chroma Subsampling?](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/).

### O quanto já evoluímos com JPEG? {: #how-far-have-we-come-from-the-jpeg }

**Aqui está o estado atual dos formatos de imagem na Web:**

*tl;dr – há muita fragmentação. Precisamos frequentemente disponibilizar condicionalmente
diferentes formatos a navegadores distintos para aproveitar os recursos modernos.*


<img src="images/format-comparison.jpg" alt="formatos modernos de imagem baseados
        na qualidade." /> Diferentes formatos modernos de imagem (e otimizadores) costumavam
        demonstrar o que era possível com uma meta de tamanho de arquivo de 26 KB. Podemos
        comparar a qualidade usando
        [SSIM](https://en.wikipedia.org/wiki/Structural_similarity) (semelhança
        estrutural) ou [Butteraugli](https://github.com/google/butteraugli),
        que logo abordaremos em mais detalhes.


*   **[JPEG 2000](https://en.wikipedia.org/wiki/JPEG_2000) (2000)** – uma
    melhoria ao JPEG, mudando de uma transformação discreta de cosseno para um
    método baseado em wavelet. **Compatibilidade com navegadores: Safari para desktop + iOS**
*   **[JPEG XR](https://en.wikipedia.org/wiki/JPEG_XR) (2009)** – alternativa para
    JPEG e JPEG 2000 com compatibilidade para
    [HDR](http://wikivisually.com/wiki/High_dynamic_range_imaging) e espaços de cor amplos
    [gamut](http://wikivisually.com/wiki/Gamut). Produz arquivos
    menores do que JPEG a velocidades de codificação/descodificação levemente mais lentas. **Compatibilidade com navegadores:
    Edge, IE.**
*   **[WebP](https://en.wikipedia.org/wiki/WebP) (2010)** – formato baseado na
    previsão de blocos pelo Google com suporte para compressão com e sem perda.
    Oferece economias de byte associadas ao JPEG e suporte de transparência de PNGs
    com muitos bytes são frequentemente usados. Não possui a configuração de chroma subsampling e
    o carregamento progressivo. Tempos de decodificação também são mais lentos do que a decodificação de JPEG.
    **Compatibilidade com navegadores: Chrome, Opera. Testado com Safari e Firefox.**
*   **[FLIF](https://en.wikipedia.org/wiki/Free_Lossless_Image_Format) (2015)**
	- formato de imagem sem perda que diz ter desempenho superior ao PNG, WebP sem perda, BPG
    sem perda e JPEG 2000 sem perda com base na proporção de compressão. **Compatibilidade com navegadores:
    nenhuma.**
*   **HEIF e BPG.** Do ponto de vista da compressão, eles são os mesmos, mas possuem
    um wrapper diferente:
*   **[BPG](https://en.wikipedia.org/wiki/Better_Portable_Graphics) (2015)** –
    tem como objetivo ser uma substituição de compressão mais eficaz para JPEG, com base em
    HEVC ([Codificação de vídeo de alta
    eficiência](http://wikivisually.com/wiki/High_Efficiency_Video_Coding)). Parece
    oferecer melhor tamanho de arquivo em comparação ao MozJPEG e WebP. É improvável que tenha
    ampla adesão por questões de licenciamento. **Compatibilidade com navegador: nenhum. *Há
    um [decodificador de JS no navegador](https://bellard.org/bpg/).***
*   **[HEIF](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format)
    (2015)** – formato para imagens e sequências de imagens para armazenar imagens codificadas com
    HEVC e com limitações de interprevisão. A Apple anunciou no
    [WWDC](https://www.cnet.com/news/apple-ios-boosts-heif-photos-over-jpeg-wwdc/)
    que eles estudarão a mudança de HEIF para JPEG para o iOS, citando economias de até 2
    vezes mais em tamanho de arquivo. **Compatibilidade com navegadores: Nenhum até o momento.
    No futuro, Safari para desktop e iOS 11**

Se você for mais visual, você talvez goste de
[uma](https://people.xiph.org/~xiphmont/demo/daala/update1-tool2b.shtml)
[dessas](http://xooyoozoo.github.io/yolo-octo-bugfixes/#cologne-cathedral&jpg=s&webp=s)
ferramentas de comparação visual para algumas opções acima.

Assim, **a compatibilidade com o navegador é fragmentada**, e se quiser aproveitar uma das opções
acima, você provavelmente precisará disponibilizar fallbacks condicionalmente para cada
navegador desejado. No Google, notamos uma certa promessa com o WebP, então falaremos logo
sobre ele em mais detalhes.

Também é possível disponibilizar formatos de imagem (ex.: WebP, JPEG 2000) com uma extensão .jpg (ou
qualquer outra), já que o navegador pode renderizar uma imagem, ele pode decidir o tipo de mídia. Isso
permite a [negociação
de tipo de conteúdo](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/)
no servidor de modo que ele decida qual imagem enviar sem precisar alterar o HTML.
Serviços como o Instant Logic usam essa abordagem ao enviar imagens para seus
clientes.

Em seguida, falaremos sobre uma opção para quando não for possível disponibilizar condicionalmente
diferentes formatos de imagem: **otimizar codificadores JPEG**.


### Otimizar codificadores JPEG {: #optimizing-jpeg-encoders }

Codificadores JPEG modernos tentam produzir arquivos JPEG menores e de maior fidelidade
e manter a compatibilidade com navegadores e apps de
processamento de imagens existentes. Eles evitam a necessidade de introduzir novos formatos de imagem ou alterações no
ecossistema para que seja possível obter ganhos de compressão. Dois exemplos desses codificadores são
MozJPEG e Guetzli.

***tl;dr Qual codificador de otimização JPEG você deve usar?***

* Recursos gerais da Web: MozJPEG
* A qualidade é sua prioridade e você não se importa em ter tempos de codificação longos: use Guetzli
* Se você precisar de configurabilidade:
 * [JPEGRecompress](https://github.com/danielgtaylor/jpeg-archive) (que usa
   MozJPEG internamente)
 * [JPEGMini](http://www.jpegmini.com/). É parecido com o Guetzli – escolhe a melhor
   qualidade automaticamente. Não é tão tecnicamente sofisticado quanto o Guetzli, mas
   é mais rápido e visa uma faixa de qualidade mais adequada para a Web.
 * [ImageOptim API](https://imageoptim.com/api) (com interface on-line gratuita
   [aqui](https://imageoptim.com/online)) – é único no seu tratamento de
   cores. Você pode escolher a qualidade de cores separadamente da qualidade geral. Ele
   automaticamente escolha o nível de chroma subsampling para preservar cores de alta resolução em
   capturas de tela, mas evita gastar bytes em cores suaves em fotos naturais.

### O que é o MozJPEG? {: #what-is-mozjpeg }

O Mozilla oferece um codificador JPEG modernizado na forma do
[MozJPEG](https://github.com/mozilla/mozjpeg). Ele
[promete](https://research.mozilla.org/2014/03/05/introducing-the-mozjpeg-project/)
eliminar até 10% dos arquivos JPEG. Arquivos comprimidos com MozJPEG funcionam
em vários navegadores e alguns de seus recursos incluem a otimização da varredura progressiva,
[quantização de treliça](https://en.wikipedia.org/wiki/Trellis_quantization)
(descartando detalhes que comprimam o mínimo) e algumas [predefinições de tabela de
quantização](https://calendar.perfplanet.com/2014/mozjpeg-3-0/) decentes que ajudam
a criar imagens com DPI alto mais suaves (embora isso seja possível com ImageMagick se
você estiver disposto a realizar configurações de XML).

O MozJPEG é compatível com
[ImageOptim](https://github.com/ImageOptim/ImageOptim/issues/45) e há um
[plug-in
imagemin](https://github.com/imagemin/imagemin-mozjpeg) configurável e relativamente confiável para ele. Aqui está uma amostra da
implementação com Gulp:

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task('mozjpeg', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([imageminMozjpeg({
        quality: 85

    })]))
    .pipe(gulp.dest('dist'))
);
```


<img src="images/Modern-Image10.jpg" alt="mozjpeg sendo executado a partir da
        linha de comando" />




<img src="images/Modern-Image11.jpg" alt="compressão do mozjpeg com diferentes
        qualidades. Com q=90, 841 KB. Com q=85, 562KB. Com q=75, 324KB. De modo semelhante,
        os graus de Butteraugli e SSIM pioram um pouco à medida que diminuímos a qualidade." />

MozJPEG: Uma comparação dos tamanhos de arquivo e graus de semelhança visual a diferentes
qualidades.

Eu usei [jpeg-compress](https://github.com/imagemin/imagemin-jpeg-recompress)
do projeto [jpeg-archive](https://github.com/danielgtaylor/jpeg-archive)
para calcular os graus de SSIM (semelhança estrutural) de uma imagem fonte.
SSIM é um método para medir a semelhança entre duas imagens, em que o grau de SSIM
é a medição de qualidade de uma imagem, contanto que a outra seja considerada “perfeita”.

Por experiência própria, o MozJPEG é uma boa opção para comprimir imagens para a Web a
uma qualidade visual alta e com reduções no tamanho de arquivo. Para imagens de tamanho pequeno a
médio, eu achei o MozJPEG (à qualidade=80 a 85) resultou em economias de 30 a 40%
no tamanho do arquivo enquanto manteve o SSIM aceitável, oferecendo uma melhoria de 5 a 6% no
jpeg-turbo. Ele vem com um [custo de codificação
mais lenta](http://www.libjpeg-turbo.org/About/Mozjpeg) do que o JPEG padrão, mas você
talvez não tenha problema com isso.

Note: se você precisar de uma ferramenta compatível com MozJPEG que possua suporte para
configurações adicionais e alguns utilitários gratuitos para comparação de imagens, confira
[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive). Jeremy Wagner,
autor de Web Performance in Action (Desempenho da Web em ação) teve alguns resultados positivos com
[esta](https://twitter.com/malchata/status/884836650563579904) configuração.


### O que é Guetzli? {: #what-is-guetzli }

[Guetzli](https://github.com/google/guetzli) é um codificador de
JPEG promissor e perceptivo, embora lento, do Google que tenta encontrar o menor JPEG que seja
perceptivamente indistinguível do original para a visão humana. Ele realiza uma
sequência de experimentos que criam uma proposta para o JPEG final, levando em
consideração o erro psicovisual de cada proposta. Entre todas as propostas criadas, ele seleciona a proposta
com a maior pontuação como resultado final.

Para medir as diferenças entre imagens, o Guetzli usa o
[Butteraugli](https://github.com/google/butteraugli), um modelo para medir
diferença de imagens com base na percepção humana (discutido abaixo). O Guetzli pode levar em
consideração algumas properties da visão que outros codificadores JPEG não levam. Por
exemplo, há uma relação entre a quantidade de luz verde vista e a
sensibilidade ao azul. Assim, alterações na cor azul que fiquem na proximidade do verde podem ser codificados
de um modo um pouco menos preciso.

Note: o tamanho do arquivo de imagem depende **muito** mais da escolha de **qualidade**
do que de **codec**. Há diferentes de tamanho de arquivo muito maiores
entre JPEGs de pior e melhor qualidade em comparação às economias
de tamanho de arquivo possibilitadas pela troca de codecs. Usar a qualidade minimamente aceitável é muito
importante. Evita definir sua qualidade com uma configuração muito alta sem prestar atenção nisso.

O Guetzli
[promete](https://research.googleblog.com/2017/03/announcing-guetzli-new-open-source-jpeg.html
) atingir uma redução de 20 a 30% no tamanho de dados para imagens de um grau de Butteraugli
determinado em comparação a outros compressores. Um aviso importante sobre o Guetzli: ele é
extremamente lento e no momento só é adequado para uso com conteúdo estático.
A partir de “README”, notamos que o Guetzli requer uma quantidade grande memória. Ele pode
levar 1 minuto + 200 MB de RAM por megapixel. Há uma boa conversa sobre a experiência
real com o Guetzli nessa [conversa no
Github](https://github.com/google/guetzli/issues/50). Ele pode ser ideal para
otimizar imagens como parte de um processo de criação de um site estático, mas menos adequado
quando realizado sob demanda.

Note: o Guetzli talvez seja mais adequado para otimizar imagens como parte de um processo
de criação de um site estático ou em situações onde a otimização de imagens não é
realizada sob demanda.

As ferramentas, como ImageOptim, são compatíveis com a otimização do Guetzli (nas [últimas
versões](https://imageoptim.com/)).

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminGuetzli = require('imagemin-guetzli');

gulp.task('guetzli', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([
        imageminGuetzli({
            quality: 85
        })
    ]))
    .pipe(gulp.dest('dist'))

);
```


<img src="images/Modern-Image12.jpg" alt="guetzli sendo executado a partir do gulp para
        otimização" />


Levou quase 7 minutos (e alto uso da CPU) para codificar imagens de 3 x 3 MP usando o
Guetzli com economias variadas. Para arquivar imagens com resolução mais alta, acredito que
isso ofereceria algum valor.


<img src="images/Modern-Image13.jpg" alt="comparação de guetzli a diferentes
        qualidades. q=100, 945 KB. q=90, 687 KB. q=85, 542 KB." /> Guetzli: Uma
        comparação de tamanhos de arquivo e graus de semelhança visual a diferentes
        qualidades.



Note: é recomendado executar o Guetzli em imagens de alta qualidade (ex.: imagens de
entrada não comprimidas, fontes de PNG ou JPEGs de qualidade 100% ou próxima). Embora ele funcione
em outras imagens (ex.: JPEGs de qualidade 84 ou inferior), os resultados podem ser mais pobres.

Vale a pena usar o Guetzli, apesar de ele levar muito tempo para comprimir uma imagem e
fazer suas ventoinhas girarem quando forem imagens maiores. Já vi uma série de
exemplos em que ele economizou até 40% no tamanho do arquivo e manteve a fidelidade
visual. Isso o torna perfeito para arquivar fotos. Em imagens de tamanho pequeno a
médio, ainda consigo economias (na faixa de 10 a 15 KB), mas elas não foram
tão pronunciadas. O Guetzli pode introduzir uma distorção mais “líquida” em
imagens menores durante a compressão.

Você talvez ache a pesquisa de Eric Portis interessante. Ela
[compara](https://cloudinary.com/blog/a_closer_look_at_guetzli) o Guetzli à
compressão automática da Cloudinary para um ponto de dados diferente em termos de eficácia.

### Como o MozJPEG se compara ao Guetzli? {: #mozjpeg-vs-guetzli }

Comparar codificadores de JPEG diferentes é complexo. É preciso comparar a
qualidade e a fidelidade da imagem comprimida e o tamanho final. O especialista
em compressão de imagens Kornel Lesi&#x144;ski observa que comparar um desses
aspectos, mas não ambos, pode levar a conclusões [inválidas](https://kornel.ski/faircomparison)
.

Como o Guetzli se compara ao MozJPEG? Veja o que Kornel diz a respeito disso:

* O Guetzli está ajustado para imagens de qualidade superior (dizem que o butteraugli é o melhor para
  `q=90`+, o ponto crítico do MozJPEG é cerca de `q=75`)
* O Guetzli é muito mais lento para comprimir (ambos criam JPEGs padrão, então a decodificação
  é tão rápida quanto de costume)
* O MozJPEG não seleciona automaticamente a configuração de qualidade, mas você pode atingir a qualidade
  ideal usando uma ferramenta externa, ex.:
  [jpeg-archive](https://github.com/danielgtaylor/jpeg-archive)

Há uma série de métodos para determinar se as imagens comprimidas são visualmente
semelhantes ou aparentemente semelhantes a suas fontes. Estudos de qualidade da imagem frequentemente usam
métodos como [SSIM](https://en.wikipedia.org/wiki/Structural_similarity)
(semelhança estrutural). No entanto, o Guetzli otimiza para Butteraugli.

### Butteraugli {: #butteraugli }

O [Butteraugli](https://github.com/google/butteraugli) é um projeto do Google que
estima o ponto em que uma pessoa pode observar a degradação visual (a
semelhança psicovisual) de duas imagens. Ele atribui um grau às imagens que são
confiáveis em termos de diferenças quase imperceptíveis. O Butteraugli não só
atribui um grau de magnitude, mas também computa um mapa espacial do nível das
diferenças. Embora o SSIM analise o agregado de erros de uma imagem,
o Butteraugli analisa a pior parte.


<img src="images/Modern-Image14.jpg" alt="butteraugli validando a imagem de um
        papagaio" /> Acima está um exemplo que usou o Butteraugli para encontrar o limiar mínimo da qualidade do
        JPEG antes da degradação visual ser inconveniente o suficiente para um
        usuário notar que algo não estava nítido. Isso resultou em uma redução de 65% no
        tamanho total do arquivo.



Na prática, você define uma meta de qualidade visual e, em seguida, executa
uma série de estratégias diferentes de otimização de imagem, de acordo com os graus do
Butteraugli, antes de escolher uma opção que se adeque ao melhor equilíbrio entre
tamanho de arquivo e nível.


<img src="images/Modern-Image15.jpg"
        alt="butteraugli sendo executo a partir da linha de comando" /> No final das contas, eu demorei
        cerca de 30 minutos para configurar o Butteraugli localmente após instalar o Bazel e
        fazer uma versão das fontes de C++ para compilar corretamente no meu Mac. Assim, usá-lo
        é relativamente simples: especifique as duas imagens a serem
        comparadas (uma fonte e uma versão comprimida) e ele fornecerá um grau
        para usar.


**Qual é a diferença do Butteraugli para os outros meios de comparação de semelhança visual?**

[Este
comentário](https://github.com/google/guetzli/issues/10#issuecomment-276295265)
de um membro do projeto Guetzli sugere que o Guetzli funciona melhor no Butteraugli, pior
no SSIM e o MozJPEG funciona bem em ambos. Isso está em linha com a
pesquisa que fiz para a minha estratégia de otimização de imagem. Executo o Butteraugli e
um módulo Nó, como [img-ssim](https://www.npmjs.com/package/img-ssim) nas
imagens em comparação à fonte nos seus graus SSIM antes/depois do Guetzli e do
MozJPEG.

**Combinando codificadores?**

Para imagens maiores, descobri que combinar o Guetzli com a **compressão sem perda** no
MozJPEG (jpegtran, não cjpeg para evitar jogar fora o trabalho feito pelo Guetzli)
pode resultar em uma redução adicional de 10 a 15% no tamanho de arquivo (55% geral) com reduções
muito pequenas no SSIM. Esse é um método que eu recomendaria fazer
experimentações e análises, mas também já foi testado por outros no campo, como
[Ariya Hidayat](https://ariya.io/2017/03/squeezing-jpeg-images-with-guetzli), com
resultados promissores.

O MozJPEG é um codificador de recursos da Web para iniciantes relativamente rápido
, que produz imagens de boa qualidade. Como o Guetzli consome muitos recursos e funciona
melhor em imagens maiores e de qualidade superior, ele é uma opção que eu guardaria para
usuários de nível intermediário a avançado.


## O que é o WebP? {: #what-is-webp }

O [WebP](/speed/webp/) é um formato da imagem recente do
Google, que busca oferecer tamanhos de arquivo menores para compressão com e sem perda a uma
qualidade visual aceitável. Ele inclui o suporte para transparência e
animação do canal Alfa.

No ano passado, o WebP ganhou alguns pontos percentuais em termos de compressão em modos com e sem
perda e em termos de velocidade o algoritmo ficou duas vezes mais rápido com uma melhoria de 10%
na descompressão.  O WebP não é uma ferramenta para uso geral, mas possui
uma certa adesão e uma base de usuários cada vez maior na comunidade de compressão de imagens. Vamos
analisar o porquê.


<img src="images/Modern-Image16.jpg" alt="comparação de webp a diferentes
       configurações de qualidade. q=90, 646 KB. q=80= 290 KB. q=75, 219 KB. q=70, 199 KB" />
       WebP: Uma comparação de tamanhos de arquivo e graus de semelhança visual a
       diferentes qualidades.


### Qual é o desempenho do WebP? {: #how-does-webp-perform }

**Compressão com perda**

Arquivos com perda do WebP, usando uma variante de codificação de frame-chave de vídeo VP8 ou VP9, em média
são citados pela equipe de WebP como sendo
[25 a 34%](/speed/webp/docs/webp_study) menores do que
arquivos JPEG.

Na faixa de baixa qualidade (0-50), o WebP tem uma vantagem enorme sobre o JPEG, pois ele
consegue embaçar artefatos de blocos feios. Uma configuração média de qualidade (-m 4 -q 75)
é o equilíbrio padrão de velocidade/tamanho de arquivo. Na faixa superior (80-99), as
vantagens do WebP diminuem. O WebP é recomendado para casos em que a velocidade é mais importante do que a
qualidade.

**Compressão sem perda**

[Os arquivos sem perda do WebP são 26% menores do que arquivos
PNG](/speed/webp/docs/webp_lossless_alpha_study).
A diminuição do tempo de carga sem perda em comparação ao PNG é de 3%. Dito isso, em geral você
não deve oferecer compressões sem perda a seus usuários na Web. Há uma diferença
entre sem perdas e bordas nítidas (ex.: não JPEG). O WebP sem perda pode ser mais
adequado para conteúdo de arquivo.

**Transparência**

O WebP tem um canal de transparência sem perda de 8 bits com apenas 22% mais bytes do que
PNG. Ele também oferece suporte para transparência RGB com perda, o que é um recurso exclusivo do WebP.

**Metadados**

O formato do arquivo WebP é compatível com os metadados de foto EXIF e metadados do documento de
XMP digital. Ele também contém um perfil de cores ICC.

O WebP oferece melhor compressão ao preço do uso intenso da CPU. Em
2013, a velocidade da compressão do WebP era aproximadamente 10 mais lenta do que o JPEG, mas agora é
insignificante (algumas imagens podem ser 2x mais lentas). Para imagens estáticas que são processadas
como parte da sua versão, isso não deve representar um problema grande. Imagens
geradas dinamicamente provavelmente causarão uma sobrecarga de CPU perceptível e isso será algo que você
precisará avaliar.

Note: as configurações de qualidade com perda do WebP não são diretamente comparáveis ao JPEG. Um JPEG à
“qualidade de 70%" será consideravelmente diferente de uma imagem WebP à “qualidade de 70%”, pois
o WebP atinge tamanhos de arquivos menores pelo descarte de mais dados.


### Quem usa o WebP na produção? {: #whos-using-webp-in-production }

Muitas empresas grandes usam o WebP na produção para reduzir os custos e diminuir os
tempos de carregamento da página da Web.

O Google relatou uma economia de 30-35% ao usar o WebP em comparação a outros esquemas de compressão com perda,
disponibilizando 43 bilhões de solicitações de imagem por dia, 26% das quais são compressões sem perda.
Isso são muitas solicitações e economias significativas. As economias seriam sem dúvida
maiores se a [compatibilidade com navegadores](http://caniuse.com/#search=webp) fosse melhor e
mais abrangente. O Google também usa em sites de produção, como o Google Play e o
YouTube.

Netflix, Amazon, Quora, Yahoo, Walmart, Ebay, The Guardian, Fortune e USA
Today comprimem e disponibilizam imagens com WebP para navegadores compatíveis.
VoxMedia [eliminou de 1 a 3 segundos dos tempos de
carregamento](https://product.voxmedia.com/2015/8/13/9143805/performance-update-2-electric-boogaloo)
para The Verge pela troca para o WebP para usuários do Chrome.
[500px](https://iso.500px.com/500px-color-profiles-file-formats-and-you/) observou em
média 25% de redução no tamanho do arquivo da imagem com qualidade similar ou melhor
ao trocar para disponibilizá-lo para seus usuários do Chrome.

Há muitas outras empresas que aderiram a essa ferramenta que essa lista não aponta.


<img src="images/webp-conversion.jpg" alt="Estatísticas do WebP no Google: mais de 43 bilhões de solicitações
        de imagem por dia" /> Uso do WebP no Google: 43 bilhões de solicitações de imagem do WebP
        por dia são disponibilizadas no YouTube, Google Play, Chrome Data Saver e G+.

### Como funciona a codificação do WebP? {: #how-does-webp-encoding-work }

A codificação com perda do WebP foi desenvolvida para competir com o JPEG em imagens estáticas. Há
três fases chave na codificação com perda do WebP:

**Macrobloqueio** – divisão de uma imagem em blocos de 16 x 16 (macro) de pixels de luma
e 2 blocos de 8 x 8 de pixels de chroma. Isso pode parecer semelhante à ideia do
JPEG fazer a conversão do espaço de cores, a redução de amostragem do canal de chroma e a subdivisão de
imagem.


<img src="images/Modern-Image18.png" alt="Exemplo de bloqueio de um doodle do
         Google em que dividimos uma faixa de pixels em blocos de luma e
        chroma."/>



**Previsão** – cada subbloco de 4 x 4 de um macrobloco tem um modelo de previsão
aplicado que filtra eficientemente. Isso define dois conjuntos de pixels em torno de
um bloco – A (a linha diretamente acima dele) e L (a coluna à esquerda do bloco).
Ao usar esses dois, o codificador preenche um bloco de teste com 4 x 4 pixels e determina
qual cria valores próximos ao bloco original. Colt McAnlis fala sobre
isso em mais detalhes em [How WebP lossy mode
works (Como o modo com perda do WebP funciona)](https://medium.com/@duhroach/how-webp-works-lossly-mode-33bd2b1d0670).



<img src="images/Modern-Image19.png" alt="Exemplo de doodle do Google de um segmento
       exibindo a fila, bloco de destino e coluna L ao considerar um
       modelo de previsão."/>



Uma transformada discreta de cosseno (DCT, em inglês) é aplicada com alguns passos semelhantes à codificação
JPEG. Uma diferença chave é o uso de um [Compressor
aritmético](https://www.youtube.com/watch?v=FdMoL3PzmSA&index=7&list=PLOU2XLYxmsIJGErt5rrCqaSGTMyyqNt2H)
x Huffman de JPEG.

Se você quiser se aprofundar nesse assunto, o artigo do Google Developer [WebP Compression
Techniques (Técnicas de compressão do WebP)](/speed/webp/docs/compression) fala
sobre esse tópico em mais detalhes.


### Compatibilidade do WebP com navegadores {: #webp-browser-support }

Nem todos os navegadores são compatíveis com o WebP, mas [de acordo com
CanIUse.com](http://caniuse.com/webp), o suporte de usuário global está a aproximadamente 74%.
O Google Chrome e o Opera oferecem suporte nativo para ele. Safari, Edge e Firefox experimentaram
ele, mas ainda não o incluíram em versões oficiais. Isso frequentemente
torna a tarefa de levar a imagem do WebP para o usuário do desenvolvedor da Web.
Falaremos mais sobre isso mais tarde.

Aqui estão os principais navegadores e as informações de suporte para cada um deles:

* Chrome: Chrome iniciou o suporte completo na versão 23.
* Google Chrome para Android: Desde Chrome 50
* Android: Desde Android 4.2
* Opera: Desde 12.1
* Opera Mini: Todas as versões
* Firefox: Suporte Beta limitado
* Edge: Suporte Beta limitado
* Internet Explorer: Sem suporte
* Safari: Suporte Beta limitado

WebP também tem pontos negativos. Ele não tem opções de espaço de cores de resolução total
e não oferece suporte para decodificação progressiva. Dito isso, as ferramentas do WebP são satisfatórias
e compatíveis com navegadores, embora limitado ao Chrome e Opera até o momento,
ele pode abranger um número suficiente de usuários para valer a pena considerá-lo com um
fallback.

### Como converter imagens para WebP? {: #how-do-i-convert-to-webp }

Vários pacotes de processamento e edição de imagens comerciais e de código aberto são compatíveis com o
WebP. Um aplicativo especialmente útil é o XnConvert: um conversor gratuito de processamento
de imagens em lote entre plataformas.

Note: é importante evitar a conversão de JPEGs de qualidade baixa ou mediana para WebP.
Esse é um erro comum e pode gerar imagens do WebP com artefatos de
compressão de JPEG. Isso pode levar o WebP a perder eficácia, já que ele precisa salvar a
imagem _e_ as distorções adicionadas pelo JPEG, resultando em uma perda dupla de
qualidade. Alimente os apps de conversão com o arquivo fonte de melhor qualidade disponível, preferencialmente
o original.

**[XnConvert](http://www.xnview.com/en/xnconvert/)**

O XnConvert permite o processamento de imagem em lote, compatível com mais de 500 formatos de
imagem. Você pode combinar mais de 80 ações separadas para transformar ou editar suas
imagens de várias maneiras.


<img src="images/Modern-Image20.png" alt="O app XNConvert no Mac em que um número de
        imagens foram convertidas para o WebP"
         />
O XnConvert é compatível com a otimização de imagens em lote, o que permite a conversão
direta de arquivos fontes para o WebP e outros formatos. Além da
compressão, o XnConvert também pode ajudar com a eliminação de metadados, cortes, personalização de
profundidade de cores e outras transformações.


Algumas das opções relacionadas no site do xnview incluem:

*   Metadados: Edição
*   Transformações: Girar, Cortar, Redimensionar
*   Ajustes: Brilho, Contraste, Saturação
*   Filtros: Embaçar, Alto-relevo, Ajustar nitidez
*   Efeitos: Mascaramento, Marca-d’água, Vinheta

Os resultados das suas operações podem ser exportados para aproximadamente 70 formatos
de arquivo diferentes, inclusive WebP. XnConvert é gratuito para Linux, Mac e Windows.
XnConvert é altamente recomendado, principalmente para pequenas empresas.

**Módulos de nó**

[Imagemin](https://github.com/imagemin/imagemin) é um módulo popular de minificação
de imagens, que também tem um complemento para converter imagens para WebP
([imagemin-webp](https://github.com/imagemin/imagemin-webp)). Ele é compatível com modos
com e sem perda.

Para instalar o imagemin e o imagemin-webp, execute:

```
> npm install --save imagemin imagemin-webp
```

Em seguida, podemos usar “require()” em ambos os módulos e executá-los em qualquer imagem (ex.: JPEG)
em um diretório de projetos. Abaixo, estamos usando uma codificação com perda com um codificador WebP a uma
qualidade de 60:


```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg}'], 'images', {
    use: [
        imageminWebp({quality: 60})
    ]
}).then(() => {
    console.log('Images optimized');
});
```


Semelhante aos JPEGs, é possível notar artefatos de compressão nos resultados.
Avalie o tipo de configuração de qualidade que faz sentido para suas próprias imagens. O Imagemin-webp também
pode ser usado para codificar as imagens WebP de qualidade sem perda (compatível com cores de 24 bits e
transparência total), passando `lossless: true` para as opções:


```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg,png}'], 'build/images', {
    use: [
        imageminWebp({lossless: true})
    ]
}).then(() => {
    console.log('Images optimized');
});
```


Também estão disponíveis um [plug-in WebP para Gulp](https://github.com/sindresorhus/gulp-webp) da Sindre
Sorhus criado no imagemin-webp e um [carregador WebP para
WebPack](https://www.npmjs.com/package/webp-loader). O plug-in
Gulp aceita quaisquer opções que o complemento imagemin aceita:

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        quality: 80,
        preset: 'photo',
        method: 6
    }))
    .pipe(gulp.dest('dist'))
);
```

Ou sem perda:

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp-lossless', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        lossless: true
    }))
    .pipe(gulp.dest('dist'))
);
```

**Otimização de imagens em lote com Bash**

O XNConvert oferece suporte para compressão de imagens em lote, mas se você preferir não
usar um app ou um sistema de versão, os binários de otimização bash e de imagem deixam os processos bem
simples.

É possível converter suas imagens em lote para WebP usando
[cwebp](/speed/webp/docs/cwebp):

```
find ./ -type f -name '*.jpg' -exec cwebp -q 70 {} -o {}.webp \;
```

Também é possível otimizar suas fontes de imagem em lote com o MozJPEG usando
[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive):

```
find ./ -type f -name '*.jpg' -exec jpeg-recompress {} {} \;
```

e corte esses SVGs usando [svgo](https://github.com/svg/svgo) (falaremos sobre ele
mais tarde):

```
find ./ -type f -name '*.svg' -exec svgo {} \;
```

Jeremy Wagner escreveu duas postagens que valem a pena ler. Uma mais abrangente sobre [a otimização de imagens usando o
Bash](https://jeremywagner.me/blog/bulk-image-optimization-in-bash) e outra
sobre fazer esse trabalho em
[paralelo](https://jeremywagner.me/blog/faster-bulk-image-optimization-in-bash)
.

**Outros apps de edição e processamento de imagens do WebP incluem:**

   * Leptonica — Um site todo de apps de processamento e análise de imagens
     de código aberto.

*   O Sketch é compatível com saídas diretamente para o WebP
    * GIMP — Gratuito, alternativa do Photoshop de código aberto. Editor de imagem.
    * ImageMagick — Crie, componha, converta ou edite imagens bitmap. Gratuito.
      App de linha de comando.
    * Pixelmator — Editor de imagem comercial para Mac.
    * Plug-in do WebP para Photoshop — Gratuito. Importação e exportação de imagens. Do Google.

**Android:** você pode converter imagens BMP, JPG, PNG ou GIF estático existentes para o formato
WebP usando o Android Studio. Para mais informações, consulte [Create WebP Images Using
Android Studio (Criar imagens do WebP usando o Android Studio)](https://developer.android.com/studio/write/convert-webp.html).

### <a id="how-do-i-view-webp-on-my-os" href="#how-do-i-view-webp-on-my-os">Como visualizo imagens do WebP no meu SO?</a>

Embora você possa arrastar e soltar imagens do WebP em navegadores baseados em Blink (Chrome, Opera,
Brave) para visualizá-las, você também pode visualizá-las diretamente a partir do seu SO usando um
complemento para Mac ou Windows.

[Facebook testou o
WebP](https://www.cnet.com/news/facebook-tries-googles-webp-image-format-users-squawk/)
há alguns anos atrás e descobriram que os usuários que tentaram clicar com o botão direito em fotos e salvá-las
no disco notaram que elas não eram exibidas fora do navegador por
estarem no WebP. Havia três problemas chave aqui:

<ul> <li>“Salvar como" mas não conseguia ver arquivos do WebP localmente. Isso foi corrigido quando o
Chrome se registrou como um gerenciador de ".webp".</li> <li> “Salvar como” e depois
anexar a imagem a um e-mail e compartilhá-la com outra pessoa sem o Chrome.
O Facebook resolveu isso pela introdução de um botão “Fazer download” na IU
e retornar um JPEG quando usuários solicitavam o download.</li> <li>Right click >
copy URL -> share URL on the web. Isso foi resolvido pela [negociação de
tipo de conteúdo](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/).</li>
</ul>

Esses problemas podem ser menos importantes para seus usuários, mas é uma observação interessante sobre
o compartilhamento social. Felizmente, hoje em dia há utilitários para visualizar
e trabalhar com o WebP em sistemas operacionais diferentes.

No Mac, experimente o [plug-in Quick Look para
WebP](https://github.com/Nyx0uf/qlImageSize) (qlImageSize). Ele funciona muito
bem:


<img src="images/Modern-Image22.jpg" alt="Mesa de um Mac exibindo um arquivo do WebP
      visualizado usando o plug-in Quick Look para arquivos do WebP"
         />



No Windows, você também pode fazer o download do [pacote de
codec WebP](https://storage.googleapis.com/downloads.webmproject.org/releases/webp/WebpCodecSetup.exe)
, que permite que imagens WebP sejam visualizadas no Explorador de Arquivos e no Visualizador de Fotos
do Windows.

### Como disponibilizo o WebP? {: #how-do-i-serve-webp }

Navegadores sem suporte para WebP podem acabar não exibindo a imagem, o que
não é ideal. Para evitar isso há algumas estratégias que podemos usar para
disponibilizar condicionalmente o WebP com base no suporte do navegador.


<img src="images/play-format-webp.jpg" alt="O painel “Chrome DevTools Network”
        exibindo a cascata para a Play Store no Chrome, onde o WebP é
        disponibilizado."
         />
O painel “Chrome DevTools Network” destacando os arquivos WebP sendo disponibilizados
condicionalmente em navegadores baseados no Blink na coluna "Type".




<img src="images/play-format-type.jpg" alt="Embora a Play Store ofereça WebP
        para Blink, ele retorna para JPEGs para navegadores como o Firefox."
         />
Embora a Play Store ofereça WebP para Blink, ele retorna para JPEGs para navegadores
como o Firefox.



Aqui estão algumas opções para obter imagens do WebP a partir do seu servidor para seu
usuário:

**Como usar .htaccess para disponibilizar cópias do WebP**

Aqui está como usar um arquivo .htaccess para disponibilizar arquivos WebP para navegadores compatíveis
ao combinar uma versão do .webp de um arquivo JPEG/PNG existente no servidor.

Vincent Orback recomendou esta abordagem:

Navegadores podem [indicar o suporte para WebP
explicitamente](http://vincentorback.se/blog/using-webp-images-with-htaccess/) por
um cabeçalho [Accept
](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept). Se
você controlar seu back-end, você pode retornar uma versão do WebP de uma imagem se ela existir
no disco em vez de formatos, como JPEG ou PNG. No entanto, nem sempre isso é possível
(ex.: para hosts estáticos, como páginas GitHub ou S3), então verifique antes
de considerar essa opção.

Aqui está uma amostra do arquivo .htaccess para o servidor da Web Apache:

```
<IfModule mod_rewrite.c>

  RewriteEngine On

  # Check if browser support WebP images
  RewriteCond %{HTTP_ACCEPT} image/webp

  # Check if WebP replacement image exists
  RewriteCond %{DOCUMENT_ROOT}/$1.webp -f

  # Serve WebP image instead
  RewriteRule (.+)\.(jpe?g|png)$ $1.webp [T=image/webp,E=accept:1]

</IfModule>

<IfModule mod_headers.c>

    Header append Vary Accept env=REDIRECT_accept

</IfModule>

AddType  image/webp .webp
```

Se houver problemas com a exibição de imagens .webp na página, verifique se
a imagem/o webp MIME type está ativado no seu servidor.

Apache: adicione o seguinte código a seu arquivo .htaccess:

```
AddType image/webp .webp
```

Nginx: adicione o seguinte código ao seu arquivo mime.types:

```
image/webp webp;
```

Note: Vincent Orback oferece um exemplo de [configuração
htaccess](https://github.com/vincentorback/WebP-images-with-htaccess) para disponibilizar
WebP para referência e Ilya Grigorik mantém uma coleção de [scripts
de configuração para disponibilizar o WebP](https://github.com/igrigorik/webp-detect) que pode ser
útil.


**Como usar a tag `<picture>`**

O próprio navegador é capaz de escolher qual formato de imagem exibir pelo
uso da tag `<picture>`. A tag `<picture>` utiliza vários elementos `<source>`
, com uma tag `<img>`, que é o elemento DOM real que contém
a imagem. O navegador passa ciclicamente pelas fontes e recupera a primeira correspondência.
Se a tag `<picture>` não for compatível com o navegador de um usuário, um `<div>` é
renderizado e a tag `<img>` é usada.

Note: tenha cuidado com a posição de `<source>`, já que a ordem é importante. Não coloque as fontes de
imagem/webp depois de formatos legados, mas em vez disso, coloque-as antes deles. Navegadores
que compreendem isso os usarão e aqueles que não compreenderem isso os moverão para bibliotecas
compatíveis mais amplas. Você também pode colocar suas imagens em ordem de tamanho de arquivo se
todas elas tiverem o mesmo tamanho físico (quando não usarem o atributo `media`).
Em geral, essa é a mesma ordem que colocar o legado por último.

Aqui está uma amostra de HTML:

```html
<picture>
  <source srcset="/path/to/image.webp" type="image/webp">
  <img src="/path/to/image.jpg" alt="">
</picture>

<picture>
    <source srcset='paul_irish.jxr' type='image/vnd.ms-photo'>
    <source srcset='paul_irish.jp2' type='image/jp2'>
    <source srcset='paul_irish.webp' type='image/webp'>
    <img src='paul_irish.jpg' alt='paul'>
</picture>

<picture>
   <source srcset="photo.jxr" type="image/vnd.ms-photo">
   <source srcset="photo.jp2" type="image/jp2">
   <source srcset="photo.webp" type="image/webp">
   <img src="photo.jpg" alt="My beautiful face">
</picture>
```

**Conversão CDN automática para WebP**

Alguns CDNs são compatíveis com a conversão automática para WebP e podem usar dicas de cliente para disponibilizar
imagens WebP [sempre que
possível](http://cloudinary.com/documentation/responsive_images#automating_responsive_images_with_client_hints).
Verifique com seu CDN para ver se o suporte para WebP está incluído no serviço deles. Você talvez
tenha uma solução fácil esperando por você.

**Suporte WebP para WordPress**

Jetpack — Jetpack, um plug-in popular do WordPress, inclui um serviço de imagem CDN
chamado [Photon](https://jetpack.com/support/photon/). Com o Photon, você recebe
suporte de imagem perfeito para WebP. O CDN do Photon está incluído no nível gratuito do Jetpack,
então esse é um valor bom e uma implementação prática. A desvantagem é que o
Photon redimensiona sua imagem, coloca uma consulta de string no seu URL e requer uma consulta de
DNS adicional para cada imagem.

**Ativador e otimizador de cache** — Se você estiver usando o WordPress, há pelo menos
uma opção de código aberto intermediário. O plug-in de código aberto [Cache
Enabler](https://wordpress.org/plugins/cache-enabler/) tem uma opção
de caixa de seleção de menu para armazenar em cache imagens WebP a serem disponibilizadas se possível e se o navegador atual do
usuário oferecer suporte para elas. Isso facilita a disponibilidade de imagens WebP. Mas, há uma desvantagem:
O Cache Enabler requer o uso de um programa relacionado chamado Optimizer, que possui
uma taxa anual. Isso parece estranho para uma solução verdadeiramente de código aberto.


**ShortPixel** — Outra opção que pode ser usada no modo autônomo ou com o Cache
Enabler, também mediante uma taxa, é o ShortPixel. No modo autônomo, o [ShortPixel](https://shortpixel.com)
pode adicionar uma tag `<picture>` que geralmente disponibilizará o tipo certo de imagem
dependendo do navegador. Você pode otimizar até 100 imagens por mês sem custo algum.

**Comprimir GIFs animados e por que `<video>` é melhor**

GIFs animados continuam a desfrutar de amplo uso, apesar de serem um
formato muito limitado. Embora tudo, desde redes sociais a sites de mídia popular, incorporem
muitos GIFs animados, o formato *nunca* foi projetado para armazenamento de vídeo ou
animação. Na verdade, o [GIF89a
spec](https://www.w3.org/Graphics/GIF/spec-gif89a.txt) observa que “o GIF não é
uma plataforma para animação". O [número de cores, número de frames
e
dimensões](http://gifbrewery.tumblr.com/post/39564982268/can-you-recommend-a-good-length-of-clip-to-keep-gifs)
afetam o tamanho de GIFs animados. Mudar para vídeo oferece as maiores economias.



<img src="images/animated-gif.jpg" alt="GIF animado x Vídeo: uma comparação de
        tamanhos de arquivo com qualidade equivalente para diferentes formatos."
         />
GIF animado x Vídeo: uma comparação de
tamanhos de arquivo com qualidade equivalente para diferentes formatos.


**Oferecer o mesmo arquivo que um vídeo MP4 pode frequentemente eliminar 80% ou mais do
tamanho do arquivo.** Não só GIFs frequentemente gastam largura de banda significativa, mas eles levam
mais tempo para carregar, incluir menores cores e em geral oferece experiências
do usuário de subparte. Você talvez já tenha notado GIFs animados que são enviados para o Twitter
com melhor desempenho do que em outros sites. [GIFs animados no Twitter não
são GIFs de verdade](http://mashable.com/2014/06/20/twitter-gifs-mp4/#fiiFE85eQZqW).
Para melhorar a experiência do usuário e reduzir o consumo de largura de banda, os GIF animados
enviados para o Twitter são, na realidade, convertidos para vídeo. De modo similar, [a Imgur converte
GIFs para
vídeos](https://thenextweb.com/insider/2014/10/09/imgur-begins-converting-gif-uploads-mp4-videos-new-gifv-format/)
durante o upload, convertendo silenciosamente o arquivo para o formato MP4.

Por que os GIFs são muito maiores? Os GIFs animados armazenam cada frame como uma imagem GIF
sem perda. Isso mesmo, sem perda. A qualidade degrada que frequentemente recebemos é por causa da limitação de
GIFs a uma paleta de 256 cores. O formato é frequentemente maior, já que ele não
considera frames vizinhos para compressão, ao contrário de codecs de vídeo, como o H.264. Um vídeo de
MP4 armazena cada frame-chave como um JPEG com perda, o que descarta parte dos dados
originais para atingir uma compressão melhor.

**Se você puder alternar para vídeos**

*   Use [ffmpeg](https://www.ffmpeg.org/) para converter seus GIFs animados (ou
    fontes) para MP4s de H.264. Eu uso esse comando de uma linha da[
    Rigor](http://rigor.com/blog/2015/12/optimizing-animated-gifs-with-html5-video):
    `ffmpeg -i animated.gif -movflags faststart -pix_fmt yuv420p -vf
    "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.mp4`
*   O ImageOptim API também oferece suporte para [converter GIFs para vídeo
    WebM/H.264](https://imageoptim.com/api/ungif), [remover pontilhamento de
    GIFs](https://github.com/pornel/undither#examples), o que pode ajudar os codecs de
    vídeo a comprimir ainda mais.

**Se você precisar usar GIFs animados**

*   Ferramentas, como o Gifsicle, podem eliminar metadados, entradas de paletas não usadas e minimizar
    o que muda entre frames
*   Considere um codificador GIF com perda. A ramificação do
    [Giflossy](https://github.com/pornel/giflossy) do Gifsicle oferece suporte
    para isso com a sinalização `—lossy` e pode eliminar aproximadamente 60 a 65% do tamanho. Também há uma
    boa ferramenta chamada [Gifify](https://github.com/vvo/gifify). Para
    GIFs não animados, converta-os para PNG ou WebP.

Para ver mais informações, consulte o [Book of
GIF (Livro do GIF)](https://rigor.com/wp-content/uploads/2017/03/TheBookofGIFPDF.pdf) da Rigor.

## Otimização de SVG {: #svg-optimization }

Manter SVGs simples significa eliminar tudo que for desnecessário. Arquivos SVG criados
com editores geralmente contêm uma grande quantidade de informações redundantes
(metadados, comentários, camadas ocultas e assim por diante). Esse conteúdo frequentemente pode ser
removido com segurança ou convertido para uma forma mais mínima sem afetar o SVG
final que está sendo renderizado.


<img src="images/Modern-Image26.jpg" alt="svgo"
         />
[SVGOMG](https://jakearchibald.github.io/svgomg/), por Jake Archibald, é uma interface
GUI, que permite otimizar SVGs de acordo com sua preferência pela seleção de
otimizações, com uma visualização ao vivo da marcação resultante


**Algumas regras gerais para otimização de SVG (SVGO):**

*   Reduza e comprima seus arquivos SVG com gzip. SVGs na realidade são apenas recursos de texto expressos
    em XML, como CSS, HTML e JavaScript, e devem ser reduzidos e comprimidos com gzip para
    melhorar o desempenho.
* Em vez de caminhos, use formas de SVG predefinidas, como `<rect>`, `<circle>`,
  `<ellipse>`, `<line>` e `<polygon>`. Priorizar formas predefinidas diminui
 a quantidade de marcação necessária para produzir uma imagem final, o que significa menos código para ser analisado
 e rasterizado pelo navegador. Reduzir a complexidade do SVG significa que um navegador conseguirá
 exibi-lo mais rapidamente.
*   Se você precisar usar caminhos, tente reduzir suas curvas e caminhos. Simplifique e
    combine-os onde puder. A [ferramenta
    Simplify do Illustrator](http://jlwagner.net/talks/these-images/#/2/10) é adepta à remoção de
    pontos irrelevantes até mesmo em trabalhos de arte complexos enquanto suaviza
    irregularidades.
*   Evite usar grupos. Se não conseguir, tente simplificá-los.
*   Exclua camadas que estão invisíveis.
*   Evite qualquer efeito do Photoshop ou Illustrator. Eles podem ser convertidos para imagens
    de rasterização maiores.
*   Clique duas vezes em qualquer imagem de rasterização não incorporada que não são compatíveis com SVG
* Use uma ferramenta para otimizar seus SVGs.
  [SVGOMG](https://jakearchibald.github.io/svgomg/) é uma GUI baseada na Web
  superútil para [SVGO](https://github.com/svg/svgo) de Jake Archibald que achei
  inigualável. Se você usa o Sketch, o plug-in Compressor SVGO ([plug-in do Sketch para
  executar SVGO](https://www.sketchapp.com/extensions/plugins/svgo-compressor/))
  pode ser usado durante a exportação para encolher o tamanho de arquivo.


<img src="images/svgo-precision.jpg" alt="redução de precisão do svgo às vezes pode
        ter um impacto positivo no tamanho"
         />
Um exemplo de execução de uma fonte SVG pelo SCGO no modo de alta precisão (resultando
em uma melhoria de 29% no tamanho) x modo de baixa precisão (uma melhoria de 38% no tamanho).



[SVGO](https://github.com/svg/svgo) é uma ferramenta baseada em nó para otimizar o SVG.
O SVGO pode reduzir o tamanho do arquivo pela diminuição da *precisão* de números nas suas definições de <path>
. Cada dígito após um ponto adiciona um byte e é por isso que alterar a
precisão (número de dígitos) pode fortemente influenciar o tamanho do arquivo. No entanto, tenha muito
cuidado ao alterar a precisão, já que ela pode afetar visualmente a aparência das suas
formas.


<img src="images/Modern-Image28.jpg" alt="em que svgo pode dar errado,
        simplificando demais caminhos e artes"
         />
É importante observar que, embora o SVGO tenha tido um bom desempenho no exemplo anterior sem
simplificar demais os caminhos e as formas, há muitos casos em que talvez esse não seja
o resultado. Observe como a faixa de luz no foguete acima é distorcida a uma
precisão mais baixa.


**Usar SVGO na linha de comando:**

O SVGO pode ser instalado como uma [CLI npm global](https://www.npmjs.com/package/svgo)
, caso você prefira essa opção à GUI:

```
npm i -g svgo
```

Em seguida, isso pode ser executado em comparação a um arquivo SVG local da seguinte forma:

```
svgo input.svg -o output.svg
```

Ele é compatível com todas as opções que você possa esperar, incluindo ajustar a precisão do
ponto flutuante:

```
svgo input.svg --precision=1 -o output.svg
```

Consulte o arquivo [readme](https://github.com/svg/svgo) do SVGO para ver uma lista completa das
opções compatíveis.

**Lembre-se de comprimir SVGs!**


<img src="images/before-after-svgo.jpg" alt="antes e após executar uma imagem
        com o svgo"
         />
É importante observar que, embora o SVGO tenha tido um bom desempenho no exemplo anterior sem
simplificar demais os caminhos e as formas, há muitos casos em que talvez esse não seja
o resultado. Observe como a faixa de luz no foguete acima é distorcida a uma
precisão mais baixa.


Além disso, lembre-se de [comprimir seus recursos SVG
em gzip](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)
ou disponibilizá-los usando Brotli. Como são baseados em texto, eles comprimem muito bem
(aproximadamente 50% das fontes originais).

Quando o Google enviou um novo logotipo, anunciamos que a
[menor](https://twitter.com/addyosmani/status/638753485555671040) versão dele
era de apenas 305 bytes de tamanho.


<img src="images/Modern-Image30.jpg" alt="a menor versão do novo logotipo do
        Google tinha apenas 305 bytes de tamanho"
         />


Há [muitos truques de SVG
avançado](https://www.clicktorelease.com/blog/svg-google-logo-in-305-bytes/) que você
pode usar para reduzir esse tamanho ainda mais (até 146 bytes)! Basta
dizer, seja pelas ferramentas ou pela limpeza manual, há provavelmente um *pouco*
mais que você pode eliminar nos seus SVGs.

**Sprites de SVG**

SVG pode ser [eficaz](https://css-tricks.com/icon-fonts-vs-svg/) para ícones,
oferecendo um jeito de representar visualizações como um sprite sem as alternativas
[excêntricas](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html)
necessárias para fontes de ícones. Ele tem controle de estilo CSS mais granular do que
fontes de ícones (properties de traço SVG), melhor controle de posicionamento (não precisa criar
em torno de pseudo-elementos e CSS `display`) e SVGs são muito mais
[acessíveis](http://www.sitepoint.com/tips-accessible-svg/).

Ferramentas, como [svg-sprite](https://github.com/jkphl/svg-sprite) e
[IcoMoon](https://icomoon.io/), podem automatizar a combinação de SVGs a sprites, que
podem ser usados por meio de um [Sprite CSS](https://css-tricks.com/css-sprites/), [Sprite
de símbolo](https://css-tricks.com/svg-use-with-external-reference-take-2) ou
[Sprite de pilhas](http://simurai.com/blog/2012/04/02/svg-stacks). Una Kravetz tem um
[artigo](https://una.im/svg-icons/#💁) prático sobre como usar
gulp-svg-sprite em um fluxo de trabalho de sprite SVG que vale a pena conferir. Sara Soudein também
aborda [como fazer a transição de fontes de ícones para
SVG](https://www.sarasoueidan.com/blog/icon-fonts-to-svg/) no blog dela.

**Leituras adicionais**

As [dicas para otimizar a oferta de SVG para a
Web](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)da Sara Soueidan
e o livro [Practical SVG
(SVG prático)](https://abookapart.com/products/practical-svg) do Chris Coyier são ótimos. Também achei
as postagens sobre otimização de SVG de Andreas Larsen úteis ([parte
1](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-1-67e8f2d4035),[parte
2](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-2-6711cc15df46)).[Preparing
and exporting SVG icons in
Sketch (Como preparar e exportar ícones de SVG no Sketch)](https://medium.com/sketch-app-sources/preparing-and-exporting-svg-icons-in-sketch-1a3d65b239bb)
também foi uma ótima leitura.

## Evitar recomprimir imagens com codecs com perda {: #avoid-recompressing-images-lossy-codecs }

É recomendado sempre comprimir usando a imagem original. Recomprimir
imagens tem consequências. Digamos que você tem um JPEG que já foi
comprimido a uma qualidade de 60. Se você comprimir essa imagem novamente com codificação
com perda, ela ficará pior. Cada leva adicional de compressão introduzirá
perda geracional, ou seja, as informações serão perdidas e os artefatos de compressão
começarão a acumular. Mesmo se você comprimir novamente com uma configuração de qualidade alta.

Para evitar essa armadilha, **primeiro defina a boa qualidade mais baixa que você está disposto
a aceitar** e você terá o máximo de economias de arquivo desde o início. Depois disso,
evite essa armadilha, porque qualquer redução de tamanho do arquivo a partir da própria redução de qualidade
terão uma aparência ruim.

Recodificar um arquivo com perda quase sempre resultará em um arquivo menor, mas isso
não significa que você está recebendo a qualidade que você espera.


<img src="images/generational-loss.jpg" alt="perda geracional ao recodificar
        uma imagem várias vezes"
         />
Acima, a partir deste [excelente vídeo](https://www.youtube.com/watch?v=w7vXJbLhTyI)
e [artigo
complementar](http://cloudinary.com/blog/why_jpeg_is_like_a_photocopier) de Jon
Sneyers, podemos ver o impacto da perda geracional na recompressão usando vários
formatos. Há um problema que você talvez já tenha tido se você salvou
imagens (já comprimidas) a partir de redes sociais e as reenviou (causando a compressão).
A perda de qualidade se acumulará.



O MozJPEG (talvez por acidente) possui mais resistência à degradação
de recompressão graças à quantização de treliça. Em vez de comprimir todos os valores
DCT no estado como estão, ele consegue verificar valores próximos em uma faixa de +1/-1 para
conferir se valores similares comprimem para menos bits. FLIF com perda tem um hack semelhante ao
PNG com perda no sentido de que antes da (re)compressão, ele pode analisar os dados e decidir
quais dados eliminar. PNGs recomprimidos possuem “furos" que ele pode detectar para evitar
mais mudanças nos dados.

**Ao editar seus arquivos fonte, armazene-os em um formato sem perda, como PNG ou
TIFF. Assim, você preserva o máximo de qualidade possível.** Depois, suas ferramentas de compilação ou
serviço de compressão de imagens produzem a versão comprimida que você disponibilizará
aos usuários com perda mínima em qualidade.

## Reduzir custos desnecessários com decodificação e redimensionamento de imagens {: #reduce-unnecessary-image-decode-costs }

Todos nós já enviamos imagens grandes de resoluções muito alta para usuários
sem necessidade. Mas, isso tem um preço. Decodificar e redimensionar imagens são operações
caras para um navegador em um hardware médio de dispositivo móvel. Se enviar imagens
grandes e redimensioná-las usando CSS ou atributos de largura/altura, você provavelmente verá
isso acontecer e isso pode afetar o desempenho.


<img src="images/image-pipeline.jpg" alt="Há muitas etapas envolvidas em um
        navegador usar uma imagem especificada em uma tag e exibi-la em uma
        tela. As etapas incluem solicitar, decodificar, redimensionar, copiar para a GPU, exibir."
         />

Quando um navegador busca uma imagem, ele precisa decodificá-la a partir do formato
fonte original (ex.: JPEG) para um bitmap na memória. Com frequência, a imagem precisa ser
redimensionada (ex.: a largura precisa ser definida para um percentual de seu contêiner). Decodificar e
redimensionar imagens são processos onerosos e podem atrasar o tempo que leva para uma imagem ser
exibida.


Enviar imagens que um navegador pode renderizar sem precisar redimensioná-la
é o ideal. Assim, disponibilize as menores imagens para seus tamanhos de tela e
resolução de destino, aproveitando [`srcset` e
`sizes`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
. Falaremos sobre `srcset` em seguida.

Omitir o atributo `width` ou `height` em uma imagem também pode afetar
negativamente o desempenho. Sem eles, o navegador atribuir uma região de marcador menor
para a imagem até que bytes suficientes cheguem para ele saber as dimensões
corretas. Nesse momento, o layout do documento precisa ser atualizado em uma etapa cara
chamada de reflow.


<img src="images/devtools-decode.jpg" alt="custos de decodificação da imagem mostrados no
        Chrome DevTools"
         />
Os navegadores precisam passar por uma série de etapas para pintar imagens na tela. Além
de buscá-las, as imagens precisam ser decodificadas e frequentemente redimensionadas. Esses
eventos podem ser auditados no Chrome DevTools
[Timeline](/web/tools/chrome-devtools/evaluate-performance/performance-reference).



Imagens maiores também apresentam um aumento nos custos de tamanho de memória. Imagens decodificadas
são aproximadamente 4 bytes por pixel. Se você não tiver cuidado, você pode literalmente causar a falha do
navegador. Em dispositivos de baixa capacidade, não é preciso muito para iniciar a troca de memória.
Assim, fique de olho nos custos de decodificação, redimensionamento e memória da imagem.


<img src="images/image-decoding-mobile.jpg" alt="Decodificar imagens pode ser
        incrivelmente caro em hardware de dispositivo móvel médio e de baixa capacidade"
         />
Decodificar imagens pode ser incrivelmente caro em um smartphone médio e de baixa capacidade.
Em alguns casos, o processo pode ser 5 vezes mais lento (no mínimo).


Ao criar sua nova [experiência
da Web para dispositivos móveis](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3),
o Twitter aprimorou o desempenho de decodificação de imagens, garantindo que eles disponibilizassem
imagens corretamente dimensionadas para seus usuários. Isso reduziu o tempo de decodificação de muitas imagens na
linha do tempo do Twitter de aproximadamente 400 ms até cerca de 19!


<img src="images/image-decoding.jpg" alt="Painel do Chrome DevTools Timeline/Performance
        destacando os tempos de decodificação da imagem antes e depois do Twitter Lite
        otimizar seu canal de imagem. Antes era maior."
         />
Painel do Chrome DevTools Timeline/Performance destacando os tempos de decodificação da imagem (em
verde) antes e depois do Twitter Lite otimizar seu canal de imagem.

### Como oferecer imagens HiDPI usando `srcset` {: #delivering-hidpi-with-srcset }

Os usuários podem acessar seu site em uma variedade de dispositivos móveis e de desktop com
telas de alta resolução. A [Proporção de pixels
do dispositivo](https://stackoverflow.com/a/21413366) (DPR) (também conhecida como “proporção de pixel
CSS") determina como a resolução da tela de um dispositivo será interpretada pelo CSS. A DPR
foi criado por fabricantes de smartphone para permitir o aumento de resolução e
nitidez das telas de dispositivos móveis sem fazer os elementos parecerem muito pequenos.

Para combinar a qualidade de imagem esperada pelos usuários, ofereça imagens com a
resolução correta para seus dispositivos. Imagens nítidas com DRP alto (ex.: 2x, 3x) podem ser
disponibilizadas para dispositivos que são compatíveis com elas. Imagens com DRP baixa e padrão devem ser
disponibilizadas a usuários sem telas de alta resolução, já que imagens 2x+ frequentemente pesam
mais bytes significativos.


<img src="images/device-pixel-ratio.jpg" alt="Um diagrama da proporção de
        pixel do dispositivo a 1x, 2x e 3x. A qualidade da imagem parecer ficar mais nítida conforme a DPR
        aumenta e um visual é mostrado comparando os pixels do dispositivo aos pixels do CSS"
         />
Proporção de pixels do dispositivo: Muitos sites rastreiam a DRP para dispositivos populares, incluindo
[material.io](https://material.io/devices/) e
[mydevice.io](https://mydevice.io/devices/).



[srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
permite que um navegador selecione a melhor imagem por dispositivo, ex.: selecione uma
imagem 2x para uma tela de dispositivo móvel de 2x. Navegadores sem suporte para `srcset` podem retornar
para o padrão `src` especificado na tag `<img>`.

```
<img srcset="paul-irish-320w.jpg,
             paul-irish-640w.jpg 2x,
             paul-irish-960w.jpg 3x"
     src="paul-irish-960w.jpg" alt="Paul Irish cameo">
```

CDNs de imagens, como
[Cloudinary](http://cloudinary.com/blog/how_to_automatically_adapt_website_images_to_retina_and_hidpi_devices)
e [Imgix](https://docs.imgix.com/apis/url/dpr), oferecem suporte para controlar a densidade de
imagem para disponibilizar a melhor densidade aos usuários a partir de uma única fonte canônica.

Note: saiba mais sobre a proporção de pixels do dispositivo e as imagens responsiva neste
curso gratuito da [Udacity](https://www.udacity.com/course/responsive-images--ud882)
e o guia [Imagens (Imagens)](/web/fundamentals/design-and-ui/responsive/images) em Web
Fundamentals.

Lembre-se de que as [Dicas de
cliente](https://www.smashingmagazine.com/2016/01/leaner-responsive-images-client-hints/)
também pode oferecer uma alternativa para especificada cada densidade de pixel possível e
formato na sua marcação de imagem responsiva. Em vez disso, eles anexam essas informações à
solicitação HTTP para que os servidores da Web possam escolher a melhor opção para a
densidade da tela do dispositivo atual.

### Direção de arte {: #art-direction }

Embora enviar a resolução certa para os usuários seja importante, alguns sites também
precisam pensar sore isso em termos de **[direção
de arte](http://usecases.responsiveimages.org/#art-direction)**. Se um usuário tiver
uma tela menor, você talvez precise cortar ou aumentar o zoom e exibir o assunto para
aproveitar ao máximo o espaço disponível. Embora a direção de arte esteja fora do escopo
desse artigo, serviços como o[
Cloudinary](http://cloudinary.com/blog/automatically_art_directed_responsive_images%20)
oferecem APIs para tentar automatizar o máximo possível.


<img src="images/responsive-art-direction.jpg" alt="direção de arte responsiva em
        ação, adaptando para mostrar mais ou menos de uma imagem de uma maneira cortada
        dependendo do dispositivo"
         />
Direção de arte: Eric Portis para reunir uma
[amostra](https://ericportis.com/etc/cloudinary/) excelente de como as imagens podem ser
usadas para direção de arte. Esse exemplo adapta as características visuais
do protagonista da imagem em diferentes pontos de quebra para aproveitar ao máximo o espaço
disponível.

## Gerenciamento de cores {: #color-management }

Há pelo menos três perspectivas diferentes de cor: biologia, física e
estampa. Na biologia, a cor é um [fenômeno
percentual](http://hubel.med.harvard.edu/book/ch8.pdf). Os objetos refletem a luz em
diferentes combinações de comprimentos de onda. Os receptores de luz em nossos olhos traduzem
esses comprimentos de onda na sensação que conhecemos como cor. Na física, a luz é que
importa, ou seja, frequências de luz e brilho. A estampa se trata mais de paletas de
cores, tintas e modelos artísticos.

O ideal seria que cada tela e navegador da Web no mundo exibisse as cores exatamente
iguais. Infelizmente, devido a um número de inconsistências inerentes, eles
não fazem isso. O gerenciamento de cor permite que se chegue a um consenso sobre a exibição de cores
por modelos, espaços e perfis de cores.

#### Modelos de cor {: #color-models }

[Modelos de cores](https://en.wikipedia.org/wiki/Gamma_correction) são um sistema para
gerar uma gama completa de cores a partir de um conjunto menor de cores primárias.
Existem tipos diferentes de espaços de cor que usam parâmetros distintos para
controlar cores. Alguns espaços de cor possuem menos parâmetros de controle do que outros.
Por exemplo, a escala de cinza só tem um parâmetro para controlar o brilho entre
o preto e o branco.

Há dois modelos comuns de cor: adição e subtração. Modelos de cor de adição
(como RGB, usadas para telas digitais) usam a luz para mostrar cor enquanto os modelos de cor
de subtração (como CMYK, usado para impressão) retiram a luz.



<img src="images/colors_ept6f2.jpg" alt="sRGB, Adobe RGB e ProPhoto RGB" /> No
        RGB, a luz vermelha, verde e azul são adicionadas em diferentes combinações para
        produzir um amplo espectro de cores. No CYMK (ciano, magenta, amarelo e
        preto), diferentes cores de tinta subtraem o brilho do
        papel branco.


[Understanding Color Models and Spot Color
Systems (Entendendo modelos de cores e sistemas de cor)](https://www.designersinsights.com/designer-resources/understanding-color-models/)
oferece uma boa descrição de outros modos e modelos de cor, como HSL, HSV e
LAB.

#### Espaços de cor {: #color-spaces }

[Espaços de
cor](http://www.dpbestflow.org/color/color-space-and-color-profiles#space)
são uma faixa específica de cores que podem ser representadas para uma dada imagem. Por
exemplo, se uma imagem tiver até 16,7 milhões de cores, diferentes espaços de cor
permitem usar faixas mais restritas ou amplas dessas cores. Alguns desenvolvedores se referem
a modelos de cor e espaços de cor como sendo a mesma coisa.

[sRGB](https://en.wikipedia.org/wiki/SRGB) foi desenvolvido para ser um espaço de cor
[padrão](https://www.w3.org/Graphics/Color/sRGB.html) para a Web
e é baseado no RGB. É um espaço de cor pequeno, que geralmente é considerado o
menor denominador comum e é a opção mais segura para o gerenciamento de cores
entre navegadores. Outros espaços de cor (como o [Adobe
RGB](https://en.wikipedia.org/wiki/Adobe_RGB_color_space) ou [ProPhoto
RGB](https://en.wikipedia.org/wiki/ProPhoto_RGB_color_space), usados no Photoshop
e no Lightroom) podem representar cores mais vibrantes do que o sRGB, mas como o último é
mais universal na maioria dos navegadores da Web, jogos e monitores, ele geralmente é
o principal foco.



<img src="images/color-wheel_hazsbk.jpg" alt="sRGB, Adobe RGB e ProPhoto RGB"
        /> Acima, podemos ver uma visualização da gama, ou faixa, de cores que um
        espaço de cor pode definir.


Espaços de cor possuem três canais (vermelho, verde e azul). Há 255 cores
disponíveis em cada canal no modo 8 bits, nos oferecendo um total de 16,7
milhões de cores. Imagens de 16 bits podem mostrar trilhões de cores.


<img src="images/srgb-rgb_ntuhi4.jpg" alt="sRGB, Adobe RGB e ProPhoto RGB" />
        Uma comparação entre sRGB, Adobe RGB e ProPhoto RGB usando uma imagem do
        [Yardstick](https://yardstick.pictures/tags/img%3Adci-p3). É
        extremamente difícil mostrar esse conceito em sRGB, quando não é possível mostrar cores
        que não podem ser vistas. Uma foto regular em sRGB em comparação a uma ampla gama deve ter
        tudo idêntico, exceto as cores quentes mais saturadas.


As diferenças nos espaços de cor (como sRGB, Adobe RGB e ProPhoto RGB) são
sua gama (a faixa de cores que eles podem reproduzir com tons), curvas de luminosidade e
[gama](http://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/)
. sRGB é aproximadamente 20% menor do que o Adobe RGB e o ProPhoto RGB é aproximadamente [50%
maior](http://www.petrvodnakphotography.com/Articles/ColorSpace.htm) do que o Adobe
RGB. As fontes de imagem acima são do [Clipping
Path](http://clippingpathzone.com/blog/essential-photoshop-color-settings-for-photographers).

[Gama ampla](http://www.astramael.com/) é um termo usado para descrever espaços de cores com uma
gama maior do que o sRGB. Esses tipos de telas são cada vez mais comuns. Dito
isso, muitas telas digitais ainda simplesmente não conseguem exibir perfis de cor
que são significativamente melhores do que sRGB. Ao salvar para a Web no Photoshop,
considere usar a opção “Convert to sRGB”, a menos que os usuários de destino possuam
telas de alta capacidade com gama ampla.

<aside class="key-point"><b>Note:</b> ao trabalhar com fotografias originais,
evite usar sRGB como seu espaço principal de cores. É menor do que os espaços de cor
para os quais a maioria das câmeras oferece suporte e pode causar recortes. Em vez disso, trabalhe em um espaço de cor
maior (como ProPhoto RGB) e produza saída para sRGB ao exportar para a Web.</aside>

**Há casos em que a ampla gama faz sentido para o conteúdo da Web?**

Sim. Se uma imagem tiver cores muito saturadas/quentes/vibrantes e você quiser
que ela seja apresente as mesmas características em telas compatíveis. No entanto, em fotos reais isso
raramente acontece. Com frequência, é fácil ajustar a cor para que apareça vibrante,
sem realmente exceder a gama sRGB

Isso se deve porque a percepção de cores do olho humano não é absoluta, mas relativa aos
ambientes a nossa volta e facilmente enganada. Se a imagem tiver uma cor de marcador
fluorescente, então será mais fácil trabalhar com a gama ampla.

#### Correção e compressão de gama {: #gamma-correction }

[Correção de gama](https://en.wikipedia.org/wiki/Gamma_correction) (ou simplesmente
Gama) controla o brilho geral de uma imagem. Mudar a gama também pode
alterar a proporção de vermelho para verde e azul. As cores em imagens sem correção
de gama podem parecer esmaecidas ou muito escuras.

Nos gráficos de vídeo e computadores, gama é usado para compressão, semelhante à compressão de
dados. Isso permite incluir níveis úteis de brilho em menos
bits (8 bits em vez de 12 ou 16). A percepção humana do brilho não é
linearmente proporcional à quantidade física de luz. Representar cores na sua forma
física verdadeira seria uma perda de tempo ao codificar imagens para a visão humana. A compressão
de gama é usada para codificar brilho em uma escala que é mais próxima à visão
humana.

Com a compressão de gama, a escala útil de brilho se encaixa em 8 bits de precisão
(0 a 255 usado pela maioria das cores RGB). Tudo isso vem do fato de que se as cores
usassem alguma unidade com relações 1:1 com a física, os valores de RGB seriam de 1 a
a milhões em que valores 0-1000 pareceriam distintos, mas os valores entre
999000-1000000 pareceriam idênticos. Imagine estar em uma sala no escuro onde só uma
vela está acesa. Acenda uma segunda vela e você notará aumentos significativos no
brilho na luz da sala. Acrescente uma terceira vela e a sala ficará ainda mais clara.
Agora, imagine estar em uma sala com 100 velas. Acenda a 101ª vela, a 102ª.
Você não notará uma mudança no brilho.

Embora em ambos os casos, fisicamente, a mesma quantidade de luz foi
adicionada. Assim, como os olhos são menos sensíveis quando a luz está clara, a compressão
de gama “comprime” os valores de brilho. Em termos físico, os níveis de brilho são
menos precisos, mas a escala é ajustada para a visão humana e, assim,
todos os valores são igualmente precisos.

<aside class="key-point"><b>Note:</b> a compressão/correção de gama aqui é
diferente das curvas de gamma da imagem que você configura no Photoshop. Quando a compressão de
gama funciona do jeito que deveria, ela não parece com nada.</aside>

#### Perfis de cor {: #color-profiles }

Um perfil de cor é a informação que descreve o que é o espaço de cor de um
dispositivo. Ele é usado para converter entre diferentes espaços de cor. Os perfis tentam
garantir uma imagem que pareça o mais semelhante possível nesses tipos diferentes de
telas e mídias.

As imagens podem ter um perfil de cor incorporado, conforme descrito pelo [International
Color Consortium](http://www.color.org/icc_specs2.xalter) (ICC) para representar
precisamente como as cores devem parecer. Isso é compatível com diferentes formatos,
incluindo JPEGs, PNGs, SVGs e
[WebP](/speed/webp/docs/riff_container) e a maioria
dos principais navegadores são compatíveis com os perfis incorporados do ICC. Quando uma imagem é exibida em um
app e ela sabe as capacidades do monitor, essas cores podem ser ajustadas com base
no perfil de cor.

<aside class="key-point"><b>Note:</b> alguns monitores têm um perfil de cores semelhante
ao sRGB e não conseguem exibir perfis muito melhores. Assim, dependendo das telas de seus usuários
de destino, talvez haja valor limitado em incorporá-los. Verifique quem são
seus usuários de destino.</aside>

Perfis de cor incorporados também podem aumentar muito o tamanho das imagens
(raramente 100 KB ou mais), então tenha cuidado com a incorporação. Ferramentas, como ImageOptim, na
realidade, removerão [automaticamente](https://imageoptim.com/color-profiles.html) os perfis
de cor, se os encontrar. Por outro lado, com o perfil de ICC removido em
nome da redução de tamanho, os navegadores serão forçados a exibir a imagem no
espaço de cor do seu monitor, o que pode levar a diferenças na saturação e no
contraste esperados. Avalie os prós e contras para seu caso de uso.

[Nine Degrees Below](https://ninedegreesbelow.com/photography/articles.html)
oferece um excelente conjunto de recursos de gerenciamento de cores do perfil ICC se você estiver
interessado em saber mais sobre perfis.

#### Perfis de cores e navegadores da Web {: #color-profiles }

As versões mais antigas do Chrome não tinham um bom suporte para gerenciamento de cores, mas
isso melhorou em 2017 com o [Color Correct
Rendering](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/ptuKdRQwPAo).
Telas que não são sRGB (Macbook Pros mais recentes) converterão cores de sRGB para
o perfil da tela. Isso significa que as cores serão mais parecidas em
diferentes sistemas e navegadores. Safari, Edge e Firefox agora também podem levar perfis ICC
em consideração. Assim, imagens com um perfil diferente de cor (ex.: ICC) agora
poderão exibi-las corretamente, independentemente de a tela ter ou não a gama ampla.

Note: para ver um ótimo guia sobre como as cores se aplicam a um espectro mais amplo de maneiras que
trabalhamos na Web, consulte o [nerd’s guide to color on the web (Guia nerd das cores na Web)](https://css-tricks.com/nerds-guide-color-web/) da Sarah
Drasner.

## Sprite de imagem {: #image-sprites }

[Sprites de
imagem](/web/fundamentals/design-and-ui/responsive/images#use_image_sprites)
(ou sprites de CSS) possuem uma longa história na Web e são compatíveis com a maioria dos navegadores
e são um jeito popular de reduzir o número de imagens que uma página carrega,
combinando-as a uma única imagem maior que é repartida.


<img src="images/i2_2ec824b0_1.jpg" alt="Sprites de imagem ainda são amplamente usados em
        grandes sites de produção, inclusive na página inicial do Google."
         />
Sprites de imagem ainda são amplamente usados em grandes sites de produção, inclusive na página
inicial do Google.


Em HTTP/1.x, alguns desenvolvedores usaram os sprites para reduzir as solicitações HTTP. Isso trouxe
uma série de benefícios, embora fosse necessário ter cuidado já que rapidamente se deparava com
desafios de invalidação de cache, ou seja, mudanças em qualquer parte pequena de um sprite de
imagem invalidaria toda a imagem no cache de um usuário.

No entanto, agora o sprite pode ser um antipadrão [HTTP/2](https://hpbn.co/http2/).
Com HTTP/2, talvez seja melhor [carregar imagens
individuais](https://deliciousbrains.com/performance-best-practices-http2/), já que agora
é possível ter várias solicitações em uma única conexão. Meça para
avaliar se esse é o caso para sua configuração de rede.

## Carregar lentamente imagens não críticas {: #lazy-load-non-critical-images }

O carregamento lento é um padrão de desempenho da Web que atrasa o carregamento de imagens
no navegador até que o usuário precise vê-la. Um exemplo são as
imagens que carregam assincronamente sob demanda conforme você rola a página. Isso pode complementar ainda mais as
economias de bytes que você nota ao ter uma estratégia de compressão de imagens.



<img src="images/scrolling-viewport.jpg" alt="imagens com carregamento lento"
         />


Imagens que precisam aparecer “acima da dobra" ou logo que a página da Web aparece são
carregadas imediatamente. As imagens que seguem “abaixo da cobra”, no entanto, ainda não são
visíveis para o usuário. Elas não precisam ser carregadas imediatamente no
navegador. Elas podem ser carregadas mais tarde, ou carregadas lentamente, somente se e quando o usuário
rolar para baixo e for necessário exibi-las.

O carregamento lento ainda não possui suporte nativo no próprio navegador (embora
houvessem
[discussões](https://discourse.wicg.io/t/a-standard-way-to-lazy-load-images/1153/10)
sobre isso no passado). Em vez disso, usamos o JavaScript para adicionar essa capacidade.

**Por que o carregamento lento é útil?**

Esse jeito “lento" de carregar imagens somente se e quando for necessário tem muitos benefícios:

* **Consumo de dados reduzido**: Como não se está pressupondo que o usuário precisará de cada
  imagem buscada antecipadamente, você só precisa carregar o número mínimo de
  recursos. Isso é sempre uma coisa boa, especialmente em dispositivos móveis com planos
  de dados mais limitados.
* **Consumo de bateria reduzido**: Menos carga de trabalho para o navegador do usuário, que
  pode economizar na duração da bateria.
* **Velocidade de download aprimorada**: Diminuir seu tempo geral de carga da página em um
  site com muitas imagens de vários segundos para quase nada é uma
  melhoria e tanto na experiência do usuário. Na realidade, isso poderia fazer a diferença entre um usuário
  permanecer no site e curtir seu conteúdo e ser só outra estatística de rejeição.

**Mas, assim como todas as ferramentas, com grandes poderes vêm grandes responsabilidades.**

**Evite carregar imagens lentamente acima da dobra.** Use esse recurso para listas longas de imagens
(ex.: produtos) ou listas de avatares de usuários. Não use para a imagem
principal da página. Carregar imagens lentamente acima da dobra pode tornar o carregamento visivelmente mais lento, tanto
tecnicamente quanto para a percepção humana. Isso pode acabar com o pré-carregamento do navegador,
o carregamento progressivo e o JavaScript podem criar trabalho extra para o navegador.

**Tenha muito cuidado ao carregar imagens lentamente ao rolar a página.**  Se você esperar até que o
usuário role a página, eles provavelmente verão marcadores e poderão eventualmente ver as
imagens, se eles já não passaram por elas. Uma recomendação é
iniciar o carregamento lento após as imagens acima da dobra carregarem, carregando todas
as imagens independentes da interação do usuário.

**Quem usa o carregamento lento?**

Para ver exemplos de carregamento lento, veja a maioria dos principais sites que hospedam muitas
imagens. Alguns sites notórios são [Medium](https://medium.com/) e
[Pinterest](https://www.pinterest.com/).


<img src="images/Modern-Image35.jpg" alt="visualizações em linha para imagens no
        medium.com"
         />
Um exemplo de visualizações inline de desfoque gaussiano para imagens no Medium.com


Uma série de sites (como o Medium) exibem uma visualização em linha com desfoque
gaussiano (uns 100 bytes) que faz a transição (carrega lentamente) para uma imagem de qualidade máxima,
assim que ela for recuperada.

José M. Pérez escreveu sobre como implementar o efeito do Medium usando [filtros
CSS](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)
e testou [diferentes formatos de
imagem](https://jmperezperez.com/webp-placeholder-images/) para dar suporte a esses
marcadores. O Facebook também escreveu um artigo a respeito da sua famosa abordagem de 200 bytes para
esses marcadores para [fotos de
capa](https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/)
que vale a pena ler. Se você for um usuário do Webpack, o [carregador
LQIP](https://lqip-loader.firebaseapp.com/) pode ajudar a automatizar um pouco
desse trabalho.

Na realidade, você pode pesquisar sua fonte preferida de fotos de alta resolução e depois
rolar a página para baixo. Em quase todos os casos, você verá como o site
carrega somente algumas imagens de resolução máxima por vez, com o resto sendo
cores ou imagens de marcadores. Conforme você rolar a página, as imagens dos marcadores
serão substituídas por imagens de resolução máxima. Isso é o carregamento lento na prática.

**Como posso aplicar o carregamento lento às minhas páginas?**

Há uma série de técnicas e plug-ins para fazer o carregamento lento.
Recomendo [lazysizes](https://github.com/aFarkas/lazysizes) de Alexander Farkas
por causa do seu desempenho decente, recursos, integração opcional com o
[Intersection Observer](/web/updates/2016/04/intersectionobserver) e suporte
para plug-ins.

**O que posso fazer com o Lazysizes?**

O Lazysizes é uma biblioteca de JavaScript. Ele não precisa de configuração. Faça o download do arquivo
js reduzido e inclua-o na sua página da Web.


Aqui está um código de exemplo retirado do arquivo README:

Acrescente a classe "lazyload" a suas imagens/iframes em conjunto com um atributo data-src
e/ou data-srcset.

Como opção, você também pode adicionar um atributo src com uma imagem de baixa qualidade:

```html
<!-- non-responsive: -->
<img data-src="image.jpg" class="lazyload" />

<!-- responsive example with automatic sizes calculation: -->
<img
    data-sizes="auto"
    data-src="image2.jpg"
    data-srcset="image1.jpg 300w,
    image2.jpg 600w,
    image3.jpg 900w" class="lazyload" />

<!-- iframe example -->

<iframe frameborder="0"
    class="lazyload"
    allowfullscreen=""
    data-src="//www.youtube.com/embed/ZfV-aYdU4uE">
</iframe>
```

Para a versão da Web desse livro, eu fiz o pareamento do Lazysizes (embora você possa usar qualquer
alternativa) com o Cloudinary para ter imagens responsivas sob demanda. Isso me permitiu ter
a liberdade para experimentar diferentes valores de escala, quantidade, formato e
decidir entre carregar progressivamente ou não com mínimo esforço:


<img src="images/cloudinary-responsive-images.jpg" alt="O Cloudinary oferece suporte
        para controle sob demanda de qualidade e formato da imagem, entre vários outros recursos."
         />


**Estes são alguns dos recursos do Lazysizes:**

* detecta automaticamente mudanças de visibilidade em elementos de
 carregamento lento atuais e futuros
* inclui suporte de imagem responsiva padrão (picture e srcset)
* acrescenta automaticamente cálculos de tamanho e nomes de alias ao recurso de consultas de mídia
* pode ser usado com centenas de imagens/iframes nas páginas com CSS e Js ou apps da
 Web
* expansível: compatibilidade com plug-ins
* solução leve, mas madura
* SEO aprimorado: não oculta imagens/recursos de rastreadores

**Mais opções de carregamento lento**

O Lazysizes não é a única opção. Veja abaixo outras bibliotecas de carregamento lento:

*   [Lazy Load XT](http://ressio.github.io/lazy-load-xt/)
*   [BLazy.js](https://github.com/dinbror/blazy) (ou [Be]Lazy)
*   [Unveil](http://luis-almeida.github.io/unveil/)
*   [yall.js (Yet Another Lazy Loader)](https://github.com/malchata/yall.js)
    que possui aproximadamente 1 KB e usa o Intersection Observer, sempre que compatível.

**Qual é a pegadinha do carregamento lento?**

*   Leitores de tela, alguns bots de pesquisa e usuários com o JavaScript desativado não
    conseguirão visualizar imagens carregadas lentamente com JavaScript. No entanto, isso é algo
    que podemos superar com um fallback `<noscript>`.
*   Detectores de rolagem, como os usados para determinar quando carregar uma imagem
    lentamente, podem afetar adversamente o desempenho de rolagem do navegador. Eles podem
    fazer com que o navegador redesenhe muitas vezes, desacelerando o processo para um rastreamento.
    No entanto, as bibliotecas de carregamento lento inteligente usará limitações para mitigar isso.
    Uma solução possível é Intersection Observer, que é compatível com o
    lazysizes.

As imagens de carregamento lento é um padrão amplamente usado para reduzir a largura de banda, reduzir
custos e melhorar a experiência do usuário. Avalie se isso faz sentido para sua
experiência. Para ler mais sobre [imagens
de carregamento lento](https://jmperezperez.com/lazy-loading-images/) e [como implementar
o carregamento
progressivo do Medium](https://jmperezperez.com/medium-image-progressive-loading-placeholder/).

## Evitar a armadilha display:none {: #display-none-trap }

Soluções de imagem responsiva mais antigas se enganaram sobre como os navegadores tratam solicitações de
imagem ao configurar a property CSS `display`. Isso pode causar significativamente
mais imagens a serem solicitadas do que você poderia esperar e é outro motivo para
`<picture>` e `<img srcset>` são preferidos para carregar imagens responsivas.

Você já escreveu uma consulta de mídia que define uma imagem para `display:none` a
pontos de quebra específicos?

```html
<img src="img.jpg">
<style>
@media (max-width: 640px) {
    img {
        display: none;
    }
}
</style>
```

Ou alternou que imagens são ocultadas usando uma classe `display:none`?

```html
<style>
.hidden {
  display: none;
}
</style>
<img src="img.jpg">
<img src=“img-hidden.jpg" class="hidden">
```

Uma verificação rápida no painel de rede do Chrome DevTools verificará se essas
imagens ocultas que usam essas abordagens ainda são recuperadas, mesmo se esperamos que elas não
sejam. Esse comportamento é, na realidade, correto de acordo com as especificações de recursos incorporados.


<img src="images/display-none-images.jpg" alt="Imagens ocultas com display:none
        ainda são recuperadas"
         />


** `display:none` evita acionar uma solicitação de uma imagem `src`?**

```html
<div style="display:none"><img src="img.jpg"></div>
```

Não. A imagem especificada ainda será solicitada. Uma biblioteca não pode depender de
display:none aqui, já que a imagem será solicitada antes do JavaScript poder alterar o
src.

**`display:none` evita acionar uma solicitação para um `background: url()`?**

```html
<div style="display:none">
  <div style="background: url(img.jpg)"></div>
</div>
```

Sim. Os planos de fundo CSS não são recuperados logo que um elemento é analisado. Calcular
estilos de CSS para filhos de elementos com `display:none` seria menor útil, já que
eles não afetam a renderização do documento. As imagens de plano de fundo dos elementos filho
não são calculadas nem transferidas.

[Request Quest (Jornada da solicitação)](https://jakearchibald.github.io/request-quest/)de Jake Archibald
tem um quiz excelente sobre as armadilhas de usar `display:none` no
carregamento de imagens responsivas. Quando tiver dúvida sobre como um navegador específico trata
o carregamento de solicitação de imagem, abra o DevTools e verifique por conta própria.

Mais uma vez, sempre que possível, use `<picture>` e `<img srcset>` em vez de depender do
`display:none`.

## O CDN de processamento de imagem faz sentido para você? {: #image-processing-cdns }

*O tempo que você passará lendo postagens de blog para configurar seu canal de processamento
de imagem e ajustar sua configuração é frequentemente muito maior que a taxa paga por um serviço. O
[Cloudinary](http://cloudinary.com/) oferece um serviço gratuito,
[Imgix](https://www.imgix.com/) oferece um teste gratuito e
[Thumbor](https://github.com/thumbor/thumbor) oferece uma alternativa ao OSS,
ou seja, há várias opções disponíveis para sua automação.*

Para ter tempos de carregamento de página ideais, é preciso otimizar seu carregamento de imagem.
Essa otimização requer uma estratégia de imagem responsiva e pode se beneficiar de
uma compressão de imagem no servidor, da seleção automática do melhor formato e do redimensionamento
responsivo. O que importa é que você oferecerá a imagem com o tamanho correto para o
dispositivo certo na resolução adequada o mais rápido possível. Fazer isso não é tão fácil
quanto se pensa.

**Usar seu servidor x um CDN**

Por causa da complexidade e da natureza cada vez mais evoluída da manipulação de imagens, oferecemos
uma sugestão de alguém com experiência no ramo e depois daremos
uma recomendação.

“Se o produto não for para manipulação da imagem, então não faça por conta própria.
Serviços como Cloudinary [ou imgix, Ed.] fazem isso de modo muito mais eficaz e muito
melhor que você. Então, use-os. Se sua preocupação for o custo, pense
sobre o quanto custará para você para desenvolver e fazer a manutenção, além de dos custos de hospedagem,
armazenamento e entrega." — [Chris
Gmyr](https://medium.com/@cmgmyr/moving-from-self-hosted-image-service-to-cloudinary-bd7370317a0d)


Até o momento, concordaremos e diremos que você deve considerar usar um CDN
para o processamento de imagem de que precisa. Dois CDNs serão avaliados para compará-los
em relação à lista de tarefas que criamos anteriormente.

**Cloudinary e imgix**

[Cloudinary](http://cloudinary.com/) e [imgix](https://www.imgix.com/) são dois
CDNs de processamento de imagem estabelecidos. Eles são a escolha de centenas de milhares
de desenvolvedores e empresas do mundo todo, inclusive da Netflix e Red Bull. Vamos
conferi-los em mais detalhes.

**Quais são os conceitos básicos?**

A menos que você seja o proprietário de uma rede de servidores, como eles são, a primeira vantagem enorme
que eles oferecem sobre implementar sua própria solução é que eles usam um sistema de rede
distribuído e global para levar uma cópia de suas imagens para mais perto de seus usuários. Também é
muito mais fácil para um CDN “validar futuramente" sua estratégia de carregamento de imagem, já que as tendências
mudam. Fazer isso por conta própria requer manutenção, suporte para rastreamento do navegador
para formatos emergentes e seguir a comunidade de compressão de imagens.

Em segundo lugar, cada serviço tem um plano de preços por nível. O Cloudinary oferece um [nível
gratuito](http://cloudinary.com/pricing) e os preços do imgix para o nível padrão
não são caros em relação ao plano premium de alto volume. O Imgix oferece um
[teste](https://www.imgix.com/pricing) gratuito com um crédito para ser usado em serviços, assim
ele quase vira a mesma coisa que um nível gratuito.

Em terceiro lugar, o acesso de API é oferecido pelos dois serviços. Os desenvolvedores podem acessar o CDN
de modo programático e automatizar seu processamento. Bibliotecas de clientes, plug-ins
de bibliotecas, e documentação de API também estão disponíveis, com alguns recursos limitados
aos níveis mais caros.

**Vamos falar de processamento de imagens**

Por enquanto, limitaremos nossa discussão a imagens estáticas. O Cloudinary e o Imgix
oferecem uma gama de métodos de manipulação de imagens,
como compressão, redimensionamento, recortes e criação de miniaturas nos planos
padrão e gratuito.


<img src="images/Modern-Image36.jpg" alt="biblioteca de mídia do cloudinary"
         />
Biblioteca de mídia do Cloudinary: Por padrão, o Cloudinary codifica [JPEGs
não progressivos](http://cloudinary.com/blog/progressive_jpegs_and_green_martians). Para
escolher gerá-los, marque a opção ”Progressive” em “More options” ou
passe a sinalização “fl_progressive”.


O Cloudinary relaciona [sete categorias de
transformações de imagem ampla](http://cloudinary.com/documentation/image_transformations)
, que possuem um total de 48 subcategorias entre elas. O Imgix anuncia mais de
[100 operações de processamento
de imagens](https://docs.imgix.com/apis/url?_ga=2.52377449.1538976134.1501179780-2118608066.1501179780).

**O que acontece por padrão?**

*   Cloudinary realiza as seguintes otimizações por padrão:
*   [Codifica JPEGs usando
    MozJPEG](https://twitter.com/etportis/status/891529495336722432) (escolhido
    em vez do Guetzli como padrão)
*   Elimina todos os metadados associados do arquivo de imagem transformado (a imagem
    original permanece intacta). Para modificar esse comportamento e oferecer uma
    imagem transformada com seus metadados intactos, adicione a sinalização `keep_iptc`.
*   Pode gerar formatos WebP, GIF, JPEG, e JPEG-XR com qualidade automática. Para
    modificar os ajustes padrão, defina o parâmetro de qualidade na sua
    transformação.
*   Executa algoritmos de
    [otimização](http://cloudinary.com/documentation/image_optimization#default_optimizations)
    para minimizar o tamanho do arquivo com mínimo impacto à qualidade visual
    ao gerar imagens no formato PNG, JPEG ou GIF.

O Imgix não possui otimizações padrão, como o Cloudinary. Ele oferece uma
qualidade de imagem padrão configurável. Para o imgix, os parâmetros automáticos ajudam você a automatizar
seu nível de otimização base em todo o seu catálogo de imagens.

Atualmente, há [quatro métodos
diferentes](https://docs.imgix.com/apis/url/auto):

*   Compressão
*   Melhoria visual
*   Conversão de formato do arquivo
*   Remoção de olhos vermelhos

Imgix é compatível com os seguintes formatos de imagem: JPEG, JPEG2000, PNG, GIF, GIF
animado, TIFF, BMP, ICNS, ICO, PDF, PCT, PSD, AI

Cloudinary é compatível com os seguintes formatos de imagem: JPEG, JPEG 2000, JPEG XR, PNG,
GIF, GIF animado, WebP, WebP animado, BMPs, TIFF, ICOs, PDF, EPS, PSD, SVG, AI,
DjVu, FLIF, TARGA.

**E o desempenho?**

O desempenho de entrega de CDN foca principalmente a
[latência](https://docs.google.com/a/chromium.org/viewer?a=v&pid=sites&srcid=Y2hyb21pdW0ub3JnfGRldnxneDoxMzcyOWI1N2I4YzI3NzE2)
e a velocidade.

A latência sempre aumenta um pouco para imagens completamente não armazenadas em cache. Mas, assim que uma
imagem é armazenada em cache e distribuída entre servidores da rede, o fato de que um
CDN global pode encontrar o caminho mais curto até o usuário, além das economias de bytes de uma
imagem corretamente processada, quase sempre reduzirá os problemas de latência em comparação
a imagens processadas incorretamente ou servidores solitários que tentam alcançar todo o
planeta.

Ambos os serviços usam CDN rápido e amplo. Essa configuração reduz latência e
aumenta a velocidade de download. A velocidade de download afeta o tempo de carregamento da página e isso é uma
das métricas mais importantes para a experiência do usuário e a conversão.

**Qual é o melhor?**

Cloudinary tem [160 mil clientes](http://cloudinary.com/customers), incluindo
Netflix, eBay e Dropbox. Imgix não diz quantos clientes possui, mas
é menos do que a Cloudinary. Mesmo assim, a base da imgix inclui usuários de imagem
de renome, como Kickstarter, Exposure, unsplash e Eventbrite.

Há muitas variáveis não controladas na manipulação de imagens que uma
comparação de desempenho linear entre os dois serviços é difícil. Assim,
vários aspectos dependem muito das suas necessidades de processamento de imagens (o que leva uma quantia considerável
de tempo), e do tamanho e da resolução necessários para o produto final,
o que afeta a velocidade e o tempo de download. No final das contas, o custo pode ser o fator mais importante
para você.

CDNs custam dinheiro. Um site com muitas imagens e muito tráfego poderia custar centenas de
dólares ao mês em taxas de CDN. Há um determinado nível de conhecimento
e habilidade de programação necessários para aproveitar ao máximo esses serviços.
Se o que você for fazer não for muito sofisticado, você provavelmente não terá
problemas.

Mas, se não estiver confortável em trabalhar com ferramentas ou APIs de processamento de imagem, então
você pode esperar uma curva de aprendizado. Para acomodar os locais dos servidores de
CDN, você precisará mudar alguns URLs nos seus links locais. Faça o que
for necessário :)

**Conclusão**

Se você atualmente está disponibilizando as próprias imagens ou planejando fazer isso, considere
usar um CDN.

## Armazenamento de recursos de imagem em cache {: #caching-image-assets }

Os recursos podem especificar uma política de armazenamento em cache usando [cabeçalhos de cache
HTTP](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control).
Mais especificamente, `Cache-Control` pode definir quem pode fazer respostas de cache e por quanto
tempo

A maioria das imagens que você enviar aos usuários são recursos estáticos que [não
mudarão](http://kean.github.io/post/image-caching) no futuro. A melhor
estratégia de armazenamento em cache para esses recursos é o cache agressivo.

Ao configurar seus cabeçalhos de cache HTTP, defina “Cache-Control” com uma idade máxima de um
ano (ex.: `Cache-Control:public; max-age=31536000`). Esse tipo de armazenamento em cache
agressivo funciona muito bem com a maioria dos tipos de imagens, especialmente aquelas que
possuem uma vida longa, como avatares e cabeçalhos de imagens.

Note: se você estiver disponibilizando imagens com PHP, isso pode destruir o armazenamento em cache por causa da configuração
padrão
[session_cache_limiter](http://php.net/manual/en/function.session-cache-limiter.php)
. Isso pode ser um desastre para um armazenamento em cache, e talvez você precise [solucionar
isso](https://stackoverflow.com/a/3905468) com uma configuração
session_cache_limiter('public') que definirá `public, max-age=`. Desabilitar e
configurar cabeçalhos personalizados de custom cache-control também funciona.

## Pré-carregamento de recursos de imagens críticas {: #preload-critical-image-assets }

Recursos de imagens críticas também podem ser pré-carregados usando [`<link
rel=preload>`](https://www.w3.org/TR/preload/).

`<link rel=preload>` é um fetch declarativo, que permite que você force o navegador
a solicitar um recurso sem bloquear o evento `onload` do documento.
Isso permite aumentar a prioridade de solicitações de recursos que possam
não talvez não sejam descobertos até mais tarde no processo de análise do documento.

As imagens podem ser pré-carregadas especificando um valor `as` de `image`:

```html
<link rel="preload" as="image" href="logo.jpg"/>
```

Os recursos de imagem de `<img>`, `<picture>`, `srcset` e SVGs podem aproveitar a
vantagem dessa otimização.

Note: `<link rel="preload">` é [compatível](http://caniuse.com/#search=preload)
com o Chrome navegadores baseados no Blink, como Opera, [Safari Tech
Preview](https://developer.apple.com/safari/technology-preview/release-notes/)
e foi [implementado](https://bugzilla.mozilla.org/show_bug.cgi?id=1222633)
no Firefox.

Sites como [Philips](https://www.usa.philips.com/),
[FlipKart](https://www.flipkart.com/) e [Xerox](https://www.xerox.com/) usam
`<link rel=preload>` para pré-carregar os principais recursos de logotipo (frequentemente usados no início do
documento). [Kayak](https://kayak.com/) também usa o pré-carregamento para garantir que a principal
imagem do cabeçalho seja carregada o quanto antes.


<img src="images/preload-philips.jpg" alt="Philips usam o link rel=preload para
        pré-carregar a imagem do logotipo"
         />


**O que é o cabeçalho de pré-carregamento Link?**

Um link de pré-carregamento pode ser especificado usando uma tag HTML ou um [cabeçalho HTTP
Link](https://www.w3.org/wiki/LinkHeader). De qualquer forma, um link de pré-carregamento
direciona o navegador para começar a carregar um recurso no cache de memória,
indicando que a página espera com alta confiança usar o recurso e
não quer esperar que o scanner de pré-carregamento ou o analisador o descubram.

Um cabeçalho de pré-carregamento Link para imagens seria parecido com isto:

```
Link: <https://example.com/logo-hires.jpg>; rel=preload; as=image
```

Quando o Financial Times introduziu um cabeçalho de pré-carregamento Link ao próprio site,
[1 segundo](https://twitter.com/wheresrhys/status/843252599902167040)
foi eliminado do tempo que levava para exibir a imagem no cabeçalho:


<img src="images/preload-financial-times.jpg" alt="O FT usando o pré-carregamento.
        Em exibição, o WebPageTest antes e depois dos traços mostrando
        melhorias."
         />
Na parte inferior: com `<link rel=preload>`, Na parte superior: sem. Comparação de um Moto G4 em
uma conexão 3G no WebPageTest
[antes](https://www.webpagetest.org/result/170319_Z2_GFR/) e
[depois](https://www.webpagetest.org/result/170319_R8_G4Q/).


De modo similar, a Wikipédia aprimorou o desempenho de tempo para logotipo com o cabeçalho
de pré-carregamento Link, conforme abordado no [estudo de
caso](https://phabricator.wikimedia.org/phame/post/view/19/improving_time-to-logo_performance_with_preload_links/) deles.

**Quais ressalvas devem ser levadas em conta ao usar essa otimização?**

Tenha certeza de que vale a pena pré-carregar recursos de imagem, já que, se não forem
críticas à experiência do usuário, talvez haja outros conteúdos na página que
vale focar os esforços para carregá-los antes. Ao priorizar as solicitações de
imagem, você talvez acabe mandando outros recursos para o fim da fila.

É importante evitar o uso de `rel=preload` para pré-carregar formatos de imagem sem
amplo suporte para navegadores (ex.: WebP). Também é bom evitar usá-lo para
imagens responsivas definidas em `srcset`, quando a fonte recuperada pode variar dependendo
das condições do dispositivo.

Para saber mais sobre pré-carregamento, consulte [Preload, Prefetch and Priorities in
Chrome (Pré-carregamento, pré-busca e prioridades no Chrome)](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)
e [Preload: What Is It Good
For? (Pré-carregamento: serve para o quê?)](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/).

## Orçamentos de desempenho de Web para imagens {: #performance-budgets }

Um orçamento de desempenho é um “orçamento" para o desempenho de uma página da Web que uma equipe tenta
não exceder. Por exemplo, as “imagens não excederão 200 KB em qualquer página" ou “a
experiência do usuário deve estar disponível em menos de 3 segundos". Quando um orçamento não for
atendido, explore o porquê isso acontece e como você pode voltar para o caminho certo.

Os orçamentos oferecem uma biblioteca útil para discutir desempenho com as partes interessadas.
Quando uma decisão de design ou de negócios afetar o desempenho do site, consulte o
orçamento. Os orçamentos são uma referência para cortar recursos ou repensar as mudanças quando
elas podem afetar a experiência do usuário de um site.

Descobri que as equipes atingem mais sucesso quando os orçamentos de desempenho são monitorados
de modo automatizado. Em vez de inspecionar manualmente as cascatas de rede para regressões
de orçamento, a automação pode sinalizar quando o orçamento for ultrapassado. Há dois serviços assim
que são úteis para monitorar o orçamento de desempenho:
[Calibre](https://calibreapp.com/docs/metrics/budgets) e
[SpeedCurve](https://speedcurve.com/blog/tag/performance-budgets/).

Assim que o orçamento de desempenho dos tamanhos de imagem for definido, o SpeedCurve começa
a monitorar e alerta você se o orçamento for excedido:


<img src="images/F2BCD61B-85C5-4E82-88CF-9E39CB75C9C0.jpg" alt="Monitoramento do tamanho de
        imagem do SpeedCurve."
         />


O Calibre oferece um recurso similar com o suporte para definir orçamentos para cada
classe de dispositivo que você está segmentando. Isso é útil, já que o orçamento para tamanhos de imagem no
desktop por Wi-Fi pode variar muito dos orçamentos para dispositivos móveis.


<img src="images/budgets.jpg" alt="O Calibre é compatível com orçamentos para tamanhos de imagens."
         />

## Recomendações finais {: #closing-recommendations }

No fim, escolher uma estratégia de otimização de imagem dependerá dos tipos
de imagens que você está disponibilizando para seus usuários e o que você considerar um
conjunto de critérios de avaliação razoável. Isso pode ser usar SSIM ou Butteraugli ou, se for um
conjunto suficientemente pequeno de imagens, descartar a percepção humana e escolher o que faz
mais sentido.

**Aqui estão minhas recomendações finais:**

Se você **não puder** investir em formatos de disponibilidade condicional com base no suporte de
navegadores:


* jpegtran do Guetzli + MozJPEG é um bom formato para qualidade de JPEG > 90.
    * Para a Web, `q=90` é desnecessariamente alta. O nível `q=80` é o suficiente, e
      você ainda pode ter em 2x telas até mesmo com `q=50`. Como Guetzli não chega a um nível tão baixo, para
      a Web, você pode usar MozJPEG.
    * Kornel Lesi&#x144;ski recentemente aprimorou o comando cjpeg do mozjpeg para adicionar
      pequenos perfis sRGB a fim de ajudar o Chrome a exibir cores naturais em telas
      com ampla gama de cores
* PNG pngquant + advpng tem velocidade/proporção de compressão muito boas
* Se você **puder** disponibilizar condicionalmente (usando `<picture>`, o cabeçalho [Accept
](https://www.igvita.com/2013/05/01/deploying-webp-via-accept-content-negotiation/)
 ou [Picturefill](https://scottjehl.github.io/picturefill/)):
    * Disponibilize WebP para navegadores compatíveis com ele
        * Crie imagens WebP a partir de imagens originais com 100% de qualidade. Caso contrário, você
          fornecerá aos navegadores compatíveis imagens com pior qualidade com distorções de
          JPEG *e* de WebP! Se você comprimir imagens de fonte
          não comprimidas usando o WebP, elas terão distorções de WebP menos visíveis
          e também poderão ser melhor comprimidas.
        * As configurações padrão que a equipe de WebP usa de `-m 4 -q 75` são geralmente
          boas para a maioria dos casos em que eles otimizam para velocidade/proporção.
        * O WebP também tem um modo especial para sem perda (`-m 6 -q 100`), que pode
          reduzir um arquivo para seu menor tamanho, explorando todas as combinações de
          parâmetro. É uma ordem de magnitude mais lenta, mas vale a pena para
          recursos estáticos.
    *   Como fallback, disponibilize fontes comprimidas do Guetzli/MozJPEG a outros
        navegadores

Boas compressões!
