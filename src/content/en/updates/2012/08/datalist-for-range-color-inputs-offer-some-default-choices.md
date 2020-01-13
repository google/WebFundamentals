project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-02-21 #}
{# wf_published_on: 2012-08-14 #}
{# wf_tags: news,forms,datalist #}
{# wf_blink_components: N/A #}

# [datalist] for range/color inputs offer some default choices   {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}


Chrome started to support `datalist` for `input[type=text]` in Chrome 20. `datalist` helps developers provide recommended values, while allowing users the liberty to write arbitrary values at the same time. Beginning with Chrome 23, you can use `datalist` for `input[type=range]` and `input[type=color]` as well!

### input[type=range]

`datalist` for `input[type=range]` introduces the ability for developers to show indicators beside the slider as shown below:

![range datalist](/web/updates/images/2012-08-15-datalist-for-range-color-inputs-offer-some-default-choices/input-range.jpg)


    <input type="range" value="0" min="0" max="100" list="numbers" />
    <datalist id="numbers">
      <option>10</option>
      <option>15</option>
      <option>30</option>
      <option>50</option>
      <option>90</option>
    </datalist>


Moving the slider thumb on the input snaps to each of the ticks so that users can easily adjust to those values.

### input[type=color]

`input[type=color]` is already [supported in Chrome](https://caniuse.com/#feat=input-color) and Opera. Users can pick arbitrary color without any help from JavaScript plugins.

By adding `datalist` to `input[type=color]`, users can now pick a color from developer selected color swatches as well as choosing arbitrary color from a color picker by themselves.

![color datalist](/web/updates/images/2012-08-15-datalist-for-range-color-inputs-offer-some-default-choices/input-color.jpg)


    <input type="color" value="#000000" list="colors" />
    <datalist id="colors">
      <option>#ff0000</option>
      <option>#0000ff</option>
      <option>#00ff00</option>
      <option>#ffff00</option>
      <option>#00ffff</option>
    </datalist>


Note that `datalist` for `input[type=color]` only accepts the hex color values (ex. `#ff0000`) and values such as `#f00` or `red` won’t work.

To see these new features in action, visit [a demo page](https://demo.agektmr.com/datalist/){: .external }.


