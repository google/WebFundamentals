---
layout: shared/narrow
title: "Accessibility Codelab"
description: "Accessibility Codelab"
published_on: 2016-03-01
updated_on: 2016-03-01
order: 17
translation_priority: 0
authors:
  - megginkearney
  - dgash
key-takeaways:
  tldr: 
    - "Learn what accessibility means and how it applies to web development."
    - "Learn how to make web sites accessible and usable for everyone."
    - "Learn how to include basic accessibility with minimal development impace."
    - "Learn what HTML features are available and how to use them to improve accessibility."
    - "Learn about advanced accessibility techniques for creating polished accessibility experiences."
notes:
  efficiency:
    - "Understanding the accessibility issue, its scope, and its impact can make you a better web developer."
  problem-solving:
    - "Catching, identifying, and removing potential accessibility roadblocks before they happen can improve your development process and reduce maintenance requirements."
---

# Assistive Technology

*Assistive technology* is an umbrella term for devices, software, and tools that help any person with a disability complete a task. In the broadest sense this could be something low-tech like a crutch for walking or a magnifying glass for reading, or something high-tech like a robotic arm, or image recognition software on a smartphone.

Assistive technology can include something as general as browser zoom, or as specific as a custom-designed game controller. It can be a separate physical device, like a braille display, or be implemented completely in software, like voice control. It can be built-in to the operating system, like some screen readers, or it can be an add-on, like a Chrome extension.

The line between assistive technology and technology in general is blurry; after all, all technology is meant to assist people with some task or another. And technologies can often move into and out of the "assistive" category.

For example, one of the earliest commercial speech synthesis products was a talking calculator for the blind. Now speech synthesis is all over the place, from driving directions to virtual assistants. Conversely, technology that was originally general-purpose often finds an assistive use. For example, people with low vision may use their smartphone's camera zoom to get a better look at something small in the real world.

In the context of web development, we must consider a diverse range of technologies. People may interact with your website using a screen reader or braille display, with a screen magnifier, via voice control, using a switch device, or with some other form of assistive technology that adapts the page to create a more specific interface that they can use.

Many of these assistive technologies rely on *programmatically expressed semantics* to create a usable user experience, and that's what most of this lesson is about. But before we can explain programmatically expressed semantics, we need to talk a bit about *affordances*.
