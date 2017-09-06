project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Inspeccionar y borrar cookies desde el panel de la App.

{# wf_updated_on: 2016-07-28 #}
{# wf_published_on: 2015-04-13 #}

# Inspeccionar y borrar cookies {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Inspecciona y borrar cookies desde el panel de la
<strong>App</strong>.

![panel de cookies](imgs/cookies.png)


### TL;DR {: .hide-from-toc }
- Ve información detallada sobre una cookie, como su nombre, valor, dominio, tamaño y mucho más.
- Borra una única cookie, las cookies de un dominio seleccionado o todas las cookies de todos los dominios.


## Información general {:#cookies}

Utiliza el panel **Cookie** para ver y borrar cookies. No puedes modificar valores de
cookies.

![panel de cookies][cookies]

Las cookies se enumeran por dominio. Esto incluye el documento principal, al igual que todos los
marcos anidados. Si se selecciona uno de estos "grupos de marcos", se muestran todas las cookies de
todos los recursos de todos los marcos de ese grupo. Debes conocer dos consecuencias
de este agrupamiento:

* Cookies de dominios diferentes pueden aparecer en el mismo grupo de marcos.
* La misma cookie puede aparecer en varios grupos de cuadros.

[cookies]: /web/tools/chrome-devtools/manage-data/imgs/cookies.png

## Campos {:#fields}

Se proporcionan los siguientes campos para cada cookie:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Campo de la cookie y descripción</th>
    </tr>
  </thead>
  <tbody>
        <tr>
      <td data-th="Cookie Field">Name</td>
      <td data-th="Description">Nombre de la cookie.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Value</td>
      <td data-th="Description">Valor de la cookie.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Dominio</td>
      <td data-th="Description">Dominio de la cookie.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Path</td>
      <td data-th="Description">Ruta de acceso de la cookie.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Vence / antigüedad máxima</td>
      <td data-th="Description">Hora de vencimiento o antigüedad máxima de la cookie. Respecto de las cookies de sesión, este campo siempre es "Session".</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Size</td>
      <td data-th="Description">El tamaño en bytes de las cookies.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">HTTP</td>
      <td data-th="Description">Si está presente, indica que las cookies solo deben usarse en HTTP y no se permite la modificación de JavaScript.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Seguro</td>
      <td data-th="Description">Si está presente, indica que la comunicación para esta cookie debe realizarse mediante una transmisión encriptada.</td>
    </tr>
  </tbody>
</table>

## Borrar cookies {:#delete}

Existen algunas formas de borrar cookies:

* Para borrar solo una cookie, selecciónala y presiona el botón **delete**
  (![botón delete][delete]{:.inline}).
* Para borrar todas las
  cookies del grupo de marcos especificado, presiona el botón**clear** (![botón clear][cos]{:.inline}).
* Haz clic en el botón secundario en el valor **Domain** de una cookie y selecciona  **Clear all
  from "..."** (donde **"..."** es el nombre del dominio) para borrar todas las cookies
  de ese dominio.

[delete]: imgs/delete.png
[cos]: imgs/clear-object-store.png


{# wf_devsite_translation #}
