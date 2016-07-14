---
title: "Процесс визуализации"
description: "Научитесь выбирать оптимальный порядок отображения контента в зависимости от его важности для пользователя."
updated_on: 2014-04-28
udacity:
  id: ud884
  title: Website Performance Optimization
  description: "Interested in taking a deep dive into the Critical Rendering Path? Check out or companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the Critical Rendering Path of your pages."
  image: images/crp-udacity.png
---
<p class="intro">
  Оптимизация помогает ускорить загрузку страниц. Наша цель - выбрать оптимальный порядок отображения контента в зависимости от его важности для пользователя.
</p>

При визуализации страниц браузер проделывает огромную работу, которую мы, веб-разработчики, обычно не замечаем. Мы не знаем, как разметка, стили и скрипты превращаются в страницы на экране.

Об этом и пойдет речь в наших уроках. Вы познакомитесь со всеми этапами **визуализации** - от скачивания HTML, CSS и JavaScript до вывода пикселей - и узнаете, как оптимизировать этот процесс.

<img src="images/progressive-rendering.png" class="center" alt="Оптимизированная и неоптимизированная визуализация">

Оптимизация помогает сократить время загрузки веб-страниц. Кроме того, изучив процесс визуализации, вы сможете создавать более эффективные интерактивные приложения, потому что они подчиняются тем же принципам (разве что обновление приложения происходит циклично и с частотой 60 кадров/сек. Однако не будем спешить. Сначала разберемся, как браузер визуализирует простую веб-страницу.

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title image=page.udacity.image description=page.udacity.description %}


