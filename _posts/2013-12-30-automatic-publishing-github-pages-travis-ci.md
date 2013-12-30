---
layout: post
title: Automatic publishing to GitHub Pages with Travis CI
comments: true
---

I've been working on improving my site
and moving it over to [GitHub pages](https://pages.github.com/) over the holiday.
This involved a lot of work on [Jekyll & ZURB](https://github.com/razor-x/jekyll-and-zurb),
the Jekyll scaffold I created.
It has a lot of (optional) features and modern optimizations,
while still being a clean starting point for any static site.

Eventually, the [example site](http://io.evansosenko.com/jekyll-and-zurb/)
will function as the primary source of documentation and feature demos,
but for my first post here I wanted to talk about the coolest feature I added:
getting [Travis CI](https://travis-ci.org/) to build and publish the site
to [GitHub Pages](http://pages.github.com/) on new commits.
I got the idea from [the { :awestruct } docs](http://awestruct.org/auto-deploy-to-github-pages/).

This method should work with any static site generator,
or really anything as I only make the following assumptions:

- There is a rake task, `rake build` that will build your site.
- The variable `config[:destination]` is defined in your `Rakefile`,
  and points to the output directory for the build
  (with Jekyll, `config[:destination] = '_site'`).
- Your repo is hosted on GitHub.

That's it!

I'll step through the code a few lines at a time,
but if you want to skip to the answer, there is a link to a Gist at the end.
These instructions assume you will use the `gh-pages` branch,
but the case where you need to use `master` is not that different.

## GitHub Pages branch

First, setup a `gh-pages` branch (if you don't have one already).
We use an orphan branch since the history is separate.

```bash
$ git checkout --orphan gh-pages
```

Next, you will need to **remove all files and folders except the `.git` directory.**
Then, make an initial commit with only `index.html`, push it, and make sure it goes live online.

```bash
$ git add --all
$ echo "GitHub Pages placeholder" > index.html
$ git add index.html
$ git commit -m "GitHub Pages placeholder"
$ git push -u origin gh-pages
$ git checkout master
```

## Credentials

Now, you need to set up credentials that will let Travis CI login and push to GitHub.

Install the travis gem,

```bash
$ gem install travis
```

Create a [GitHub Personal Access Token](https://github.com/settings/applications),
and add your name, email, and token to travis as encrypted data
(fill in your values in the command below).
Be sure to run this inside the git repo for your site.

```bash
$ travis encrypt 'GIT_NAME="Your Name" GIT_EMAIL=you@example.com GH_TOKEN=token'
```

This will give you a value you need to add to your `.travis.yml`, e.g.,

```yaml
# .travis.yml

script: rake travis

env:
  - secure: "big long encrypted string"

branches:
  only:
    - master
```

Note we also specify what branch to build the site from,
and that `rake travis` should be run for the build.

## Rake task

The last step is adding the rake task that Travis CI
will run to build and publish your site.

Most of the steps configure git settings so
Travis CI can pull and push to the `gh-pages` branch.

Grab the rake task below.

<span class="fi-social-github"></span>
[gist.github.com/razor-x/8166421](https://gist.github.com/razor-x/8166421)

{% gist 8166421 %}
