---
title: "Click to call"
description: "Em dispositivos com a função telefone, facilita que usuários liguem diretamente para você apenas tocando em um número de telefone, comumente conhecido como clique para chamar."
updated_on: 2014-10-21
key-takeaways:
  c2c: 
    - Agrupe todos os números de telefone em hyperlinks com o esquema <code>tel:</code>.
    - Sempre use o formato de discagem internacional.
comments:
  # OBSERVAÇÃO: Se os títulos da seção ou URL mudarem, os seguintes shortlinks devem ser atualizados
 - g.co/mobilesiteprinciple12
---

<p class="intro">
  Em dispositivos com a função telefone, facilita que usuários liguem diretamente para você apenas tocando em um número de telefone, comumente conhecido como clique para chamar.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.c2c %}

## Vincular números de telefone para clique para chamar

Embora vários navegadores móveis modernos detectem números de telefone automaticamente 
e os convertam em links, é recomendável que isso seja feito diretamente em seu código.
Marcando manualmente cada número de telefone, você pode garantir que os números de telefone estejam sempre
habilitados para clique para chamar e estilizados de acordo com seu site.

Para marcar um número de telefone como um link, use o esquema `tel:`.  A sintaxe é 
simples:

{% highlight html %}
NIST Telephone Time-of-Day Service <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>
{% endhighlight %}

Resulta em:

NIST Telephone Time-of-Day Service <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>

<img src="images/click-to-call_framed.jpg" class="center" alt="Click to call example.">

Na maioria dos dispositivos com funções telefônicas, o usuário receberá uma
confirmação antes que o número seja discado para garantir que os usuários não estejam sendo
levados a fazer chamadas caras para números de telefone de longa distância ou telefones premium. 
Se o dispositivo não suportar chamadas telefônicas, os usuários poderão visualizar um
menu que lhes permite escolher como o navegador deve proceder com o número.

Os navegadores desktop que não suportam chamadas de voz abrirão o aplicativo de
telefonia padrão no computador, por exemplo, o Google Voice ou Microsoft
Communicator.

## Use o formato de discagem internacional

Sempre forneça o número de telefone usando o formato de discagem internacional: 
sinal de mais (+), o código do país, o código de área e o número.  Embora não seja absolutamente
necessário, é recomendável separar cada segmento do número com um
hífen (-) para facilitar a leitura e melhorar a autodetecção.

O uso de um formato de discagem internacional com hífen garante que sua chamada seja completada, independentemente de onde
o usuário esteja ligando, se a alguns metros ou milhares
de quilômetros de distância.

## Desabilite a autodetecção quando necessário

Navegadores móveis modernos detectam números de telefone automaticamente e habilitam o
clique para chamar.  O Mobile Safari converte automaticamente números de telefone para links
com os estilos de hyperlink associados.  O Chrome para Android detecta
automaticamente números de telefone e permite que usuários cliquem para chamar, mas não os agrupa
em hyperlinks nem aplica qualquer estilo especial.

Para evitar que o Mobile Safari detecte automaticamente números de telefone, adicione a
seguinte meta tag no topo da página:

{% highlight html %}
<meta name="format-detection" content="telephone=no">
{% endhighlight %}

## Outros recursos do clique para chamar

Além do esquema `tel:`, alguns navegadores modernos também suportam os esquemas `sms:`
e `mms:`, embora o suporte não seja tão consistente e alguns
recursos nem sempre funcionem, como o ajuste do corpo da mensagem.  

