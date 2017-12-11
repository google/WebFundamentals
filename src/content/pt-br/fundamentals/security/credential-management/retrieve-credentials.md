project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-11-08 #}
{# wf_published_on: 2016-11-08 #}

# Obter credenciais {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Para fazer o usuário acessar, recupere as credenciais do gerenciador de senhas do navegador
e use-as.

Para recuperar a credencial de um usuário use `navigator.credentials.get()`, que
retorna uma promessa processada com um
objeto "credential" como argumento. O objeto "credential" obtido pode ser
[`PasswordCredential`](#authenticate_with_a_server) ou
[`FederatedCredential`](#authenticate_with_an_identity_provider). Se não
houver informações de credencial, `null` é retornado.

    navigator.credentials.get({
      password: true,
      unmediated: false,
      federated: {
        providers: [
          'https://account.google.com',
          'https://www.facebook.com'
        ]
      }
    }).then(function(cred) {
      if (cred) {
        // Use provided credential to sign user in  
      }
    });


### `navigator.credentials.get` Parâmetros {: .hide-from-toc }

<table class="responsive properties">
  <tbody>
    <tr>
      <th colspan=2>Parâmetros</th>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>Booleano</code><br>
        Defina como <code>true</code> para recuperar <code>PasswordCredentials</code>.
        O padrão é <code>false</code>.
       </td>
    </tr>
    <tr>
      <td>
        <code>federated</code>
      </td>
      <td>
        <code>Objeto</code><br>
        Objeto que aceita <code>provider</code> ou <code>protocol</code> como
        chaves que tem uma matriz de parâmetros. Objeto <code>provider</code>
        aceita uma matriz de strings que identificam provedores. Atualmente nenhum 
        navegador implementa <code>protocol</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>unmediated</code>
      </td>
      <td>
        <code>Booleano</code><br>
        Defina como <code>true</code> para evitar exibir a IU do seletor de conta.
      </td>
    </tr>
  </tbody>
</table>

## Obter uma credencial

### Obtenha uma credencial automaticamente

Para fazer o usuário efetuar login automaticamente, solicite um objeto "credential" com
`unmediated: true` assim que ele chegar ao seu site. Por exemplo:

<pre class="prettyprint">
navigator.credentials.get({
  password: true,
  <strong>unmediated: true,</strong> // request a credential without user mediation
  federated: {
    providers: [
      'https://account.google.com',
      'https://www.facebook.com'
    ]
  }
})
</pre>

<figure class="attempt-right">
  <img src="imgs/auto-sign-in.png">
  <figcaption>Notificação para usuário de login automático</figcaption>
</figure>

Essa solicitação é processada imediatamente com um objeto "credential" e não exibirá
um seletor de conta. Quando o navegador obtém as informações de credencial,
uma notificação aparece:

<div class="clearfix"></div>


### Obtenha uma credencial pelo seletor de conta

<figure class="attempt-right">
  <img src="imgs/account-chooser.png">
  <figcaption>IU do seletor de conta</figcaption>
</figure>

Se um usuário solicitar mediação ou tiver diversas contas, use o seletor
de contas para deixar o usuário fazer login, ignorando o formulário de login comum.

O seletor de conta normalmente é invocado quando o usuário toca no botão
"Acessar" (ou "Fazer login"). O usuário pode selecionar uma conta para acessar, por exemplo:

<div class="clearfix"></div>


Para ativar o seletor de conta,
defina a propriedade `unmediated` como `false`:

<pre class="prettyprint">
navigator.credentials.get({
  password: true,
  <strong>unmediated: false,</strong> // request a credential with user mediation
  federated: {
    providers: [
      'https://account.google.com',
      'https://www.facebook.com'
    ]
  }
});
</pre>

Quando o usuário selecionar a conta que quer usar, a promessa é processada
com um `PasswordCredential` ou `FederatedCredential`, dependendo da
seleção. Em seguida, [determine o tipo de credencial](#determine-credential-type)
e autentique o usuário com a credencial fornecida.

Se o usuário cancelar o seletor de conta ou não houver credenciais armazenadas,
a promessa é processada com um valor `undefined`. Nesse caso, volte
à experiência do formulário de acesso.




## Determine o tipo de credencial {: #determine-credential-type }

Quando `navigator.credentials.get()` for processado, retornará 
`undefined` ou um objeto "Credential". Para determinar se ele é uma 
`PasswordCredential` ou uma `FederatedCredential`, basta dar uma olhada na propriedade
`.type` do objeto, que será `password` ou
`federated`. 

SE o `.type` for `federated`, a propriedade `.provider` será uma string que
representa o provedor de identidade.

Por exemplo:

    if (cred) {
      switch (cred.type) {
        case 'password':
          // authenticate with a server
          break;
        case 'federated':
          switch (cred.provider) {
            case 'https://accounts.google.com':
              // run google identity authentication flow
              break;
            case 'https://www.facebook.com':
              // run facebook identity authentication flow
              break;
          }
          break;
      }
    } else {
      // auto sign-in not possible
    }


No caso de um valor `undefined`, continue com o usuário em estado de logoff.

Um valor `undefined` é passado quando:

* O usuário não autoriza o recurso de login automático (um por
  instância do navegador).
* O usuário não tem credenciais ou mais de dois objetos "credential"
  armazenados na origem.
* O usuário solicita mediação à origem.




## Autenticar o usuário


### Autentique com um nome de usuário e senha

Para autenticar o usuário no seu servidor, use POST para publicar a 
`PasswordCredential` fornecida no servidor usando `fetch()`.

Quando publicada com POST, `fetch` se converterá automaticamente no objeto `PasswordCredential`
para um objeto `FormData` codificado como `multipart/form-data`:

    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="id"

    chromedemojp@gmail.com
    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="password"

    testtest
    ------WebKitFormBoundaryOkstjzGAv8zab97W--

Observação: Não é possível usar `XMLHttpRequest` para publicar a `PasswordCredential` 
no servidor usando POST.

#### Parâmetros de `PasswordCredential`

Um objeto `PasswordCredential` obtido contém os seguintes parâmetros:

<table class="responsive properties">
  <tbody>
    <tr>
      <th colspan=2>Parâmetros</th>
    </tr>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>String</code><br>
        String do identificador do usuário.
      </td>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>String</code><br>
        Senha "opaca" que não pode ser obtida usando JavaScript.
      </td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>String</code><br>
        String do nome do usuário.
      </td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>String</code><br>
        String do URL da imagem do ícone do usuário.
      </td>
    </tr>
  </tbody>
</table>

#### Alterar parâmetros

Em alguns casos, pode ser necessário adicionais mais dados ao
POST de autenticação.

Altere as chaves de parâmetro atribuindo uma string a `.idName` ou `.passwordName`.

Você também pode adicionar parâmetros extras, como um token contra falsificação de solicitação entre sites (CSRF, na sigla em inglês)
atribuindo `.additionalData` a `FormData` e anexando 
valores-chave a ele.

Quando obtiver o objeto "credential":

    if (cred) {
      if (cred.type == 'password') {
        // Use `email` instead of `id` for the id
        cred.idName = 'email';

        // Append CSRF Token
        var csrf_token = document.querySelector('#csrf_token').value;
        var form = new FormData();
        form.append('csrf_token', csrf_token);

        // Append additional credential data to `.additionalData`
        cred.additionalData = form;

        // `POST` the credential object.
        // id, password and the additional data will be encoded and
        // sent to the url as the HTTP body.
        fetch(url, {           // Make sure the URL is HTTPS
          method: 'POST',      // Use POST
          credentials: cred    // Add the password credential object
        }).then(function() {
          // continuation
        });
      }
    }

Você pode fazer algo similar atribuindo um objeto `URLSearchParams` em vez de um
`FormData` a `.additionalData`. Nesse caso, todo o objeto "credential" 
será codificado usando `application/x-www-form-urlencoded`.

### Autentique com um provedor de identidade

Para autenticar o usuário com um provedor de identidade, basta usar o 
fluxo de autenticação específico com a `FederatedCredential`.

Por exemplo, se o provedor for Google, use a
[biblioteca JavaScript do Google Sign-In](/identity/sign-in/web/):

    // Instantiate an auth object
    var auth2 = gapi.auth2.getAuthInstance();

    // Is this user already signed in?
    if (auth2.isSignedIn.get()) {
      var googleUser = auth2.currentUser.get();
      
      // Same user as in the credential object?
      if (googleUser.getBasicProfile().getEmail() === id) {
        // Continue with the signed-in user.
        return Promise.resolve(googleUser);
      }
    }
    
    // Otherwise, run a new authentication flow.
    return auth2.signIn({
      login_hint: id || ''
    });


O Google Sign-In gera um id token como prova da autenticação, que
você envia ao servidor para criar uma sessão.

Para ver outros provedores de identidade, consulte a documentação relacionada:

* [Facebook](https://developers.facebook.com/docs/facebook-login)
* [Twitter](https://dev.twitter.com/web/sign-in/implementing)
* [GitHub](https://developer.github.com/v3/oauth/)



## Fazer logout {: #sign-out }

Quando um usuário faz logout no seu site, é sua responsabilidade garantir
que o usuário não faça login automaticamente quando acessar o seu site novamente. Para desativar
o login automático, chame
[`navigator.credentials.requireUserMediation()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/requireUserMediation):

    // After a user signing out...
    navigator.credentials.requireUserMediation();

Em seguida, se `navigator.credentials.get()` for chamado com `unmediated: true`,
retornará `undefined` e o usuário não fará login. Isso só é 
lembrado pela instância atual do navegador desta origem.

Para reativar o login automático, o usuário pode escolher fazer login intencionalmente
selecionando a conta que deseja acessar no seletor de conta. Depois disso,
o usuário passa a sempre fazer login automaticamente, até fazer logout explicitamente.



{# wf_devsite_translation #}
