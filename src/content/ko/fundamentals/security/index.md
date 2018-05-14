project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 보안은 큰 주제입니다. 여기서는 HTTPS, HTTPS가 중요한 이유, 서버에 HTTPS를 배포하는 방법에 대해 알아봅시다.

{# wf_updated_on: 2016-09-09 #}
{# wf_published_on: 2015-09-08 #}

# 보안 및 ID {: .page-title }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="pgBQn_z3zRE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

보안은 큰 주제인데, 여기서는 시작하는 데 도움이 되는 몇 가지 사항에 대해 알아봅시다. 

<div class="clearfix"></div>


## 전송 중 데이터 암호화

<img src="/web/images/content-https-2x.jpg" class="attempt-right">

가장 중요한 보안 기능 중 하나이자 대부분의 최신 API와 [Progressive Web App](/web/progressive-web-apps/)에 필수적인 기능이 바로 [보안 HTTP, 즉 HTTPS](encrypt-in-transit/why-https)입니다. 민감한 통신을 처리하는 웹사이트만 HTTPS가 필요하다고 많이 오해합니다. 설령 개인정보와 보안이 사용자를 보호하기에 충분한 근거가 되지 못한다 할지라도, 서비스 워커나 Payment Request API와 같은 수많은 새로운 브라우저 기능에 HTTPS가 필요합니다.

[서버에서 HTTPS 활성화](/web/fundamentals/security/encrypt-in-transit/enable-https)

<div class="attempt-left">
  <h2>콘텐츠 보안 정책</h2>
  <p>
    콘텐츠 보안 정책(CSP)은 페이지 로드가 허용되는 리소스와
    로드 시작 위치를 세분화하여 제어할 수 있게 해주는
    풍부한 지시문을 제공합니다.<br>
    <a href="csp/">자세히 알아보기</a>
  </p>
</div>
<div class="attempt-right">
  <h2>혼합 콘텐츠 방지</h2>
  <p>
    HTTPS 구현에서 시간이 많이 걸리는 작업 중 하나는
    HTTPS와 HTTP가 혼합되어 있는 콘텐츠를 찾아서 수정하는 작업입니다. 다행히, 이 작업에 도움이 되는
    도구가 있습니다.<br>
    <a href="prevent-mixed-content/what-is-mixed-content">시작하기</a>
  </p>
</div>

<div style="clear:both"></div>

## 관련 자료

### Chrome DevTools

* [보안 문제 이해](/web/tools/chrome-devtools/security)





{# wf_devsite_translation #}
