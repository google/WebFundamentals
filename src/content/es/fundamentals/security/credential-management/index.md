project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-11-08 #}

# Credential Management API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

La [Credential Management API](https://www.w3.org/TR/credential-management/)
es una API para navegadores basada en estándares que ofrece una interfaz programática
entre el sitio y el navegador para un acceso fluido, en diferentes dispositivos, y
elimina las trabas en tus flujos de acceso.

<div class="attempt-right">
  <figure>
    <video src="animations/credential-management-smaller.mov" style="max-height: 400px;" autoplay muted loop controls></video>
    <figcaption>Flujo de acceso del usuario</figcaption>
  </figure>
</div>

La Credential Management API:

* **Simplifica el flujo de acceso**. Los usuarios pueden volver a acceder automáticamente en un
sitio, incluso si su sesión caducó.
* **Permite el acceso en un toque con selector de cuentas**. Se muestra un selector de cuentas nativo
que elimina al formulario de acceso.
* **Almacena credenciales**. Puede almacenar una combinación de nombre de usuario y contraseña
 o incluso detalles de cuentas federadas.

¿Quieres verlo en acción? Prueba la
[demostración de la Credential Management API](https://credential-management-sample.appspot.com)
y observa el
[código](https://github.com/GoogleChrome/credential-management-sample).

<div class="clearfix"></div>


## Pasos para la implementación de Credential Management

Mientras que existen muchas formas de integrar la Credential Management
API con éxito, y las características específicas de una integración dependen de la estructura y la experiencia
de usuario del sitio, los sitios que usan este flujo tienen las siguientes
ventajas para la experiencia de usuario:

* Los usuarios existentes de tu servicio que tienen una sola credencial guardada en el
navegador acceden de inmediato, y se los redirecciona a la
página de sesión iniciada apenas termina la autenticación.
* Los usuarios que tienen varias credenciales guardadas en el navegador o que han inhabilitado el acceso
automático necesitan responder a un diálogo antes de acceder a la página de sesión iniciada
del sitio.
* Cuando los usuarios cierran sesión, el sitio web se asegura de que no vuelvan a acceder
automáticamente.

Key Point: El uso de la Credential Management API requiere que la página se encuentre en un servidor
de origen seguro.

### Recupera las credenciales del usuario y haz que el usuario acceda

Para hacer que el usuario acceda, recupera las credenciales del gestor de contraseñas
del navegador y úsalas para iniciar su sesión.

Por ejemplo:

1. Cuando un usuario llega a tu sitio y no accede,
 llama a `navigator.credential.get()`
2. Usa las credenciales recuperadas para hacer que el usuario acceda.
3. Actualiza la IU para indicar que el usuario accedió.

Obtén más información en
[Recuperar credenciales](/web/fundamentals/security/credential-management/retrieve-credentials).

### Guarda o actualiza las credenciales de usuario

Si el usuario accedió con un nombre de usuario y contraseña:

1. Luego de que el usuario acceda correctamente, cree una cuenta o cambie una
contraseña, crea `PasswordCredential` con el ID de usuario y
la contraseña.
2. Guarda el objeto de las credenciales usando `navigator.credentials.store()`.


Si el usuario accedió con un proveedor de identidad federada, como Google
Sign-In, Facebook, GitHub, etc.:

1. Luego de que el usuario acceda correctamente, cree una cuenta o cambie una
contraseña, crea `FederatedCredential` con la dirección de correo electrónico del usuario como
 la ID y especifica un proveedor de identidad con `.provider`
2. Guarda el objeto de las credenciales usando `navigator.credentials.store()`.

Obtén más información en
[Almacenar credenciales](/web/fundamentals/security/credential-management/store-credentials).

### Cierra sesión

Cuando el usuario cierre sesión, llama a `navigator.credentials.requireUserMediation()`
para evitar que el usuario vuelva a acceder automáticamente.

Inhabilitar el acceso automático también permite a los usuarios cambiar fácilmente entre cuentas;
por ejemplo, entre cuentas de trabajo y personales, o entre distintas cuentas en
dispositivos compartidos, sin la necesidad de ingresar nuevamente su información de acceso.

Obtén más información en
[Cerrar sesión](/web/fundamentals/security/credential-management/retrieve-credentials#sign-out).


## Referencias adicionales

[Credential Management API en MDN](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API)


{# wf_devsite_translation #}
