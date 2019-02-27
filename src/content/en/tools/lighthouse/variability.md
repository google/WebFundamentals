project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: A guide on dealing with variance in Lighthouse results

{# wf_updated_on: 2019-02-26 #}
{# wf_published_on: 2019-02-25 #}
{# wf_blink_components: N/A #}

# Lighthouse Variability {: .page-title }

Lots of factors contribute to the performance of webpages. Lighthouse
performance scores tend to change due to the inherent variability in web and
network technologies, even if there hasn't been a change to the page.

## Sources of Variability

Variability in performance measurement is introduced via a number of channels
with different levels of impact. Below is a table containing several common
sources of metric variability, the typical impact they have on results, and the
extent to which they are likely to occur in different environments.

| Source                      | Impact | Typical End User | PageSpeed Insights | Controlled Lab |
| --------------------------- | ------ | ---------------- | ------------------ | -------------- |
| Page nondeterminism         | High   | LIKELY           | LIKELY             | LIKELY         |
| Local network variability   | High   | LIKELY           | UNLIKELY           | UNLIKELY       |
| Tier-1 network variability  | Medium | POSSIBLE         | POSSIBLE           | POSSIBLE       |
| Web server variability      | Low    | LIKELY           | LIKELY             | LIKELY         |
| Client hardware variability | High   | LIKELY           | UNLIKELY           | UNLIKELY       |
| Client resource contention  | High   | LIKELY           | POSSIBLE           | UNLIKELY       |
| Browser nondeterminism      | Medium | CERTAIN          | CERTAIN            | CERTAIN        |

Below are more detailed descriptions of the sources of variance and the impact
they have on the most likely combinations of Lighthouse runtime + environment.
While applied throttling and simulated throttling approaches could be used in
any of these three environments, the typical end user uses simulated throttling.

### Page Nondeterminism

Pages can contain logic that is nondeterministic that changes the way a user
experiences a page, i.e. an A/B test that changes the layout and assets loaded
or a different ad experience based on campaign progress. This is an intentional
and irremovable source of variance. If the page changes in a way that hurts
performance, Lighthouse should be able to identify this case. The only
mitigation here is on the part of the site owner in ensuring that the exact same
version of the page is being tested between different runs.

### Local Network Variability

Local networks have inherent variability from packet loss, variable traffic
prioritization, and last-mile network congestion. Users with cheap routers and
many devices sharing limited bandwidth are usually the most susceptible to this.
_Applied_ throttling partially mitigates these effects by applying a minimum
request latency and maximum throughput that masks underlying retries.
_Simulated_ throttling mitigates these effects by replaying network activity on
its own.

### Tier-1 Network Variability

Network interconnects are generally very stable and have minimal impact but
cross-geo requests, i.e. measuring performance of a Chinese site from the US,
can start to experience a high degree of latency introduced from tier-1 network
hops. _Applied_ throttling partially mask these effects with network throttling.
_Simulated_ throttling mitigates these effects by replaying network activity on
its own.

### Web Server Variability

Web servers have variable load and do not always respond with the same delay.
Lower-traffic sites with shared hosting infrastructure are typically more
susceptible to this. _Applied_ throttling partially masks these effects by
applying a minimum request latency in its network throttling. _Simulated_
throttling is susceptible to this effect but the overall impact is usually low
when compared to other network variability.

### Client Hardware Variability

The hardware on which the web page is loading can greatly impact performance.
_Applied_ throttling cannot do much to mitigate this issue. _Simulated_
throttling partially mitigates this issue by capping the theoretical execution
time of CPU tasks during simulation.

### Client Resource Contention

Other applications running on the same machine while Lighthouse is running can
cause contention for CPU, memory, and network resources. Malware, browser
extensions, and anti-virus software have particularly strong impacts on web
performance. Multi-tenant server environments (such as Travis, AWS, etc) can
also suffer from these issues. Running multiple instances of Lighthouse at once
also typically distorts results due to this problem. _Applied_ throttling is
susceptible to this issue. _Simulated_ throttling partially mitigates this issue
by replaying network activity on its own and capping CPU execution.

### Browser Nondeterminism

Browsers have inherent variability in their execution of tasks that impacts the
way webpages are loaded. This is unavoidable for applied throttling as at the
end of the day they are simply reporting whatever was observed by the browser.
_Simulated_ throttling is able to partially mitigate this effect by simulating
execution on its own, only re-using task execution times from the browser in its
estimate.

### Effect of Throttling Strategies

Below is a table containing several common sources of metric variability, the
typical impact they have on results, and the extent to which different
Lighthouse throttling strategies are able to mitigate their effect. Learn more
about different throttling strategies in our
[throttling documentation](https://github.com/GoogleChrome/lighthouse/blob/v4.1.0/docs/throttling.md).

| Source                      | Impact | Simulated Throttling | Applied Throttling  | No Throttling |
| --------------------------- | ------ | -------------------- | ------------------- | ------------- |
| Page nondeterminism         | High   | NO MITIGATION        | NO MITIGATION       | NO MITIGATION |
| Local network variability   | High   | MITIGATED            | PARTIALLY MITIGATED | NO MITIGATION |
| Tier-1 network variability  | Medium | MITIGATED            | PARTIALLY MITIGATED | NO MITIGATION |
| Web server variability      | Low    | NO MITIGATION        | PARTIALLY MITIGATED | NO MITIGATION |
| Client hardware variability | High   | PARTIALLY MITIGATED  | NO MITIGATION       | NO MITIGATION |
| Client resource contention  | High   | PARTIALLY MITIGATED  | NO MITIGATION       | NO MITIGATION |
| Browser nondeterminism      | Medium | PARTIALLY MITIGATED  | NO MITIGATION       | NO MITIGATION |

## Strategies for Dealing With Variance

### Isolate External Factors

- Isolate your page from third-party influence as much as possible. It’s never
  fun to be blamed for someone else's variable failures.
- Isolate your own code’s nondeterminism during testing. If you’ve got an
  animation that randomly shows up, your performance numbers might be random
  too!
- Isolate your test server from as much network volatility as possible. Use
  localhost or a machine on the same exact network whenever stability is a
  concern.
- Isolate your client environment from external influences like anti-virus
  software and browser extensions. Use a dedicated device for testing when
  possible.

If your machine has really limited resources or creating a clean environment has
been difficult, use a hosted lab environment like PageSpeed Insights or
WebPageTest to run your tests for you. In continuous integration situations, use
dedicated servers when possible. Free CI environments and “burstable” instances
are typically quite volatile.

### Run Lighthouse Multiple Times

When creating your thresholds for failure, either mental or programmatic, use
aggregate values like the median, 90th percentile, or even min instead of single
tests.

The median Lighthouse score of 5 runs is twice as stable as 1 run, and tools
like [pwmetrics](https://github.com/paulirish/pwmetrics) can run Lighthouse for
you automatically. Using the minimum value is also a big improvement over not
testing at all and is incredibly simple to implement, just run Lighthouse up to
5 times until it passes!

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}
