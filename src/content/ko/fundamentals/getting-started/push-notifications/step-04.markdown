---
title: "구글 개발자 콘솔에서 프로젝트 생성하기"
description: "웹앱의 푸쉬 알림은 메시지를 처리하기 위한 백엔드 서비스가 필요합니다. 크롬은 현재 Google Cloud Messaging 을 사용합니다. 이번 단계에서는 구글 개발자 콘솔에서 프로젝트를 생성해봅니다."
notes:
  styling:
    - Styling will come later
updated_on: 2015-09-28
translators:
  - captainpangyo
---

{% include shared/toc.liquid %}

웹앱의 푸쉬 알림은 메시지를 처리하기 위한 백엔드 서비스가 필요합니다. 크롬은 현재 이를 위해 [Google Cloud Messaging](https://developers.google.com/cloud-messaging/) 을 사용하고 있지만, 결국 크롬과 GCM 이 목표하는 바는 [Web Push Protocol](https://datatracker.ietf.org/doc/draft-ietf-webpush-protocol/) 을 지원하는 것입니다.

다른 브라우저들은 다른 서비스들을 사용할 수 있습니다.

이 단계에서는 구글 개발자 콘솔에서 프로젝트를 설정합니다.

**단계가 조금 많아 지루해보일 수 있지만, 프로젝트를 설정하기는 정말 쉬울것입니다.**

## 1. 프로젝트 생성하기

[Google Developers Console](https://console.developers.google.com)에서 새로운 프로젝트를 생성합니다.

<img src="images/image04.png" width="907" height="845" alt="Web page screenshot: create a new project from the Google Developers Console" />

## 2. 프로젝트에서 사용할 API 선택하기

**Use Google APIs** 에서 **Enable and manage APIs** 을 선택합니다:

<img src="images/image05.png" width="907" height="845" alt="Web page screenshot: select APIs from the Google Developers Console" />

**Google APIs** 목록에서 **Google Cloud Messaging** 를 선택합니다:

<img src="images/image06.png" width="907" height="845" alt="Web page screenshot: select Google Cloud Messaging API" /> API가 성공적으로 추가되었으면 아래 페이지를 확인할 수 있습니다:

<img src="images/image07.png" width="965" height="901" alt="Web page screenshot: Google Developers Console, Google Cloud Messaging enabled" />

## 3. 증명서 획득하기

**API Manager** 메뉴에서 **Credentials** 을 선택하고, **Create credentials** 드랍다운 버튼을 클릭한 후 **API key** 을 선택합니다.

<img src="images/image08.png" width="965" height="901" alt="Web page screenshot: add credentials from the Google Developers Console" />

**Browser key** 버튼을 클릭합니다:

<img src="images/image09.png" width="907" height="822" alt="Web page screenshot: click Browser key button to select new API key type in the Google Developers Console" />

해당 키에 아무 이름이나 지정합니다. HTTP referrers 를 빈칸으로 놓고 **Create** 버튼을 선택합니다.

<img src="images/image10.png" width="907" height="822" alt="Web page screenshot: click the Create button to create a browser API key from the Google Developers Console" />

**API key** 는 나중에 필요하기 때문에 저장해놓습니다:

<img src="images/image11.png" width="907" height="822" alt="Web page screenshot: get the API key for your project from the Google Developers Console" />

홈 페이지에서 **Project Number** 를 얻어 나중에 사용합니다:

<img src="images/image12.png" width="965" height="901" alt="Web page screenshot: get the Project Number for your project from the Google Developers Console" />

축하합니다!

이제 Google Cloud Messaging project 를 성공적으로 생성하였습니다.
