project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-03-14 #}
{# wf_published_on: 2015-01-01 #}
{# wf_blink_components: N/A #}

# 리뷰 요청 {: .page-title }

여러분의 페이지나 사이트가 사용자에게 위험하거나
사기성 페이지나 사이트로 표시되지 않도록 Google로부터 리뷰를 요청해야 합니다.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## 필요한 사항

*   셸/터미널 명령에 대한 지식

## 수행할 작업

### 1. 사전 요구사항

리뷰를 요청하기 전에, 다음 단계를 수행했는지 확인하세요.

* Search Console에서 사이트의 소유권 확인
* 사이트에서 해커 공격을 깨끗하게 정리
* 취약성 수정
* 정리된 사이트를 온라인으로 다시 전환

### 2. 페이지가 사용 가능하고 깨끗한지 재확인

안전을 위해, Wget 또는 cURL을 사용하여 사이트(예: 해커에 의해 수정된 홈페이지 및 URL)에서 페이지를 보세요.
지금은 페이지가 깨끗할 것입니다. 페이지가 깨끗하고
사이트의 나머지 페이지에도 동일하게 적용된다고 확신하면,
이제 리뷰를 요청할 차례입니다.

참고: 페이지가 깨끗한지 확인하려면 Googlebot으로 페이지를 크롤링할 수 있어야 합니다
. `noindex` 로봇 META 태그나 지시문을 사용하여 
페이지가 로봇아웃되거나 인덱싱이 차단되지 않도록 하세요.

### 3. 리뷰 요청

리뷰를 요청하기 전에:

* **문제가 정말로 해결되었는지 확인하세요**.
문제가 있는데도 리뷰를 요청할 경우
사이트가 위험으로 플래그되는 기간만 늘어날 뿐입니다.

* **어디에서 리뷰를 요청해야 하는지를 재확인하세요**. 
리뷰 프로세스는 사이트에 발생하는 문제에 따라 특정 도구에서 실행됩니다.
아래 채널을 참조하세요.


#### A. 해킹된 사이트

*Search Console의 
[**Manual Actions report**](https://www.google.com/webmasters/tools/manual-action)
에서 해킹된 사이트 알림을 수신했습니다.*

1. 이제 일련의 정리 프로세스 단계를 거쳤으므로,
  다시 [Manual Actions](https://www.google.com/webmasters/tools/manual-action)
 보고서로 이동하여 사이트 전체 일치나 부분 일치로 문제를 
찾아낼 수 있습니다.
2. **Request a review**를 선택합니다.

    리뷰를 제출하기 위해, 사이트 정리를 위해 수행했던 작업에 대한 
세부 정보를 제공해야 합니다. 해킹된 스팸의 각 범주에 대해 
사이트를 정리했던 방법에 대한 설명을 입력할 수 있습니다 
(예: "콘텐츠 주입 해킹된 URL의 경우, 스팸 콘텐츠를 제거하고 취약성을 제거함: 
오래된 플러그인을 업데이트하는 중").


#### B. 원치 않는 소프트웨어(멀웨어 포함)

*Search Console의 
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
에서 멀웨어 또는 원치 않는 소프트웨어 알림을 수신했습니다.*

1. Search Console에서 
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
를 다시 엽니다. 이 보고서에는 이전에 본 경고와 감염된 샘플 URL이 
여전히 표시될 수도 있습니다.
2. **Request a review**를 선택합니다.

    리뷰를 제출하기 위해, 사이트에서 정책 위반을 제거하기 위해
 수행했던 작업에 대한 자세한 정보를 제공하도록 요청합니다. 예:
 "내 웹사이트에서 멀웨어를 배포하던 타사 코드를 제거하고, 
이 코드를 최신 버전의 코드로 대체했음".


*Search Console의 
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
에서는 멀웨어 또는 원치 않는 소프트웨어 알림을 수신하지 않았지만 AdWords 계정에서는 알림을 수신했습니다.*

1. [AdWords 지원 센터](https://support.google.com/adwords/contact/site_policy)를 통해 
리뷰를 요청합니다.


#### C. 피싱 또는 소셜 엔지니어링 공격

*Search Console의 
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
에서 피싱 알림을 수신했습니다.*

1. Search Console에서 
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
를 다시 엽니다. 이 보고서에는 이전에 본 경고와 감염된 샘플 URL이 
여전히 표시될 수도 있습니다.
2. **Request a review**를 선택합니다.

    리뷰를 제출하기 위해, 사이트에서 정책 위반을 제거하기 위해 
수행했던 작업에 대한 자세한 정보를 제공하도록 요청합니다. 예:
 "사용자에게 개인 정보 입력을 요청하는 페이지를 제거했음".

3. 
[google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/)에서 리뷰를 요청할 수도 있습니다.
  이 보고서는 자신의 페이지가 피싱 페이지로 잘못 플래그되었다고 
믿는 사이트 소유자를 위한 보고 도구의 역할을 할 뿐만 아니라 
경고 해제를 위해 정리된 피싱 사이트에 대해 리뷰를 시작합니다.

### 4. 리뷰를 처리되기를 기다립니다

* **스팸으로 해킹된 사이트 리뷰 처리 시간:** 스팸으로 해킹된 사이트를 리뷰하는 경우 
처리 시간이 최대 몇 주까지 필요할 수도 있습니다. 스팸 리뷰는 
수동 조사나 해킹된 페이지에 대한 전체 재처리가 
포함될 수 있기 때문입니다. 리뷰가 승인되면 Security Issues 보고서에 
해킹된 범주 유형이나 해킹된 URL 사례가 더 이상 나타나지 않습니다.
* **멀웨어 리뷰 처리 시간:** 멀웨어에 감염된 사이트의 리뷰는 
처리하는 데 며칠이 필요합니다. 리뷰가 완료되면 
Search Console의 **Messages** 내에서 응답을 사용할 수 있습니다.
* **피싱 리뷰 처리 시간:** 피싱 리뷰는 처리하는 데 
약 하루가 걸립니다. 성공한 경우, 사용자에게 보이는 피싱 경고가 사라지고 
페이지가 검색 결과에 다시 나타날 수도 있습니다.

Google이 사이트가 깨끗한 것으로 확인하면, 
브라우저와 검색 결과에서 72시간 내에 경고가 사라질 것입니다.

Google이 아직 문제가 해결되지 않은 것으로 판단한 경우, 
향후 조사를 지원하기 위해 Search Console의 Security Issues 보고서에 
더 많은 감염된 샘플 URL이 표시될 수 있습니다. 멀웨어, 피싱 또는 
스팸으로 해킹된 사이트 경고는 사용자 보호를 위한 주의 조치로 검색 결과 및/또는 브라우저에 
남아있습니다.

### 최종 단계

* **요청이 승인되면** 사이트가 예상대로 작동하는지 확인하세요.
  페이지가 올바로 로드되고 링크가 클릭되는지 확인하세요. 사이트를 안전하게 유지하기 위해 
모든 사이트 소유자는 [사이트 정리 및 유지 관리](clean_site)에서 생성된 
유지 관리 및 보안 계획을 구현하도록 권장합니다.

    자세한 내용은 
[StopBadware](https://www.stopbadware.org)의 다음 리소스를 참조하세요.

      * [악성 코드 방지: 기본 정보](https://www.stopbadware.org/prevent-badware-basics)
      * [추가 리소스: 해킹된 사이트](https://www.stopbadware.org/hacked-sites-resources)

* **요청이 승인되지 않은 경우,** 사이트에서 
[멀웨어](hacked_with_malware) 또는 [스팸](hacked_with_spam)을 다시 검사하거나, 
해커가 생성한 새 파일이나 변경 사항을 다시 검사하십시오. 또는 
[지원 팀의 전문가](support_team)로부터 
추가적인 도움을 요청할 수도 있습니다.
