project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Using proper styling to improve accessibility

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Stili accessibili {: .page-title}

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}

We've explored two of the crucial pillars of accessibility, focus and semantics.
Now let's tackle the third, styling. It's a broad topic that we can cover in
three sections.

- Garantire che gli elementi siano disegnati per supportare i nostri sforzi di
accessibilità aggiungendo stili per lo stato attivo e vari stati ARIA.
- Disegnare le nostre interfacce utente per la flessibilità in modo che possano
essere ingrandite o ridimensionate per soddisfare gli utenti che potrebbero
avere problemi con il testo di piccole dimensioni.
- Choosing the right colors and contrast to avoid conveying information
withcolor alone.

## Styling focus

Generally, any time we focus an element, we rely on the built-in browser focus
ring (the CSS `outline` property) to style the element. The focus ring is handy
because, without it, it's impossible for a keyboard user to tell which element
has the focus. The [WebAIM
checklist](http://webaim.org/standards/wcag/checklist){: .external } makes a
point of this, requiring that "It is visually apparent which page element has
the current keyboard focus (i.e., as you tab through the page, you can see where
you are)."

![form elements with a focus ring](imgs/focus-ring.png)

However, sometimes the focus ring can look distorted or it may just not fit in
with your page design. Some developers remove this style altogether by setting
the element's `outline` to `0` or `none`. But without a focus indicator, how is
a keyboard user supposed to know which item they're interacting with?

Warning: Never set outline to 0 or none without providing a focus alternative!

You might be familiar with adding hover states to your controls using the CSS
`:hover` *pseudo-class*. For example, you might use `:hover` on a link element
to change its color or background when the mouse is over it. Similar to
`:hover`, you can use the `:focus` pseudo-class to target an element when it has
focus.

```
/* At a minimum you can add a focus style that matches your hover style */
:hover, :focus {
  background: #c0ffee;
}
```

An alternative solution to the problem of removing the focus ring is to give
your element the same hover and focus styles, which solves the
"where's-the-focus?" problem for keyboard users. As usual, improving the
accessibility experience improves everyone's experience.

### Modalità di input

![a native HTML button with a focus ring](imgs/sign-up.png){: .attempt-right }

For native elements like `button`, browsers can detect whether user interaction
occurred via the mouse or the keyboard press, and typically only display the
focus ring for keyboard interaction. For example, when you click a native
`button` with the mouse there is no focus ring, but when you tab to it with the
keyboard the focus ring appears.

The logic here is that mouse users are less likely to need the focus ring
because they know what element they clicked. Unfortunately there isn't currently
a single cross-browser solution that yields this same behavior. As a result, if
you give any element a `:focus` style, that style will display when *either* the
user clicks on the element or focuses it with the keyboard. Try clicking on this
fake button and notice the `:focus` style is always applied.

```
<style>
  fake-button {
    display: inline-block;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    user-select: none;
  }

  fake-button:focus {
    outline: none;
    background: pink;
  }
</style>
<fake-button tabindex="0">Click Me!</fake-button>
```

{% framebox height="80px" %}

<style>
  fake-button {
    display: inline-block;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    user-select: none;
  }

  fake-button:focus {
    outline: none;
    background: pink;
  }
</style>

<fake-button tabindex="0">Click Me!</fake-button>
{% endframebox %}

This can be a bit annoying, and often times developer will resort to using
JavaScript with custom controls to help differentiate between mouse and keyboard
focus.

In Firefox, the `:-moz-focusring` CSS pseudo-class allows you to write a focus
style that is only applied if the element is focused via the keyboard, quite a
handy feature. While this pseudo-class is currently only supported in Firefox,
[there is currently work going on to turn it into a
standard](https://github.com/wicg/modality){: .external }.

There is also [this great article by Alice Boxhall and Brian
Kardell](https://www.oreilly.com/ideas/proposing-css-input-modality){: .external
}
that explores the topic of modality and contains prototype code for
differentiating between mouse and keyboard input. You can use their solution
today, and then include the focus ring pseudo-class later when it has more
widespread support.

## Styling states with ARIA

When you build components, it's common practice to reflect their state, and thus
their appearance, using CSS classes controlled with JavaScript.

Ad esempio, si consideri un pulsante di attivazione che si trasforma in uno
stato visivo "premuto" quando viene fatto clic e mantiene tale stato fino a
quando non viene fatto nuovamente clic. Per definire lo stato, il tuo JavaScript
potrebbe aggiungere una classe `pressed` al pulsante. E, dato che vuoi una buona
semantica su tutti i tuoi controlli, devi anche impostare lo stato
`aria-pressed` per il pulsante su `true` .

A useful technique to employ here is to remove the class altogether, and just
use the ARIA attributes to style the element. Now you can update the CSS
selector for the pressed state of the button from this

```
.toggle.pressed { ... }
```

to this.

```
.toggle[aria-pressed="true"] { ... }
```

Ciò crea una relazione sia logica che semantica tra lo stato ARIA e l'aspetto
dell'elemento e riduce anche il codice aggiuntivo.

## Multi-device responsive design

We know that it's a good idea to design responsively to provide the best
multi-device experience, but responsive design also yields a win for
accessibility.

Prendi in considerazione un sito come
[Udacity.com](https://www.udacity.com/courses/all) :

![Udacity.com at 100% magnification](imgs/udacity.jpg)

A low-vision user who has difficulty reading small print might zoom in the page,
perhaps as much as 400%. Because the site is designed responsively, the UI will
rearrange itself for the "smaller viewport" (actually for the larger page),
which is great for desktop users who require screen magnification and for mobile
screen reader users as well. It's a win-win. Here's the same page magnified to
400%:

![Udacity.com at 400% magnification](imgs/udacity-zoomed.jpg)

In fact, just by designing responsively, we're meeting [rule 1.4.4 of the WebAIM
checklist](http://webaim.org/standards/wcag/checklist#sc1.4.4){: .external },
which states that a page "...should be readable and functional when the text
size is doubled."

Going over all of responsive design is outside the scope of this guide, but
here are a few important takeaways that will benefit your responsive experience
and give your users better access to your content.

- First, make sure you always use the proper `viewport` meta tag.<br>`<meta
name="viewport" content="width=device-width, initial-scale=1.0">`<br>Setting
`width=device-width`will match the screen's width in device-independent pixels,
and setting`initial-scale=1` establishes a 1:1 relationship between CSS pixels
anddevice-independent pixels. Doing this instructs the browser to fit
yourcontent to the screen size, so users don't just see a bunch of
scrunched-uptext.

![a phone display without and with the viewport meta tag](imgs/scrunched-up.jpg)

Warning: When using the viewport meta tag, make sure you don't set
maximum-scale=1 or set user-scaleable=no. Let users zoom if they need to!

- Another technique to keep in mind is designing with a responsive grid. As you
    saw with the Udacity site, designing with a grid means your content will
    reflow when the page changes size. Often these layouts are produced using
    relative units like percents, ems, or rems instead of hard-coded pixel
    values. The advantage of doing it this way is that text and content can
enlarge and force other items down the page. So the DOM order and the
reading
    order remain the same, even if the layout changes because of magnification.

- Inoltre, considera l'utilizzo di unità relative come `em` o `rem` per cose
come la dimensione del testo, anziché i valori dei pixel. Alcuni browser
supportano il ridimensionamento del testo solo nelle preferenze dell'utente e,
se stai utilizzando un valore in pixel per il testo, questa impostazione non
influirà sulla tua copia. Se, tuttavia, hai utilizzato unità relative in tutto,
la copia del sito verrà aggiornata per riflettere le preferenze dell'utente.

- Infine, quando il tuo progetto viene visualizzato su un dispositivo mobile,
dovresti assicurarti che gli elementi interattivi come pulsanti o collegamenti
siano abbastanza grandi e abbiano abbastanza spazio intorno a loro, per renderli
facili da premere senza sovrapporsi accidentalmente ad altri elementi. Ciò
avvantaggia tutti gli utenti, ma è particolarmente utile per chiunque abbia una
disabilità motoria.

Una dimensione minima del target di tocco consigliata è di circa 48 pixel
indipendenti dal dispositivo su un sito con una viewport mobile correttamente
impostata. Ad esempio, mentre un'icona può avere solo una larghezza e un'altezza
di 24 px, puoi utilizzare un riempimento aggiuntivo per portare la dimensione
del target dei tocchi fino a 48px. L'area di 48x48 pixel corrisponde a circa 9
mm, che è circa delle dimensioni dell'area di un dito di una persona.

![a diagram showing a couple of 48 pixel touch targets](imgs/touch-target.jpg)

Touch targets should also be spaced about 32 pixels
apart, both horizontally and vertically, so that a user's finger pressing on one
tap target does not inadvertently touch another tap target.

![a diagram showing 32 pixels of space around a touch
target](imgs/touch-target2.jpg)

## Colore e contrasto

Se hai una buona visione, è facile presumere che tutti percepiscano i colori, o
la leggibilità del testo, nello stesso modo in cui lo fai tu, ma ovviamente non
è così. Diamo un'occhiata a come possiamo usare efficacemente il colore e il
contrasto per creare disegni piacevoli accessibili a tutti.

As you might imagine, some color combinations that are easy for some people to
read are difficult or impossible for others. This usually comes down to *color
contrast*, the relationship between the foreground and background colors'
*luminance*. When the colors are similar, the contrast ratio is low; when they
are different, the contrast ratio is high.

The [WebAIM guidelines](http://webaim.org/standards/wcag/){: .external }
recommend an AA (minimum) contrast ratio of 4.5:1 for all text. An exception is
made for very large text (120-150% larger than the default body text), for which
the ratio can go down to 3:1. Notice the difference in the contrast ratios shown
below.

![comparison of various contrast ratios](imgs/contrast-ratios.jpg)

The contrast ratio of 4.5:1 was chosen for level AA because it compensates for
the loss in contrast sensitivity usually experienced by users with vision loss
equivalent to approximately 20/40 vision. 20/40 is commonly reported as typical
visual acuity of people at about age 80. For users with low vision impairments
or color deficiencies, we can increase the contrast up to 7:1 for body text.

You can use the [Accessibility DevTools
extension](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb){:
.external }
for Chrome to identify contrast ratios. One benefit of using the Chrome Devtools
is that they will suggest AA and AAA (enhanced) alternatives to your current
colors, and you can click the values to preview them in your app.

To run a color/contrast audit, follow these basic steps.

1. Dopo aver installato l'estensione, fai clic su `Audits`
2. Deseleziona tutto tranne `Accessibility`
3. Fai clic su `Audit Present State`
4. Note any contrast warnings

![the devtools contrast audit dialog](imgs/contrast-audit.png)

WebAIM itself provides a handy [color contrast
checker](http://webaim.org/resources/contrastchecker/){: .external } you can use
to examine the contrast of any color pair.

### Non trasmettere informazioni solo con il colore

Ci sono circa 320 milioni di utenti con deficit di visione dei colori. Circa 1
uomo su 12 e 1 donna su 200 hanno una qualche forma di "cecità ai colori"; ciò
significa che circa 1/20 o 5% dei tuoi utenti non sperimenteranno il tuo sito
nel modo desiderato. Quando ci affidiamo al colore per trasmettere informazioni,
spingiamo quel numero a livelli inaccettabili.

Note: The term "color blindness" is often used to describe a visual condition
where a person has trouble distinguishing colors, but in fact very few people
are truly color blind. Most people with color deficiencies can see some or most
colors, but have difficulty differentiating between certain colors such as reds
and greens (most common), browns and oranges, and blues and purples.

For example, in an input form, a telephone number might be underlined in red to
show that it is invalid. But to a color deficient or screen reader user, that
information is not conveyed well, if at all. Thus, you should always try to
provide multiple avenues for the user to access critical information.

![an input form with an error underlined in red](imgs/input-form1.png)

The [WebAIM checklist states in section
1.4.1](http://webaim.org/standards/wcag/checklist#sc1.4.1){: .external } that
"color should not be used as the sole method of conveying content or
distinguishing visual elements." It also notes that "color alone should not be
used to distinguish links from surrounding text" unless they meet certain
contrast requirements. Instead, the checklist recommends adding an additional
indicator such as an underscore (using the CSS `text-decoration` property) to
indicate when the link is active.

Un modo semplice per correggere l'esempio precedente è aggiungere un messaggio
aggiuntivo al campo, annunciando che non è valido e perché.

![an input form with an added error message for clarity](imgs/input-form2.png)

Quando crei un'app, tieni a mente questo tipo di cose e fai attenzione alle aree
in cui potresti affidarti troppo al colore per trasmettere informazioni
importanti.

If you're curious about how your site looks to different people, or if you rely
heavily on the use of color in your UI, you can use the [NoCoffee Chrome
extension](https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl){:
.external }
to simulate various forms of visual impairment, including different types of
color blindness.

### Modalità ad alto contrasto

La modalità ad alto contrasto consente all'utente di invertire i colori di primo
piano e di sfondo, che spesso aiutano a migliorare il testo. Per le persone con
problemi di vista, la modalità ad alto contrasto può rendere molto più semplice
la navigazione del contenuto sulla pagina. Ci sono alcuni modi per ottenere una
configurazione ad alto contrasto sulla tua macchina.

Operating systems like Mac OSX and Windows offer high-contrast modes that can be
enabled for everything at the system level. Or users can install an extension,
like the [Chrome High Contrast
extension](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph){:
.external }
to enable high-contrast only in that specific app.

Un esercizio utile è quello di attivare le impostazioni ad alto contrasto e
verificare che tutta l'interfaccia utente dell'applicazione sia ancora visibile
e utilizzabile.

For example, a navigation bar might use a subtle background color to indicate
which page is currently selected. If you view it in a high-contrast extension,
that subtlety completely disappears, and with it goes the reader's understanding
of which page is active.

![a navigation bar in high contrast mode](imgs/tab-contrast.png)

Allo stesso modo, se si considera l'esempio della lezione precedente, la
sottolineatura rossa nel campo del numero di telefono non valido potrebbe essere
visualizzata in un colore blu-verde difficile da distinguere.

![a form with an error field in high contrast mode](imgs/high-contrast.jpg)

If you are meeting the contrast ratios covered in the previous lessons you
should be fine when it comes to supporting high-contrast mode. But for added
peace of mind, consider installing the Chrome High Contrast extension and giving
your page a once-over just to check that everything works, and looks, as
expected.
