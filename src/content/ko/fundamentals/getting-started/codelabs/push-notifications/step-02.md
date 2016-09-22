project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 로컬 웹 서버를 설치하고 실행합니다.

{# wf_review_required #}
{# wf_updated_on: 2015-09-27 #}
{# wf_published_on: 2000-01-01 #}

# 로컬 웹 서버 실행하기 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/captainpangyo.html" %}



**로컬호스트에서 웹 서버 실행하기**

이번 코드랩을 통과하기 위해서는 로컬 웹 서버를 실행해야 합니다.
아마 이미 구축해놓은 웹 서버가 있을 수도 있지만, 없다면 터미널 창을 열어보세요.
이전 스텝에서 다운로드 받았던 **_push-notifications_** 디렉토리로 이동하고,
아래 파이썬 명령어를 입력하여 서버를 실행합니다:


    $ python -m SimpleHTTPServer
    

이렇게 하면 HTTP 기본 포트에다가 웹 서버를 실행합니다.
브라우저에서 [localhost](http://localhost)로 이동하여 **_push-notifications_** 디렉토리의 최상위 레벨에는 어떤게 있는지 확인합니다.

**_app_** 디렉토리에 있는 작업물을 보기 위해서는, [localhost/app](http://localhost/app) 를 입력합니다.
각 단계에서 제공하는 완성된 소스를 보려면 [localhost/completed](http://localhost/completed) 로 이동합니다.

파이썬이 설치되어 있지 않으면 [여기](https://www.python.org/downloads/) 에서 다운받으세요.
서버를 시작하는데 문제가 있으면 SimpleHTTPServer가 선택한 포트를 사용하는 다른 서비스가 있는지 [체크](https://www.google.com/search?q=what+is+using+port) 하세요.

이번 코드랩에 포함된 커맨드 라인 예제들은 모두 bash shell 을 사용합니다.

윈도우 사용자는 커맨드 프롬트 창에서 MS-DOS 커맨드를 사용하면 됩니다:
대안으로는 Cygwin 환경을 쓰는 방법도 있습니다.

[XAMPP](https://www.apachefriends.org/index.html) 또는 [MAMP](https://www.mamp.info/en/) 같은 웹 서버 스택을 이용하는 방법도 있습니다.
