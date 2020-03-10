project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml

{# wf_updated_on: 2020-03-10 #}
{# wf_published_on: 2019-02-11 #}
{# wf_blink_components: N/A #}

# Chrome User Experience Report {: .page-title }

## Changelog {: #changelog }

The CrUX dataset on BigQuery is updated on the second Tuesday of every month. Each release is 
numbered according to the year and calendar month of the data collection period, for example 201912 
corresponds to the UX data collected during December 2019 and would be released on the second 
Tuesday of January 2020 after the data collection period has ended.

In the list below, we've curated some release notes for each monthly dataset. Subscribe to our [CrUX Announce](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report-announce) mailing list or follow 
[@ChromeUXReport](https://twitter.com/ChromeUXReport) on Twitter for release announcements.

### 202002

<dl>
	<dt>Publication date</dt>
	<dd>March 10, 2020</dd>
	<dt>Notable stats</dt>
	<dd>
		<ul>
			<li>6,366,736 origins</li>
		</ul>
	</dd>
</dl>

### 202001

<dl>
	<dt>Publication date</dt>
	<dd>February 11, 2020</dd>
	<dt>What's new</dt>
	<dd>
		Experimental metric on <a href="/web/updates/2020/02/notification-permission-data-in-crux">notification permission acceptance rates</a>
	</dd>
	<dt>Notable stats</dt>
	<dd>
		<ul>
			<li>5,976,293 origins</li>
		</ul>
	</dd>
</dl>

### 201912

- 5,532,155 origins

### 201911

- 5,821,306 origins
- the [FID](./#first-input-delay) metric was moved from `experimental.first_input_delay` to 
`first_input.delay`
- the [CLS](./#cumulative-layout-shift) metric was moved from 
`experimental.cumulative_layout_shift` to `layout_instability.cumulative_layout_shift`

### 201910

- 5,752,729 origins

### 201909

- 6,008,004 origins
- the [LCP](./#largest-contentful-paint) metric was launched as `largest_contentful_paint`
- [CLS](./#cumulative-layout-shift) was updated to take 
[move distance](https://github.com/WICG/layout-instability/blob/master/README.md#distance-fraction) 
into account
    - coverage may be lower while Chrome users upgrade to the latest version of the 
    Layout Instability API

### 201908

- 6,011,463 origins
- [FID](./#first-input-delay) coverage has returned to normal
- the average percent of fast experiences for most metrics dropped by about 2%
    - this appears to be due to a [bug in Chrome](https://chromium.googlesource.com/chromium/src/+/master/docs/speed/metrics_changelog/2019_12_fcp.md)

### 201907

- 5,612,504 origins
- there was an [incremental update](https://chromium.googlesource.com/chromium/src/+/master/docs/speed/metrics_changelog/2019_07_fid.md) to Chrome's [FID](./#first-input-delay) implementation, which included pointer events on mobile
    - coverage will be lower while Chrome users update to the latest version

### 201906

- 5,624,797 origins
- the [TTFB](./#time-to-first-byte) metric was added to the list of experimental metrics as 
`experimental.time_to_first_byte`

### 201905

- 5,884,155 origins
- the [CLS](./#cumulative-layout-shift) metric was added to the list of experimental metrics as 
`experimental.cumulative_layout_shift`

### 201904

- 5,744,982
- there was an incremental update to Chrome's [FID](./#first-input-delay) implementation
    - coverage will be lower while Chrome users update to the latest version

### 201903

- 5,703,255 origins
- there was an incremental update to Chrome's [FID](./#first-input-delay) implementation
    - coverage will be lower while Chrome users update to the latest version

### 201902

- 5,464,560 origins

### 201901

- 5,351,287 origins

### 201812

- 4,654,112 origins

### 201811

- 4,697,003 origins

### 201810

- 4,374,729 origins

### 201809

- 4,375,805 origins

### 201808

- 4,386,422 origins
- histogram bins have been normalized to consistent widths 
([more info](https://twitter.com/ChromeUXReport/status/1042443549676064768))

### 201807

- 4,202,945 origins

### 201806

- 4,134,123 origins
- the [FID](./#first-input-delay) metric was added to the list of experimental metrics as 
`experimental.first_input_delay` ([learn more](/web/updates/2018/07/first-input-delay-in-crux))

### 201805

- 4,162,633 origins

### 201804

- 3,970,181 origins

### 201803

- 3,589,954 origins

### 201802

- 3,237,524 origins

### 201801

- 3,086,603 origins
- added [country dimension](/web/updates/2018/01/crux)

### 201712

- 1,939,945 origins

### 201711

- 1,237,407 origins
- expanded dataset [with 1M+ origins](/web/updates/2017/12/crux)

### 201710

- 10,000 origins
- [Chrome User Experience Report beta preview is launched](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html) at Chrome Dev Summit
