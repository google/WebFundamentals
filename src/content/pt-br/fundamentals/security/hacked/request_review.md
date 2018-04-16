project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-03-14 #}
{# wf_published_on: 2015-01-01 #}
{# wf_blink_components: N/A #}

# Solicitar uma análise {: .page-title }

Você deve solicitar uma análise do Google para que sua página deixe de estar sinalizada como
perigosa ou possivelmente enganosa para os usuários.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Você precisará de:

*   Conhecimento sobre comandos de shell/terminal

## O que você fará:

### 1. Pré-requisitos

Antes de solicitar uma análise, confirme se você executou as etapas a seguir:

* Verificou a propriedade do seu site no Search Console
* Eliminou os sinais de vandalismo do hacker em seu site
* Corrigiu a vulnerabilidade
* Colocou o site limpo on-line novamente

### 2. Verifique novamente se as suas páginas estão disponíveis e limpas

Por garantia, use o Wget ou o cURL para visualizar as páginas do seu site, como a
página inicial e um URL modificado pelo hacker; elas agora devem estar limpas. Se estiverem
e você estiver confiante de que o mesmo se aplica ao restante das páginas do seu site,
agora é o momento de solicitar uma análise.

Observação: Suas páginas devem estar disponíveis para rastreio do Googlebot para garantir
sua limpeza. Certifique-se de que elas não sejam rejeitadas ou bloqueadas para
indexação por tags META de robôs `noindex` ou diretivas.

### 3. Solicite uma análise

Antes de solicitar uma análise:

* **certifique-se de que o problema realmente tenha sido corrigido**;
solicitar uma análise quando o problema ainda existe apenas prolonga o período
em que seu site ficará sinalizado como perigoso.

* **verifique novamente onde solicitar uma análise**; o processo de análise será
realizado em uma ferramenta específica, dependendo do problema enfrentado por seu site.
Consulte os canais abaixo.


#### A. Site hackeado

*Você recebeu uma notificação de site hackeado no
[**relatório de Ações manuais**](https://www.google.com/webmasters/tools/manual-action)
do Search Console:*

1. Após realizar as etapas sucessivas do processo de limpeza,
  acesse novamente o relatório de [Ações manuais](https://www.google.com/webmasters/tools/manual-action)
  e encontre o problema como uma correspondência integral ou parcial
  do site.
2. Selecione **Request a review**.

    Para enviarmos uma análise, solicitamos que você forneça mais informações sobre
    suas ações para limpar o site. Para cada categoria de spam hackeado, você pode escrever uma
    frase explicando como o site foi limpo (por exemplo, “Para os URLs
    de injeção de conteúdo hackeados, eu removi o conteúdo de spam e corrigi
    a vulnerabilidade ao atualizar um plug-in obsoleto.”).


#### B. Software indesejado (incluindo malware)

*Você recebeu uma notificação de software indesejado ou malware no
[**relatório de Problemas de segurança**](https://www.google.com/webmasters/tools/security-issues)
do Search Console:*

1. Abra novamente o
  [**relatório de Problemas de segurança**](https://www.google.com/webmasters/tools/security-issues)
  no Search Console. O relatório pode ainda estar mostrando os avisos e exemplos
  de URLs infectados que você já viu.
2. Selecione **Request a review**.

    Para enviarmos uma análise, solicitamos que você forneça mais informações sobre
    suas ações para remover as violações de política do site. Por exemplo,
    “Eu removi o código de terceiros que estava distribuindo malware no meu
    site e o substituí por uma versão mais moderna do código".


*Você não recebeu uma notificação de software indesejado ou malware no
[**relatório de Problemas de segurança**](https://www.google.com/webmasters/tools/security-issues)
do Search Console, mas recebeu uma notificação em sua conta do AdWords:*

1. Solicite uma análise pelo
  [centro de suporte do AdWords](https://support.google.com/adwords/contact/site_policy).


#### C. Phishing ou engenharia social

*Você recebeu uma notificação de phishing no
[**relatório de Problemas de segurança**](https://www.google.com/webmasters/tools/security-issues)
do Search Console:*

1. Abra novamente o
  [**relatório de Problemas de segurança**](https://www.google.com/webmasters/tools/security-issues)
  no Search Console. O relatório pode ainda estar mostrando os avisos e exemplos
  de URLs infectados que você já viu.
2. Selecione **Request a review**.

    Para enviarmos uma análise, solicitamos que você forneça mais informações sobre
    suas ações para remover as violações de política do site. Por exemplo,
    “Eu removi a página que solicitava que os usuários inserissem informações pessoais".

3. Também é possível solicitar a análise em
  [google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/).
  Além de funcionar como uma ferramenta de geração de relatórios para proprietários que acreditam que suas páginas
  foram incorretamente sinalizadas por phishing, este relatório acionará uma análise das
  páginas de phishing que foram limpas para a remoção dos avisos.

### 4. Espere até que a análise seja processada

* **Tempo de processamento da análise de hackeamento com spam:** O processamento de análises para sites hackeados
  com spam pode levar várias semanas. Isso ocorre porque as análises de spam
  podem envolver uma investigação manual ou um reprocessamento completo das
  páginas hackeadas. Se a análise for aprovada, o relatório de Problemas de segurança
  deixará de exibir os tipos de categorias de hackeamento ou exemplos de URLs hackeados.
* **Tempo de processamento da análise de malware:** O processamento de análises para sites infectados com
  malware pode levar alguns dias. Quando a análise for concluída, a
  resposta será disponibilizada na seção **Messages** do Search Console.
* **Tempo de processamento da análise de phishing:** O processamento das análises de phishing pode levar
  cerca de um dia. Se a análise for aprovada, o aviso de phishing deixará de ser exibido
  aos usuários e sua página poderá aparecer novamente em resultados de pesquisas.

Se o Google constatar que seu site está limpo, os avisos deverão ser removidos
de navegadores e resultados de pesquisa em até 72 horas.

Se o Google determinar que você não corrigiu o problema, o relatório de Problemas
de segurança do Search Console poderá exibir mais exemplos de URLs
infectados para auxiliar em sua próxima investigação. Avisos de sites afetados por malware, phishing ou hackeados
com spam permanecerão em resultados de pesquisa e/ou navegadores
para proteger os usuários.

### Etapas finais

* **Se sua solicitação for aprovada,** verifique se o site funciona como esperado:
  as páginas carregam corretamente e os links estão ativos. Para manter seu site seguro,
  recomendamos que todos os proprietários de sites implementem o plano de manutenção
  e segurança criado em [Limpar e manter seu site](clean_site).

    Para saber mais, considere os seguintes recursos de
    [StopBadware](https://www.stopbadware.org):

      * [Preventing badware: basics](https://www.stopbadware.org/prevent-badware-basics)
      * [Additional resources: hacked sites](https://www.stopbadware.org/hacked-sites-resources)

* **Se sua solicitação não foi aprovada,** avalie seu site novamente para verificar a presença de 
  [malwares](hacked_with_malware) ou [spam](hacked_with_spam) ou qualquer
  modificação ou novos arquivos criados pelo hacker. Como alternativa, considere
  solicitar ajuda adicional de
  [especialistas de sua equipe de suporte](support_team).
