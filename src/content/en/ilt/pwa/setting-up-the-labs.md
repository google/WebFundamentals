project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2018-08-15 #}
{# wf_published_on: 2016-01-01 #}


# Setting Up the Labs {: .page-title }




## Overview




Use these instructions to install the lab repository on your computer prior to starting the labs. You must also install  [Node.js](https://nodejs.org/en/) (the most recent LTS version).

### Prerequisites

* These labs are intended to be used on systems running Windows 7 (and later), macOS X 10.1 (and later), and Linux.
* Multiple browsers - although individual labs may require a specific level of support for progressive web apps, we recommend trying out the labs on multiple browsers (where feasible) so that you get a sense of how different users might experience the app.
* A programming editor - for example,  [Atom](https://atom.io/),  [Sublime Text](https://www.sublimetext.com/), or  [Notepad++](https://notepad-plus-plus.org/) (for Windows only).

<aside markdown="1" class="key-point">
<p>Note: Although not a hard requirement, for general development it can be useful to <a href="tools-for-pwa-developers#disablehttpcache">disable the HTTP cache</a>.</p>
</aside>



## Install Git




[Install the latest version of Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on your computer.


## Clone the repo




Open your computer's command line interface. Clone the course repository with Git using the following command:

    git clone https://github.com/google-developer-training/pwa-training-labs.git
    cd pwa-training-labs

Some projects in the download contain folders that correspond to checkpoints in the lab (in case you get stuck during the labs, you can refer back to the checkpoints to get back on track).

<aside markdown="1" class="key-point">
<p>Note: If you do not use Git, then you can  <a href="https://github.com/google-developer-training/pwa-training-labs/archive/master.zip">download the repo as a zip file</a>. Note that if you download the repository with this method, it will be named <strong>pwa-training-labs-master</strong> instead of <strong>pwa-training-labs</strong>. Rename the folder to <strong>pwa-training-labs</strong> so that the name is consistent with the lab instructions.</p>
</aside>



## Set up Node & NPM




If you don't have Node.js, download and install the latest __long term support (LTS)__ version from the  [website](https://nodejs.org/en/). After Node.js is installed, you can skip the rest of this doc and start the labs.

If you already have Node.js installed on your computer, check that it is the latest  [__LTS__ version](https://nodejs.org/en/) with the following command:

```
node -v
```

If it's not the latest LTS version, follow the instructions below to install the right version.

<aside markdown="1" class="key-point">
<p>Note: We recommend the LTS version of Node.js rather than the current version (with the latest features) because the current version may be unstable.</p>
</aside>


### Using NVM

If you have an existing version of Node.js installed that you would like to keep, you can install a Node.js version manager (for  [macOS and Linux platforms](https://github.com/creationix/nvm) and  [Windows](https://github.com/coreybutler/nvm-windows)). This tool (NVM) lets you install multiple versions of Node.js, and easily switch between them. If you have issues with a specific version of Node.js, you can  [switch to another version](https://github.com/creationix/nvm#usage) with a single command.

Install Node.js by running one of the following commands from the command line:

If you have installed Node Version Manager (for macOS, Linux, or Windows):

    nvm install node <version>

For example:

    nvm install node 8.9.4

For the Windows version you can specify whether to install the 32-bit or 64-bit binaries.  For example:

    nvm install node 8.9.4 64

### Without NVM

If you did not install NVM, download and install Node.js from the  [website](https://nodejs.org/en/).

This also installs Node's package manager,  [`npm`](https://www.npmjs.com/).

### Check Node and NPM versions

Check that Node and `npm` are both installed by running the following commands from the command line:

    node -v
    npm -v

If both commands return a version number, then the installations were successful.


