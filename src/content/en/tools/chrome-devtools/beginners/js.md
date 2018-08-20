project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml

{# wf_updated_on: 2018-08-20 #}
{# wf_published_on: 2018-07-30 #}
{# wf_blink_components: Platform>DevTools #}

# DevTools For Beginners: Getting Started with JavaScript {: .page-title}

This is the second in a series of tutorials that teach you the basics of web
development. 
You are going to learn web development by actually building your own website.
In this particular tutorial, you learn about JavaScript, another of the core
technologies of web development. JavaScript controls the behavior of webpages. 

Currently your site looks like this: 

`(TODO: A screenshot of the CSS site)`

After completing the tutorial, it will look like this: 

`(TODO: A screenshot of the final site)`

You've probably noticed that the finished site looks nearly identical to 
the site you created in the last tutorial.
 That's because you will be working on the internal behavior of your site in this section.

## Goals {: #goals }

By the end of this tutorial, you will understand:

* How JavaScript is used in websites.
* How Chrome DevTools can help you when you're working with JavaScript.
* The difference between basic JavaScript and JavaScript Frameworks.

You'll also have completed a real, working website!

## Prerequisites {: #prerequisites }

Before attempting this tutorial, complete the following prerequisites:

* Complete the previous tutorials on HTML and DOM  and CSS or complete *Setup* below.
* Download the [Google Chrome][chrome]{: .external } web browser. 
This tutorial uses a set of web development tools, called Chrome DevTools, 
that are built into Google Chrome. 
[chrome]: https://www.google.com/chrome/

## Setup {: #setup}

Note: If you have already completed the first and second tutorials in this series, 
skip this section! 

In order to start creating your site, you need to set up your code:

1. Open the [source code](https://dfb4.glitch.me/). A code editor called 
Glitch shows a page called 
index.html.

`(TODO: A screenshot showing the action.)`

2. Click **dfb4**. A menu pops up.

`(TODO: A screenshot showing the menu)`

3. Click **Remix**. Glitch creates a copy of the project that you can 
edit. Note that the name of the new project will be randomly generated
and not dfb4.
The content is the same, but the name on the top-left has changed.
4. Click **Show Live**. Another tab opens with view of what your site 
currently looks like.

`(TODO: A screenshot showing the result.)`

Now, you have two tabs open: the code
(which will be called the editing tab) 
and the preview of your website (which will be called the viewing tab).

## What is JavaScript?

JavaScript is a useful programming langauge that is used in web development. 
In previous tutorials, 
JavaScript was referred to as the language that controlled the *behavior* of a language.

Since JavaScript can sound a bit daunting at first, 
you'll be using an example script to see how the langauge works. 

Note: Despite similar sounding names and code syntax, 
JavaScript and Java are not the same language. Think of them as distant cousins. 

### Contact Form

`(TODO: A screenshot of the finished contact form)`

Important: The example form you are building will not function as
a full contact form with email capabilities, 
but is a mockup designed to teach you how JavaScript functions work. 
To build a working contact form, you'd need to use a langauge like PHP.


First, you'll need to create some new HTML elements: 

Note: Since you are using the Bootstrap framework for your site, 
the following code uses framework-specific HTML elements. 
Because of this, the code may not work on non-Bootstrap sites.

1. Copy this code:
```
 <div class = "contactform" style = "padding-left: 5px;">
   <h2> Enter your info and a message, and I'll get back to you ASAP! </h2>
      
    <form>
  <div class="form-group">
    <label for="email">Email address</label>
    <input type="email" class="form-control" id="email" placeholder="name@example.com">
  </div>
  <div class="form-group">
    <label for="reason">Subject</label>
    <select class="form-control" id="reason">
      <option>Job Offer</option>
      <option>Food Question</option>
      <option>Board Game Invite</option>
      <option>Date Offer ;)</option>
      <option>Other</option>
    </select>
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea class="form-control" id="message" rows="3"></textarea>
  </div>
<button type="button" class="btn btn-primary">Submit</button>
</form>
   </div> 
```
This creates the physical form fields and submission button. 
Since this is a Bootstrap element, it already has CSS attached.

2. Go to the editing tab.
3. Use the menu on the left hand side to navigate to `contact.html`.

`(TODO: A screenshot of the menu)`

4. Paste the code under the `<main>` tag.

`(TODO: A screenshot of the code)`

Now that that's done, you can think about the JavaScript. 
There are some terms you should know:

- Variables (called **var** in JavaScript) store data (known as objects).
For example, if you wanted to store a message, you'd type something like 
`var message= "This is a message";`
- A function is a resuable piece of code that can be called anywhere within your script.
Javascript has many of these functions built in. 
For example, if you wanted a pop-up alert to say a message, 
you'd type something like `alert(message);`

Believe it or not, you're halfway to having your contact form completed! 
You can combine the two points above to get a function like this:

```
function contactMe(){
  var message = "This is a message";
  alert(message);
}
```

Now, add that code to your site's `.js` file:

1. Using the menu on the left hand side of the editing tab, navigate to **new.js**.

`(TODO: A screenshot of the menu)`

2. Paste in the code after the _ function.

`(TODO: A screenshot of the code)`

3. Go to the viewing tab.
4. Click on the **Contact** link to go to the contact page.

`(TODO: A screenshot of the page)`

5. Press the button on the contact form labelled **Submit**.

So, nothing happened. That's because you need to bind your script to an HTML element 
for anything for the code to execute. To do that:

1. Return to the editing tab.
2. In contact.html, navigate to the code for the submit button. 
The code begins with `<button type="button" class="btn btn-primary"`.
3. After `class= "btn btn-primary"`, press <kbd>Spacebar</kbd>.
4. Type `onclick = "contactMe()"`. 
This tells the browser that you'd like it to run your function when 
someone clicks on the submit button.

`(TODO: A screenshot of the code)`

5. Go to the viewing tab.
6. Click on the **Contact** link to go to the contact page.
7. Press the button on the contact form labelled **Submit**. A pop-up should appear.

`(TODO: A screenshot of the alert)`

Note: If nothing appears, unblock popups and try again.

You've created your first JavaScript script! But there's still something missing. 
Most contact forms use the information given to them by the user to output a message. 
Luckily, it's easy to do this by using the DOM and CSS knowledge you've gained previously.

Javascript has a function called `document.getElementById`. 
This allows you to find any HTML element in the DOM, using CSS selector, id, tag, 
or class of the element. So, if you wanted to find the element with the id `message`, 
you'd type `document.getElementById('message')`. 
To get that element's value, you'd type `document.getElementById('message').value`.
Putting everything together, you'd get:

```
function contactMe(){
  var message = document.getElementById('email').value; 
  message += " has a " ;
  message += document.getElementById('reason').value + "." ;
  message += "They said: " + document.getElementById('message').value + "!";
  alert(message);
}

```

1. Go to the editing tab.
2. In contact.html, delete the old contactMe() script.

`(TODO: A screenshot of the action)`

3. Paste in the new script.

`(TODO: A screenshot of the code)`

4. Go to the viewing tab.
5. Press the button on the contact form labelled **Submit**. A pop-up should appear.

`(TODO: A screenshot of the alert)`

Your contact form is now complete!


## DevTools and JavaScript Debugging

Of course, much like life, not all JavaScript code is perfect. 
DevTools can help you fix your code when things don't go right.

### Nickname Generator

Here's some code for a simple Nickname Generator. 
It takes your name and a personality trait and combines 
them together to create a somewhat cool nickname. 
For example, `Tony` and `Cool` becomes `Cony` and `Kat` and `Cool` becomes 	`Cat`. 
In other words, the first letter of the inputted name is changed to the first letter of the 
inputted personality trait:

```
function nameGen(name, personality) {
	var first = name;
	var second = personality;
	first = first.substring(1, personality.length);
	second = second.substring(1, 5);
    document.getElementById("result").innerHTML = first + second;
}
```

You'll also need this HTML code:

```
 < <h4> Nickname Generator</h4>
    <form>
  <div class="form-group">
    <label for="name">First Name</label>
    <input type="text" class="form-control" id="name" placeholder="Your first name">
  </div>
  <div class="form-group">
    <label for="personality">Personality Trait</label>
    <input type="text" class="form-control" id="personality" placeholder="A personality trait that suits you">
  </div>
   <button type="button" class="btn btn-primary" onclick= "nameGen(document.getElementById('name').value, document.getElementById('personality').value)" >Submit</button>
   <h5 id="result">Generate a nickname...</h5>
</form>
```

Just like the previous example, 
this HTML creates a form that will be used to get information from the user. 
Note that once again, the button of the form has a script linked to it.

Now, you can set up the nickname generator.

1. Go to the editing tab.
2. In `index.html`, under the `<main>` tag, paste the HTML code listed above.

`(TODO: A screenshot of the code)`

3. Using the menu on the left-hand side, navigate to `new.js`.
4. Paste the `nameGen` function under the `contactMe` function.

`(TODO: A screenshot of the code)`

5. Go to the viewing tab.
6. Press the button on the nickname generator labelled **Submit**. 
The text `Generate a Nickname` should change.

`(TODO: A screenshot of the result)`



#### Find Bugs

You've created a nickname generator, but there's something wrong with it. 
Going back to the original example, `Cool` and `Tony` should return `Cony`, 
but the generator returns `Coolony`, a clearly inferior nickname. 
But what's wrong with the code?  
Theoretically, you could spend time trying to brute force your way through the error, 
but DevTools provides a different workflow.

###The Sources Panel

Unlike the previous two tutorials, you will be using the Sources Panel, 
so you should check it out:

1. Press <kbd>Command</kbd>+ <kbd>Shift</kbd>+<kbd>I<kbd> to open DevTools.
2. On the top of the window, you will see an option to select **Sources**. Click on that.

`(TODO: A screenshot of the Sources Panel)`

Now that you're in the Sources Panel, you'll see three panes: 

`(TODO: A labelled screenshot of the panel)`

1. The **File Navigator**, which contains all the files on your webpage.
2. The **Code Editor**, which allows you to edit code. 
Since you haven't selected a file yet, it's empty.
3. The **JavaScript Debugger**, which helps you debug JavaScript.

While it may seem like there's a lot of confusing content in the Sources Panel, 
it's a lot easier to navigate than it looks.

### Pause and Step Through Code

Think about your script for a bit. 
Where is the bug occurring? 
The answer can be found using DevTools with **breakpoints**. 
Break points pause the code in a specific area so that you can check on the status 
of your functions at different places in time. 

1. In the **Debugger** pane, click **Event Listener Breakpoint**. 
You may have to scroll down depending on the size of the window.

`(TODO: A screenshot of the menu)`

2. Scroll down to the **Mouse** category, and click on the gray triangle to expanded it. 
You're looking at a list of all of the supported mouse commands you can break at.

`(TODO: A screenshot of the menu)`

3. Since your code involves clicking a button to execute a script, 
selected the **click** checkbox. 

`(TODO: A screenshot of the checkbox)`

4. On your site, press the submit button again. 
The code should pause on the line where `onClick =` is called. 
If it doesn't, you will need to complete this tutorial in incognito mode 
or with extensions disabled, as an extension is interferring with your page.

`(TODO: A screenshot of the result)`

Note: There are many types of breakpoints DevToools can use, 
each with it's own specific use case. A list of them is [here](TODO).

Now that the code is paused, 
you can step through it to determine if your code is executing properly:

1. In the **Debugger Pane**, press the [TODO] icon to step through the code.

`(TODO: A screenshot of the icon highlighted)`

### Check Variables

Now that you're stepping through the code, 
you can check your variables during every step of your function:

1. Navigate to the line with `var first = name` by pressing the press the [TODO] icon. 
If you stepped out of the function, press the submit button again.

`(TODO: A screenshot of the line highlighted)`

2. In the **Debugger** pane, there is an additional **Scope** pane. 
It displays the local and global variables of your function. 
Make a note of the values displayed.

`(TODO: A screenshot of the Scope Pane)`

3. Step through the code with the [TODO] icon. Make a note of the values displayed.

`(TODO: A screenshot of the Scope Pane)`

Here, you can see that the third line of the function (`first = first.substring...`) 
is incorrectly shortening the personality variable.
`Cool` should be shortened to `C`, but its not shortened at all.

`(TODO: A screenshot of the Scope Pane)`

### Fix Bugs

Now that you know where the bug is, you can attempt to fix it. You have:

`first = first.substring(1, personality.length);`

If you know about the substring function from another programming language, 
it is easy to see the error, but for those who don't, 
the current function is creating a string of text that is made up 
of a part of another string. In this case, the string would be from the second letter of 
the word to the last letter of the word (so `Great` would be `reat`). 
The proper way to write this function would be:

`first = first.substring(0, 1);`

Or, in plain English, the first character of the String. 

Note: In a majority of programming languages, counting starts at 0, not 1. So, the first character of a word is the 0th character.

Some eagle-eyed readers may have noticed that there's also a bug in the second variable 
as well. This code `second = second.substring(1, 5);` only works for words shorter than 
6 characters long. It should be `second = second.substring(1, name.length);`. 
When you're creating scripts, make sure to test your code on a variety of inputs 
to avoid errors like these.

`(TODO: A screenshot of the finished nickname generator)`

Congratulations! You've debugged your first JavaScript script!



## JavaScript Frameworks

Much like CSS, JavaScript has many frameworks you can use to make creating a website easier.
To reitrate from the last tutorial, a framework is a collection 
of pre-written code that developers can use and reuse as they wish. 
However, since JavaScript has many applications in many facets of a website, 
frameworks can have many different use cases.

An example of a framework is [Polymer][polymer],
a framework designed to make quicker, more repsonsive web apps. 
[polymer]: https://www.polymer-project.org/3.0/start/toolbox/set-up

Other frameworks, like [Angular][angular] aim to make web development easier for developers. 
[angular]: https://angular.io/ 

There are pros and cons to using code frameworks (see [here](TODO) for a list), 
but it's a good idea to at least be a bit knowledgable about how they work.


## Wrapping Up

You've offically finished your own website! 
Feel free to use it for whatever purpose you desire. 
Of course, the field of web development is always changing and there will always be
ways to improve it. Best of luck on your web development journey!

### What You Should Teach Yourself Next
- Accesibility in Web Design: 
Did you know that TODO% of web users use assistive technology? 
Teach yourself how to design sites for all users.
- Other Programming Languages: 
PHP, SQL, and XML are all tools that can take your site to the next level.
- JavaScript and or CSS Frameworks: 
If you're a Computer Science student or looking into web development as a career, 
these are in demand right now.

### More Web Development Resources

Here are some more resources:

- TODO
- TODO
- TODO

