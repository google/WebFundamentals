---
title: "Dodawanie reklam AdSense do witryny"
description: "Dzięki instrukcjom w tym przewodniku dowiesz się, jak dodać reklamy do swojej witryny. Utwórz konto AdSense i jednostki reklamowe, umieść te jednostki w witrynie, określ ustawienia płatności i zacznij zarabiać."
updated_on: 2014-07-31
key-takeaways:
  tldr: 
    - "Aby utworzyć konto AdSense, musisz mieć co najmniej 18&nbsp;lat, konto Google i adres pocztowy."
    - "Zanim prześlesz zgłoszenie, Twoja witryna musi działać, a jej zawartość nie może naruszać zasad AdSense."
    - "Utwórz elastyczne jednostki reklamowe, by mieć pewność, że reklamy będą do nich pasować niezależnie od urządzenia, na którym zobaczy je użytkownik."
    - "Zweryfikuj ustawienia płatności i poczekaj, aż pojawią się pierwsze zarobki."
notes:
  crawler:
    - "Upewnij się, że nie blokujesz robotowi indeksującemu AdSense dostępu do swojej witryny (przeczytaj <a href='https://support.google.com/adsense/answer/10532'>ten artykuł pomocy</a>)."
  body:
    - "Wklej cały kod reklamy w tagu body. W przeciwnym razie reklamy nie będą się wyświetlać."
  smarttag:
    - "Atrybuty <code>data-ad-client</code> i <code>data-ad-slot</code> są unikalne przy każdej wygenerowanej jednostce reklamowej."
    - "Atrybut <code>data-ad-format=auto</code> w wygenerowanym kodzie reklamy umożliwia inteligentne określanie rozmiaru elastycznej jednostki reklamowej."
---

<p class="intro">
  Dzięki instrukcjom w tym przewodniku dowiesz się, jak dodać reklamy do swojej witryny. Utwórz konto AdSense i jednostki reklamowe, umieść te jednostki w witrynie, określ ustawienia płatności i zacznij zarabiać.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Tworzenie przykładowej strony z reklamami

Dzięki tej procedurze utworzysz prostą stronę z elastycznymi reklamami, korzystając z Google AdSense i zestawu Web Starter Kit:

<img src="images/ad-ss-600.png" sizes="100vw" 
  srcset="images/ad-ss-1200.png 1200w, 
          images/ad-ss-900.png 900w,
          images/ad-ss-600.png 600w, 
          images/ad-ss-300.png 300w" 
  alt="Przykładowa strona z reklamami na komputerze i urządzeniu mobilnym">

Jeśli nie masz doświadczenia z zestawem Web Starter Kit, przeczytaj [dokument o jego konfigurowaniu]({{site.fundamentals}}/tools/setup/setup_kit.html).

Aby umieścić reklamy w swojej witrynie i otrzymywać płatności, musisz wykonać te proste czynności:

1. Utwórz konto AdSense.
2. Utwórz jednostki reklamowe.
3. Umieść jednostki reklamowe na stronie.
4. Określ ustawienia płatności.

## Tworzenie konta AdSense
Do wyświetlania reklam w swojej witrynie potrzebujesz aktywnego konta AdSense. Jeśli jeszcze go nie masz, [utwórz je](https://www.google.com/adsense/) i zaakceptuj Warunki korzystania z AdSense. Podczas tworzenia konta musisz potwierdzić te informacje:

* Masz co najmniej 18&nbsp;lat i zweryfikowane konto Google.
* Masz aktywną witrynę lub inną usługę online zgodną z
[Zasadami programu Google AdSense](https://support.google.com/adsense/answer/48182). Reklamy będą wyświetlane w tej witrynie.
* Masz adres pocztowy powiązany z kontem bankowym, dzięki czemu możesz otrzymywać płatności.

## Tworzenie jednostek reklamowych

Jednostka reklamowa to zestaw reklam wyświetlanych na stronie w wyniku działania kodu JavaScript, który został dodany do strony. Masz do wyboru trzy opcje rozmiaru jednostek reklamowych:

* **[elastyczny (zalecany)](https://support.google.com/adsense/answer/3213689)**, 
* [wstępnie zdefiniowany](https://support.google.com/adsense/answer/6002621),
* [niestandardowy](https://support.google.com/adsense/answer/3289364).

Tworzysz elastyczną witrynę, więc użyj elastycznych jednostek reklamowych.
Rozmiar takich reklam automatycznie zmienia się na podstawie rozmiaru urządzenia i szerokości kontenera nadrzędnego.
Współdziałają one z układem elastycznym, dzięki czemu strona wygląda świetnie na każdym urządzeniu.

Rezygnacja z elastycznych jednostek reklamowych wymaga napisania znacznej ilości kodu, który kontroluje sposób wyświetlania reklam w zależności od urządzenia użytkownika. Gdy musisz określić dokładne rozmiary jednostek reklamowych, użyj wersji elastycznej w [trybie zaawansowanym]({{site.fundamentals}}/monetization/ads/customize-ads.html#what-if-responsive-sizing-isnt-enough).

Aby uprościć kod strony oraz oszczędzić Twój czas i wysiłek, kod elastycznej reklamy automatycznie dostosowuje rozmiar jednostki reklamowej do układu strony. 
Dynamicznie oblicza wymaganą wielkość na podstawie szerokości kontenera nadrzędnego jednostki, a potem wybiera najskuteczniejszy pasujący rozmiar reklamy.
Na przykład na stronie o szerokości 360&nbsp;pikseli zoptymalizowanej na urządzenia mobilne może pojawić się jednostka reklamowa 320 x 50.

Aktualną listę [najskuteczniejszych rozmiarów reklam](https://support.google.com/adsense/answer/6002621#top) znajdziesz w [Przewodniku po rozmiarach reklam](https://support.google.com/adsense/answer/6002621#top) w Google AdSense.

### Aby utworzyć elastyczną jednostkę reklamową:

1. Otwórz [kartę Moje reklamy](https://www.google.com/adsense/app#myads-springboard).
2. Kliknij <strong>+Nowa jednostka reklamowa</strong>.
3. Nadaj jednostce reklamowej unikalną nazwę. Pojawi się ona w kodzie reklamy, który zostanie wklejony na stronie, więc powinna być opisowa.
4. Wybierz <strong>Elastyczna</strong> z menu Rozmiar reklamy.
5. Wybierz <strong>Reklamy tekstowe i displayowe</strong> z menu Typ reklamy.
6. Kliknij <strong>Zapisz i pobierz kod</strong>.
7. W wyświetlonym polu <strong>Kod reklamy</strong> wybierz opcję <strong>Inteligentne dopasowanie(zalecane)</strong> z menu Tryb. 
To zalecany tryb, który nie wymaga wprowadzania żadnych zmian w kodzie reklamy.

Po utworzeniu jednostki reklamowej AdSense udostępnia fragment kodu do umieszczenia na stronie, podobny do tego:

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="XX-XXX-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.smarttag %}

## Umieszczanie jednostek reklamowych na stronach

Aby wyświetlać reklamy na stronie, musisz wkleić udostępniony przez AdSense fragment kodu w znacznikach. Jeśli chcesz dodać więcej reklam, możesz ponownie użyć tej samej jednostki reklamowej lub utworzyć ich wiele.

1. Otwórz plik `index.html` w folderze `app`.
2. Wklej udostępniony fragment w tagu `main`.
3. Zapisz plik i obejrzyj stronę w przeglądarce, a potem na urządzeniu mobilnym lub w emulatorze Chrome.

{% include shared/remember.liquid title="Remember" list=page.notes.body %}

<div>
  <a href="/web/fundamentals/resources/samples/monetization/ads/">
    <img src="images/ad-ss-600.png" sizes="100vw" 
      srcset="images/ad-ss-1200.png 1200w, 
              images/ad-ss-900.png 900w,
              images/ad-ss-600.png 600w, 
              images/ad-ss-300.png 300w" 
      alt="Przykładowa strona z reklamami na komputerze i urządzeniu mobilnym">
    <br>
    Wypróbuj
  </a>
</div>

## Określanie ustawień płatności

Zastanawiasz się, kiedy otrzymasz płatność z AdSense? Nie wiesz, czy nastąpi to w bieżącym czy następnym miesiącu? Pamiętaj, by wykonać wszystkie te czynności:

1. Upewnij się, że w Twoim [profilu odbiorcy płatności](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE) są wszystkie wymagane informacje podatkowe. 
2. Sprawdź, czy imię i nazwisko oraz adres odbiorcy płatności są prawidłowe.
3. Wybierz formę płatności na [stronie Ustawienia płatności](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS).
4. Wpisz swój [kod PIN](https://support.google.com/adsense/answer/157667). Pozwala on zweryfikować poprawność informacji o koncie.
5. Sprawdź, czy saldo osiągnęło [próg płatności](https://support.google.com/adsense/answer/1709871). 

W razie pytań przeczytaj artykuł [Płatności w AdSense &ndash; wprowadzenie](https://support.google.com/adsense/answer/1709858).


