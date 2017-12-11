project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Saiba como configurar o Lighthouse para auditar apps da Web.

{# wf_updated_on: 2016-09-27 #}
{# wf_published_on: 2016-09-27 #}

# Auditar apps da Web com o Lighthouse {: .page-title }

O [Lighthouse](https://github.com/GoogleChrome/lighthouse) é uma ferramenta automatizada
de código aberto que aprimora a qualidade de apps da Web. Ele pode ser executado como
extensão do Chrome ou na linha de comando. Informe ao Lighthouse um URL que você
quer auditar. Ele executará uma série de testes na página e gerará
um relatório sobre o desempenho da página. Nesse relatório, você poderá usar os testes
que apresentaram falha como indicadores do que pode ser feito para aprimorar o aplicativo.

Observação: No momento, o Lighthouse se concentra principalmente em recursos de Progressive Web Apps, como Adicionar à tela inicial e suporte ao modo off-line. No entanto, o objetivo geral do projeto é oferecer uma auditoria abrangente de todos os aspectos da qualidade de um app da Web.

## Primeiros passos

O Lighthouse pode ser executado de duas formas: como extensão do Chrome ou como ferramenta de
linha de comando. A extensão do Chrome oferece uma interface mais fácil de usar para a
leitura de relatórios. A ferramenta de linha de comando permite que você integre o Lighthouse a
sistemas de integração contínua.

### Extensões do Chrome

Baixe o Google Chrome 52 ou posterior.

Instale a [extensão do Chrome do Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk).

Acesse a página que quer auditar.

Clique no ícone do Lighthouse (![Ícone do 
Lighthouse](images/lighthouse-icon-16.png)) na barra de ferramentas do Chrome.

![Ícone do Lighthouse na barra de ferramentas do Chrome](images/icon-on-toolbar.png)

Se o ícone não aparecer na barra de ferramentas, ele poderá estar oculto no
menu principal do Chrome.

![Ícone do Lighthouse no menu do Chrome](images/icon-in-menu.png)

Após clicar no ícone, você deverá ver um menu.

![Menu do Lighthouse](images/menu.png)

Se você quiser executar somente um subconjunto das auditorias, clique no botão **Options**
e desative as auditorias que não quiser executar. Role para baixo e pressione **OK**
para confirmar as mudanças.

![Menu de opções do Lighthouse](images/options.png)

Clique no botão **Generate report** para executar os testes do Lighthouse na
página aberta no momento.

Após a conclusão das auditorias, o Lighthouse abre uma nova guia e exibe um
relatório com os resultados da página.

![Relatório do Lighthouse](images/report.png)

### Ferramenta da linha de comando

Instale o [Node](https://nodejs.org) na versão 5 ou posterior.

Instale o Lighthouse como módulo global do Node.

    npm install -g lighthouse

Execute uma auditoria do Lighthouse em uma página.

    lighthouse https://airhorner.com/

Passe o sinalizador `--help` para ver as opções disponíveis de entrada e saída.

    lighthouse --help

## Contribuir

O Lighthouse é um software de código aberto e as contribuições são bem-vindas. Consulte o
[rastreador de problemas](https://github.com/GoogleChrome/lighthouse/issues) do repositório
para encontrar problemas que você pode corrigir ou auditorias que você pode melhorar, bem como criar novas auditorias.
O rastreador de problemas também é um bom lugar para discutir métricas de auditorias, ideias para
novas auditorias ou qualquer outro tópico relacionado ao Lighthouse.


{# wf_devsite_translation #}
