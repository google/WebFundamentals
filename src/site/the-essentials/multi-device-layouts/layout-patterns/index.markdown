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
    - Don't hide key actions inside the drawer (i.e. search should be prominently on the home page, not hidden in the drawer).
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

- Intro to the article

# App Bar

<img class="g-wide--full" src="images/appbar.png">

Users expect to find yours site's logo at the top of every page and when they click it, they'll expect to be take to your home page.

Traditionally the web has used page headers for this, on the mobile web you should use the App Bar.

The app bar consists of three elements.

- Your sites logo
- Primary actions
- (Optional) Menu button

When you consider what you expect your users to do on your site, you'll have a set of key or primary actions which most users will want to perform. Place these in your App Bar. It gives a common place for users to find the available actions and will be easy to access.

A simple example is adding a plus button to the App Bar of a To-Do List, a search button for a blog or a filter button on a product search. These are all key actions.

If you have a menu, use the hamburger icon (three vertical lines) and place this on the same position of the App Bar (far left or far right), meaning the user only needs to learn where it is once.

## Left vs Right Menu Button

If you have a slide in menu, you have the choice of putting the menu on the left or right hand side.

The top left corner is where you should put the most important elements of your UI, however it's also one of  hardest places to reach when holding the phone one handed. Putting the menu on the top right still gives it prominence and importance, but is easier to tap while holding the phone single handidly.

<img class="g-wide--full" src="images/appbar-menu.png">

## Guidelines

The App Bar is a set of principals that you should apply to give your users a predictable experience, but there is plenty of opportunity to be creative in terms of style of the bar, button and interactions.

<img class="g-wide--full" src="images/appbar-alt.png">

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.app-bar %}

# Navigation Patterns


{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.nav-patterns %}

## Tabs

The tab bar can be used to quickly switch between a small set of sections of your site.

Limit the total number of tabs to five or less sections, otherwise each icon and tap target becomes too small and users will struggle to hit the right tab.

Position your tabs above or below your main content.

A nice advantage using tabs is that it gives the user a consistent place for navigation where it's easy to glance where they are within your site.

### Tabs vs Navigation Drawer

Some developers find they get higher rates of interaction when using tabs over navigation drawer, so if you can reduce your application's navigation to 5 key sections then this may be a preferable option over the Navigation Drawer.

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.tabs %}

## Navigation Drawer

<img class="g-wide--full" src="images/navdrawer.png">

The navigation drawer is a simple slide in panel which is primarily used for displaying the application's navigation, but can be used for displaying global state, i.e. user login.

A user accesses the drawer using a menu button at the top of the screen in the App Bar.

- Include demo
  - Left, Right and Drop Down

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.navigation-drawer %}

## Bottom Bar

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.bottom-bar %}

- Describe the pattern

## Item Actions

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.item-actions %}

- Describe the pattern

{% endwrap %}