---
title: "사이트 내 URL을 상대 URL로 만들기"
description: "HTTP뿐만 아니라 HTTPS로도 사이트를 제공하므로 프로토콜에 상관없이 사이트가 가능한 한 원활하게 작동해야 합니다."
updated_on: 2015-03-27
key-takeaways:
  - "사이트 내부 URL과 외부 URL이 프로토콜에 구속되지 않도록 해야 합니다. 즉, 상대 경로를 사용하거나 프로토콜을 제외해야 합니다(예: //example.com/something.js)"
---

<p class="intro">
  HTTP뿐만 아니라 HTTPS로도 사이트를 제공하므로 프로토콜에 상관없이 사이트가 가능한 한 원활하게 작동해야 합니다.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

하지만, HTTPS를 통해 HTTP 리소스를 포함하는
페이지를 제공하는 경우([혼합
콘텐츠](http://www.w3.org/TR/mixed-content/)) 문제가 발생합니다. 이 경우 브라우저는 사용자에게 HTTPS의 모든 기능이
손실되었다는 내용의 경고를 표시합니다.

실제로, 활성 상태의 혼합 콘텐츠(스크립트, 플러그인, CSS, iframe)의
경우 브라우저가 콘텐츠를 로드 또는 실행하지 않아
페이지가 끊어집니다.

**참고:** HTTP 페이지에 HTTPS 리소스를 포함하는 것은 괜찮습니다.

또한, 사이트 내부에서 다른 페이지에 대한 링크를 포함하는 경우
사용자가 HTTPS에서 HTTP로 다운그레이드될 수 있습니다.

이러한 문제는 페이지에 *http://* 스키마를 사용하는 정규화된 사이트 내부 URL이
포함될 때 발생합니다. 이 경우 다음과 같은 콘텐츠를

		<h1>Welcome To Example.com</h1>
		<script src="http://example.com/jquery.js"></script>
		<link rel="stylesheet" href="http://assets.example.com/style.css"/>
		<img src="http://img.example.com/logo.png"/>;
		<p>Read this nice <a href="http://example.com/2014/12/24/">new
		post on cats!</a></p>
		<p>Check out this <a href="http://foo.com/">other cool
		site.</a></p>

다음과 같이 변경해야 합니다.

		<h1>Welcome To Example.com</h1>
		<script src="//example.com/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Read this nice <a href="//example.com/2014/12/24/">new
		post on cats!</a></p>
		<p>Check out this <a href="http://foo.com/">other cool
		site.</a></p>

또는 다음과 같이 변경해야 합니다.

		<h1>Welcome To Example.com</h1>
		<script src="/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Read this nice <a href="/2014/12/24/">new
		post on cats!</a></p>
		<p>Check out this <a href="http://foo.com/">other cool
		site.</a></p>

즉, 사이트 내부 URL을 가급적 프로토콜에
상대적으로(프로토콜 배제, //example.com으로 시작) 또는 호스트에 상대적으로(/jquery.js와
같이 경로만으로 시작) 만들어야 합니다.

**참고:** 이 작업은 직접 하지 말고 스크립트를 사용하여 수행하십시오. 사이트 콘텐츠가 데이터베이스에
포함된 경우 데이터베이스의 개발 복사본에서 스크립트를 테스트할
수 있습니다. 사이트 콘텐츠가 단순한 파일인 경우 파일의 개발 복사본에서
스크립트를 테스트합니다. 변경 사항이 QA를 통과하면 평상시와 같이
운영 환경에 적용하기만 하면 됩니다. [Bram van Damme의
스크립트](https://github.com/bramus/mixed-content-scan)나 이와 유사한
스크립트를 사용하여 사이트의 혼합 콘텐츠를 검색할 수 있습니다.

**참고:** 다른 사이트의 리소스를 포함하는 것과 달리
다른 사이트에 연결하는 경우에는 해당 사이트의 작동 방식을 제어할 수 없으므로
프로토콜을 변경하지 마십시오.

**참고:** 대규모 사이트에 대한 마이그레이션 작업이 더 원활하게 진행되도록 하려면
프로토콜에 상대적인 URL을 사용하는 것이 좋습니다. 아직 HTTPS를 완전히 배포할 수 있을지 확실치 않은 경우에
사이트의 모든 하위 리소스에 대해 HTTPS를 강제로 사용하게 하면 역효과가 날 수 있습니다. 일정 기간 HTTPS가
새롭고 이상할 가능성이 크므로 HTTP 사이트도 계속해서 작동되어야
합니다. 시간이 지남에 따라 마이그레이션을 완료할 것이며
HTTPS를 락인(lock in)할 수 있습니다(아래 두 절 참조).

사이트가 타사(예: CDN, jquery.com 등)에서
제공하는 스크립트, 이미지 또는 기타 리소스를 사용하는 경우 두 가지 옵션을 사용할 수 있습니다.

* 이러한 리소스에 대해서도 프로토콜에 상대적인 URL을 사용합니다. 타사에서
 HTTPS를 지원하지 않을 경우 이를 지원하도록 요청합니다. jquery.com을 포함하여 대부분의 업체에서 이미 HTTPS를 지원하고 있습니다.
* 개발자가 제어하고 HTTP와 HTTPS를 모두 제공하는 서버에서 리소스를
제공합니다. 이 경우 사이트의 모양, 성능 및 보안을 더 효과적으로 제어할 수
 있고 타사를 따로 신뢰할 필요가 없다는
 장점이 있습니다.

HTML 페이지뿐만 아니라 스타일시트, JavaScript, 리디렉션 규칙,
&lt;link …&gt; 태그, CSP 선언에서도 사이트 내부 URL을 변경해야
한다는 점을 명심하십시오!

