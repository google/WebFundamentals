project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-11-08 #}
{# wf_published_on: 2016-11-08 #}

# Armazenar credenciais {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Armazenar e atualizar as credenciais do usuário fica fácil com a 
`navigator.credentials.store()` API.


## Armazenar a credencial de um usuário

Depois que um usuário fizer login com sucesso ou alterar a senha, armazene
ou atualize a credencial do usuário.

### Armazenar nome de usuário e senha

Ponto-chave: Crie um novo objeto `PasswordCredential` e salve-o com 
`navigator.credentials.store()`.

Quando o usuário fizer login e você tiver verificado suas credenciais, crie
um novo objeto [`PasswordCredential`](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential)
e passe-o a `navigator.credentials.store()` para salvá-lo.

    // After a successful sign-in, sign-up or password change,
    // Instantiate a `PasswordCredential` object
    var c = new PasswordCredential({
      id:       id,
      password: password,
      name:     name,
      iconrURL: iconUrl
    });

    // Store the credential
    navigator.credentials.store(c)
    .then(function() {
      // done
    });


<figure class="attempt-right">
  <img src="imgs/store-credential.png">
  <figcaption>Notificação para usuário de login automático</figcaption>
</figure>

Quando o navegador Chrome obtém as informações de credencial,
uma notificação que solicita o armazenamento da credencial
(ou do provedor universal) é exibida.

<div class="clearfix"></div>

### Armazenar nome de usuário e senha a partir de um formulário

Ponto-chave: Use um formulário bem comentado para criar um novo objeto `PasswordCredential`
e salvá-lo com `navigator.credentials.store()`.

Além de criar a `PasswordCredential` manualmente, você pode simplesmente
passar um elemento `form` [bem comentado](https://html.spec.whatwg.org/multipage/forms.html#autofill)
a `PasswordCredential`.

Por exemplo:

    <form id="form" method="post">
      <input type="text" name="id" autocomplete="username" />
      <input type="password" name="password" autocomplete="current-password" />
      <input type="hidden" name="csrf_token" value="*****" />
    </form>

Em seguida, crie um novo objeto `PasswordCredential` passando uma referência ao elemento
"form":

    var form = document.querySelector('#form');
    var cred = new PasswordCredential(form);
    // Store it
    navigator.credentials.store(cred)
    .then(function() {
      // continuation
    });

Todos os campos adicionais do formulário serão adicionados ao
`PasswordCredential` como parte do parâmetro `.additionalData`.


## Armazenar uma credencial para uma conta universal

Ponto-chave: Crie um novo objeto `FederatedCredential` e salve-o com 
`navigator.credentials.store()`.


Para armazenar dados de conta universal, instancie um novo objeto 
[`FederatedCredential`](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential)
com o identificador do usuário e o do provedor. Em seguida, chame 
`navigator.credentials.store()` para armazenar a credencial.

Por exemplo:

    // After a successful federation, instantiate a FederatedCredential
    var cred = new FederatedCredential({
      id:       id,                           // id in IdP
      provider: 'https://account.google.com', // A string representing IdP
      name:     name,                         // name in IdP
      iconURL:  iconUrl                       // Profile image url
    });

    // Store it
    navigator.credentials.store(cred)
    .then(function() {
      // continuation
    });

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
        <code>string</code><br>
        Identificador do usuário ao invocar o fluxo de autenticação
        específico do provedor de identidade, normalmente como um valor de <code>login_hint</code>
        no OAuth.
      </td>
    </tr>
    <tr>
      <td>
        <code>provider</code>
      </td>
      <td>
        <code>string</code><br>
        A serialização em ASCII da origem que o provedor usa para fazer login.
        Por exemplo, o Facebook seria representado por 
        <code>https://www.facebook.com</code> e o Google, por 
        <code>https://accounts.google.com</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>string</code> (opcional)<br>
        Fornecido pelo provedor de identidade.
      </td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>string</code> (opcional)<br>
        Fornecido pelo provedor de identidade.
      </td>
    </tr>
  </tbody>
</table>



{# wf_devsite_translation #}
