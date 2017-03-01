project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Práticas recomendadas para determinar o momento de registro dos service workers.

{# wf_updated_on: 2016-11-28 #}
{# wf_published_on: 2016-11-28 #}

# Registro dos service workers {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

Os [service
workers](/web/fundamentals/getting-started/primers/service-workers)
podem aumentar bastante a velocidade dos acessos repetidos ao seu aplicativo web, mas você deve adotar
algumas medidas para garantir que a instalação inicial do service worker não prejudique a
experiência do usuário no primeiro acesso.

Geralmente, atrasar o
[registro](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)
do service worker até a página inicial ser carregada fornece a melhor experiência aos
usuários, principalmente nos dispositivos móveis, que normalmente têm conexões de rede mais lentas.

## Código comum de registro

Se você já leu alguma vez sobre os service workers, provavelmente se
deparou com código clichê muito parecido com o seguinte:

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }

Às vezes, esse código pode ser acompanhado de algumas declarações `console.log()`, ou
[código](https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js#L20)
que detecta uma atualização ao registro de um service worker anterior, como uma forma
de permitir que os usuários atualizem a página. Mas essas são variações pequenas das
poucas linhas de código que normalmente se usa.

Então, há alguma mudança no `navigator.serviceWorker.register`? Existem
práticas recomendadas a seguir? Não surpreende que a resposta seja "sim" para ambos (considerando que este artigo não
acaba aqui)!

## O primeiro acesso do usuário

Vamos analisar o primeiro acesso do usuário a um aplicativo web. Ainda não há service worker
e o navegador não tem como saber antecipadamente se haverá um service
worker que, eventualmente, seja instalado.

Como desenvolvedor, sua prioridade deve ser garantir que o navegador receba
rapidamente o mínimo de recursos críticos necessário para exibir uma página
interativa. Tudo que atrasar a obtenção dessas respostas é inimigo da
experiência de oferecer interação superrápido.

Agora, imagine que no processo de baixar o JavaScript ou as imagens de
que sua página precisa para renderizar, o navegador decida iniciar um encadeamento ou
processo em segundo plano (para tornar o exemplo mais rápido, digamos que seja um encadeamento). Presuma
que você não esteja usando um computador superrápido, mas sim um celular
bem simples que a maior parte do mundo usa como o principal dispositivo. Colocar
esse encadeamento adicional para trabalhar gera contenção para o tempo de processamento e a memória que o navegador
poderia gastar na renderização de uma página web interativa.

Um encadeamento ocioso em segundo plano provavelmente não faria uma grande diferença. Mas e
se esse encadeamento não estiver ocioso, mas sim decidir que vai começar
a baixar recursos da rede? Toda a preocupação com a contenção
de memória e CPU seria colocada de lado por conta das questões de largura
de banda limitada de muitos dispositivos móveis. Largura de banda é algo precioso, por isso, não atrapalhe
os recursos críticos baixando recursos acessórios ao mesmo tempo.

Mencionamos tudo isso para dizer que colocar um novo encadeamento de service worker para baixar
e armazenar recursos em cache em segundo plano pode ir contra o seu objetivo de fornecer
a experiência com a disponibilização da interação mais rápida possível na primeira vez que o usuário acessar o
seu site.

## Como aprimorar o código clichê

A solução é controlar o início do service worker decidindo quando chamar
`navigator.serviceWorker.register()`. Uma regra geral simples seria atrasar
o registro até depois do <code>[evento
"load"](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)</code>
disparar em <code>window</code>, assim:

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }

Mas o momento certo para iniciar o registro do service worker também pode depender
do que o aplicativo web faz assim que carrega. Por exemplo, o [aplicativo web
da Google I/O 2016](https://events.google.com/io2016/) apresenta uma animação curta
antes de realizar uma transição para a tela principal. Nossa equipe
[descobriu](/web/showcase/2016/iowa2016) que iniciar
o registro do service worker durante a animação pode levar a travamentos
em dispositivos móveis mais simples. Em vez de dar aos usuários uma experiência ruim,
[atrasamos](https://github.com/GoogleChrome/ioweb2016/blob/8cfa27261f9d07fe8a5bb7d228bd3f35dfc9a91e/app/scripts/helper/elements.js#L42)
o registro do service worker até a animação acabar, quando a probabilidade
de o navegador ter alguns segundos de ociosidade é maior.

Seguindo o mesmo princípio, se o aplicativo web usa uma estrutura que realiza configuração adicional depois
que de a página ser carregada, procure um evento específico da estrutura que sinaliza quando esse
trabalho foi concluído.

## Acessos subsequentes

Estávamos concentrados na experiência de primeiro acesso até agora, mas qual é o impacto
do adiamento do registro do service worker nos acessos repetidos ao seu site?
Embora isso possa surpreender alguns, não há impacto algum.

Quando um service worker é registrado, ele passa por `install` e
`activate`, que são [eventos do ciclo
de vida](/web/fundamentals/instant-and-offline/service-worker/lifecycle).
Quando um service worker é ativado, ele pode gerenciar eventos `fetch` para todos
os acessos subsequentes ao aplicativo web. O service worker é iniciado *antes* da
solicitação de qualquer página feita dentro do seu escopo, o que faz
sentido se você pensar bem. Se o service worker existente não já estiver em execução antes
do acesso a uma página, ele não teria a chance de atender aos eventos `fetch` de
solicitações de navegação.

Por isso, quando há um service worker ativo, não importa quando você chama
`navigator.serviceWorker.register()` ou, na verdade, *se você faz essa chamada*.
A menos que altere  URL do script do service worker,
`navigator.serviceWorker.register()` é, na prática, uma
["não operação"](https://en.wikipedia.org/wiki/NOP) em acessos subsequentes. O momento em que ele
é chamado é irrelevante.

## Motivos para registrar com antecedência

Existe algum cenário em que registrar o service worker o quanto
antes é uma boa ideia? Uma que vem à cabeça é quando o service worker usa
<code>[clients.claim()](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim)</code>
para assumir o controle da página durante o primeiro acesso, e quando ele realiza
[armazenamento em cache
em tempo de execução](/web/fundamentals/instant-and-offline/offline-cookbook/#on-network-response)
de forma agressiva dentro de um gerenciador de <code>fetch</code>. Nesse caso, há uma
vantagem em ativar o service worker o mais rápido possível: para tentar
preencher seus caches de tempo de execução com recursos que podem ser úteis no futuro. Se
o aplicativo web se enquadra nessa categoria, vale a pena dar um passo para trás
para garantir que o gerenciador de <code>install</code> do service worker não solicite
recursos que briguem por largura de banda com as solicitações da página principal.

## Testando e alinhando tudo

Uma ótima forma de simular um primeiro acesso é abrir o aplicativo web em uma [janela
anônima
do Chrome](https://support.google.com/chromebook/answer/95464?co=GENIE.Platform%3DDesktop)
e analisar o tráfego de rede no [Chrome
DevTools](/web/tools/chrome-devtools/). Como desenvolvedor
web, você provavelmente recarrega uma instância local do seu aplicativo muitas
e muitas vezes ao dia. Mas, ao acessar o seu site novamente, onde já há um
service worker e caches totalmente preenchidos, você não passa pela mesma experiência
que um novo usuário, e por isso fica fácil ignorar um possível problema.

Veja um exemplo que demonstra a diferença que o momento do registro pode
fazer. As duas capturas de tela foram obtidas durante o acesso a um [aplicativo
de exemplo](https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo)
no modo de navegação anônima usando limitação de rede para simular uma conexão lenta.

![Tráfego de rede com o registro antes.](../images/early-registration.png
"Network traffic with early registration.")

A captura de tela acima reflete o tráfego de rede quando o exemplo foi  modificado
para realizar o registro do service worker o quanto antes. É possível identificar
solicitações de pré-armazenamento em cache (as linhas com o [ícone
de engrenagem](http://stackoverflow.com/questions/33590378/status-code200-ok-from-serviceworker-in-chrome-network-devtools/33655173#33655173),
originadas pelo gerenciador de `install` do service worker)
intercaladas com solicitações de outros recursos necessários para exibir a página.

![Tráfego de rede com registro depois.](../images/late-registration.png
"Network traffic with late registration.")


Na captura de tela acima, o registro do service worker foi adiado até que a
página seja carregada. É possível notar que as solicitações de pré-armazenamento em cache não são iniciadas até que
todos os recursos tenham sido obtidos da rede, eliminando toda contenção da
largura de banda. Além disso, como estamos pré-armazenando em cache alguns itens que já estão
no cache HTTP do navegador — os itens com `(from disk cache)` na coluna
"Size" —, podemos preencher o cache do service worker sem ter que recorrer
à rede de novo.

Palmas para você se você executa esse tipo de teste em um dispositivo simples que representa o mundo real em uma
rede móvel real. Você pode aproveitar os [recursos de
depuração remota](/web/tools/chrome-devtools/remote-debugging/)
do Chrome para vincular um celular Android ao seu computador via USB e garantir que os
testes realizados realmente reflitam a experiência da maioria
dos seus usuários no mundo real.

## Conclusão

Para resumir, garantir que os usuários tenham a melhor experiência possível no primeiro acesso
é a prioridade nº 1. Adiar o registro de service workers até que a
página seja totalmente carregada quando em um acesso inicial pode ajudar. Você ainda terá
todos os benefícios de ter um service worker para os acessos repetidos.

Se quiser uma forma simples de garantir o adiamento do registro inicial
do seu service worker até que a primeira página seja toda carregada, use o seguinte:

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }


{# wf_devsite_translation #}
