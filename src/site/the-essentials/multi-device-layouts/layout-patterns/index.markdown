---
layout: article
title: "Navigation and Action Patterns"
description: ""
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 3
collection: multi-device-layouts
introduction: "In the previous design sections we've looked at the nuts and bolts which make up a responsive layout as well as some of the common techniques to have responsive content. This article will cover how we apply this to navigation."
key-takeaways:
  nav-patterns:
    - Support mobile browsing behaviors by prominently displaying key calls-to-action on the main screen.
    - The primary purpose of your mobile homepage should be to identify users’ needs and guide them to the right place.
  tabs:
    - Use for up to five sections.
    - Position below or above your main content
    - Change the UI to make it clear to the user which section is current selected
  app-bar:
    - Your logo should be placed at the top of each screen and take the user back to the homepage.
    - If you have a menu button, place it on the far left or far right of the App Bar and keep it in the same place.
    - Key actions for your page should be kept in the App Bar.
  navigation-drawer:
    - Your navigation drawer should *always* be accessible by the user
    - If the number of sections is too large, consider grouping the items and expanding / contracting the groups. Avoid overwhelming your users.
    - Don't hide key actions inside the drawer. Actions like search should be prominently on the home page, not hidden in the drawer.
  bottom-bar:
    - Only use this if you aren't using a tab bar
    - Stick to 5 items at most
    - Use for contextual items for that page
  item-actions:
    - Enable actions you can perform on an item, by performing some kind of user interaction
    - If you can hint to the user that the action exist then do so
---

{% wrap content%}

* Table of Contents
{:toc}

# Navigation Patterns

// TODO: Intro to the article

## App Bar

<a href="/web/essentials/resources/samples/the-essentials/multi-device-layouts/layout-patterns/appbar-sample1.html"><img class="g-medium--full g-wide--full" src="images/appbar.png"></a>

<div style="clear: both;"></div>

One expectation users have is that yours site's logo will be at the top of every page and when they click it, it'll take them to your home page.

Traditionally the web has used page headers for this. On mobile devices you should use the App Bar.

The app bar consists of three elements.

- Your sites logo
- Primary actions
- (Optional) Menu button

When you consider what you expect your users to do on your site, you'll have a set of key or primary actions which most users will want to perform. Place these in your App Bar. It gives a common place for users to find the available actions and will be easy to access.

A simple example is adding a plus button to the App Bar of a To-Do List, a search button for a blog or a filter button on a product search. These are all key actions.

If you have a menu, use the hamburger icon (three vertical lines) and place this on the same position of the App Bar (far left or far right), meaning the user only needs to learn where it is once.

### Left vs Right Menu Button

If you have a slide in menu, you have the choice of putting the menu on the left or right hand side.

The top left corner is where you should put the most important elements of your UI, however it's also one of  hardest places to reach when holding the phone one handed. Putting the menu on the top right still gives it prominence and importance, but is easier to tap while holding the phone single handidly.

<a href="/web/essentials/resources/samples/the-essentials/multi-device-layouts/layout-patterns/appbar-sample1.html"><img class="g--half" src="images/appbar-menu-left.png"></a>
<a href="/web/essentials/resources/samples/the-essentials/multi-device-layouts/layout-patterns/appbar-sample2.html"><img class="g--half g--last" src="images/appbar-menu-right.png"></a>

<div style="clear: both;"></div>

### Guidelines

The App Bar is a set of principals that you should apply to give your users a predictable experience, but there is plenty of opportunity to be creative in terms of style of the bar, button and interactions.

<a href="/web/essentials/resources/samples/the-essentials/multi-device-layouts/layout-patterns/appbar-sample3.html"><img class="g--half" src="images/appbar-alt-1.png"></a>
<a href="/web/essentials/resources/samples/the-essentials/multi-device-layouts/layout-patterns/appbar-sample4.html"><img class="g--half g--last" src="images/appbar-alt-2.png"></a>

<div style="clear: both;"></div>

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.app-bar %}

## Tabs

<a href="/web/essentials/resources/samples/the-essentials/multi-device-layouts/layout-patterns/tabbar-sample1.html"><img class="g-medium--full g-wide--full" src="images/tabbar.png"></a>

<div style="clear: both;"></div>

The tab bar can be used to quickly switch between a small set of sections of your site.

Limit the total number of tabs to five or less sections, otherwise each icon and tap target becomes too small and users will struggle to hit the right tab.

Position your tabs above or below your main content.

A nice advantage using tabs is that it gives the user a consistent place for navigation where it's easy to glance where they are within your site.

<a href="/web/essentials/resources/samples/the-essentials/multi-device-layouts/layout-patterns/tabbar-sample2.html"><img class="g--half" src="images/tabbar-alt-1.png"></a>
<a href="/web/essentials/resources/samples/the-essentials/multi-device-layouts/layout-patterns/tabbar-sample3.html"><img class="g--half g--last" src="images/tabbar-alt-2.png"></a>

<div style="clear: both;"></div>

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.tabs %}

## Navigation Drawer

<a href="/web/essentials/resources/samples/the-essentials/multi-device-layouts/layout-patterns/navdrawer-sample1.html"><img class="g-medium--full g-wide--full" src="images/navdrawer.png"></a>

<div style="clear: both;"></div>

The navigation drawer is a simple slide in panel which is primarily used for displaying the application's navigation, but can be used for displaying global state, i.e. user login.

A user accesses the drawer using a menu button at the top of the screen in the App Bar.

<a href="/web/essentials/resources/samples/the-essentials/multi-device-layouts/layout-patterns/navdrawer-sample2.html"><img class="g--third" src="images/navdrawer-alt-1.png"></a>
<a href="/web/essentials/resources/samples/the-essentials/multi-device-layouts/layout-patterns/navdrawer-sample3.html"><img class="g--third" src="images/navdrawer-alt-2.png"></a>
<a href="/web/essentials/resources/samples/the-essentials/multi-device-layouts/layout-patterns/navdrawer-sample4.html"><img class="g--third g--last" src="images/navdrawer-alt-3.png"></a>

<div style="clear: both;"></div>

### Tabs vs Navigation Drawer

Some developers find they get higher rates of interaction when using tabs over a navigation drawer. So if you can reduce your application's navigation to 5 key sections then this may be a preferable option over the Navigation Drawer.

<div style="clear: both;"></div>

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.navigation-drawer %}

## Bottom Bar

We've seen that the App Bar can be used for placing actions the user can perform in your web app.

An alternative approach is to place actions in a bar along the bottom, providing you aren't using tabs for your navigation.

The advantage of this is that you have more space for actions, but you should limit yourself to five actions at most, avoiding the buttons becoming to small and difficult to tap.

// TODO Add a sample

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.bottom-bar %}

## Item Actions

So far we have considered actions relevant to the screen the user is currently viewing (perform a search or filter, share the current blog post, add a new element etc).

There are occasions where a contextual action can help users perform tasks faster. An example of a contextual action is view a list of items, emails, to-do's or a product basket for example, where each list item have actions tied to them, so deleting, starring, marking as read etc.



{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.item-actions %}

- Describe the pattern

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.nav-patterns %}

{% endwrap %}