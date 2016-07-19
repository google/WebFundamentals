project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Web Fundamentals is a comprehensive resource for multi-device web development.

Web<b>Fundamentals</b> is a comprehensive resource for web development
best practices, designed to help you add the right features
and experiences to your web project. If you’re new to web development
or just looking to make your project better, we’ve got you covered.

## Progressive Web Apps
What is a <b>Progressive Web App</b> and what do you need to know to get started building one? In this step-by-step guide, you'll build your own Progressive Web App and learn the fundamentals needed for building Progressive Web Apps.

![Voice Memos Screenshot](/web/fundamentals/imgs/vm-pwa.png)

[Get Started](/web/fundamentals/getting-started/your-first-progressive-web-app/)

## Push Notifications
Learn how to add <b>Push Notifications</b> to your web applications to re-engage users with breaking news and information about new content.

![Push Notification Screenshot](/web/fundamentals/imgs/notif-example.png)

[Learn More](/web/fundamentals/getting-started/push-notifications/)

### Ready, set, code!

Already have something in mind? Then jump right in!

<ul>
{% for pageInSection in page.context.subdirectories %}
{% if pageInSection.index.published != false %}
{% if pageInSection.id != 'getting-started' and pageInSection.id != 'primers' %}
{% capture icon %}svgs/{{pageInSection.id}}.svg{% endcapture %}
  <li>
    <!-- Icon: {% include {{icon}} %} -->
    <h3>
      <a href="{{pageInSection.index.canonical_url }}">
      {{pageInSection.index.title}}
      </a>
    </h3>
    <p>{{pageInSection.index.description}}</p>
  </li>
{% endif %}
{% endif %}
{% endfor %}
</ul>

