project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: O Kit do iniciante na Web é modelo e um conjunto de ferramentas para desenvolver aplicativos para vários dispositivos.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-09-12 #}

# Kit do iniciante na Web {: .page-title }

[Baixar o Kit do iniciante na Web (beta)](https://github.com/google/web-starter-kit/releases/latest){: .button .button-primary }

## O que é o Kit do iniciante na Web?

O [Kit do iniciante na Web](https://github.com/google/web-starter-kit) é um modelo dogmático para o desenvolvimento Web. Ferramentas para criar uma ótima experiência em diversos dispositivos, [orientadas a desempenho](#web-performance). Ajuda para manter a produtividade, seguindo as práticas recomendadas descritas no [Web Fundamentals](/web/fundamentals/) do Google. Um ótimo ponto de partida para profissionais e novatos no setor.

### Recursos

| Recurso                                | Resumo                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Modelo responsivo | Um modelo responsivo otimizado para a Web multitelas. Baseado no [Material Design Lite](http://getmdl.io).  Fique à vontade para usar este kit ou um completamente zerado em [basic.html](https://github.com/google/web-starter-kit/blob/master/app/basic.html).                          |
| Compatível com Sass                           | Compile [Sass](http://sass-lang.com/) no CSS com facilidade, adicionando compatibilidade com variáveis e mixins, entre outros recursos. (Execute `gulp serve` ou `gulp` para produção)                                                                                                      |
| Otimização de desempenho               | Minimize e concatene JavaScript, CSS, HTML e imagens para ajudar a manter as páginas leves. (Execute `gulp` para criar uma versão otimizada do projeto para `/dist`)                                                                                                |
| Inspeção de código               | A inspeção de código JavaScript é realizada pelo [ESLint](http://eslint.org) - uma ferramenta de inspeção plugável para identificar e relatar padrões no JavaScript. O Kit do iniciante na Web usa ESLint com [eslint-config-google](https://github.com/google/eslint-config-google), que tenta seguir o guia de estilo JavaScript do Google.                                                                                                |
| ES2015 via Babel 6.0                   | Optional ES2015 support using [Babel](https://babeljs.io/){: .external }. Para ativar a compatibilidade com ES2015, remova a linha `"only": "gulpfile.babel.js",` no arquivo [.babelrc](https://github.com/google/web-starter-kit/blob/master/.babelrc). O código-fonte do ES2015 será transcompilado automaticamente para ES5 a fim de oferecer ampla compatibilidade com navegadores.  |
| Servidor HTTP incorporado                   | Um servidor incorporado para visualizar o site localmente durante o desenvolvimento e a iteração                                                                                                                                                                            |
| Recarregamento de navegador em tempo real                 | Recarregue o navegador em tempo real sempre que uma edição for feita, sem precisar de extensão. (Execute `gulp serve` e edite seus arquivos)                                                                                                                           |
| Sincronização entre dispositivos           | Sincronize cliques, rolagens, formulários e recarregamentos em tempo real entre diversos dispositivos durante a edição do projeto. Baseado no [BrowserSync](http://browsersync.io). (Execute `gulp serve` e abra o endereço IP fornecido em outros dispositivos da rede)                       |
| Compatibilidade com modo off-line                     | Graças ao nosso [armazenamento prévio em cache](https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js#L226) de [service workers](/web/fundamentals/getting-started/primers/service-workers), os sites que implementarem `dist` em um domínio HTTPS serão compatíveis com o modo off-line. Isso é possibilitado pelo [sw-precache](https://github.com/GoogleChrome/sw-precache/).                                                                                                                                              |
| Insights do PageSpeed                     | Métricas de desempenho de Web mostrando o desempenho do site em dispositivos móveis e desktops (Execute `gulp pagespeed`)                                                                                                                                                    |

## Início rápido

[Baixe](https://github.com/google/web-starter-kit/releases/latest) o kit
ou clone [o](https://github.com/google/web-starter-kit) repositório e use
o conteúdo do diretório `app` como base.

Há dois pontos de partida em HTML à sua escolha:

- `index.html` - o ponto de partida padrão com o layout do Material Design.
- `basic.html` - sem layout, mas inclui nossas práticas recomendadas mínimas para dispositivos móveis

Não deixe de consultar os [documentos de instalação](https://github.com/google/web-starter-kit/blob/master/docs/install.md) para verificar se o ambiente está preparado para executar o WSK.
Após essa verificação, confira os [comandos](https://github.com/google/web-starter-kit/blob/master/docs/commands.md) disponíveis para começar.

## Desempenho de Web

O Kit do iniciante na Web se esforça para oferecer um ponto de partida de alto desempenho pronto para uso. As nossas [pontuações](http://www.webpagetest.org/result/151201_VW_XYC/){: .external } médias no teste de página da Web para o modelo padrão têm um [índice de velocidade](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index) de cerca de 1100 (o ideal é 1000) e um índice de velocidade de visita repetida de cerca de 550 graças ao armazenamento prévio em cache dos service workers. 

## Compatibilidade de navegadores

No momento, nossa posição oficial é oferecer compatibilidade com as duas últimas versões destes navegadores:

* Chrome
* Edge
* Firefox
* Safari
* Opera
* Internet Explorer 9 ou posterior

Isso não significa que o Kit do iniciante na Web não pode ser usado em versões de navegadores anteriores às citadas acima. No entanto, o nosso foco será garantir o funcionamento ideal dos layouts nas versões acima.

## Solução de problemas

Se ocorrerem problemas durante a instalação ou a execução das ferramentas, consulte nosso guia de [solução de problemas](https://github.com/google/web-starter-kit/wiki/Troubleshooting) e abra um [problema](https://github.com/google/web-starter-kit/issues). Teremos prazer em discutir uma solução para esse problema.

## Uma opção somente para modelo

Se você preferir não usar nenhuma das nossas ferramentas, exclua os seguintes arquivos do projeto: `package.json`, `gulpfile.babel.js`, `.jshintrc` e `.travis.yml`. Se quiser, agora você pode usar o modelo de forma segura com um sistema de compilação alternativo (ou sem sistema de compilação).

## Documentos e receitas

* [Apêndice de arquivos](https://github.com/google/web-starter-kit/blob/master/docs/file-appendix.md) - O que fazem estes diversos arquivos?
* [Usar o Saas do Material Design Lite](https://github.com/google/web-starter-kit/blob/master/docs/mdl-sass.md) - como fazer o Saas do MDL funcionar com o WSK
* [Guias de implantação](https://github.com/google/web-starter-kit/blob/master/docs/deploy.md) - disponíveis para Firebase, Google App Engine e outros serviços.
* [Receitas do Gulp](https://github.com/gulpjs/gulp/tree/master/docs/recipes) - o diretório de receitas oficiais do Gulp inclui uma lista abrangente de guias para diversos fluxos de trabalho que podem ser adicionados ao seu projeto.

## Inspiração

O Kit do iniciante na Web é inspirado pelo [Mobile HTML5 Boilerplate](https://html5boilerplate.com/mobile/){: .external } e pelo [generator-gulp-webapp](https://github.com/yeoman/generator-webapp) do Yeoman. Os colaboradores dos dois projetos foram consultados durante o desenvolvimento. Nossas [perguntas frequentes](https://github.com/google/web-starter-kit/wiki/FAQ) tentam responder as perguntas frequentes sobre o projeto.


## Saiba mais

Para saber mais, consultar o código, enviar um problema ou participar, confira
nosso repositório Git em [https://github.com/google/web-starter-kit](https://github.com/google/web-starter-kit)


{# wf_devsite_translation #}
