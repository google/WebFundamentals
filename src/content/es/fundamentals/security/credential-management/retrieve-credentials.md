project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-11-08 #}

# Recuperar credenciales {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Para hacer que el usuario acceda, recupera las credenciales del gestor de contraseñas
del navegador y úsalas para iniciar su sesión.

Para recuperar la credencial de un usuario, usa `navigator.credentials.get()`, que
muestra una promesa que se resuelve con un objeto
de la credencial como un argumento. El objeto de la credencial obtenido puede ser
[`PasswordCredential`](#authenticate_with_a_server) o
[`FederatedCredential`](#authenticate_with_an_identity_provider). Si no
existe información sobre la credencial, se muestra `null`.

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


###  Parámetros de `navigator.credentials.get` {: .hide-from-toc }

<table class="responsive properties">
  <tbody>
    <tr>
      <th colspan=2>Parámetros</th>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>Boolean</code><br>
        Fija en <code>true</code> para recuperar <code>PasswordCredentials</code>.
        El valor predeterminado es <code>false</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>federated</code>
      </td>
      <td>
        <code>Object</code><br>
        El objeto que acepta <code>provider</code> o <code>protocol</code> como
        claves, que tiene un conjunto de parámetros. El objeto <code>provider</code>
        acepta una matriz de strings que identifica los proveedores. Actualmente, ningún 
        navegador implementa <code>protocol</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>unmediated</code>
      </td>
      <td>
        <code>Boolean</code><br>
        Fija en <code>true</code> para evitar que se muestre la IU del selector de cuentas.
      </td>
    </tr>
  </tbody>
</table>

## Obtener una credencial

### Obtén una credencial automáticamente

Para iniciar sesión del usuario automáticamente, solicita un objeto de credencial con
`unmediated: true`, tan pronto como accede a tu sitio web, por ejemplo:

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
  <figcaption>Notificación para un usuario que inicia sesión automáticamente</figcaption>
</figure>

Esta solicitud se resuelve de inmediato con un objeto de la credencial y no mostrará
un selector de cuentas. Cuando el navegador obtiene información de la credencial,
aparece una notificación:

<div class="clearfix"></div>


### Obtén una credencial a través del selector de cuentas

<figure class="attempt-right">
  <img src="imgs/account-chooser.png">
  <figcaption>IU del selector de cuentas</figcaption>
</figure>

Si un usuario solicita mediación o tiene cuentas múltiples, usa el selector
de cuentas para permitir que el usuario inicie sesión, omitiendo el formulario normal de inicio de sesión.

Generalmente, se invoca al selector de cuentas cuando el usuario presiona el
botón "Sign-In". El usuario puede seleccionar una cuenta para iniciar sesión, por ejemplo:

<div class="clearfix"></div>


Para habilitar el selector de cuentas,
fija la propiedad `unmediated` en `false`:

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

Una vez que el usuario haya seleccionado la cuenta que quiere usar, la promesa se resuelve
con un `PasswordCredential` o un `FederatedCredential` según su
selección. Luego, [determina el tipo de credencial](#determine-credential-type)
y autentica al usuario con la credencial proporcionada.

Si el usuario cancela el selector de cuentas o si no hay credenciales almacenadas,
la promesa se resuelve con un valor `undefined`. En ese caso, recurre
a la experiencia de formulario de acceso.




## Determinar el tipo de credencial {: #determine-credential-type }

Cuando se resuelve el `navigator.credentials.get()`, se mostrará 
`undefined` o un objeto Credential. Para determinar si es un 
`PasswordCredential` o un `FederatedCredential`, simplemente mira a la propiedad del objeto
`.type`, que será `password` o
`federated`. 

Si el `.type` es `federated`, la propiedad `.provider` es una string que
representa al proveedor de identidad.

Por ejemplo:

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


En el caso de un valor `undefined`, continua con el usuario en el estado de cierre de sesión.

Se pasa un valor `undefined` cuando:

* El usuario no ha aceptado la función de inicio de sesión automática (una vez por
  instancia de navegador).
* El usuario no tiene credenciales o tiene más de dos objetos de la credencial
  almacenados en el origen.
* El usuario ha solicitado pedir una mediación del usuario con el origen.




## Autenticar al usuario


### Autenticar con un nombre de usuario y contraseña

Para autenticar al usuario con tu servidor, PUBLICA el 
`PasswordCredential` proporcionado en el servidor usando `fetch()`.

Una vez PUBLICADO, `fetch` automáticamente convierte el objeto `PasswordCredential`
en un objeto `FormData` codificado como `multipart/form-data`:

    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="id"

    chromedemojp@gmail.com
    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="password"

    testtest
    ------WebKitFormBoundaryOkstjzGAv8zab97W--

Note: No puedes usar `XMLHttpRequest` para PUBLICAR el `PasswordCredential` 
en tu servidor.

#### Parámetros de `PasswordCredential`

Un objeto obtenido `PasswordCredential` incluye los siguientes parámetros:

<table class="responsive properties">
  <tbody>
    <tr>
      <th colspan=2>Parámetros</th>
    </tr>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>String</code><br>
        String para identificar usuarios.
      </td>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>String</code><br>
        Contraseña opaca que no puedes obtener usando JavaScript.
      </td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>String</code><br>
        String del nombre de usuario.
      </td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>String</code><br>
        String de la URL de la imagen del ícono de usuario.
      </td>
    </tr>
  </tbody>
</table>

#### Cambiar parámetros

En algunos casos, tal vez sea necesario agregar datos adicionales a la
PUBLICACIÓN de autenticación.

Cambia las claves de parámetros asignando una string a `.idName` o `.passwordName`.

También puedes agregar parámetros adicionales como un token de falsificación de solicitudes entre sitios (CSRF)
asignando `.additionalData` al `FormData` y puedes anexarle 
pares clave-valor.

Una vez que obtienes el objeto de la credencial:

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

Puedes hacer algo similar asignando un objeto `URLSearchParams` en lugar de
un `FormData` a `.additionalData`. En este caso, el objeto completo de la credencial 
se codifica usando `application/x-www-form-urlencoded`.

### Autenticar con un proveedor de identidad

Para autenticar al usuario con un proveedor de identidad, simplemente usa el 
flujo de autenticación específico con el `FederatedCredential`.

Por ejemplo, si el proveedor es Google, usa la
[biblioteca JavaScript de Google Sign-In](/identity/sign-in/web/):

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


Google Sign-In genera un token de ID como una prueba de autenticación que
envías al servidor para crear una sesión.

Para proveedores de identidad adicionales, consulta la documentación respectiva:

* [Facebook](https://developers.facebook.com/docs/facebook-login)
* [Twitter](https://dev.twitter.com/web/sign-in/implementing)
* [GitHub](https://developer.github.com/v3/oauth/)



## Cerrar sesión {: #sign-out }

Cuando un usuario cierra sesión en tu sitio web, es tu responsabilidad asegurarte de
que el usuario no inicie sesión automáticamente en su próxima visita. Para desactivar
el inicio de sesión automático, llama a
[`navigator.credentials.requireUserMediation()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/requireUserMediation):

    // After a user signing out...
    navigator.credentials.requireUserMediation();

Luego, si se llama al `navigator.credentials.get()` con `unmediated: true`,
mostrará `undefined` y el usuario no iniciará sesión. Esto solo se 
recuerda para la instancia actual del navegador para este origen.

Para reanudar el inicio de sesión automático, un usuario puede elegir iniciar sesión de modo intencional, al
elegir la cuenta con la que desea iniciar sesión, desde el selector de cuentas. Luego,
se vuelve a iniciar la sesión del usuario, hasta que cierre sesión de modo explícito.



{# wf_devsite_translation #}
