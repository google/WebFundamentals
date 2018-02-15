project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2018-02-15 #}
{# wf_published_on: 2016-01-01 #}


# Setting Up the Labs {: .page-title }




## Overview




Use these instructions to install the lab repository on your computer prior to starting the labs. You must also install Node and set up a local Node server.

### Prerequisites

* These labs are intended to be used on systems running Windows 7 and later, macOS, and Linux. 
* Multiple browsers - although individual labs may require a specific level of support for progressive web apps, we recommend trying out the labs on multiple browsers (where feasible) so that you get a sense of how different users might experience the app.
* A programming editor - for example,  [Atom](https://atom.io/),  [Sublime Text](https://www.sublimetext.com/), or  [Notepad++](https://notepad-plus-plus.org/) (for Windows only).



Note: Although not a hard requirement, for general development it can be useful to <a href="tools-for-pwa-developers#disablehttpcache">disable the HTTP cache</a></a>.




## Set up Node & NPM




Install  [Node](https://nodejs.org/en/) and run a local Node server (you may need administrator privileges to do this).

We recommend installing the latest __long term support (LTS)__ version of  [Node](https://nodejs.org/en/) (labelled as "LTS, Recommended for Most Users") rather than the most current version with the latest features (the current version may be unstable). 

### Using NVM

If you have an existing version of Node installed that you would like to keep, you can install a Node version manager (for  [macOS and Linux platforms](https://github.com/creationix/nvm) and  [Windows](https://github.com/coreybutler/nvm-windows)). This tool (NVM) lets you install multiple versions of Node, and easily switch between them. If you have issues with a specific version of Node, you can <a href="https://github.com/creationix/nvm#usage">switch to another version</a> with a single command.

Install Node by running one of the following commands from the command line:

If you have installed Node Version Manager (for macOS, Linux, or Windows):

    nvm install node <version>

For example:

    nvm install node 6.11.2

For the Windows version you can specify whether to install the 32-bit or 64-bit binaries.  For example:

    nvm install node 6.11.2 64

### Without NVM

If you did not install NVM, download and install Node from the  [Node.js](https://nodejs.org/en/) website.

This also installs Node's package manager,  [`npm`](https://www.npmjs.com/). 

### Check Node and NPM versions

Check that Node and `npm` are both installed by running the following commands from the command line:

    node -v
    npm -v

If both commands return a version number, then the installations were successful. 


## Install a simple Node HTTP server




Install a simple Node server with the following command:

    npm install http-server -g


## Clone the repo




Clone the course repository with Git using the following command: 

    git clone https://github.com/google-developer-training/pwa-training-labs.git
    cd pwa-training-labs

Some projects in the download contain folders that correspond to checkpoints in the lab (in case you get stuck during the labs, you can refer back to the checkpoints to get back on track). 



Note: If you do not use Git, then you can <a href="https://github.com/google-developer-training/pwa-training-labs/archive/master.zip">download the repo as a zip file</a>. Note that if you download the repository with this method, it will be named __pwa-training-labs-master__ instead of __pwa-training-labs__. Rename the folder to __pwa-training-labs__ so that the name is consistent with the lab instructions.




## Start the local server




From the __pwa-training-labs__ directory, run the server with the following:



Note: If this command blocks your command line, open a new command-line window.



    http-server -p 8080 -a localhost -c 0

Remember to restart the server if you shut down your computer, or end the process using  `Ctrl-c`.

### Explanation

Node packages are used throughout the labs.  [Npm](https://www.npmjs.com/) will allow easy package installation. The `http-server` server lets you test your code on __localhost:8080__.


