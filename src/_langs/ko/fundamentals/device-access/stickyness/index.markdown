---
layout: section
title: "홈 화면에 추가"
description: "거의 모든 주요 브라우저 공급업체는 사용자가 웹 앱을 고정하거나 설치할 수 있도록 허용합니다. 이른바 '고정성'은 기본 앱의 일반적인 인수이지만 마크업을 약간 변경하여 이를 실현할 수 있습니다."
introduction: "거의 모든 주요 브라우저 공급업체는 사용자가 웹 앱을 고정하거나 설치할 수 있도록 허용합니다. 이른바 '고정성'은 기본 앱의 일반적인 인수이지만 마크업을 약간 변경하여 이를 실현할 수 있습니다."
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 1
id: stickyness
collection: device-access
authors:
  - pbakaus
priority: 1
---
{% wrap content%}

사용자에게 있어 "홈 화면에 추가" 기능은 더 강화된 북마크와 
유사하게 작동하지만, 모바일 브라우저는 앱 표시 방법에 대한 브라우저 
지침을 제공하지 않고 사용자가 홈 화면에서 웹 앱을 시작할 때 북마크할 페이지를 
즐겨찾기 또는 스크린샷하고 브라우저의
기본 UI를 표시합니다. 이제 기본 제공 동작을 향상시킬 수 있는 방법을
살펴봅시다.

Chrome 및 Safari는 운영 페이지의 `<head>`에 `<meta>` 및 `<link>`
태그를 사용하여 매우 유사한 구문을 지원하고 전반적인 기능을 비교적
간단하게 합니다.

Internet Explorer 10은 아이콘 및 알림 표시 변경과 같은 추가 
기능을 제공하는 개념인 '고정된 사이트'를 소개했으며, 친숙한 
`<meta>` 태그 스타일을 지원하면서도 구성 역할을 하는 연결된 
XML 파일을 선호합니다.

참고: Firefox API와 Firefox OS의 고유한 기능은 여기서 다루지 않습니다. 
이 문서 대신 공식 [Firefox OS 설명서](https://developer.mozilla.org/en-US/Apps/Quickstart)를 참조하십시오.

{% include modules/nextarticle.liquid %}

{% endwrap %}
