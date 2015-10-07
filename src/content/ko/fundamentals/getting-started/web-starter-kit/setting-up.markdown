---
title: "Web Starter Kit 설정하기"
description: "Web Starter Kit를 처음 사용하는 경우 이 가이드가 도움이 됩니다. 여기서는 Web Starter Kit를 가능한 한 빨리 구축하고 실행하는 방법을 단계별로 설명합니다."
notes:
  nosudo: 
    - "<code>EPERM</code> 또는 <code>EACCESS</code>와 같은 사용 권한 또는 액세스 오류가 표시되는 경우 해결 방법으로 <code>sudo</code>를 사용하지 마십시오. <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>이 페이지</a>에서 더욱 강력한 해결 방법을 확인할 수 있습니다."
updated_on: 2015-04-01
key-takeaways:
---

<p class="intro">
  Web Starter Kit는 NodeJS, NPM 및 Sass를 사용하여 작동됩니다. 컴퓨터에 이를 모두 구축했다면 프로젝트에서 Web Starter
  Kit를 사용하여 시작하는 데 필요한 모든 것을 갖추게 된 것입니다.
</p>

{% include shared/toc.liquid %}

## 일회성 종속 항목 설치하기

Web Starter Kit를 사용하여 사이트를 빌드하려면 컴퓨터에 두 가지
도구 집합(NodeJS, NPM 및 Sass)을 설치해야 합니다.

### NodeJS 및 NPM

Web Starter Kit의 빌드 도구는 Node 및 NPM을 필요로 합니다. Node는 작업 실행 프로그램인 Gulp를 실행하는 데
사용됩니다. NPM은 Gulp에서 특정 작업을 수행하는 데 필요한 모듈을 다운로드하는 데
사용됩니다.

NodeJS와 NPM이 구축되어 있는지 확실하지 않은 경우 명령 프롬프트를 열고 `node -v`를 실행하여
확인하십시오. Node가 응답하면 버전이 NodeJS.org의 현재 버전과 일치하는지
확인합니다.

응답이 없거나 이전 버전인 경우 NodeJS.org로 이동하고
큰 녹색 설치(Install) 버튼을 클릭합니다. 그러면 NPM이 NodeJS와 함께 자동으로
설치됩니다.

## Web Starter Kit 프로젝트 설정하기

먼저 [https://developers.google.com/web/starter-kit/](https://developers.google.com/web/starter-kit/)로 이동하여
zip 파일을 다운로드한 후 압축을 풉니다. 이 폴더가 프로젝트의 기본입니다. 따라서, 해당 폴더의 이름을 바꾼 후 컴퓨터의 적절한 위치에 저장합니다. 이 가이드에서는 이 폴더를 `my-project`라고 하겠습니다.

그런 다음, Web Starter Kit의 로컬 종속 항목을 설치해야 합니다. 명령 프롬프트를
열고, 디렉터리를 프로젝트 폴더로 변경한 후 다음 npm
install 스크립트를 실행합니다.

    cd my-project
    npm install
    npm install gulp -g

이것으로 끝입니다! 이제 Web Starter Kit의 Gulp 도구를 사용하는 데 필요한 모든 것을
갖추었습니다.

{% include shared/remember.liquid title="Errors?" list=page.notes.nosudo %}

이 가이드의 다음 절에서는 Gulp를 사용하는 방법에 대해 설명하지만,
요소들이 어떻게 표시되는지 확인하려면 `gulp serve`를 입력하여 로컬 서버를 실행해 보십시오.

<img src="images/wsk-on-pixel-n5.png">


