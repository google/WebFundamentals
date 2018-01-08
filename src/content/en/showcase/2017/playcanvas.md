project_path: /web/_project.yaml
book_path: /web/showcase/_book.yaml

{# wf_published_on: 2017-02-02 #}
{# wf_updated_on: 2017-02-02 #}
{# wf_featured_image: /web/showcase/2017/images/playcanvas/vr-lab.png #}
{# wf_featured_snippet: The PlayCanvas WebVR Lab is a living project from the PlayCanvas team. It represents the team's research into developing scalable and responsive WebVR applications for all devices. It elegantly scales from a Google Cardboard or a Daydream View headset to a desktop VR device. The project is continually updated with new experiments that implement core interactions like teleportation, grabbing, manipulating objects, user interface and controllers. #}
{# wf_tags: webvr,casestudy #}

# Core Interactions in the WebVR Lab {: .page-title }

*By Dave Evans, Chief Technology Officer, PlayCanvas*

<img src="/web/showcase/2017/images/playcanvas/vr-lab.png" class="attempt-right">

<a class="button button-primary" href="http://webvr.playcanvas.com">
  View the Lab
</a>

Website designers are familiar with the idea of responsive design, building a
website to work across different devices, such as mobile phones, tablets and
computers and different screen resolutions and pixel ratios.
[WebVR](/web/fundamentals/vr/) introduces new challenges to the idea of
responsive design.

We can categorize a WebVR experience by two metrics - the level of immersion and
the level of input. These levels are distinguished by "degrees of freedom"
(DOF). 6 DOF refers to tracking both position and orientation, 3 DOF is only
tracking orientation and 0 DOF tracks neither position nor orientation.

### Immersion Level

- **No VR** - Monitor or mobile display.
- **Stationary VR** - Device with 3 DOF tracking.
- **Seated VR** - 6 DOF tracking but in a limited area and angle range.
- **Room Scale VR** - 6 DOF tracking with a room sized environment.

### Input Level
- **0 DOF** - The only input available is a click or tap. This input method is tied
  to the direction the user is facing. Sometimes we refer to this as a gaze
  controller.
- **3 DOF** - A controller that tracks its orientation can be used like a laser
  pointer to specify a direction or a location. The position of the controller
  is estimated based on the user's viewpoint. This includes the Daydream
  Controller.
- **6 DOF** - A controller that tracks its position and orientation. This can be
  used to closely simulate a hand in VR.

So you can see that a single application might support anything from a non-VR
mobile display with just a single click to input all the way up to a full room
scale experience with two fully tracked hand controllers.

## WebVR Lab

In the [PlayCanvas WebVR Lab](http://webvr.playcanvas.com) we've implemented
some of the core interactions that you might need in your application and scaled
them across the different levels of experience.

### How Interactions Work

The basic mechanics of how interactions work in the WebVR Lab are ray
intersections. The floor, the room and any objects that can be interacted with
are defined in terms of one of three shape primitives:

- **Axis-aligned bounding box (or AABB)** - A box that is not rotated.
- **Oriented bounding box** - A box that can be rotated.
- **Sphere** - A radius around a point in space.

To see if an action is possible we fire a ray into the world and test whether
the ray intersects with the shape of the objects in the world. Different types
of interaction are possible depending on where the ray originates (the camera or
the controller) and the length of the ray (close up manipulations or pointing at
a distance).

### Simple Actions

First we define a few simple actions and how they are used with different
controllers.

#### Highlight

Highlighting a location or object is performed either by looking at it (with a
gaze controller) or by pointing at it (with a hand controller). This could be
with no button pressed or only while a button is pressed.

#### Click

Clicking a location or object is performed by first highlighting and then
pressing or releasing a button. With a gaze controller you would click by
looking at an object and then pressing the button or screen. With a hand
controller the method is to point at an object then click a button.

## Core Interactions

Using highlighting and clicking we have implemented some core interactions in
the WebVR Lab.

### Teleport

<img src="/web/showcase/2017/images/playcanvas/teleport.png" class="attempt-right">

When building a virtual environment for a user to explore, it is likely that the
environment will be larger than the small area that a user can see without
moving. The WebVR Lab, for example, has three sections. A main room, a mezzanine
floor and a side room for the hi-fi music player.

Moving the user's viewport through the world will often lead to discomfort. In
the WebVR Lab we allow the user to highlight a location and click to teleport
instantaneously. The user's viewpoint never moves and so despite the somewhat
unnatural sensation of moving instantaneously the user can move around a large
space with no discomfort.

In the case of a hand controller, we require the user to push and hold a button
to activate the teleport target. This keeps the user's vision uncluttered while
they are looking around.

#### Moving the user's viewpoint

Sometimes it is absolutely necessary to move the viewpoint. For example, when
using Stationary or Seated VR it is possible to end up facing a wall with no
ability to turn in the physical world. So we allow the user to rotate the camera
using the controller. In the WebVR Lab using the left or right pad on the
Daydream Controller rotates the camera.

To prevent discomfort when we move the camera in this way we reduce the amount
of peripheral vision by applying a restricted view across the camera. This is
based on work by
[Ubisoft](http://www.gdcvault.com/play/1023922/Full-Speed-Flying-in-VR) and
we've found that focusing the view on just the center of the screen reduces the
discomfort.

### Activate

<img src="/web/showcase/2017/images/playcanvas/activate.png" class="attempt-right">

Activating is the VR equivalent of clicking a button on a webpage. In the WebVR
Lab we have taken this literally and provided a simple button that can be
activated.

For 0 DOF and 3 DOF controllers, activating is a highlight and click. For a 6
DOF controller we can upgrade the experience to let you "push" a button by
directly checking to see if your hand controller is inside the button.

### Grab

<img src="/web/showcase/2017/images/playcanvas/grab.png" class="attempt-right">

The WebVR Lab contains a number of "grabbable" items. With this behaviour, when
the object is activated it can be picked up and moved. There are two obvious,
different behaviors depending on the level of input you wish to support.

For 6 DOF controllers holding down an input button will attach the grabbable
item to the controller. It can then be moved and positioned with fine-grained
control. Releasing the button will activate a combine or drop action with the
item.

For less maneuverable controllers a click will pick up the item and attach it to
the user's viewport. Usually keeping a section of the item visible in the "lower
third" of the display. A second click will either drop or combine the item.

### Combine

<img src="/web/showcase/2017/images/playcanvas/combine.png" class="attempt-right">

Combine is an action that occurs when you "use" an item with another item. This
covers a huge variety of use cases. In the WebVR Lab we use this to play records
on the hi-fi. When an item is grabbed, it becomes possible to combine the grabbed
item with another item. With all types of controller highlighting the target
item whilst grabbing another item and then releasing the grab will combine the
two items.

### Drop / Restoring

Dropping an item happens when you click while holding a grabbed item with no
other item highlighted.

In the WebVR Lab we have kept performance requirements low by not using a
physics simulation on any items. That means that instead of dropping an item to
the ground we simple allow it to float in the position that it was dropped.
After an item has been dropped, if it isn't activated within a certain time
frame, it will "restore" itself to its original location. This restore
functionality allows a user with a low degree of input (0 DOF or 3 DOF) to
operate on many items and maintain a usable work area. Older items will
automatically clear themselves.

With a 6 DOF input it's easier to move items out of the way. Having a delay on
the restore operation lets a 6 DOF user immerse themselves in moving items
around, but still facilitate self-cleaning of the area.

## Summary

The WebVR Lab is a living project from the PlayCanvas team. That means it is
constantly under development and experiences are added and updated as we do more
research into building WebVR applications.

It scales from a "magic window" style mobile experience to a desktop interactive
playground. We've started to define a set of core interactions that users can
use for their own projects. We hope that the WebVR Lab is a good learning
experience for everyone who wishes to build 3D worlds with WebVR.

If you have a PlayCanvas account you can drop straight into the [WebVR Lab
Project](https://playcanvas.com/project/446331/overview/webvr-labs) to learn
more.
