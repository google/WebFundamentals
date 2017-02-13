project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 보안은 범위가 넓은 주제입니다. HTTPS 가 왜 중요한지, 그리고 당신의 서버에 어떻게 HTTPS 를 디플로이 할 수 있는지 배워보세요.
Security is a big topic, learn about HTTPS, why it's important and how you can deploy it to your servers.

{# wf_updated_on: 2016-09-09 #}
{# wf_published_on: 2015-09-08 #}

# 보안과 신원 {: .page-title }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="pgBQn_z3zRE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

보안은 큰 주제입니다. 이와 관련해서 당신이 시작하기 좋은 몇 가지가 아래에 있습니다.

<div class="clearfix"></div>


## 전송할 데이터 암호화 하기

<img src="/web/images/content-https-2x.jpg" class="attempt-right">

가장 중요한 보안 기술 중 한가지 이자, 다수의 최신 API 와 [프로그레시브 웹 앱](/web/progressive-web-apps/) 을 사용하기 위해 필요한 보안 기술은
[Secure HTTP 또는 HTTPS](encrypt-in-transit/why-https) 입니다. HTTPS 에 대한 흔한 오해 중 한 가지는 민감한 정보를 다루는 사이트만 HTTPS 를 필요로 한다고 생각하는 점입니다.
만약 개인정보보호와 보안이 사용자 정보를 보호하기 충분하지 않으면, 서비스 워커와 Payment Request API 등의 대다수의 최신 브라우저 기능이 HTTPS 통신을 요구할 것입니다.

[서버에 HTTPS 활성화 하기](/web/fundamentals/security/encrypt-in-transit/enable-https)

<div class="attempt-left">
  <h2>Content Security Policy</h2>
  <p>
    콘텐츠 보안 정책 또는 CSP 는 페이지가 로딩할 수 있는 리소스나 리소스가 로딩되는 페이지의 제어를 갖는 강력한 directives 를 제공합니다.
    <br>
    <a href="csp/">Learn More</a>
  </p>
</div>
<div class="attempt-right">
  <h2>Prevent Mixed Content</h2>
  <p>
    HTTPS 구현에서 가장 시간 소모적인 작업 중 하나는 HTTPS 와 HTTP 를 혼용한 컨텐츠를 찾아 고치는 일입니다.
    다행히 이와 관련하여 도움을 줄 수 있는 툴들이 있습니다.
    <br>
    <a href="prevent-mixed-content/what-is-mixed-content">Get Started</a>
  </p>
</div>

<div style="clear:both"></div>

## 관련된 리소스들

### 크롬 개발자 도구

* [보안 이슈를 이해하기](/web/tools/chrome-devtools/security)


Translated By:
{% include "web/_shared/contributors/captainpangyo.html" %}
