project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Web Starter Kit is boilerplate and tooling for multi-device development

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-09-12 #}

# Web Starter Kit {: .page-title }

[Download Web Starter Kit (beta)](https://github.com/google/web-starter-kit/releases/latest){: .button .button-primary }

## What is Web Starter Kit?

[Web Starter Kit](https://github.com/google/web-starter-kit) (이하 WSK)은 웹 개발자들을 위해 기본화(boilerplate)된 틀이라고 할 수 있습니다. </br>
여러 기기에서 [성능을 향상시키는](#web-performance) 경험을 할 수 있게 도와주는 것은 물론이거니와 Google의 [Web Fundamentals](/web/fundamentals/) 가이드를 따라서 좋은 예제와 생산성을 유지할 수 있도록 도와줍니다. </br>
즉, 웹 개발에 있어서 잘 하는 사람도, 처음하는 사람도 순조롭게 출발 할 수 있도록 도와주는 Tool입니다.

### Features

| Feature                                | Summary                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Responsive boilerplate | [Material Design Lite](http://getmdl.io)을 사용하기 때문에 반응형(Responsive) boilerplate는 멀티 스크린 웹 환경에 최적화 되어있습니다. 제공되는 [basic.html](https://github.com/google/web-starter-kit/blob/master/app/basic.html)을 통해 확인할 수 있으며 이를 바탕으로 웹 페이지를 구상하실 수 있습니다.                          |
| Sass support                           | 복잡하고 다양한  [Sass](http://sass-lang.com/) 구조로 이루어져 있더라도 `gulp serve`, 혹은 `gulp`를 통해 컴파일 과정에서 보다 쉽게 CSS형태로 변환해줍니다.                                                                                                     |
| Performance optimization               | Javsscript와 CSS, HTML을 비롯하여 웹 페이지 구성에 필요한 Image등을 연계하고 최소화 해줍니다. (`gulp`를 통해 /dist 디렉토리 아래에 최적화된 프로젝트의 version을 생성해 줍니다)                                                                              |
| Code Linting               | Javascript 코드는 [ESLint](http://eslint.org)(Javascript 코딩 컨벤션과 패턴, 에러체크를 도와주는 툴)를 사용합니다. </br>WSK는  [eslint-config-google](https://github.com/google/eslint-config-google)(Google이 사용하는 Javascript 스타일 가이드)을 사용해서 ESLint를 적용해줍니다.                                                                                           |
| ES2015 via Babel 6.0                   | [Babel](https://babeljs.io/){: .external }을 통해서 ES2015를 사용할 수 있습니다.</br> [.babelrc](https://github.com/google/web-starter-kit/blob/master/.babelrc) 파일에서 `"only": "gulpfile.babel.js",` 설정값을 지우면 ES2015를 지원 가능하게 되어 ES2015 로 짠 소스 코드를 ES5로 자동변환해주게 됩니다.  |
| Built-in HTTP Server                   | 개발하는 중에도 built-in server를 통해서 웹 서비스의 preview를 볼 수 있습니다. |
| Live Browser Reloading                 | 별도의 설정 없이도 개발하는 중에 소스코드를 고치거나 `gulp serve`를 통해 실시간(real-time)으로 웹 브라우져가 리로드 되어 수정된 사항을 확인 할 수 있습니다.                                                                  |
| Cross-device Synchronization           | [BrowserSync](http://browsersync.io)(여러 웹 브라우저에서 웹 페이지의 테스트를 도와주는 도구)를 이용합니다. </br>이를 통해 (개발중인)프로젝트 수정 시에도 여러개의 브라우져에 대해 실시간 리로드가 발생하며 클릭, 스크롤, 폼 이벤트등에 대해서도 동시에 발생시켜 웹 페이지 테스트를 도와줍니다.</br>(`gulp serve` 나 당신의 네트워크 IP를 통해 접속한 다양한 기기, 혹은 웹브라우져를 열어서 확인할 수 있습니다.) |
| Offline support                     | [Service Worker](/web/fundamentals/getting-started/primers/service-workers) [pre-caching](https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js#L226)을 통해서 dist를 HTTPS 도메인으로 배포한 사이트에 대해 오프라인 서비스를 제공합니다. 이러한 기능은  [sw-precache](https://github.com/GoogleChrome/sw-precache/)를 통해 가능하게 되었습니다.                                           |
| PageSpeed Insights                     | Web performance 측정기를 통해 당신의 사이트가 모바일과 Desktop에서 얼마나 성능이 나오고 있는지를 잘 파악할 수 있다.(`gulp pagespeed`로 빌드 시)

## Quickstart

WSK를 [Download](https://github.com/google/web-starter-kit/releases/latest) 받거나 repository에서 [clone](https://github.com/google/web-starter-kit)을 받고 빌드를 하면 `app` 디렉토리를 기반으로 빌드가 진행됩니다.

아래 2개의 HTML 파일이 있는데 이 중 선택하는 파일이 WSK의 시작점입니다.

- `index.html` - **Default**. Material Design layout을 포함.
- `basic.html` - 특별한 layout은 존재하지 않지만 meta tag를 통해 기본적인 모바일 View 정보는 포함.

[installation docs](https://github.com/google/web-starter-kit/blob/master/docs/install.md)를 보면 WSK를 동작시키기 위해 마련해야 할 최소한의 제반 환경에 대한 정보를 확인 할 수 있습니다. 제반 환경 설정이 끝났다면 각 [commands](https://github.com/google/web-starter-kit/blob/master/docs/commands.md)(`gulp`, `gulp serve`등)들이 정상적으로 동작하는지 확인한 후에 WSK를 시작하면 됩니다.

## Web Performance

WSK는 웹 개발을 함에 있어서, 특히나 초기에 최상의 효율을 발휘할 수 있도록 만들어져 있습니다.</br>
[Speed Index](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index) (페이지의 로딩부터 모든 컴포넌트들이 화면상에 보여질(visible)때까지의 속도를 수치화한 값)라는 Web Page Performance Test[scores](http://www.webpagetest.org/result/151201_VW_XYC/){: .external } 에 쓰이는 객관적인 척도를 기준으로 한 결과는 아래와 같습니다.

*(WSK의 기본 템플릿을 테스트 했을 경우)*</br>
First View의 경우 최대 값이 **1100** (이상적인 값은 1000)이었으며
반복되는 접속(Repeat View)에 대한 값은 Service Worker pre-caching을 통해 **550** 이하라는 수치를 보이며 First View에 비해 절반에 가까운 결과를 보여줬습니다.

## Browser Support

아래에 있는 웹 브라우져들의 최근 2가지 Version까지만 공식적으로 지원이 됩니다.

* Chrome
* Edge
* Firefox
* Safari
* Opera
* Internet Explorer 9+

위 브라우져들의 최근 2가지 버전까지만 지원한다는 것은, 그 이전 버전의 브라우져에서 WSK가 동작하지 않는다는 뜻이 아닙니다. 다만 WSK의 layout이 동작하는 최적의 환경이 위와 같다는 의미입니다.


## Troubleshooting

WSK를 설치하고 실행시키는 동안 문제가 발생한다면, 일단 먼저 우리의 [Troubleshooting](https://github.com/google/web-starter-kit/wiki/Troubleshooting) 가이드를 참고하고  없다면 issue로 등록을 해주길 바랍니다. 발생한 [issue](https://github.com/google/web-starter-kit/issues) 들을 해결하고 논의하는 것을 우리는 반기고 있으니, 개의치 말고 부담없이 언제든지 의견을 제시해 주시기 바랍니다.

## A Boilerplate-only Option

우리는 좀 더 쉽게 웹을 개발할 수 있게 하기 위해서 WSK를 추천하고 있지만, 이런 사항은 어디까지나 옵션일 뿐입니다. </br>만약 당신이 이런 정형화된 설정을 벗어나고 싶다면 프로젝트에서 다음의 파일들을 삭제하고 입맛에 맞게 재구축하시면 됩니다. `package.json`, `gulpfile.babel.js`, `.jshintrc`, `.travis.yml`. 그러면 당신은  빌드시스템이나 빌드시스템이 없는 보일러플레이트를 당신의 선택에 따라 구축해 나갈 수 있습니다.

## Docs and Recipes

* [File Appendix](https://github.com/google/web-starter-kit/blob/master/docs/file-appendix.md) - WSK에 있는 File들에 대한 설명
* [Using Material Design Lite's Sass](https://github.com/google/web-starter-kit/blob/master/docs/mdl-sass.md) - Material Design Lite의 Sass형태를 WSK에서 쓰는 법에 대한 설명
* [Deployment guides](https://github.com/google/web-starter-kit/blob/master/docs/deploy.md) - Firebase, Google App Engine, Github Page, Amazon AWS S3, Heroku에 대한 배포 가이드.
* [Gulp recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes) - 당신이 적용한 내용을 프로젝트에 추가한 뒤에 `gulp`를 사용하는 것에 대한 포괄적인 가이드.

## Inspiration

WSK는 [Mobile HTML5 Boilerplate](https://html5boilerplate.com/mobile/){: .external } 와 Yeoman의 [generator-gulp-webapp](https://github.com/yeoman/generator-webapp) 으로부터 기인하였으며 두 프로젝트의 Contributor에게 조언을 얻기도 했습니다. [FAQ](https://github.com/google/web-starter-kit/wiki/FAQ)를 통해 자주 묻는 질문과 그에 대한 답변을 확인하실 수 있습니다.


## Learn More
WSK를 좀 더 알고 싶으시다면 코드를 살펴보시고 issue를 등록해주세요. 또한 우리의 Git Repo(아래 링크 참조)에 적극적으로 관여해주시길 바랍니다.
[https://github.com/google/web-starter-kit](https://github.com/google/web-starter-kit)
