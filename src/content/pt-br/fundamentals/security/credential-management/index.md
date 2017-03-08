project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-11-08 #}
{# wf_published_on: 2016-11-08 #}

# A Credential Management API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

A [Credential Management API](https://www.w3.org/TR/credential-management/)
é uma API de navegador baseada em padrões que oferece uma interface programática
entre o site e o navegador, proporcionando acesso fácil entre dispositivos e
removendo gargalos dos fluxos de acesso por senha.

<div class="attempt-right">
  <figure>
    <video src="animations/credential-management-smaller.mov" style="max-height: 400px;" autoplay muted loop controls></video>
    <figcaption>Fluxo de acesso do usuário</figcaption>
  </figure>
</div>

A Credential Management API:

* **Simplifique o fluxo de acesso** — os usuários podem fazer novo acesso automaticamente 
  em um site, mesmo que a sessão tenha expirado.
* **Permite acesso em um toque com o seletor de contas** — um seletor de contas nativos é exibido,
  eliminando o formulário de acesso por senha.
* **Armazena credenciais** — pode armazenar uma combinação de nome de usuário e senha
  ou até dados de conta universal.

Que ver isso funcionando? Veja a
[demonstração da Credential Management API](https://credential-management-sample.appspot.com)
e dê uma olhada no
[código](https://github.com/GoogleChrome/credential-management-sample).

<div class="clearfix"></div>


## Etapas para implementar o Credential Management

Embora haja diversas maneiras de integrar a Credential Management
API e as especificações de uma integração dependam da estrutura e da
experiência do usuário do site, os sites que usam esse fluxo têm as seguintes vantagens
na experiência do usuário:

* Os usuários do serviço que têm uma única credencial salva no
  navegador fazem login imediatamente e são redirecionados à página
  de acesso efetuado assim que a autenticação acaba.
* Os usuários que têm diversas credenciais salvas ou que desativaram o login
  automático precisam responder a uma caixa de diálogo antes de acessarem a página de acesso efetuado
  do site.
* Quando os usuários fazem logout, o site garante que eles não
  acessem automaticamente quando retornarem.

Ponto-chave: Usar a Credential Management API exige que a página seja fornecida
a partir de uma origem segura.

### Recuperar credenciais do usuário e fazer login

Para fazer o usuário acessar, recupere as credenciais do gerenciador de senhas do navegador
e use-as.

Por exemplo:

1. Quando o usuário chegar no site e não fizer login automaticamente, 
  chame `navigator.credential.get()`
2. Use as credenciais recuperadas para aplicar o login automático ao usuário.
3. Atualize a IU para indicar que o usuário fez login.

Leia mais em
[Recuperar credenciais](/web/fundamentals/security/credential-management/retrieve-credentials).

### Salvar ou atualizar credenciais do usuário

Se o usuário acessar com nome de usuário e senha:

1. Depois que o usuário acessar com sucesso, criar uma conta ou alterar uma
   senha, crie o `PasswordCredential` com o ID do usuário e
   a senha.
2. Salve o objeto da credencial usando `navigator.credentials.store()`.


Se o usuário acessou com um provedor de identidade universal, como o Google
Sign-In, o Facebook, o GitHub etc.:

1. Depois que o usuário acessar com sucesso, criar uma conta ou alterar uma
   senha, crie o `FederatedCredential` com o endereço de e-mail do usuário como
   o ID e especifique o provedor de identidade com `.provider` 
2. Salve o objeto da credencial usando `navigator.credentials.store()`.

Saiba mais em
[Armazenar credenciais](/web/fundamentals/security/credential-management/store-credentials).

### Fazer logout

Quando o usuário faz logout, chame `navigator.credentials.requireUserMediation()`
para impedir que o usuário faça login automático quando voltar.

Desativar o login automático também permite que os usuários alternem entre contas facilmente,
por exemplo, entre contas profissionais e pessoais, ou entre contas de
dispositivos compartilhados, sem ter que reinserir as informações de acesso.

Saiba mais em
[Logout](/web/fundamentals/security/credential-management/retrieve-credentials#sign-out).


## Outras referências

[Credential Management API no MDN](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API)


{# wf_devsite_translation #}
