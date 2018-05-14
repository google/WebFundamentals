project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-03-14 #}
{# wf_published_on: 2015-01-01 #}
{# wf_blink_components: N/A #}

# Een beoordeling aanvragen {: .page-title }

U moet een beoordeling bij Google aanvragen om ervoor te zorgen dat uw pagina of website niet langer als
'gevaarlijk' of 'mogelijk misleidend' wordt gemarkeerd voor gebruikers.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Wat u nodig heeft:

*   Kennis van shell-/terminal-opdrachten

## Wat u moet doen:

### 1. Voorwaarden

Bevestig dat u de volgende stappen hebt genomen voordat u een beoordeling aanvraagt:

* Verifieer in Search Console dat u de eigenaar bent van uw website
* Zorg dat eventuele aanpassingen van de hacker van uw website zijn verwijderd
* Zorg dat u het beveiligingsprobleem hebt verholpen
* Zet uw schone website weer online

### 2. Controleer nogmaals of uw pagina's beschikbaar en schoon zijn

Gebruik voor de zekerheid Wget of cURL om pagina's op uw website te bekijken, zoals uw
homepage en een URL die is aangepast door de hacker; deze zouden nu schoon moeten zijn. Als dit het geval is
en u er zeker van bent dat dit ook geldt voor de rest van de pagina's op uw website,
dan kunt u een beoordeling aanvragen.

Opmerking: Uw pagina's moeten door Googlebot kunnen worden 'gecrawld' om er zeker van te zijn dat ze
schoon zijn. Zorg ervoor dat de pagina's toegankelijk zijn voor robots en dat ze kunnen worden
geïndexeerd door metatags of richtlijnen van `noindex`-robots.

### 3. Een beoordeling aanvragen

Doe het volgende voordat u een beoordeling aanvraagt:

* **Zorg dat het probleem daadwerkelijk is verholpen**;
als u een beoordeling aanvraagt als het probleem nog niet is verholpen,
wordt uw website langer als 'gevaarlijk' gemarkeerd.

* **Controleer nogmaals waar u de beoordeling moet aanvragen**; het beoordelingsproces vindt
plaats in een specifieke tool, afhankelijk van het probleem dat u met uw website ervaart.
Zie de kanalen hieronder.


#### A. Gehackte website

*U hebt een melding ontvangen over een gehackte website in het
[**Manual Actions report**](https://www.google.com/webmasters/tools/manual-action)
in Search Console:*

1. Nu u de opeenvolgende stappen van het schoonmaken hebt doorlopen,
 kunt u het rapport [Manual Actions](https://www.google.com/webmasters/tools/manual-action)
 weer openen en het probleem opzoeken als match voor de hele website of als een gedeeltelijke
 match.
2. Selecteer **Request a review**.

    Om een beoordeling in te dienen, moet u meer informatie opgeven over wat
    u hebt gedaan om de website schoon te maken. U kunt voor elke categorie gehackte spam een
    regel schrijven waarin u uitlegt hoe u de website hebt schoongemaakt (bijvoorbeeld "Voor gehackte
    URL's waarvan de content is aangepast, heb ik de spam verwijderd en het beveiligingsprobleem
    (het bijwerken van een verouderde plug-in) verholpen.").


#### B. Ongewenste software (inclusief malware)

*U hebt een melding voor ongewenste software of malware ontvangen in het
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
in Search Console:*

1. Open het
  [**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
  opnieuw in Search Console. In het rapport worden mogelijk nog steeds de waarschuwingen en voorbeelden
  van besmette URL's getoond die u eerder hebt gezien.
2. Selecteer **Request a review**.

    Om een beoordeling in te dienen, moet u meer informatie opgeven over
    wat u hebt gedaan om de beleidsovertreding van uw website te verwijderen. Bijvoorbeeld:
    "Ik heb de code van derden verwijderd die werd gebruikt voor het verspreiden van malware op mijn
    website en ik heb deze vervangen door een recentere versie van de code".


*U hebt geen melding voor malware of ongewenste software ontvangen in het
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
in Search Console, maar u hebt een melding ontvangen in uw AdWords-account:*

1. Een beoordeling aanvragen via het
  [AdWords support center](https://support.google.com/adwords/contact/site_policy).


#### C. Phishing of social engineering

*U hebt een melding voor phishing ontvangen in het
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
in Search Console:*

1. Open het
  [**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
  opnieuw in Search Console. In het rapport worden mogelijk nog steeds de waarschuwingen en voorbeelden
  van besmette URL's getoond die u eerder hebt gezien.
2. Selecteer **Request a review**.

    Om een beoordeling in te dienen, moet u meer informatie opgeven over
    wat u hebt gedaan om de beleidsovertreding van uw website te verwijderen. Bijvoorbeeld:
    "Ik heb de pagina verwijderd waarop aan gebruikers werd gevraagd om persoonlijke gegevens in te voeren".

3. U kunt de beoordeling ook aanvragen op
  [google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/).
  Dit rapport dient niet alleen als rapportagetool voor eigenaars van websites die vinden dat hun pagina
  onjuist is gemarkeerd vanwege phishing, maar het activeert ook een beoordeling van
  phishingpagina's die zijn opgeschoond zodat er geen waarschuwing meer worden weergegeven.

### 4. Wachten tot de beoordeling is verwerkt

* **Verwerkingstijd beoordeling gehackt met spam:** Het verwerken van beoordelingen voor websites die
  zijn gehackt met spam kan tot enkele weken duren. Dit komt omdat beoordelingen
  van spam mogelijk handmatig moeten worden onderzocht of omdat de gehackte
  pagina's mogelijk volledig opnieuw moeten worden verwerkt. Als de beoordeling is goedgekeurd, worden er geen
 hackcategorieën of voorbeelden van gehackte URL's meer weergegeven via Beveiligingsproblemen.
* **Verwerkingstijd beoordeling malware:** Het verwerken van beoordelingen voor websites die
  zijn besmet met malware duurt enkele dagen. Als de beoordeling is afgerond, is de
  reactie beschikbaar in uw **Messages** in Search Console.
* **Verwerkingstijd beoordeling phishing:** Het verwerken van beoordelingen van phishing duurt
  ongeveer een dag. Als het verwerken is geslaagd, wordt de phishingwaarschuwing
  die voor de gebruiker zichtbaar is verwijderd en wordt uw pagina weer weergegeven in zoekresultaten.

Als uw website volgens Google schoon is, zouden waarschuwingen van browsers en
zoekresultaten binnen 72 uur moeten worden verwijderd.

Als Google bepaalt dat het probleem nog niet is verholpen, kunnen er in het rapport
Beveiligingsproblemen in Search Console meer voorbeelden worden weergegeven van besmette
URL's om u zo bijvoorbeeld bij uw volgende onderzoek te helpen. Waarschuwingen voor websites met malware, phishing of gehackt
met spam zullen in de zoekresultaten en/of in browsers behouden blijven als
waarschuwing ter bescherming van gebruikers.

### De laatste stappen

* **Als uw verzoek is goedgekeurd,** verifieer dan of uw website werkt zoals u verwacht:
  Pagina's laden naar behoren en u kunt op links klikken. Om uw website veilig te houden,
  raden we alle eigenaars van websites aan om het onderhouds- en beveiligingsplan
  te implementeren dat is gemaakt in [Clean and maintain your site](clean_site).

    Voor meer informatie kunt u de volgende bronnen overwegen van
    [StopBadware](https://www.stopbadware.org):

      * [Badware voorkomen: de basis](https://www.stopbadware.org/prevent-badware-basics)
      * [Aanvullende bronnen: gehackte sites](https://www.stopbadware.org/hacked-sites-resources)

* **Als uw verzoek niet is goedgekeurd,** controleer uw site dan opnieuw op
  [malware](hacked_with_malware) of [spam](hacked_with_spam) of op
  aanpassingen of nieuwe bestanden die door de hacker zijn gemaakt. U kunt ook
  overwegen om meer hulp in te schakelen van
  [specialists in your support team](support_team).
