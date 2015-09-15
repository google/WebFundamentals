---
title: "Evite imagens de todas as formas"
description: "Às vezes, a melhor imagem é a ausência de imagens. Sempre que possível, use as funcionalidades nativas do navegador para fornecer uma funcionalidade igual ou similar."
updated_on: 2014-06-10
key-takeaways:
  evitar-images:
    - "Evite imagens sempre que possível. Em vez de usar imagens, aproveite os recursos do navegador para mostrar sombras, gradientes, cantos arredondados e outras opções."
---

<p class="intro">
  Às vezes, a melhor imagem é a ausência de imagens. Sempre que possível, use as funcionalidades nativas do navegador para fornecer uma funcionalidade igual ou similar.  Os navegadores geram informações visuais que antigamente exigiam imagens. Isso significa que os navegadores não precisam mais fazer o download separado dos arquivos de imagem, evitando o redimensionamento incorreto das imagens.  Os ícones podem ser processados usando unicode ou fontes especiais para ícones.
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Coloque o texto na marcação em vez de incorporá-lo às imagens

Sempre que possível, o texto deve ser formatado como texto, não devendo ser incorporado nas imagens, como ao usar imagens em cabeçalhos ou colocar informações de contato (como números de telefone ou endereços) diretamente em uma imagem.  Com isso, as pessoas não conseguem copiar e colar as informações, tornando-as inacessíveis aos leitores de tela, e o site deixa de ser responsivo.  Em vez disso, coloque o texto na marcação e, se necessário, use fontes da Web para conseguir o estilo que você busca.

## Use CSS para substituir imagens

Os navegadores modernos podem usar recursos de CSS para criar estilos que anteriormente exigiam imagens.  Por exemplo, gradientes complexos podem ser criados usando a propriedade <code>background</code>, sombras podem ser criadas usando <code>box-shadow</code> e cantos arredondados podem ser adicionados com a propriedade <code>border-radius</code>.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>

{% highlight html %}
<style>
  div#noImage {
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
{% endhighlight %}

Lembre-se de que o uso dessas técnicas não requer ciclos de processamento, algo que pode ser importante em dispositivos móveis.  Se houver uso excessivo desses recursos, você perderá os benefícios conquistados e poderá prejudicar o desempenho do site.



