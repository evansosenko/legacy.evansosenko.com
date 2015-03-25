---
layout: post
title: Vim configuration as a first class plugin
keywords: [ vim, vimrc ]
meta:
  description: "Vim configuration as a plugin: simple but powerful."
comments: true
github: razor-x/vimrc
---

I've been using [Vim] as my default terminal editor for over ten years,
but I've yet to use it for my IDE.
The more I use the [awesome] tiling window manager,
the more I want to switch to [tmux] and Vim
and keep my fingers on the keyboard.

There's certainly no shortage of standalone vimrc files
and full configurations like [janus] and [spf13-vim],
but I wanted to roll my own from scratch.
I know I learn better that way;
plus I'll have something completely personalized.

## My Requirements

1. Everything under version control.
2. Not mixed in with my other dotfiles.
3. Self-contained as a plugin with a standard plugin structure.
4. Keep vimrc minimal and clean: everything goes in the plugin.
5. Manages both overall configuration and plugin dependencies.
6. One-line install from the terminal.
7. Easy updating.
8. Automated and native development flow.
9. Easy to share and customize.

## My Solution

<p class="panel">
<span class="icon fi-social-github"></span> <a href="https://github.com/{{ page.github }}">GitHub project: {{ page.github }}</a>
</p>

The install process is inspired by [oh-my-zsh] and hosted on GitHub pages.

```bash
$ curl -L https://io.evansosenko.com/vimrc/install.sh | sh
```

The `.vimrc` is installed and contains just enough
to load the plugin which configures the rest.

```vim
" razor-x/vimrc
set nocompatible

" Disable powerline by default.
let g:powerline_loaded = 1

filetype off
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'gmarik/Vundle.vim'
Plugin 'razor-x/vimrc'

if filereadable(expand('~/.vim/bundle/vimrc/plugins.vim'))
  source ~/.vim/bundle/vimrc/plugins.vim
endif

call vundle#end()
filetype plugin indent on
```

[Vundle] is used for dependency management,
although it would be simple enough to use an alternative.
All plugins are loaded from `plugins.vim`.

[Gulp] handles the development environment.
By switching to dev mode, Gulp watches for changes
and automatically updates the local plugin files.
Switching out of dev mode switches back to the stable plugin.

My config is pretty basic right now,
but with this I have a foundation to build a vim to call my own.

If you like the sound of this and want to manage your Vim config the same way,
check out the [Customization section of the README][vimrc-customization].

[awesome]: http:/o/awesome.naquadah.org/
[Gulp]: http://gulpjs.com/
[oh-my-zsh]: http://ohmyz.sh/
[janus]: https://github.com/carlhuda/janus
[razor-x/vimrc]: https://github.com/razor-x/vimrc
[spf13-vim]: http://vim.spf13.com/
[tmux]: http://tmux.sourceforge.net/
[Vim]: http://www.vim.org/
[vimrc]: https://github.com/razor-x/vimrc
[vimrc-customization]: https://github.com/razor-x/vimrc#customization
[Vundle]: https://github.com/gmarik/Vundle.vim
