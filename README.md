Source code for the main documentation/user guide web site for DaSpec

If you're browsing this as a GitHub repo, start with the [About](guides/about.md) page. You can see
the formatted version in action at [www.daspec.com](http://daspec.com) and try out the [key features](http://daspec.com/examples/) directly in your browser.


## Folder structure

The main web site structure is in the [jekyll_site](jekyll_site) directory. 

To make files browsable both on github as a repository and on the web site, all the guides and the examples are extracted from the web site boilerplate code and in their own folders, in the root. The [rebuild_site.sh](rebuild_site.sh) script copies those files into the right place in jekyll_site. It also rewrites links from markdown files to HTML files so they work when published online. So if you change something in the examples or guides folders, remember to run `rebuild_site.sh` to push those files into the jekyll_site dir. 

## Building the site

To build this site locally, and run it, you'll need to install [jekyll](http://jekyllrb.com) and [bower](http://bower.io/).

    gem install jekyll
    npm install bower -g

Post-process the markdown files into jekyll web pages (run this in the main project folder):

    sh rebuild_site.sh

Next, you'll need to download the third party components that the web site depends on

    cd jekyll_site
    bower install

Finally, you should just be able to serve the jekyll site locally (make sure you're in the jekyll_site directory)

    jekyll serve


