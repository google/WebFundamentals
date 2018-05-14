project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-11-08 #}

# Almacenar credenciales {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Es sencillo almacenar y actualizar las credenciales del usuario con la API 
`navigator.credentials.store()`.


## Almacenar la credencial de un usuario

Después de que un usuario se registra, inicia sesión o cambia la contraseña con éxito, se almacena
o se actualiza la credencial del usuario.

### Almacenar los detalles del nombre de usuario y de la contraseña

Key Point: Crea un objeto nuevo `PasswordCredential` y guárdalo con 
`navigator.credentials.store()`.

Una vez que el usuario inicia sesión y tú verificas sus credenciales, crea
un objeto nuevo [`PasswordCredential`](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential)
y pásalo a `navigator.credentials.store()` para guardarlo.

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
  <figcaption>Notificación para un usuario que inicia sesión automáticamente</figcaption>
</figure>

Cuando el navegador de Chrome obtiene información de la credencial,
aparece una notificación que te pide almacenar una credencial
(o proveedor de federación).

<div class="clearfix"></div>

### Almacenar un nombre de usuario y contraseña desde un formulario

Key Point: Usa un formulario anotado correctamente para crear fácilmente un objeto nuevo `PasswordCredential`
y guárdalo con `navigator.credentials.store()`.

Además de crear manualmente la `PasswordCredential`, puedes simplemente
pasar un elemento [anotado correctamente](https://html.spec.whatwg.org/multipage/forms.html#autofill)
`form` a `PasswordCredential`.

Por ejemplo:

    <form id="form" method="post">
      <input type="text" name="id" autocomplete="username" />
      <input type="password" name="password" autocomplete="current-password" />
      <input type="hidden" name="csrf_token" value="*****" />
    </form>

Luego crea un objeto nuevo `PasswordCredential` pasando una referencia al
elemento del formulario:

    var form = document.querySelector('#form');
    var cred = new PasswordCredential(form);
    // Store it
    navigator.credentials.store(cred)
    .then(function() {
      // continuation
    });

Se agregará automáticamente cualquier campo del formulario adicional
`PasswordCredential` como parte del parámetro `.additionalData`.


## Almacenar una credencial para una cuenta federada

Key Point: Crea un objeto nuevo `FederatedCredential` y guárdalo con 
`navigator.credentials.store()`.


Para almacenar detalles de la cuenta federada, crea una instancia de un objeto nuevo 
[`FederatedCredential`](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential),
con el identificador del usuario y el del proveedor. Luego llama a 
`navigator.credentials.store()` para almacenar la credencial.

Por ejemplo:

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
      <th colspan=2>Parámetros</th>
    </tr>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>string</code><br>
        Identificador de usuario cuando se invoca el flujo de autenticación específico del proveedor de identidad,
         generalmente como un valor para el <code>login_hint</code>
        en OAuth.
      </td>
    </tr>
    <tr>
      <td>
        <code>provider</code>
      </td>
      <td>
        <code>string</code><br>
        La serialización ASCII del origen que usa el proveedor para acceder.
        Por ejemplo, Facebook estará representado por 
        <code>https://www.facebook.com</code> y Google por 
        <code>https://accounts.google.com</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>string</code> (opcional)<br>
        Obtenida del proveedor de identidad.
      </td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>string</code> (opcional)<br>
        Obtenida del proveedor de identidad.
      </td>
    </tr>
  </tbody>
</table>



{# wf_devsite_translation #}
