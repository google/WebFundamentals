project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Adding Rank Magnitude to the CrUX Report in BigQuery.

{# wf_updated_on: 2021-03-09 #}
{# wf_published_on: 2021-03-09 #}
{# wf_featured_image: /web/updates/2021/03/images/crux-rank-magnitude/crux-rank-magnitude.png #}
{# wf_featured_snippet: Adding Rank Magnitude to the CrUX Report in BigQuery. #}
{# wf_blink_components: N/A #}

# Adding Rank Magnitude to the CrUX Report in BigQuery. {: .page-title }

{% include "web/_shared/contributors/johannes.html" %}

Starting with the [February 2021
dataset](/web/tools/chrome-user-experience-report/bigquery/changelog#202101),
we’re adding an experimental metric to the [CrUX report in
BigQuery](/web/tools/chrome-user-experience-report/bigquery/getting-started)
which distinguishes the popularity of origins by orders of magnitude: The top 1k
origins, top 10k, top 100k, top 1M, ... Let’s see how this looks in practice:

```SQL
SELECT
  experimental.popularity.rank AS rank_magnitude,
  COUNT(DISTINCT origin) AS num_origins
FROM
  `chrome-ux-report.all.202102`
GROUP BY
  rank_magnitude
ORDER BY
  rank_magnitude
```

| Row | rank_magnitude | num_origins |
| --- | -------------- | ----------- |
| 1   | 1000           | 1000 |
| 2   | 10000          | 9000 |
| 3   | 100000         | 90000 |
| 4   | 1000000        | 900000 |
| 5   | 10000000       | 7264371 |

For the February 2021 global data set, we get 5 buckets. As expected, in row 1,
we see that there are 1000 origins with rank magnitude 1000 - the 1k most
popular origins by our metric. Row 2 may look surprising, indicating that there
are only 9k origins in the top 10k set; this is because the origins in row 1 are
also part of the top 10k set. To select the top 10k origins, one needs to
specify experimental.popularity.rank <= 10000 when querying.

The dataset also contains country specific rank magnitude. For example, this
query lists the 10k origins that are most popular in Germany.


```SQL
SELECT DISTINCT origin
FROM `chrome-ux-report.country_de.202102`
WHERE experimental.popularity.rank <= 10000
```

To touch on the potential of our new popularity metric, let’s see how popularity
segments of the web differ with respect to the [first contentful paint metric
(FCP)](https://web.dev/first-contentful-paint/). For the purpose of this query,
we consider 1 second a fast user experience.

```SQL
SELECT
  SUM(fcp.density)/count(distinct origin)
FROM
  `chrome-ux-report.all.202102`,
  UNNEST(first_contentful_paint.histogram.bin) AS fcp
WHERE
  fcp.start < 1000 AND experimental.popularity.rank <= 1000
```

For the origins with experimental.popularity.rank <= 1000, the query sums all
histogram bucket densities for FCP metric values smaller than 1000ms and divides
it by the number of origins - that is, it calculates the average percentage of
fast FCP loads for the 1k most popular origins. In this query, all origins have
equal weight, so arguably this is not perfect. But let’s see whether the result
is sensitive to changing the rank magnitude, by altering the where clause to
specify experimental.popularity.rank <= 10000. We do this for 10k, 100k, and so
on:

| Rank magnitude of origins | Percentage of FCP < 1s, averaged over origins |
| ------------------------- | --------------------------------------------- |
| 1000                      | 53.6% |
| 10,000                    | 49.6% |
| 100,000                   | 45.9% |
| 1,000,000                 | 43.2% |
| 10,000,000                | 39.9% |

This indicates that a faster user experience on the web is correlated with being more popular.

Learn more about [using CrUX on
BigQuery](https://web.dev/chrome-ux-report-bigquery/) and [browse the CrUX
Cookbook](https://github.com/GoogleChrome/CrUX/tree/main/sql) for more example
queries. Share your queries if you like, and let us know what you find.

{% include "web/_shared/rss-widget-updates.html" %}
