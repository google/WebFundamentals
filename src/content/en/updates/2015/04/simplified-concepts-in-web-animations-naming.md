project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: In response to developer feedback, some upcoming features of Web Animations are being renamed.

{# wf_updated_on: 2019-03-22 #}
{# wf_published_on: 2015-04-01 #}
{# wf_tags: news,webanimations #}
{# wf_blink_components: N/A #}

# Simplified Concepts in Web Animations Naming {: .page-title }

{% include "web/_shared/contributors/samthorogood.html" %}



Native support for Web Animations first shipped [in Chrome 36](/web/updates/2014/05/Web-Animations-element-animate-is-now-in-Chrome-36), and was updated with playback control [in Chrome 39](/web/updates/2014/12/web-animation-playback). The `Element.animate()` method can be used to trigger imperative animations directly from JavaScript, and its returned object can be leveraged to control the playback of these animations. These methods are detailed in the current draft of the [Web Animations W3C spec](https://w3c.github.io/web-animations/).

There's a [shipped polyfill](https://github.com/web-animations/web-animations-js) under active development that tracks all Web Animations features implemented natively, and which is supported in all modern browsers. These core methods are ready for use right now, and deserve to be part of your toolbox for building rich experiences that benefit from animations (such as for the [Google I/O 2015 web app](https://events.google.com/io2015/){: .external }).

## Constructor and groups changes

The Web Animations spec also describes _groups and sequences_, and constructors for animations and players. These have been available in the [web-animations-next](https://github.com/web-animations/web-animations-js#web-animations-nextminjs) polyfill, which has been designed to showcase features still undergoing discussion and yet to be implemented natively. In response to developer feedback, the team developing Web Animations are renaming these features to be more self-explanatory.

The [FXTF](https://www.w3.org/Graphics/fx/){: .external } recently met in Sydney, Australia, and [discussed](https://www.mail-archive.com/public-fx@w3.org/msg00151.html) [naming](https://www.mail-archive.com/public-fx@w3.org/msg00158.html), as a number of developers raised valid points about some of the naming being confusing. As a result, the following naming changes were agreed on:

* __Animation__ becomes __KeyframeEffect__
* __AnimationSequence__ becomes __SequenceEffect__
* __AnimationGroup__ becomes __GroupEffect__
* __AnimationPlayer__ becomes __Animation__

Remember that while animations and their players are available natively in Chrome and as part of the polyfill, they are currently created directly via the `Element.animate()` method. Existing code that uses the `Element.animate()` method will require no changes.

The new names more accurately represent the behavior provided by each object. `KeyframeEffect`, for instance, describes keyframe-based effects that can target HTML elements. In contrast, the new `Animation` object represents an animation in one of many states (such as playing, paused etc).

## SourceCodeEffect

If you're using parts of the draft spec via the web-animations-next polyfill, you'll have to update your code within the deprecation period to reflect these new names. As per the [polyfill changes policy](https://github.com/web-animations/web-animations-js#breaking-changes), we aim to support an old version for three months and provide console warning statements if your site use deprecated features or names.

If you're keen to try out these features, then watch out for the [v2 release][polyfill-releases] of the polyfill to take advantage of these new names. Finally, be sure to subscribe to the [web-animations-changes](https://groups.google.com/forum/#!forum/web-animations-changes) group to hear about any other changes.


[polyfill-releases]: https://github.com/web-animations/web-animations-js/releases


