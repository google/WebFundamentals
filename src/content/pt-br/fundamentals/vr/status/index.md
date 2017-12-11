project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Fique por dentro das últimas informações sobre o status da WebVR, além dos pontos importantes da criação de experiências da WebVR.

{# wf_updated_on: 2016-12-12 #}
{# wf_published_on: 2016-12-12 #}

# Status e considerações sobre a WebVR {: .page-title }

Aviso: a WebVR ainda é experimental e, por isso, está sujeita a mudanças.

## Status de implementação da WebVR

Hoje, a WebVR API está disponível no:

* Chrome Beta (M56+) com um [Teste na origem](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md).
* Firefox Nightly.
* Navegador Samsung Internet do Gear VR (observação: compatível com uma versão mais antiga da especificação da WebVR).

<iframe width="100%" height="320" src="https://www.chromestatus.com/feature/4532810371039232?embed" style="border: 1px solid #CCC" allowfullscreen>
</iframe>

Veja mais informações sobre o status de implementação em navegadores em [chromestatus.com](https://www.chromestatus.com/features/4532810371039232?embed).

## Considerações

Veja alguns pontos importantes da criação de experiências da WebVR atualmente.

* **Você deve fornecer o conteúdo da WebVR por HTTPS.** Caso contrário, os usuários receberão advertências do navegador.
    * Leia [Como usar o HTTPS nos servidores](/web/fundamentals/security/encrypt-in-transit/enable-https) para obter mais orientação.
* **Atualmente, o Chrome só é compatível com WebVR nativa no Android.** Você deve usar um fone de ouvido Daydream com um celular Pixel.
* **O [Polyfill da WebVR](https://github.com/googlevr/webvr-polyfill) nem sempre terá implementação exatamente igual às nativas da especificação.** Se você planejar usar o Polyfill, verifique-o em dispositivos compatíveis e não compatíveis com RV.
* **Os usuários devem clicar no botão de um controlador de RV antes de ele estar disponível no seu código**. Você deve prever isso no código, normalmente mostrando aos usuários uma mensagem que solicite pressionar o botão de um controlador no início da experiência de RV.
* **Você deve usar informações de "pose" dos controladores de jogos no Chrome 56 se a execução for local**. As informações do controle de jogos não conterão informações de "pose" (ou localização) quando a execução for em locahost, a menos que você ative o sinalizador de tempo de execução para extensões de controlador no Chrome 56. Se estiver realizando um Teste na origem, as extensões do controlador serão ativadas com a WebVR API.


{# wf_devsite_translation #}
