---
title: "콘텐츠 보안 정책"
description: "콘텐츠 보안 정책은 현대 브라우저에서 크로스 사이트 스크립팅 공격의 영향을 줄이고, 위험요인을 최소화 할 수 있다."
updated_on: 2016-02-19
translators:
  - captainpangyo
---

<p class="intro" markdown="1">
웹의 보안 모델은 [_same origin policy_](http://en.wikipedia.org/wiki/Same_origin_policy)에 기반합니다.
`https://mybank.com`의 코드는 `https://mybank.com`의 데이터만 접근이 가능하고, `https://evil.example.com`로의 접근은 절대 허용되서는 안됩니다.
각각의 오리진은 다른 웹 사이트들로부터 격리되어야 하고, 이는 개발자들이 안전하게 개발하고 빌드할 수 있는 환경을 제공합니다.
이론적으로 이 방법은 완벽하게 보이지만, 실제로는 많은 공격자들이 시스템을 파괴할 수 있는 방법을 찾아냅니다.

예를 들어 [Cross-site scripting (XSS)](http://en.wikipedia.org/wiki/Cross-site_scripting) 공격은
의도된 컨텐츠와 malicious 코드를 이용하여 사이트를 속이는 방식으로 the same origin 정책을 우회합니다
브라우저는 페이지 보안 오리진의 일환으로 페이지에 나타나는 모든 코드들을 신뢰하기 때문에 이 것은 큰 문제가 될 수 있습니다.
[XSS Cheat Sheet](http://ha.ckers.org/xss.html)는 오래되었지만 공격자들이 malicious code를 사이트에 주입함으로써 조약을 어기는데 사용하는 cross-section 방법입니다.
만약 공격자가 성공적으로 _어떤_ 코드를 주입했다면, 거의 게임은 끝난거라고 볼 수 있습니다:
사용자의 세션 데이터가 손상되고 기밀 데이터들이 이 나쁜 공격자들에게 노출됩니다.
우리는 가능한 이러한 일이 일어나지 않도록 막아야 합니다.

이 기사는 이러한 리스크를 확연하게 줄이고 현대 브라우저에 있어서 XSS 공격들의 영향을 최소화 할 수 있는 방어법에 대해 다룹니다: Content Security Policy (CSP).
