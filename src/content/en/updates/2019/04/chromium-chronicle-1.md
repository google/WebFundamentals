project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: the Chromium Chronicle, a monthly series geared specifically to Chromium developers, developers who build the browser.

{# wf_updated_on: 2019-04-04 #}
{# wf_published_on: 2019-04-04 #}
{# wf_tags: chromium-chronicle #}
{# wf_featured_image: /web/updates/images/generic/cr-chron.jpg #}
{# wf_featured_snippet: The Chrome team is proud to introduce the Chromium Chronicle, a monthly series geared specifically to Chromium developers, developers who build the browser. This month, we take a look at task scheduling best practices. #}
{# wf_blink_components: N/A #}

<style>
  pre.prettyprint.cc-bad { background-color: #fff7f7; }
  pre.prettyprint.cc-good { background-color: #f7fff7; }
</style>

# The Chromium Chronicle: Task Scheduling Best Practices {: .page-title }

The Chrome team is proud to introduce the Chromium Chronicle, a monthly
series geared specifically to Chromium developers, developers who build the
browser.

The Chromium Chronicle will primarily focus on spreading technical knowledge
and best practices to write, build, and test Chrome. Our plan is to feature
topics that are relevant and useful to Chromium developers, such as code
health, helpful tools, unit testing, accessibility and much more! Each article
will be written and edited by Chrome engineers.

We are excited about this new series, and hope you are too! Ready to dive in?
Take a look at our first episode below!

## Task Scheduling Best Practices

**Episode 1:** April 2019

*by Gabriel in Montreal*

Chrome code that needs in-process asynchronous execution typically posts tasks
to sequences. **Sequences are chrome-managed “[virtual threads][virtual-threads]”.**
How does an object know which sequence to post to?

The old paradigm is to receive a SequencedTaskRunner from the creator:
{: .compare-worse }

<pre class="prettyprint cc-bad lang-cpp">
<strong>Foo::Foo(scoped_refptr<base::SequencedTaskRunner> backend_task_runner)</strong>
    : backend_task_runner_(std::move(backend_task_runner)) {}
</pre>

The preferred paradigm is to create an independent SequencedTaskRunner:
{: .compare-better }

<pre class="prettyprint cc-good lang-cpp">
Foo::Foo()
    : backend_task_runner_(
          <strong>base::CreateSequencedTaskRunnerWithTraits({
              base::MayBlock(), base::TaskPriority::BEST_EFFORT})) {}</strong>
</pre>

This is easier to read and write as all the information is local and there’s
no risk of inter-dependency with unrelated tasks.

This paradigm is also better when it comes to testing. Instead of injecting
task runners manually, tests can **instantiate a controlled task environment**
to manage Foo’s tasks:

<pre class="prettyprint lang-cpp">
class FooTest : public testing::Test {
 public
  (...)
 protected:
  <strong>base::test::ScopedTaskEnvironment task_environment_;</strong>
  Foo foo_;
};
</pre>

Having **ScopedTaskEnvironment first in the fixture** naturally ensures it
manages the task environment throughout Foo’s lifetime. The ScopedTaskEnvironment
will capture Foo’s request-on-construction to create a SequencedTaskRunner and
will manage its tasks under each FooTest.

To test the result of asynchronous execution, **use the RunLoop::Run()+QuitClosure()
paradigm**:

<pre class="prettyprint lang-cpp">
TEST_F(FooTest, TestAsyncWork) {
  <b>RunLoop</b> run_loop;
  foo_.BeginAsyncWork(<b>run_loop.QuitClosure()</b>);
  <b>run_loop.Run();</b>
  EXPECT_TRUE(foo_.work_done());
}
</pre>

**This is preferred to RunUntilIdle(), which can be flaky** if the asynchronous
workload involves a task outside of the ScopedTaskEnvironment’s purview,
e.g. a [system event][system-event].

<aside class="success">
Pro-tip: Use ScopedTaskEnvironment’s MOCK_TIME mode to reliably test delayed
tasks.
</aside>

**Want to learn more?** Read our pages or [threading and tasks][threading-and-tasks]
or browse through our public doc on [ScopedTaskEnvironment][scoped-task-env]!

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[virtual-threads]: https://chromium.googlesource.com/chromium/src/+/lkgr/docs/threading_and_tasks.md#Prefer-Sequences-to-Threads
[threading-and-tasks]: https://chromium.googlesource.com/chromium/src/+/master/docs/threading_and_tasks.md
[scoped-task-env]: https://docs.google.com/document/d/1QabRo8c7D9LsYY3cEcaPQbOCLo8Tu-6VLykYXyl3Pkk/edit
[system-event]: https://cs.chromium.org/chromium/src/base/test/scoped_task_environment.h?type=cs&q=file:scoped_task_environment.h+%22void+RunUntilIdle()%22+WARNING+case:yes&sq=package:chromium&g=0&l=169
