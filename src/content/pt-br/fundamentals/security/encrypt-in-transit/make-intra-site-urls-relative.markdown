---
title: "Make Intra-Site URLs Relative"
description: "Agora que você está disponibilizando seu site em HTTP e HTTPS, ele deve funcionar o mais tranquilamente possível independente do protocolo."
updated_on: 2015-03-27
key-takeaways:
  - "Certifique-se de que as URLs entre sites e URLs externas são independentes do protocolo, isto é, certifique-se de usar caminhos relativos ou deixar o protocolo de fora, como em //exemplo.com/algo.js"
---

<p class="intro">
  Agora que você está disponibilizando seu site em HTTP e HTTPS, ele precisa funcionar o mais tranquilamente possível independente do protocolo.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

Mas, um problema surge quando você disponibiliza uma página via HTTPS
que inclui recursos HTTP: [conteúdo
misto](http://www.w3.org/TR/mixed-content/), os navegadores avisarão o usuário de que a força total
do HTTPS foi perdida.

De fato, no caso de conteúdo misto ativo (script, plug-ins, CSS, iframes),
muitas vezes os navegadores simplesmente não carregam ou executam o conteúdo — resultando em uma
página quebrada.

**OBSERVAÇÃO:** é perfeitamente aceitável incluir recursos HTTPS em uma página HTTP.

Além disso, quando você vincular para outras páginas em seu site, os usuários podem ser
rebaixados de HTTPS para HTTP.

Esses problemas ocorrem quando suas páginas incluem URLs totalmente qualificadas entre sites
que usam o esquema *http://*. Você deve alterar o conteúdo da seguinte forma:

		<h1>Bem-vindo a Exemplo.com</h1>
		<script src="http://example.com/jquery.js"></script>
		<link rel="stylesheet" href="http://assets.example.com/style.css"/>
		<img src="http://img.example.com/logo.png"/>;
		<p>Leia esse novo<a href="http://example.com/2014/12/24/">
		post sobre gatos!</a></p>
		<p>Veja esse <a href="http://foo.com/">outro site
		interessante.</a></p>

para algo como:

		<h1>Bem-vindo a Exemplo.com</h1>
		<script src="//example.com/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Leia esse<a href="//example.com/2014/12/24/">novo
		post sobre gatos!</a></p>
		<p>Veja esse <a href="http://foo.com/">outro site
		interessante.</a></p>

ou:

		<h1>Bem-vindo a Exemplo.com</h1>
		<script src="/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Leia esse<a href="/2014/12/24/">novo
		post sobre gatos!</a></p>
		<p>Veja esse <a href="http://foo.com/">outro site
		interessante.</a></p>

Isto é, torne as URLs entre sites o mais relacionadas possível: relacionadas por protocolo
(em um protocolo, começando com //exemplo.com) ou relacionada ao host (começando
 apenas com o caminho, como /jquery.js).

**OBSERVAÇÃO:** Use um script, não faça o procedimento manualmente. Se o conteúdo do seu site está em um
banco de dados, é recomendável testar seu script em uma cópia de desenvolvimento do seu
banco de dados. Se o seu site é composto por arquivos simples, teste seu script em uma
cópia de desenvolvimento dos arquivos. Apenas envie as alterações para produção depois que
elas passarem por um Controle de Qualidade, como sempre. Você pode usar [o script de Bram van
Damme](https://github.com/bramus/mixed-content-scan) ou algo parecido para
detectar o conteúdo misto em seu site.

**OBSERVAÇÃO:** ao vincular com outros sites (ao invés de incluir seus 
recursos), não altere o protocolo, pois você não tem controle sobre o funcionamento 
desses sites.

**OBSERVAÇÃO:** Recomendo URLs relacionadas ao protocolo para fazer uma migração mais tranquila para
grandes sites. Se você não tem certeza se pode implantar totalmente o HTTPS, forçar seu
site a usar HTTPS para todos os subrrecursos pode não dar certo. Provavelmente por algum
tempo você não estará completamente familiarizado com o HTTPS e o site HTTP ainda
deverá estar funcionando normalmente. Com o tempo, você concluirá a migração e poderá
bloquear o HTTPS (veja as duas próximas seções).

Se seu site depende de script, imagem ou de outros recursos disponibilizados por
terceiros, como CDN, jquery.com ou similares, você tem 2 opções:

* Usar URLs relacionadas ao protocolo também para esses recursos. Se o terceiro
 não disponibilizar HTTPS, solicite que o faça. A maioria já fornece, incluindo o jquery.com.
* Disponibilize recursos de um servidor que você controla e que oferece HTTP e
 HTTPS. Este procedimento é recomendável, porque você terá melhor controle
 sobre a aparência, desempenho e segurança do seu site — você não precisa
 confiar em um terceiro, o que é sempre bom.

Lembre-se que você também precisará alterar URLs entre sites nas suas
folhas de estilo, JavaScript, regras de redirecionamento, &lt;link …&gt; tags e declarações 
CSP — não apenas nas páginas HTML!

