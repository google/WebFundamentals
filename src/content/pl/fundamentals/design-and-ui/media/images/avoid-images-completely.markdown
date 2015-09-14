---
title: "Całkowite unikanie obrazów"
description: "Czasami najlepszym rozwiązaniem jest całkowita rezygnacja z dodawania obrazu. Gdy to możliwe, warto używać natywnych funkcji przeglądarki, które dają takie same lub podobne efekty."
updated_on: 2014-06-10
key-takeaways:
  unikaj-images:
    - "W miarę możliwości unikaj obrazów. Zamiast nich korzystaj z funkcji przeglądarki, by wyświetlać cienie, gradienty, zaokrąglone narożniki itp."
---

<p class="intro">
  Czasami najlepszym rozwiązaniem jest całkowita rezygnacja z dodawania obrazu. Gdy to możliwe, warto używać natywnych funkcji przeglądarki, które dają takie same lub podobne efekty. Przeglądarki mogą obecnie generować elementy wizualne, które dawniej wymagały stosowania obrazów. Dzięki temu przeglądarka nie musi już pobierać osobnych plików graficznych i nie wyświetla obrazów w dziwnej skali. Ikony można renderować, korzystając ze standardu Unicode lub specjalnych czcionek z ikonami.
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Umieszczanie tekstu w znacznikach zamiast na obrazach

Gdy to tylko możliwe, tekst powinien być tekstem, a nie elementem obrazu. Na przykład nie należy używać grafik jako nagłówków ani umieszczać w nich informacji kontaktowych takich jak numery telefonów czy adresy. To uniemożliwia użytkownikom skopiowanie i wklejenie tych danych oraz ukrywa je przed czytnikami ekranu. Strona jest wtedy nieelastyczna. Zamiast tego umieść tekst w znacznikach i w razie potrzeby użyj czcionek internetowych, by uzyskać odpowiedni styl.

## Zastępowanie obrazów stylami CSS

Wiele przeglądarek pozwala korzystać z funkcji CSS, by tworzyć style, które dawniej wymagały stosowania obrazów. Na przykład właściwość <code>background</code> umożliwia tworzenie złożonych gradientów, <code>box-shadow</code> &ndash; cieni, a <code>border-radius</code> &ndash; zaokrąglonych narożników.

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

Pamiętaj, że te techniki wymagają cykli renderowania, co może mieć znaczenie na urządzeniach mobilnych. Jeśli będziesz ich nadużywać, możesz stracić uzyskane korzyści i obniżyć wydajność strony.



