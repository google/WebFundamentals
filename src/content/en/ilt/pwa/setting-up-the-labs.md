project_path: /web/_project.yaml
book_path: /web/ilt/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-02-24T00:58:48Z #}
{# wf_published_on: 2016-01-01 #}


# Setting Up the Labs {: .page-title }




## Introduction




Use these instructions to install the lab repository on your computer prior to starting the labs. You must also install Node and set up a local Node server.


## Before you begin




### Development OS

These labs are intended to be used on systems running Windows 7 and later, macOS, and Linux. 

### Browsers

Part of the value of progressive web apps is in their ability to scale functionality to the user's browser and computing device (progressive enhancements). Although individual labs may require a specific level of  [support for progressive web apps](https://jakearchibald.github.io/isserviceworkerready/), we recommend trying out the labs on multiple browsers (where feasible) so that you get a sense of how different users might experience the app. 

### Node

We recommend installing the latest long term support (LTS) version of  [Node](https://nodejs.org/en/) (currently v6.9.2, which includes npm 3.10.9) rather than the most current version with the latest features. 

If you have an existing version of Node installed that you would like to keep, you can install a Node version manager (for  [macOS and Linux platforms](https://github.com/creationix/nvm) and  [Windows](https://github.com/coreybutler/nvm-windows)). This tool (nvm) lets you install multiple versions of Node, and easily switch between them. If you have issues with a specific version of Node, you can <a href="https://github.com/creationix/nvm#usage">switch to another version</a> with a single command.

### Global settings

Although not a hard requirement, for general development it can be useful to <a href="tools-for-pwa-developers#disablehttpcache">disable the HTTP cache</a>.


## Set up Node and install the lab repository




Install  [Node](https://nodejs.org/en/) and run a local Node server (you may need administrator privileges to do this).

1. Install Node by running one of the following commands from the command line:

* If you have installed Node Version Manager (for macOS, Linux, or Windows):

    nvm install node <version>

For example:

    nvm install node 6.9.2

For the Windows version you can specify whether to install the 32-bit or 64-bit binaries. 

For example:

    nvm install node 6.9.2 64

* If you did not install nvm, download and install Node from the  [Node.js](https://nodejs.org/en/) website.

 This also installs Node's package manager,  [npm](https://www.npmjs.com/). 

2. Check that Node and npm are both installed by running the following commands from the command line:

    node -v

    npm -v

 If both commands return a version number, then the installations were successful. 

3. Install a simple Node server with the following command:

    npm install http-server -g

4. Clone the course repository with Git using the following command: 

    git clone https://github.com/google-developer-training/pwa-training-labs.git



Note: If you do not use Git, then download the repo from <a class="btn" role="button" href="https://github.com/google-developer-training/pwa-training-labs/archive/master.zip">GitHub</a>.



5. Navigate into the cloned repo:

    cd pwa-training-labs

 Note that some projects in the download contain folders that correspond to checkpoints in the lab (in case you get stuck during the labs, you can refer back to the checkpoints to get back on track). 

6. From the __pwa-training-labs__ directory, run the server with the following:

    http-server -p 8080 -a localhost -c 0

Remember to restart the server if you shut down your computer, or end the process using  `Ctrl-c`.



Note: If this command blocks your command line, open a new command line window.



### Explanation

Node packages are used throughout the labs.  [Npm](https://www.npmjs.com/) will allow easy package installation. The `http-server` server lets you test your code on __localhost:8080__.


