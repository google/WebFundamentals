project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Em dispositivos com a função telefone, permita que os usuários liguem diretamente para você apenas tocando em um número de telefone, comumente conhecido como recurso de clique para chamar.

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2014-06-17 #}

# Clicar para chamar {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Em dispositivos com função telefone, permita que os usuários liguem diretamente para
você apenas tocando em um número de telefone, comumente conhecido como "clicar para chamar".

### TL;DR {: .hide-from-toc }

* Insira todos os números de telefone em hyperlinks com o esquema  <code>tel:</code>
* Sempre use o formato de discagem internacional.


## Vincule números de telefone para o recurso clique para chamar

Embora diversos navegadores modernos para dispositivos móveis detectem números de telefone automaticamente 
e os convertam em links, fazer isso diretamente no código é uma boa abordagem.
Ao identificar cada número manualmente, você garante que os números de telefone estejam sempre
disponíveis para o recurso "clicar para chamar" e que o estilo deles combine com o site.

Para marcar um número de telefone como um link, use o esquema `tel:`.  A sintaxe é 
simples:


    NIST Telephone Time-of-Day Service 
    <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>

Seu navegador exibe essa sintaxe da seguinte forma:

NIST Telephone Time-of-Day Service <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>

<div class="attempt-right">
  <figure>
    <img src="images/click-to-call_framed.jpg" >
    <figcaption>Exemplo de clicar para chamar</figcaption>
  </figure>
</div>

Na maioria dos dispositivos com função telefone, o usuário recebe uma
confirmação antes de o número ser discado. Assim, é possível garantir que o usuário não
seja induzido a fazer chamadas caras para números de local muito distante ou especiais.
Se o dispositivo não suportar chamadas telefônicas, os usuários poderão visualizar um
menu que lhes permite escolher como o navegador deve proceder com o número.

Os navegadores para computador que não permitem chamadas de voz abrem o aplicativo de
telefonia padrão no computador, por exemplo, o Google Voice ou Microsoft
Communicator.

## Use o formato de discagem internacional

Sempre forneça o número de telefone no formato de discagem internacional: 
o sinal de adição (`+`), o código do país, o código de área e o número.  Embora não seja absolutamente
necessário, é recomendável separar cada segmento do número com um
hífen (`-`) para facilitar a leitura e melhorar a autodetecção.

O uso de um formato de discagem internacional com hífen garante que sua chamada seja completada, independentemente de onde
o usuário esteja ligando, seja a alguns metros ou a milhares
de quilômetros de distância.

## Desative a autodetecção quando necessário

Os navegadores modernos para dispositivos móveis detectam números de telefone automaticamente e habilitam o
clicar para chamar. O Mobile Safari converte automaticamente números de telefone para links
com os estilos de hiperlink associados. O Chrome for Android detecta
números de telefone automaticamente e permite que os usuários cliquem neles para chamar, mas não vincula
os números a hiperlinks nem aplica estilo especial.

Para evitar que o Mobile Safari detecte automaticamente números de telefone, adicione a
seguinte meta tag no topo da página:


    <meta name="format-detection" content="telephone=no">


## Outros recursos do clique para chamar

Além do esquema `tel:`, alguns navegadores modernos também suportam os esquemas `sms:`
e `mms:`, embora o suporte não seja tão consistente e alguns
recursos nem sempre funcionem, como a definição do corpo da mensagem. 


{# wf_devsite_translation #}
