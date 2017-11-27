project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Polymer Starter Kit.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-09-12 #}

# Polymer Starter Kit {: .page-title }

[Polymer Starter Kit 다운로드](https://github.com/polymerelements/polymer-starter-kit/releases){: .button .button-primary }

## Polymer Starter Kit란 무엇인가요?

[Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit){: .external }
는 창 기반 레이아웃을 사용하여 앱을 빌드하는 시작점입니다. 레이아웃은
`app-layout` 요소에서 제공됩니다.

이 템플릿은 `polymer-cli` 툴체인과 함께
'PRPL 패턴'을 사용합니다. 이 패턴을 사용하면 사용자가 요청한 최초 경로에서 콘텐츠를 신속히 처음으로 전달하고 콘텐츠와 상호작용할 수 있으며,
앱에 필요한 나머지 구성 요소를 사전에 포착하고
사용자가 앱을 내비게이션하는 동안 필요에 따라 점진적으로 로드하여 이후의 내비게이션 속도를 높여줍니다.


PRPL 패턴 요약:

* 최초 경로에 필요한 **푸시** 구성 요소
* 최초 경로를 최대한 빨리 **렌더링**
* 나머지 경로에 대해 구성 요소를 **사전 캐시**
* 필요에 따라 다음 경로를 **서서히 로드**하고 점진적으로 업그레이드

### Polymer Starter Kit v1에서 마이그레이션이란?

[PSK2에서 변경된 내용과 마이그레이션 방법을 다루는 블로그 게시물을 참조하세요!](https://www.polymer-project.org/1.0/blog/2016-08-18-polymer-starter-kit-or-polymer-cli.html){: .external }

## 설정

### 사전 요구사항

[polymer-cli](https://github.com/Polymer/polymer-cli){: .external } 설치:

    npm install -g polymer-cli

### 템플릿에서 프로젝트 초기화

    mkdir my-app
    cd my-app
    polymer init starter-kit

### 개발 서버 시작

이 명령은 `http://localhost:8080`에서 앱을 실행하고 앱의 기본 URL
경로를 제공합니다.

    polymer serve --open


### 빌드

이 명령은 애플리케이션 종속성에 대해 HTML, CSS 및 JS를 최소화하고
코드로 service-worker.js 파일을 생성하여
`polymer.json`에 지정된 진입점과 프래그먼트를 기반으로 종속성을 사전 캐시합니다.
최소화된 파일은 `build/unbundled` 폴더로 출력되고,
HTTP/2+Push 호환 서버에서 실행하기에 적합합니다.

또한, 이 명령은
프레그먼트 번들링을 사용하여 대체 `build/bundled` 폴더를 생성합니다. 이 폴더는
H2/push 비호환 서버나 H2/Push를 지원하지 않는 클라이언트에서 실행하기에 적합합니다.

    polymer build

### 빌드 미리보기

이 명령은 `http://localhost:8080`에서
번들되지 않은 상태의 최소화된 앱 버전을 푸시 호환 서버에서 실행되는 것처럼 실행합니다.

    polymer serve build/unbundled

이 명령은 `http://localhost:8080`에서
프래그먼트 번들링을 사용하여 생성된 앱의 최소화된 버전을 실행합니다.

    polymer serve build/bundled

### 테스트 실행

이 명령은 현재 컴퓨터에 설치된 브라우저에 대해
[Web Component Tester](https://github.com/Polymer/web-component-tester){: .external }를
실행합니다.

    polymer test

### 새 뷰 추가

경로 등 필요에 따라 로드되는 뷰를 여러 개 추가하거나
애플리케이션의 중요하지 않은 섹션을 점진적으로 렌더링해서
앱을 확장할 수 있습니다.  필요에 따라 로드되는 각각의 프래그먼트는
포함된 `polymer.json` 파일의 `fragments` 목록에 추가되어야 합니다.  그에 따라 이러한 구성 요소와
종속성이 사전 캐시된 구성 요소에
추가됩니다(또한 폴백 `bundled` 빌드에 번들이 생성됨).

## 다음 단계

[시작 가이드](https://www.polymer-project.org/1.0/start/toolbox/set-up){: .external }를 참조하세요.

## 자세히 알아보기

자세한 내용을 알아보거나, 코드를 확인하거나, 문제를 제출하거나, 참여를 원한다면
Git 저장소[https://github.com/polymerelements/polymer-starter-kit](https://github.com/polymerelements/polymer-starter-kit){: .external }를 참조하세요.


{# wf_devsite_translation #}
