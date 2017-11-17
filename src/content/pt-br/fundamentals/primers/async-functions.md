project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Funções assíncronas permitem escrever código baseado em promessa como se fosse síncrono

{# wf_published_on: 2016-10-20 #}
{# wf_updated_on: 2016-10-20 #}

# Funções assíncronas - simplificando promessas {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Funções assíncronas são ativadas por padrão no Chrome 55 e, sinceramente, elas são
maravilhosas. Eles permitem que escrever código baseado em promessa como se fosse síncrono,
mas sem bloquear o segmento principal. Elas tornam o seu código assíncrono menos
"inteligente" e mais legível.

Funções assíncronas funcionam assim:

    async function myFirstAsyncFunction() {
      try {
        const fulfilledValue = await promise;
      }
      catch (rejectedValue) {
        // …
      }
    }

Se usar a palavra-chave `async` antes de uma definição de função, você pode usar
`await` dentro da função.  Quando você `await` uma promessa, a função está pausada
de uma forma não-bloqueadora, até que a promessa seja concluída. Se a promessa cumprir, você
obtém o valor de volta. Se a promessa rejeitar, o valor rejeitado é descartado.

Observação: Se você não estiver familiarizado com promessas, consulte [nosso
guia de promessas](/web/fundamentals/getting-started/primers/promises).

## Exemplo: Registrando uma busca

Suponha que desejamos buscar um URL e registrar a resposta como texto. Eis como isso fica
usando promessas:

    function logFetch(url) {
      return fetch(url)
        .then(response => response.text())
        .then(text => {
          console.log(text);
        }).catch(err => {
          console.error('fetch failed', err);
        });
    }

E aqui está a mesma coisa usando funções assíncronas:

    async function logFetch(url) {
      try {
        const response = await fetch(url);
        console.log(await response.text());
      }
      catch (err) {
        console.log('fetch failed', err);
      }
    }

É o mesmo número de linhas, mas todas as chamadas de retorno desapareceram. Isso facilita muito a
leitura, especialmente para pessoas menos familiarizadas com promessas.

Observação: Qualquer coisa que você `await` é passada por meio de `Promise.resolve()`, para que
você possa `await` promessas não-nativas com segurança.

## Valores de retorno assíncronos

Funções assíncronas *sempre* retornam uma promessa, quer você use `await` ou não. Essa
promessa é resolvida com qualquer coisa que a função assíncrona retorne, ou rejeitada com
qualquer coisa que a função assíncrona descarte. Assim, com:

    // wait ms milliseconds
    function wait(ms) {
      return new Promise(r => setTimeout(r, ms));
    }

    async function hello() {
      await wait(500);
      return 'world';
    }

... chamar `hello()` retorna uma promessa que *se cumpre* com `"world"`.

    async function foo() {
      await wait(500);
      throw Error('bar');
    }

... chamar `foo()` retorna uma promessa que *é rejeitada com `Error('bar')`.

## Exemplo: Transmissão de uma resposta

A vantagem das funções assíncronas aumenta em exemplos mais complexos. Digamos que desejávamos
transmitir uma resposta ao registrar os pedaços, e retornar o tamanho final.

Observação: A frase "registrar os pedaços" me deixou enjoado.

Aqui está ela com promessas:

    function getResponseSize(url) {
      return fetch(url).then(response => {
        const reader = response.body.getReader();
        let total = 0;

        return reader.read().then(function processResult(result) {
          if (result.done) return total;

          const value = result.value;
          total += value.length;
          console.log('Received chunk', value);

          return reader.read().then(processResult);
        })
      });
    }

Verifique-me, Jake "portador de promessas" Archibald. Vê como estou chamando
`processResult` dentro de si para configurar um loop assíncrono? Escrever isso me fez
sentir *muito inteligente*. Porém, como com a maioria dos códigos "inteligentes", você tem que analisá-lo
por um longo tempo para descobrir o que está fazendo, como uma daquelas imagens de olho-mágico da
década de 90.

Vamos tentar novamente com funções assíncronas:

    async function getResponseSize(url) {
      const response = await fetch(url);
      const reader = response.body.getReader();
      let result = await reader.read();
      let total = 0;

      while (!result.done) {
        const value = result.value;
        total += value.length;
        console.log('Received chunk', value);
        // get the next result
        result = await reader.read();
      }

      return total;
    }

Todo o "inteligente" desapareceu. O loop assíncrono que me fez sentir tão presunçoso é
substituído por um while-loop confiável e enfadonho. Muito melhor. No futuro, teremos
[iteradores assíncronos](https://github.com/tc39/proposal-async-iteration){: .external},
que
[substituiriam o `while` loop por um loop for-of](https://gist.github.com/jakearchibald/0b37865637daf884943cf88c2cba1376){: .external}, tornando-o ainda mais elegante.

Observação: Eu sou meio apaixonado por strings. Se você não estiver familiarizado com streaming,
[confira o meu guia](https://jakearchibald.com/2016/streams-ftw/#streams-the-fetch-api){: .external}.

## Outras sintaxes de função assíncrona

Já vimos `async function() {}`, mas a palavra-chave `async` pode ser usada
com outra sintaxe de função:

### Funções de seta

    // map some URLs to json-promises
    const jsonPromises = urls.map(async url => {
      const response = await fetch(url);
      return response.json();
    });

Observação: `array.map(func)` não se importa que eu lhe atribuí uma função assíncrona, ele
a encara apenas como uma função que retorna uma promessa. Ele não espera a
primeira função se completar antes de chamar a segunda.

### Métodos de objeto

    const storage = {
      async getAvatar(name) {
        const cache = await caches.open('avatars');
        return cache.match(`/avatars/${name}.jpg`);
      }
    };

    storage.getAvatar('jaffathecake').then(…);

### Métodos de classe

    class Storage {
      constructor() {
        this.cachePromise = caches.open('avatars');
      }

      async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
      }
    }

    const storage = new Storage();
    storage.getAvatar('jaffathecake').then(…);

Observação: Construtores de classe e coletores/configurações não podem ser assíncronos.

## Cuidado! Evite ser sequencial demais

Embora esteja compilando código síncrono, certifique-se de não perder a
oportunidade de fazer coisas em paralelo.

    async function series() {
      await wait(500);
      await wait(500);
      return "done!";
    }

O item acima leva 1000 ms para ser concluído, enquanto:

    async function parallel() {
      const wait1 = wait(500);
      const wait2 = wait(500);
      await wait1;
      await wait2;
      return "done!";
    }

O item acima leva 500 ms para ser concluído, porque ambas as esperas ocorrem ao mesmo tempo.
Vejamos um exemplo prático...

### Exemplo: Emitindo buscas em ordem

Digamos que desejamos buscar uma série de URLs e registrá-los o mais rapidamente possível,
na ordem correta.

*Suspiro profundo* - eis como isso fica com promessas:

    function logInOrder(urls) {
      // fetch all the URLs
      const textPromises = urls.map(url => {
        return fetch(url).then(response => response.text());
      });

      // log them in order
      textPromises.reduce((chain, textPromise) => {
        return chain.then(() => textPromise)
          .then(text => console.log(text));
      }, Promise.resolve());
    }

Sim, isso mesmo, estou usando `reduce` para ligar de uma sequência de promessas. *Sou tão
inteligente*. Mas isso é uma codificação um pouco *tão inteligente*, e ficamos melhor sem ela.

No entanto, ao converter o item acima para uma função assíncrona, é tentador ser
*sequencial demais*:

<span class="compare-worse">Não recomendado</span> - sequencial demais

    async function logInOrder(urls) {
      for (const url of urls) {
        const response = await fetch(url);
        console.log(await response.text());
      }
    }

Ficou muito mais elegante, mas minha segunda busca não começa até que a primeira busca
tenha sido totalmente lida, e assim por diante. Isso é muito mais lento do que o exemplo de promessas que
executa as buscas em paralelo. Felizmente há um meio termo ideal:

<span class="compare-better">Recomendado</span> - bom e paralelo

    async function logInOrder(urls) {
      // fetch all the URLs in parallel
      const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
      });

      // log them in sequence
      for (const textPromise of textPromises) {
        console.log(await textPromise);
      }
    }

Neste exemplo, os URLs são buscados e lidos em paralelo, mas a parte "inteligente"
`reduce` é substituída por um loop for padrão, enfadonho e legível.

## Suporte a navegadores & soluções alternativas

No momento da compilação, funções assíncronas estão ativadas por padrão no Chrome 55, mas
elas estão sendo desenvolvidas em todos os principais navegadores:

* Edge - [Na versão 14342+ atrás de uma sinalização](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/asyncfunctions/)
* Firefox - [desenvolvimento ativo](https://bugzilla.mozilla.org/show_bug.cgi?id=1185106)
* Safari - [desenvolvimento ativo](https://bugs.webkit.org/show_bug.cgi?id=156147)

### Solução alternativa - Geradores

Se tem como objetivo navegadores que suportam geradores (que inclui
[a versão mais recente de todos os principais navegadores](http://kangax.github.io/compat-table/es6/#test-generators){:.external}
) você pode usar funções assíncronas polyfill.

[Babel](https://babeljs.io/){: .external} vai faz isso por você,
[eis um exemplo através do Babel REPL](https://goo.gl/0Cg1Sq){: .external}
- observe quão semelhante é o código transcompilado. Esta transformação é parte da 
[pré-configuração do Babel es2017](http://babeljs.io/docs/plugins/preset-es2017/){: .external}.

Observação: É divertido dizer Babel REPL. Experimente.

Recomendo a abordagem de transcompilagem, porque você pode simplesmente desativá-la
quando seus navegadores de destino suportarem funções assíncronas, mas se você *realmente* não quiser
usar um transcompilador, pode utilizar o
[polyfill do Babel](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external}
e use-o. Em vez de:

    async function slowEcho(val) {
      await wait(1000);
      return val;
    }

…você incluiria [o polyfill](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external}
e compilaria:

    const slowEcho = createAsyncFunction(function*(val) {
      yield wait(1000);
      return val;
    });

Observe que você tem que passar um gerador (`function*`) para `createAsyncFunction`,
e usar `yield` em vez de `await`. Exceto por isso, funciona da mesma forma.

### Solução alternativa - regenerador

Se seu objetivo são navegadores mais antigos, o Babel também pode transcompilar geradores,
o que te permite usar funções assíncronas até mesmo no IE8. Para fazê-lo, você precisa da
[pré-configuração do Babel's es2017](http://babeljs.io/docs/plugins/preset-es2017/){: .external}
*e* da [pré-configuração es2015](http://babeljs.io/docs/plugins/preset-es2015/){: .external}.

A [saída não é tão bela](https://goo.gl/jlXboV), então cuidado com
sobrecarga de código.

## Faça tudo assíncrono!

Uma vez que funções assíncronas funcionam em todos os navegadores, use-as em todas as
funções que retornam promessas! Elas não apenas tornam seu código mais ordenado, mas
certificam que a função *sempre* retornará uma promessa.

Eu fiquei realmente animado com as funções assíncronas [em
2014](https://jakearchibald.com/2014/es7-async-functions/){: .external}, e
é ótimo vê-las chegando, de verdade, nos navegadores. Legal!


{# wf_devsite_translation #}
