---
title: "Responsive Web Design Patterns"
description: "Os padrões de design da Web responsivos estão evoluindo rapidamente, mas há muitos padrões estabelecidos que funcionam bem em dispositivos móveis e desktop"
updated_on: 2014-10-21
---

<p class="intro">
  Padrões de design da Web responsivos estão evoluindo rapidamente, mas há muitos padrões estabelecidos que funcionam bem entre os dispositivos móveis e desktop.
</p>


A maioria dos layouts usados por páginas da Web responsivas pode ser categorizada em um dos cinco
padrões: mostly fluid, column drop, layout shifter, tiny tweaks e off canvas.
Em alguns casos, a página pode usar uma combinação de padrões, por exemplo, column drop
e off canvas.  Esses padrões, originalmente identificados por [Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514), fornecem um ponto de início
sólido para qualquer página responsiva.

## Os padrões

Para criar amostras simples e fáceis de entender, cada amostra
abaixo foi criada com uma marcação real usando
[`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes),
geralmente com três `div` de conteúdo contidos dentro de um `div` de contêiner primário.
 Cada amostra foi escrita começando com a menor visualização e pontos de interrupção
foram adicionados conforme necessário.  O [modo flexbox layout também é bem
suportado](http://caniuse.com/#search=flexbox) por navegadores modernos, embora ainda
possa exigir a prefixação do fabricante para obter melhor suporte.


