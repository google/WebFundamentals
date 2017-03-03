project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Este guia examina as regras do PageSpeed Insights no contexto: o que devemos examinar na otimização do caminho crítico de renderização e por quê.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# Regras e recomendações para o PageSpeed {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Este guia examina as regras do PageSpeed Insights no contexto: o que devemos examinar na otimização do caminho crítico de renderização e por quê.


## Elimine JavaScript e CSS bloqueadores de renderização

Para acelerar ao máximo a primeira renderização, minimize e, se possível, elimine a quantidade de recursos críticos na página, minimize o número de bytes críticos baixados e otimize o tamanho do caminho crítico.

## Otimize o uso do JavaScript

Por padrão, os recursos do JavaScript bloqueiam o analisador, a menos que marcados como `async` ou adicionados por meio de um snippet especial do JavaScript. Quando o JavaScript bloqueia o analisador, força o navegador esperar pelo CSSOM e suspende a construção do DOM, o que, por sua vez, pode retardar consideravelmente a primeira renderização.

### Dê preferência a recursos JavaScript assíncronos

Recursos assíncronos desbloqueiam o analisador de documentos e permitem que o navegador não fique bloqueado no CSSOM antes de executar o script. Muitas vezes, se o script puder usar o atributo `async`, quer dizer que ele não é essencial para a primeira renderização. Pense em carregar scripts de forma assíncrona depois da renderização inicial.

### Evite chamadas síncronas ao servidor

Use o método `navigator.sendBeacon()` para limitar os dados enviados por XMLHttpRequests em
gerenciadores `unload`. Como muitos navegadores exigem que essas solicitações sejam
síncronas, podem retardar, algumas vezes visivelmente, as transições entre as páginas. O código
a seguir mostra como usar `navigator.sendBeacon()` para enviar dados ao servidor no
gerenciador `pagehide` em vez de no gerenciador `unload`.


    <script>
      function() {
        window.addEventListener('pagehide', logData, false);
        function logData() {
          navigator.sendBeacon(
            'https://putsreq.herokuapp.com/Dt7t2QzUkG18aDTMMcop',
            'Sent by a beacon!');
        }
      }();
    </script>
    

O novo método `fetch()` oferece uma forma fácil de solicitar assincronamente os dados. Como ele ainda não está disponível em todos os lugares, você deve usar a detecção de recursos para verificar sua presença antes de usá-lo. Esse método processa respostas com promessas em vez de vários gerenciadores de eventos. Ao contrário da resposta ao XMLHttpRequest, a resposta da recuperação é um objeto stream a partir do Chrome 43. Isso significa que uma chamada a `json()` também retorna uma promessa. 


    <script>
    fetch('./api/some.json')  
      .then(  
        function(response) {  
          if (response.status !== 200) {  
            console.log('Looks like there was a problem. Status Code: ' +  response.status);  
            return;  
          }
          // Examine the text in the response  
          response.json().then(function(data) {  
            console.log(data);  
          });  
        }  
      )  
      .catch(function(err) {  
        console.log('Fetch Error :-S', err);  
      });
    </script>
    

O método `fetch()` também pode processar solicitações POST.


    <script>
    fetch(url, {
      method: 'post',
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },  
      body: 'foo=bar&lorem=ipsum'  
    }).then(function() { // Aditional code });
    </script>
    

### Adie a análise do JavaScript

Para minimizar a quantidade de trabalho que o navegador tem para renderizar a página, adie todos os scripts que não são críticos para construir o conteúdo visível da renderização inicial.

### Evite JavaScript de longa duração

JavaScript de longa duração impede o navegador de construir o DOM, o CSSOM e de renderizar a página, por isso, postergue para depois disso toda lógica de inicialização e as funcionalidades que não são essenciais para a primeira renderização. Se for necessário executar uma longa sequência de inicialização, considere dividi-la em várias fases para permitir que o navegador processe outros eventos entre elas.

## Otimize o uso do CSS

O CSS é necessário para construir a árvore de renderização. Na maioria das vezes, o JavaScript fica bloqueado no CSS durante a construção inicial da página. Confirme que todo CSS não essencial esteja marcado como não crítico (por exemplo, gravações e outras consultas de mídia) e que a quantidade de CSS crítico e o tempo de entrega deles sejam os menores possíveis.

### Coloque o CSS no cabeçalho do documento

Especifique todos os recursos CSS o mais cedo possível dentro do documento HTML para que o navegador possa encontrar as tags `<link>` e despachar a solicitação do CSS o quanto antes.

### Evite importações de CSS

A diretiva de importação (`@import`) do CSS permite que uma folha de estilo importe regras de outro arquivo de folha de estilo. No entanto, evite essas diretivas, já que elas introduzem mais idas e voltas ao caminho crítico. Os recursos CSS importados são encontrados somente após o recebimento e a análise da folha de estilos CSS com a própria regra `@import`.

### CSS em linha bloqueador de renderização

Para obter o melhor desempenho, considere a inserção do CSS crítico em linha diretamente no documento HTML. Assim, você consegue eliminar idas e vindas adicionais ao caminho crítico e, se fizer isso corretamente, pode obter um caminho crítico com apenas uma ida e vinda, com o HTML sendo o único recurso bloqueador.



{# wf_devsite_translation #}
