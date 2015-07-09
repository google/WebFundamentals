---
rss: false
layout: article
title: "Set Up a Persistent Workflow"
seotitle: "Set Up Persistent Authoring in Chrome DevTools by Mapping Source Files to Workspaces"
description: "Set up persistent authoring in your developer tools so that you can see your changes immediately and automatically save those changes to disk."
introduction: "Set up persistent authoring in your developer tools so that you can see your changes immediately and automatically save those changes to disk."
authors:
  - megginkearney
  - davegash
  - kaycebasques
article:
  written_on: 2015-07-09
  updated_on: 2015-07-09
  order: 3
collection: workspace
key-takeaways:
  workflows:
    - TBD
---

{% wrap content %}

## Set Up a DevTools Persistent Workflow

{% include modules/toc.liquid %}

### Introduction

As we've seen, Chrome DevTools lets you make changes to a server-delivered site's resource files -- HTML, CSS, JavaScript, and more -- and immediately see those changes reflected in the browser. Of course, such changes are only temporary; if you want to save them, you have to manually copy and paste the code into local files… or do you?

DevTools offers a feature called Workspaces that lets you *map* (associate) the remote in-memory resources to real local files on your hard drive. Using a workspace, DevTools can save your changes to the mapped files and persist them across sessions, thus eliminating the need to copy and paste.

### Initialize a development workspace

Before you can map individual remote resources to local files, you must initialize a workspace for the project. This simple process specifies a local folder for the workspace to use. To set up the workspace, right-click in an empty area of the left pane of the Sources tab and choose **Add folder to workspace**, choose a folder to use as the local file location, and click **Allow** to give Chrome access to the folder. 

Typically, the local folder contains the site's original source files that were used to populate the site on the server. If you do not want to change those original files via the workspace, make a copy of the folder and specify it as the workspace folder instead.

### Map remote resources to local files (staging)

After the workspace is initialized, you can map the site's resources. This establishes a persistent connection between each resource and its local counterpart, effectively making the local folder a staging area from which you can later permanently update the server files.

To map a resource to a local file, right-click a file in the left pane of the Sources tab and choose **Map to file system resource** from the context menu; a dialog opens showing the files in the local folder designated in the initialization step. Choose the local file that matches the one you right-clicked, e.g., index.html. Chrome will ask you to let it restart the inspector; click **Yes**, and DevTools will reopen with your *local* folder and files shown in the Sources tab. The resource you choose will be mapped to its local file counterpart, as will all remote resources that match local files.

Reload the page in Chrome. Thereafter, when Chrome loads the mapped URL, it displays the workspace folder contents instead of the network folder contents. You can then work directly in the local files without having to repeatedly switch between Chrome and an external editor.

#### Limitations

As powerful as Workspaces are, there are some limitations you should be aware of.

* Only style changes in the Elements panel are persisted; changes to the DOM are not persisted.

* Only styles defined in an external CSS file can be saved. Changes to element.style or to inline styles are not persisted. (If you have inline styles, they can be changed on the Sources panel.)

* Style changes in the Elements panel are persisted immediately without an explicit save -- **Ctrl+S** (Windows) or **Cmd+S** (Mac) -- if you have the CSS resource mapped to a local file.

* If you are mapping files from a remote server instead of a local server, when you refresh the page, Chrome reloads the page from the remote server. Your changes still persist to disk and are reapplied if you continue editing in Workspaces.

### Create custom directories in your development workspace

And, so you don't have to reload and map sites to folders each time, you can add *custom directories* (folders) to your workspace that will persist across sessions. Once added, you can view, edit, and save changes to files in the folder(s) directly from the Sources panel.

To add a custom folder, click the **Settings** button ![Settings](image_0.png) and choose **Workspace** at the far left. Under the Folders list, click **Add folder…**. In the browse dialog, navigate to the folder you want to add and click **OK**, and click **Allow** to give Chrome access to the folder; the folder is added to the Folders list. Click the **Close** button ![Close](image_1.png) to return to the main DevTools panel; the folder you added will be shown in the Sources tab, and files in it will be accessible in the DevTools editor. 

#### Local file management

In addition to editing existing files, you can also add and delete files in the local mapped directory you’re using for Workspaces.

To add a file, right-click a folder in the left Sources pane and choose **New file** from the context menu; a new file name field appears in place. Type a name for the new file including its extension (e.g., newscripts.js) and press **Enter**; the file is added to the local folder.

To delete a file, right-click its name in the left Sources pane and choose **Delete** from the context menu. Chrome offers a confirmation dialog; click **Yes** to delete the file or **No** to keep it.

Before making substantial changes to a file, it is often useful to make a duplicate of the original for backup purposes. You can do this directly from DevTools. To duplicate a file, right-click its name in the left Sources pane and choose **Make a copy...** from the context menu. The file's contents are copied to a new file and a new file name field appears in place. Type a name for the file including its extension (e.g., mystyles-org.css) and press **Enter**; the copied file is added to the local folder.

When you create or delete files directly in Workspaces, the Sources directory automatically refreshes to show the file changes. To force a refresh at any time, right-click a folder and choose **Refresh** from the context menu.

This is also useful if you change files that are concurrently open in an external editor and want the changes to show up in DevTools. Usually DevTools catches such changes automatically, but if you want to be certain, just refresh the folder as described above.

#### Searching for files or text

To search for a loaded file in DevTools, press **Ctrl+O** (Windows) or **Cmd+O** (Mac) to open a search dialog. You can still do this in Workspaces, but the search is expanded to both the remote loaded files and the local files in your Workspace folder.

There is also a mechanism for searching through the text of multiple files, so you can search for strings across all of the files in your Workspaces as well as all of the files loaded into DevTools. You can search using either a specific string or a regular expression; every occurrence in every file or page will be located.

To search for a string across files, either click the **Show Drawer** button ![Show drawer](image_2.png) to open the Console drawer and then click the **Search** tab, or press **Ctrl+Shift+F** (Windows) or **Cmd+Opt+F** (Mac) to open the Search window. Type a string into the search field and press **Enter**. If the string is a regular expression or needs to be case-insensitive, click the appropriate box. The search results are shown in the Console drawer, listed by file name, with the number of matches in each file indicated. Use the **Expand** ![Expand](image_3.png) and **Collapse** ![Collapse](image_4.png) arrows to expand or collapse the results for a given file.

{% endwrap %}
