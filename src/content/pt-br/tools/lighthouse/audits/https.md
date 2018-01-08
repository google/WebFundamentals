project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Site está em HTTPS".

{# wf_updated_on: 2016-09-19 #}
{# wf_published_on: 2016-09-19 #}

# Site está em HTTPS  {: .page-title }

## Por que a auditoria é importante {: #why }

Todos os sites devem ser protegidos com HTTPS, mesmo os que não processam
dados confidenciais. O HTTPS evita que intrusos violem ou ouçam passivamente
as comunicações entre o site e seus usuários.

Além disso, o HTTPS é uma pré-requisito para diversos recursos novos e poderosos da plataforma Web, como
tirar fotografias ou gravar áudio.

Por definição, um aplicativo não se qualificará como Progressive Web App se não executar
em HTTPS. Isso ocorre porque diversas tecnologias essenciais de Progressive Web App, como
service workers, exigem HTTPS.

Para obter mais informações sobre porque todos os sites devem ser protegidos com HTTPS, consulte
[Por que você deve usar sempre o HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https).

## Como ser aprovado na auditoria {: #how }

Migre o site para HTTPS.

Muitas plataformas de hospedagem, como
[Firebase](https://firebase.google.com/docs/hosting/){: .external } ou [GitHub
Pages](https://pages.github.com/){: .external }, são seguras por padrão.

Se você executa seus próprios servidores e precisa de uma forma econômica e fácil para gerar
certificados, confira [Vamos criptografar](https://letsencrypt.org/){: .external }. Para obter mais ajuda
sobre a ativação de HTTPS nos seus servidores, consulte este conjunto de documentos: [Criptografar
dados em trânsito](/web/fundamentals/security/encrypt-in-transit/enable-https).

Se a página já é executada em HTTPS, mas esta auditoria falhar,
é provável que você esteja enfrentando problemas com conteúdo misto. O conteúdo misto ocorre quando um site seguro
solicita um recurso desprotegido (HTTP). Consulte o documento a seguir no
painel Security do Chrome DevTools para saber como depurar essas situações:
[Entender problemas de segurança](/web/tools/chrome-devtools/debug/security).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse aguarda um evento do Chrome Debugger Protocol indicando que
a página está executando em uma conexão segura. Se o evento não ocorrer em 10
segundos, a auditoria será reprovada.


{# wf_devsite_translation #}
