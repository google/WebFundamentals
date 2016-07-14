---
title: "크리티컬 렌더링 패스(Critical Rendering Path)"
description: "사용자가 페이지에서 행하는 주요 동작과 관련있는 콘텐츠를 우선 노출하여 크리티컬 렌더링 패스를 최적화하는 방법을 설명합니다."
updated_on: 2014-04-28
translators:
  - jeokrang
udacity:
  id: ud884
  title: Website Performance Optimization
  description: "Interested in taking a deep dive into the Critical Rendering Path? Check out or companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the Critical Rendering Path of your pages."
  image: images/crp-udacity.png
---
<p class="intro">
  페이지 성능을 향상하는 데 크리티컬 렌더링 패스 최적화는 아주 중요합니다. 페이지 내에서 사용자가 하고 싶어하는 행동과 관련있는 콘텐츠를 우선적으로 보여주는 것이 목표입니다.
</p>

빠른 웹 경험을 사용자에게 제공하기 위해서 브라우저는 많은 작업을 합니다. 하지만 이 작업의 대부분은 웹 개발자인 우리가 볼 수 없는 곳에서 이루어집니다. 그냥 마크업을 작성하면 멋진 페이지가 스크린에 나올 뿐이죠. 그렇다면 브라우저는 어떻게 정확히 HTML, CSS, JavaScript를 스크린에 픽셀로 그리는 걸까요?

성능을 최적화하기 위해서는 브라우저가 HTML, CSS, JavaScript 코드를 전달받아서 이를 픽셀로 화면에 그릴 것을 요청하는 사이에 발생하는 일을 이해해야 합니다. 바로 **크리티컬 렌더링 패스**입니다.

<img src="images/progressive-rendering.png" class="center" alt="progressive page rendering">

크리티컬 렌더링 패스를 최적화하면 페이지 최초 렌더링 시간을 크게 향상시킬 수 있습니다. 게다가, 크리티컬 렌더링 패스에 대한 이해를 토대로 좋은 인터랙션을 가진 애플리케이션을 만들 수도 있습니다. 대화식 업데이트 처리과정은 단지 이상적인 초당 60프레임으로 작업을 계속해서 반복하는 것과 같습니다. 하지만 아직 결론 내리기에는 이릅니다. 먼저 브라우저가 어떻게 간단한 페이지를 화면에 그리는지 간략한 개요를 살펴봅시다.

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title image=page.udacity.image description=page.udacity.description %}

