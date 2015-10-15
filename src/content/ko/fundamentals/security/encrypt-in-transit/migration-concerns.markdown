---
title: "마이그레이션 우려 사항"
updated_on: 2015-03-27
---

이 절에서는 HTTPS 마이그레이션에 대한 운영자의 우려 사항에 대해 설명합니다.

{% include shared/toc.liquid %}

## 검색 순위

[Google은 HTTPS를 긍정적인 검색 품질
지표로 사용하고 있습니다](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).
또한 이 검색 순위를 유지하면서 [사이트 이전, 이동 또는 마이그레이션
방법](https://support.google.com/webmasters/topic/6029673)에 대한 가이드를
게시하고 있습니다. Bing도 [웹 마스터에 대한
지침](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a)을 게시하고 있습니다.

## 성능

콘텐츠 및 애플리케이션 레이어가 잘 조율된 경우([Steve Souders의
서적](https://stevesouders.com/) 참조) 나머지 TLS
성능 우려 사항은 일반적으로 애플리케이션의 전반적인 비용에 상대적으로 매우
작은 수준입니다. 또한, 이러한 비용은 절감하고 상각할 수 있습니다. (TLS 최적화를
비롯한 유용한 정보는 _[High Performance Browser
Networking](http://chimera.labs.oreilly.com/books/1230000000545)_[- Ilya
Grigorik 저](http://chimera.labs.oreilly.com/books/1230000000545)를 참조하십시오.) Ivan
Ristic의 _[OpenSSL
Cookbook](https://www.feistyduck.com/books/openssl-cookbook/)_ 및 _[Bulletproof
SSL And TLS](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/)_도 참조하십시오.

경우에 따라 TLS는 성능을 _향상_시킬 수 있습니다. 이는 주로 HTTP/2가 실현
가능해졌기 때문입니다. Chris Palmer는 [Chrome Dev Summit 2014에서 HTTPS 및 HTTP/2 성능
에 관한 고찰]({{site.WFBaseUrl}}/shows/cds/2014/tls-all-the-things)을 발표했습니다.

## 참조자 헤더

사용자 에이전트는 사용자가 HTTPS 사이트의 링크를 따라 다른
HTTP 사이트에 접속할 때 참조자 헤더를 전송하지 않습니다. 문제가 있는 경우 다음과 같은 방법을 활용하여 해당 문제를 해결할
수 있습니다.

* 다른 사이트를 HTTPS로 마이그레이션해야 합니다. 이를 위해서는 이 가이드를 유용하게
 활용할 수 있습니다! :) 피참조자 사이트가 이 가이드의 "서버에서 HTTPS 사용" 절을 참조하여 설정을 완료할 수 있는 경우
 사이트의 링크를 http://에서 https://로 변경하거나
 프로토콜에 상대적인 링크를 사용할 수 있습니다.
* 새 [참조자 정책
 표준](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta)을 사용하여
 참조자 헤더와 관련한 다양한 문제를 해결할 수 있습니다.

검색 엔진이 HTTPS로 마이그레이션하는 중이기 때문에 HTTPS로 마이그레이션하면 현재보다 _더 많은_ 참조자
헤더를 볼 가능성이 높습니다.

<blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">클라이언트는 참조 페이지가 보안 프로토콜로 이전된 경우 참조자 헤더 필드를 (보안이 유지되지 않는) HTTP 요청에 포함하지 않아야 합니다.<p><a href="https://tools.ietf.org/html/rfc2616#section-15.1.3">HTTP RFC 준수</a></p></blockquote>

## 광고 수익

광고를 표시함으로써 사이트의 수익을 내는 사이트 운영자는 HTTPS
마이그레이션으로 인해 광고 효과가 저하되지 않도록 하기를 원합니다. 하지만, 복잡한 콘텐츠
보안 문제로 인해 HTTP iframe이 HTTPS 페이지에서 작동하지 않습니다. 여기에 까다로운
공통 작업 문제가 있습니다. 광고주가 HTTPS를 통해 게시할 때까지
사이트 운영자는 광고 수익 손실 없이 HTTPS로 마이그레이션할 수
없습니다. 하지만 사이트 운영자가 HTTPS로 마이그레이션할 때까지 광고주는 HTTPS를 통해 게시할 생각을 거의 갖지 않습니다.

광고주는 적어도 HTTPS를 통해 광고 서비스를 제공해야 합니다(이 가이드의
"서버에서 HTTPS 사용" 절을 참조하여 설정을 완료하는 방법을 통해). 많은 광고주가 이미 이렇게 하고 있습니다. HTTPS를 전혀 지원하지 않는 광고주에게는
적어도 이를 시작하도록 요청해야 합니다. 많은 광고주가 제대로 상호 운용할 때까지 개발자는 이 가이드의
"사이트 내 URL을 상대 URL로 만들기"를 시도하는 것을 연기하고 싶을 수 있습니다.

