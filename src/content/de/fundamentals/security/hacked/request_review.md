project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-03-14 #}
{# wf_published_on: 2015-01-01 #}
{# wf_blink_components: N/A #}

# Anfordern einer Überprüfung {: .page-title }

Wenn Sie möchten, dass Ihre Seite oder Website für die Besucher nicht mehr
als gefährlich oder potenziell betrügerisch gekennzeichnet wird, müssen Sie von Google eine Überprüfung anfordern.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Sie benötigen Folgendes:

*   Kenntnisse der Shell-/Terminalbefehle

## Was Sie tun müssen:

### 1. Voraussetzungen

Bevor Sie eine Überprüfung anfordern, sollten Sie alle folgenden Schritte ausgeführt haben:

* Bestätigung der Inhaberschaft Ihrer Website in der Search Console
* Bereinigung Ihrer Website von den Folgen des Hackerangriffs
* Beseitigung der Sicherheitslücke
* Wiedereinstellen der bereinigten Website

### 2. Gründliche Prüfung der Verfügbarkeit und Integrität Ihrer Seiten

Verwenden Sie entweder Wget oder cURL, um bestimmte Seiten Ihrer Website aufzurufen, zum Beispiel die
Startseite oder eine vom Hacker veränderte URL. Die Seiten müssten nun bereinigt sein. Wenn Sie sich vergewissert haben,
dass alle Seiten wieder in Ordnung sind,
können Sie eine Überprüfung anfordern.

Hinweis: Ihre Seiten müssen vom Googlebot gecrawlt werden können, damit festgestellt werden kann, ob
sie bereinigt sind. Achten Sie darauf, dass sie nicht durch robots.txt blockiert werden oder das
Indexieren durch `noindex`-Robots-Meta-Tags oder -Anweisungen verhindert wird.

### 3. Anfordern einer Überprüfung

Bevor Sie eine Überprüfung anfordern, sollten Sie Folgendes tun:

* **Sie sollten nachprüfen, ob das Problem wirklich behoben wurde**.
Anderenfalls wird es noch länger dauern,
bis Ihre Website nicht mehr als gefährlich eingestuft wird.

* **Sie sollten gründlich prüfen, für welche Seiten eine Überprüfung angefordert werden sollte**. Die Überprüfung findet
je nach Problem, von dem Ihre Website betroffen ist, in einem bestimmten Tool statt.
Weitere Informationen finden Sie in den nachfolgenden Kanälen.


#### A. Gehackte Website

*In dem
[**Bericht zu manuellen Maßnahmen**](https://www.google.com/webmasters/tools/manual-action)
der Search Console wird eine Benachrichtigung angezeigt, dass Ihre Website gehackt wurde:*

1. Nachdem Sie die zur Bereinigung erforderlichen Schritte durchgeführt haben,
  können Sie erneut den [Bericht zu manuellen Maßnahmen](https://www.google.com/webmasters/tools/manual-action)
  aufrufen und prüfen, ob es sich bei dem Problem um eine Übereinstimmung auf der ganzen Website oder um eine Teilübereinstimmung
  handelt.
2. Wählen Sie **Request a review**.

    Beim Anfordern einer Überprüfung müssen Sie angeben, welche Maßnahmen Sie
 zur Bereinigung der Website ergriffen haben. Für jede Kategorie von gehacktem Spam können Sie einen
   Satz schreiben, in dem Sie erläutern, wie Ihre Website bereinigt wurde (zum Beispiel „Im Falle von mit Content
    Injection gehackten URLs habe ich die Spaminhalte entfernt und die
    Schwachstelle korrigiert: ein veraltetes Plug-in wurde aktualisiert.“).


#### B. Unerwünschte Software (einschließlich Malware)

*In dem Bericht zu
[**Sicherheitsproblemen**](https://www.google.com/webmasters/tools/security-issues)
der Search Console wird eine Benachrichtigung angezeigt, dass Malware oder unerwünschte Software vorhanden ist:*

1. Öffnen Sie den
  [**Bericht zu Sicherheitsproblemen**](https://www.google.com/webmasters/tools/security-issues)
  in der Search Console erneut. Der Bericht enthält möglicherweise weiterhin Warnungen und Beispiele
  infizierter URLs.
2. Wählen Sie **Request a review**.

    Beim Anfordern einer Überprüfung müssen Sie angeben, welche Maßnahmen Sie
    ergriffen haben, um den Richtlinienverstoß auf Ihrer Website zu beheben. Zum Bespiel
    „Ich habe den Drittanbietercode entfernt, der für die Verbreitung von Malware auf meiner
    Website verantwortlich war, und diesen durch moderneren Code ersetzt.“


*Sie haben zwar in dem
[**Bericht zu Sicherheitsproblemen**](https://www.google.com/webmasters/tools/security-issues)
der Search Console keine Benachrichtigung über Malware oder unerwünschte Software erhalten, jedoch in Ihrem AdWords-Konto eine entsprechende Benachrichtigung erhalten:*

1. Fordern Sie über das
  [AdWords Support Center](https://support.google.com/adwords/contact/site_policy) eine Überprüfung an.


#### C. Phishing oder Social Engineering

*In dem Bericht zu
[**Sicherheitsproblemen**](https://www.google.com/webmasters/tools/security-issues)
der Search Console wird eine Phishingbenachrichtigung angezeigt:*

1. Öffnen Sie den
  [**Bericht zu Sicherheitsproblemen**](https://www.google.com/webmasters/tools/security-issues)
  in der Search Console erneut. Der Bericht enthält möglicherweise weiterhin Warnungen und Beispiele
  infizierter URLs.
2. Wählen Sie **Request a review**.

    Beim Anfordern einer Überprüfung müssen Sie angeben, welche Maßnahmen Sie
    ergriffen haben, um den Richtlinienverstoß auf Ihrer Website zu beheben. Zum Beispiel
    „Ich habe die Seite entfernt, auf der Benutzer aufgefordert wurden, personenbezogene Daten einzugeben“.

3. Sie können eine Überprüfung auch unter
  [google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/) anfordern.
  Dieser Bericht dient nicht nur als Berichtstool für Inhaber von Websites, deren Seite
  fälschlicherweise als Phishingseite gekennzeichnet wurde, sondern löst auch eine Überprüfung
  der Phishingseiten aus, die von Phishingwarnungen bereinigt wurden.

### 4. Warten auf den Abschluss der Überprüfung

* **Dauer der Spam-Überprüfung:** Die Überprüfung von Websites, die gehackt und für
 Spamzwecke missbraucht wurden, kann potenziell mehrere Wochen dauern. Dies liegt daran, dass
  Spam-Überprüfungen eine manuelle Untersuchung erfordern oder eine vollständige Aufbereitung der
  gehackten Seiten beinhalten können. Wenn die Überprüfung erfolgreich ist, werden in dem Abschnitt mit Sicherheitsproblemen nicht
  länger die Kategorien der Hacks oder Beispiele für gehackte URLs aufgeführt.
* **Dauer der Malware-Überprüfung:** Die Überprüfung von Websites, die mit
  Malware infiziert waren, nimmt einige Tage in Anspruch. Sobald die Überprüfung abgeschlossen ist, können Sie
  in der Search Console unter **Messages** das Ergebnis einsehen.
* **Dauer der Phishing-Überprüfung:** Eine Phishing-Überprüfung nimmt ca. einen Tag
  in Anspruch. Bei erfolgreicher Überprüfung wird die für Besucher eingeblendete Phishing-Warnung
  entfernt. Ihre Seite wird danach wieder in den Suchergebnissen angezeigt.

Wenn Google feststellt, dass Ihre Website bereinigt ist, werden die Warnungen innerhalb von 72 Stunden aus allen Browsern
und Suchergebnissen entfernt.

Wenn Google feststellt, dass das Problem nicht behoben wurde, werden in der Search Console im
Bericht zu Sicherheitsproblemen weitere infizierte
URLs aufgeführt, um Sie bei der nächsten Untersuchung zu unterstützen. Warnungen über gehackte Websites, die von Malware, Phishing oder Spam
betroffen sind, werden für die Besucher weiterhin im Browser bzw. in den Suchergebnissen
angezeigt, um sie vor Schaden zu schützen.

### Abschließende Schritte

* **Wenn die Überprüfung erfolgreich war,** sollten Sie sich vergewissern, dass Ihre Website wieder richtig funktioniert.
  Testen Sie dazu, ob die Seiten korrekt geladen werden und ob die Links angeklickt werden können. Damit Ihre Website so gut wie möglich geschützt ist,
  empfehlen wir Ihnen dringend, den Wartungs- und Sicherheitsplan
  im Abschnitt [Website bereinigen und instand halten](clean_site) umzusetzen.

    Weitere Informationen finden Sie in den folgenden Ressourcen von
    [StopBadware](https://www.stopbadware.org):

      * [Badware verhindern: Grundlagen](https://www.stopbadware.org/prevent-badware-basics)
      * [Zusätzliche Ressourcen: gehackte Websites](https://www.stopbadware.org/hacked-sites-resources)

* **Wenn die Überprüfung nicht erfolgreich war,* ** sollten Sie Ihre Website noch einmal selbst auf
  [Malware](hacked_with_malware), [Spam](hacked_with_spam),
  Veränderungen oder neue Dateien prüfen, die der Hacker eingefügt haben könnte. Alternativ haben Sie
  die Möglichkeit, weitere Unterstützung durch die
  [Spezialisten in Ihrem Supportteam](support_team) anzufordern.
