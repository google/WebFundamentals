project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Security 패널을 사용하여 사이트 내 모든 리소스가 HTTPS로 보호되도록 보장합니다.

{# wf_updated_on: 2016-03-09 #}
{# wf_published_on: 2015-12-21 #}

# 보안 문제 이해 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

HTTPS는 웹사이트와 해당 웹사이트를 믿고 개인 정보를 제공하는
 사람들 모두를 위해 [중요한 보안 및 데이터 무결성][why-https]을 제공합니다.
 Chrome DevTools의 Security 패널을 사용하면
보안 문제를 디버그하고 웹사이트에
HTTPS를 적절히 구현했는지 확인할 수 있습니다.


### TL;DR {: .hide-from-toc }
- Security Overview를 사용하여 현재 페이지가 보안 페이지인지 비보안 페이지인지 즉시 알아볼 수 있습니다.
- 각각의 출처를 검사하여 연결 및 인증서 세부정보를 보거나(보안 출처의 경우) 정확히 어느 요청이 보호되지 않는지 알아봅니다(비보안 출처의 경우).


## Security Overview

한 페이지의 전반적인 보안 상태를 보려면, DevTools를 열어
Security 패널로 이동합니다. 

가장 먼저 표시되는 것이 Security Overview입니다. 
Security Overview를 간략히 훑어보면 페이지의 보안 여부를 알 수 있습니다. 보안 페이지에는
다음과 같은 메시지가 표시됩니다. `This page is secure (valid HTTPS).`

![보안 개요, 보안 페이지](images/overview-secure.png)

여기에서 **View certificate**를 클릭하면
[기본 출처][same-origin-policy]의 서버 인증서를 볼 수 있습니다. 

![인증서 보기](images/view-certificate.png)

비보안 페이지에는 다음과 같은 메시지가 표시됩니다. `This page is not secure.`

Security 패널은 비보안 페이지를 두 가지 유형으로 구분합니다.
요청한 페이지가 HTTP를 통해 제공되는 경우, 기본 출처는
비보안으로 플래그가 지정됩니다. 

![보안 개요, 비보안 기본 출처](images/overview-non-secure.png)

요청한 페이지가 HTTPS를 통해 검색되지만 이후 계속해서 HTTP를 사용하여
다른 출처에서 콘텐츠를 검색하는 경우, 해당 페이지는 여전히 비보안으로
플래그가 지정됩니다. 이것을 일명 [혼합 콘텐츠][mixed-content] 
페이지라고 합니다. 혼합 콘텐츠 페이지는 일부분만 보호될 뿐입니다. 왜냐하면 HTTP
콘텐츠는 스니퍼에 액세스할 수 있고 중간자 공격에 취약하기 때문입니다. 

![보안 개요, 혼합 콘텐츠](images/overview-mixed.png)

Network
패널의 필터를 적용한 보기를 열려면 **View request in Network 패널**을 클릭하여 정확히 어느 요청이 HTTP를 통해 제공되는지 알아보세요. 여기에는
모든 출처에서 가져온 보호되지 않는 요청이 모두 표시됩니다. 

![네트워크 패널, 비보안 리소스, 모든 출처](images/network-all.png)

## 출처 검사

왼쪽 패널을 사용하여 각각의 보안 출처 또는 비보안 출처를 검사할 수 있습니다. 

보안 출처를 클릭하면 해당 출처의 연결 상태와 인증서 세부정보를
볼 수 있습니다.

![출처 세부정보, 보안](images/origin-detail-secure.png)

비보안 출처를 클릭하면 Security 패널에 Network 패널의 필터가 적용된 뷰로 연결되는 링크가 제공됩니다. 

![출처 세부정보, 비보안](images/origin-detail-non-secure.png)

링크를 클릭하면 해당 출처에서 정확히 어느 요청이
HTTP를 통해 제공된 것인지 확인할 수 있습니다. 

![네트워크 패널, 비보안 리소스, 하나의 출처](images/network-one.png)





[mixed-content]: https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content
[same-origin-policy]: https://en.wikipedia.org/wiki/Same-origin_policy
[why-https]: https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https


{# wf_devsite_translation #}
