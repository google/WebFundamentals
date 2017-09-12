project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: "Glossary"

{# wf_updated_on: 2017-08-14 #}
{# wf_published_on: 2017-08-14 #}

# Glossary {: .page-title }

### Web Components

Web components are a set of web platform APIs that allow you to create new
custom, reusable, encapsulated HTML tags to use in web pages and web apps.
Custom components and widgets build on the Web Component standards, will work
across modern browsers, and can be used with any JavaScript library or framework
that works with HTML. To learn more about Web Components [check out the guide on
webcomponents.org](https://www.webcomponents.org/introduction).

### Custom Element

A Custom Element is a developer defined HTML tag. These elements are the
foundation of Web Components and can be used to create any sort of UI. To learn
more about Custom Elements [check out the guide on Web
Fundamentals](/web/fundamentals/architecture/building-components/customelements).

### Shadow DOM

Shadow DOM introduces scoped CSS and DOM to the web platform. It lets developers
write encapsulated UI components which can be used in any application. To learn
more about Shadow DOM [check out the guide on Web
Fundamentals](/web/fundamentals/architecture/building-components/shadowdom).

### Lifecycle Callback

Every Custom Element has a set of built-in lifecycle callbacks, or "reactions"
that are called when the element is added/removed from the page, or has an
attribute mutated. To learn more about Custom Element lifecycle callbacks [check
out the guide on Web
Fundamentals](/web/fundamentals/architecture/building-components/customelements#reactions).

### Mutation Observer

Mutation Observers are a web platform API to detect and react to change to the
DOM tree. If an element is observed by a MutationObserver, events like appending
a new element or removing and existing one will trigger a function to execute.
For more details, [checkout out the guide on
WebFundamentals](/web/updates/2012/02/Detect-DOM-changes-with-Mutation-Observers).

### FLIP

FLIP is a technique to set up high-performance animations using CSS transforms.
To avoid janking animations, start *and* end position are evaluated during the
setup so that the animation doesn't have to do any expensive calculations. For a
detailed introduction, [check out Paul Lewis' guide on his
blog](https://aerotwist.com/blog/flip-your-animations/).
