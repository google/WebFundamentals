project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Web Starter Kit는 다중 기기 개발을 위한 상용 도구입니다.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-09-12 #}

# Web Starter Kit {: .page-title }

[Web Starter Kit(베타) 다운로드](https://github.com/google/web-starter-kit/releases/latest){: .button .button-primary }

## Web Starter Kit란 무엇인가요?

[Web Starter Kit](https://github.com/google/web-starter-kit)는 웹 개발을 위한 독보적인 상용 도구입니다. 여러 기기에 걸친 뛰어난 환경을 구축하기 위한 [성능 지향적인](#web-performance) 도구입니다. Google의 [웹 기본 사항](/web/fundamentals/)에서 소개한 모범 사례에 따라 생산성을 유지하도록 도와줍니다. 업계 전문가와 초보자 누구나 이용할 수 있는 확실한 출발점입니다.

### 기능

| 기능                                | 요약                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 반응형 상용구 | 다중 화면 웹에 최적화된 반응형 상용구입니다. [Material Design Lite](http://getmdl.io)로 구동됩니다.  이대로 사용하거나 [basic.html](https://github.com/google/web-starter-kit/blob/master/app/basic.html)을 통해 기존의 제약을 벗어난 상태로 사용할 수 있습니다.                          |
| Sass 지원                           | 변수, mixins 등의 지원으로 [Sass](http://sass-lang.com/)를 CSS로 쉽게 컴파일할 수 있습니다. (프로덕션용 `gulp serve` 또는 `gulp` 실행)                                                                                                      |
| 성능 최적화               | 자바스크립트, CSS, HTML 및 이미지를 최소화하고 연결하여 페이지를 간결하게 유지합니다. (`gulp`를 실행하여 `/dist`에 최적화된 프로젝트 버전 생성)                                                                                                |
| 코드 린팅               | 자바스크립트에서 패턴을 식별하고 보고하기 위한 플러그 방식의 린터 도구인 [ESLint](http://eslint.org)를 사용하여 자바스크립트 코드 린팅을 수행합니다. Web Starter Kit는 ESLint를 [eslint-config-google](https://github.com/google/eslint-config-google)과 함께 사용하며, Google 자바스크립트 스타일 가이드를 준수합니다.                                                                                                |
| Babel 6.0을 통한 ES2015 지원                   | [Babel](https://babeljs.io/){: .external }을 사용하여 ES2015를 선택적으로 지원합니다. ES2015 지원을 활성화하려면 [.babelrc](https://github.com/google/web-starter-kit/blob/master/.babelrc) 파일에서 `"only": "gulpfile.babel.js",` 줄을 삭제하세요. ES2015 소스 코드는 폭넓은 브라우저 지원을 위해 자동으로 ES5로 트랜스파일됩니다.  |
| 내장 HTTP 서버                   | 개발과 반복 중에 사이트를 로컬에서 미리 볼 수 있는 내장 서버                                                                                                                                                                            |
| 실시간 브라우저 새로고침| 확장 프로그램이 없더라도 수정 내용이 있으면 언제든 실시간으로 브라우저를 새로 고칩니다. (`gulp serve` 실행 및 파일 편집)                                                                                                                           |
| 기기 간 동기화           | 프로젝트를 편집하는 동안 여러 기기에서 클릭, 스크롤, 양식, 실시간 새로고침을 동기화합니다. [BrowserSync](http://browsersync.io)로 구동됩니다. (`gulp serve`를 실행하고 네트워크의 다른 기기에서 제공되는 IP 열기)                       |
| 오프라인 지원                     | [서비스 워커](/web/fundamentals/getting-started/primers/service-workers) [pre-caching](https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js#L226)에서 제작되었기 때문에 `dist`를 HTTPS 도메인에 배포하는 사이트가 오프라인 지원을 받을 수 있습니다. 이는 [sw-precache](https://github.com/GoogleChrome/sw-precache/)를 통해 가능합니다.                                                                                                                                              |
| PageSpeed Insights                     | 모바일 및 데스크톱에서 사이트가 얼마나 잘 실행되는지 보여주는 웹 성능 지표(`gulp pagespeed` 실행)                                                                                                                                                    |

## Quickstart

키트를 [다운로드](https://github.com/google/web-starter-kit/releases/latest)하거나
(https://github.com/google/web-starter-kit) 저장소를 복사하여
`app` 디렉토리에 있는 내용을 바탕으로 빌드합니다.

다음 두 가지 HTML 시작점을 선택할 수 있습니다.

- `index.html` - 기본 시작점으로, 머티리얼 디자인 레이아웃이 포함되어 있습니다.
- `basic.html` - 레이아웃이 없지만 최소한의 모바일 모범 사례가 포함되어 있습니다.

[설치 문서](https://github.com/google/web-starter-kit/blob/master/docs/install.md)를 참조하여 WSK를 실행할 수 있는 환경인지 확인하세요.
WSK를 실행할 수 있는 시스템으로 확인되면 이용 가능한 [명령](https://github.com/google/web-starter-kit/blob/master/docs/commands.md)을 참조해서 시작하세요.

## 웹 성능

Web Starter Kit는 바로 사용할 수 있는 고성능 시작점을 제공하기 위해 노력하고 있습니다. 기본 템플릿용 중간 웹 페이지 테스트 [점수](http://www.webpagetest.org/result/151201_VW_XYC/){: .external }는 [Speed Index](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index)가 최대 1,100(1,000이 이상적)입니다. 서비스 워커 사전 캐싱 덕분에 재방문 Speed Index는 최대 550입니다. 

## 브라우저 지원

현재 공식적으로 다음 브라우저의 두 가지 최신 버전을 지원합니다.

* Chrome
* Edge
* Firefox
* Safari
* Opera
* Internet Explorer 9+

이는 최신 버전이 아닌 브라우저에서 Web Starter Kit를 사용할 수 없다는 뜻이 아니라, 위 브라우저에서 레이아웃이 잘 작동하도록 하는 데 초점을 맞추었다는 의미입니다.

## 문제 해결

도구를 설치하거나 실행하면서 문제가 발생할 경우 [문제 해결](https://github.com/google/web-starter-kit/wiki/Troubleshooting) 가이드를 참조하고 [문제](https://github.com/google/web-starter-kit/issues)를 개설하세요. 이러한 문제를 어떻게 해결할 수 있을지 기꺼이 함께 논의할 것입니다.

## 상용구 전용 옵션

Google의 툴링을 사용하고 싶지 않다면 프로젝트에서 `package.json`, `gulpfile.babel.js`, `.jshintrc` 및 `.travis.yml` 파일을 삭제하세요. 이제 다른 빌드 시스템에서 안전하게 상용구를 사용할 수 있습니다. 원한다면 빌드 시스템을 아예 사용하지 않아도 됩니다.

## 문서 및 레시피

* [파일 부록](https://github.com/google/web-starter-kit/blob/master/docs/file-appendix.md) - 여기의 여러 가지 파일은 어떤 역할을 하나요?
* [머티리얼 디자인 라이트의 Sass 사용](https://github.com/google/web-starter-kit/blob/master/docs/mdl-sass.md) - MDL의 Sass를 WSK와 함께 사용하는 방법
* [개발 가이드](https://github.com/google/web-starter-kit/blob/master/docs/deploy.md) - Firebase, Google App Engine 및 기타 서비스에 이용할 수 있습니다.
* [Gulp 레시피](https://github.com/gulpjs/gulp/tree/master/docs/recipes) - 공식 Gulp 레시피 디렉토리에는 프로젝트에 추가할 수 있는 다양한 워크플로의 종합 가이드 목록이 포함되어 있습니다.

## 영감

Web Starter Kit는 [모바일 HTML5 상용구](https://html5boilerplate.com/mobile/){: .external }와 Yeoman의 [generator-gulp-webapp](https://github.com/yeoman/generator-webapp)에서 영감을 얻었고, 개발 중에 두 프로젝트에 기여했던 사람들에게서 조언을 받았습니다. [FAQ](https://github.com/google/web-starter-kit/wiki/FAQ)에서는 이 프로젝트에 대해 자주 묻는 질문에 대한 답변을 제공합니다.


## 자세히 알아보기

자세한 내용을 알아보거나, 코드를 확인하거나, 문제를 보고하거나, 참여를 원한다면
Git 저장소[https://github.com/google/web-starter-kit](https://github.com/google/web-starter-kit)를 참조하세요.


{# wf_devsite_translation #}
