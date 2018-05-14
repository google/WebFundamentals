project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Kit do iniciante no Polymer.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-09-12 #}

# Kit do iniciante no Polymer {: .page-title }

[Baixar o Kit do iniciante no Polymer](https://github.com/polymerelements/polymer-starter-kit/releases){: .button .button-primary }

## O que é o Kit do iniciante no Polymer?

O [Kit do iniciante no Polymer](https://github.com/PolymerElements/polymer-starter-kit){: .external }
é um ponto de partida para a criação de aplicativos que usam um layout com base em gavetas. O layout 
é fornecido por elementos `app-layout`.

Esse modelo, juntamente com a cadeia de ferramentas `polymer-cli`, também demonstra o uso
do "padrão PRPL". Esse padrão oferece rapidez de entrega e interação com
conteúdo na rota inicial solicitada pelo usuário, juntamente com navegações rápidas
subsequentes por meio do armazenamento prévio em cache dos componentes restantes necessários para o aplicativo, bem como
seu carregamento progressivo sob demanda à medida que o usuário navega pelo aplicativo.

Resumindo, o padrão PRPL:

* **Envia por push** os componentes necessários para a rota inicial
* **Renderiza** a rota inicial o mais cedo possível
* **Armazena previamente em cache** os componentes das rotas restantes
* **Carrega lentamente (lazy-load)** e atualiza progressivamente as próximas rotas por demanda

### Você está migrando do Kit do iniciante no Polymer v1?

[Consulte nossa postagem do blog que informa o que mudou no PSK2 e como fazer a migração](https://www.polymer-project.org/1.0/blog/2016-08-18-polymer-starter-kit-or-polymer-cli.html){: .external }.

## Configuração

### Pré-requisitos

Instale o [polymer-cli](https://github.com/Polymer/polymer-cli){: .external }:

    npm install -g polymer-cli

### Inicializar projeto do modelo

    mkdir my-app
    cd my-app
    polymer init starter-kit

### Inicializar o servidor de desenvolvimento

Este comando entrega o aplicativo em `http://localhost:8080` e oferece roteamento básico
de URL para o aplicativo:

    polymer serve --open


### Compilar

Este comando executa minificação de HTML, CSS e JS nas dependências
do aplicativo e gera um arquivo service-worker.js com código para armazenar previamente em cache
as dependências de acordo com o ponto de entrada e os fragmentos especificados em `polymer.json`.
Os arquivos minimizados são gerados na pasta `build/unbundled` e são adequados
para entrega com um servidor compatível com HTTP/2+Push.

Além disso, o comando cria uma pasta `build/bundled` de fallback,
gerada usando empacotamento de fragmentos e adequada para uso por
servidores ou clientes incompatíveis com o H2/Push.

    polymer build

### Visualizar a compilação

Este comando entrega a versão minimizada do aplicativo em `http://localhost:8080`
em um estado não empacotado, da mesma forma que a entrega por um servidor compatível com push:

    polymer serve build/unbundled

Este comando entrega a versão minimizada do aplicativo em `http://localhost:8080`,
gerada usando empacotamento de fragmentos:

    polymer serve build/bundled

### Executar testes

Este comando executará o
[Testador de componentes Web](https://github.com/Polymer/web-component-tester){: .external } nos
navegadores instalados em sua máquina.

    polymer test

### Adicionar uma nova visualização

Você pode estender o aplicativo adicionado mais visualizações para carregamento sob demanda,
ou seja, de acordo com a rota, ou para renderizar progressivamente seções não essenciais
do aplicativo.  Cada novo fragmento carregado por demanda deve ser adicionado à
lista de `fragments` no arquivo `polymer.json` incluído.  Isso garantirá que
esses componentes e suas dependências sejam adicionados à lista de componentes
armazenados previamente em cache (e que seus pacotes sejam criados na compilação `bundled` de fallback).

## Próximas etapas

Consulte o [guia de primeiros passos](https://www.polymer-project.org/1.0/start/toolbox/set-up){: .external }

## Saiba mais

Para saber mais, consultar o código, enviar um problema ou participar, confira
nosso repositório Git em [https://github.com/polymerelements/polymer-starter-kit](https://github.com/polymerelements/polymer-starter-kit){: .external }


{# wf_devsite_translation #}
