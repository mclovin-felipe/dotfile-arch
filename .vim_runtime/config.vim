
syntax on
set background=dark
set laststatus=2
set showtabline=2
set noshowmode
set tabstop=8
set expandtab
set autoindent
set smartindent
set encoding=utf-8
set relativenumber
set mouse=a
set title


so $HOME/.vim_runtime/plugins/gruvbox.vim
colorscheme gruvbox

" Disable compatibility with vi which can cause unexpected issues.
set nocompatible

" Enable type file detection. Vim will be able to try to detect the type of file in use.
filetype on

" Enable plugins and load plugin for the detected file type.
filetype plugin on

" Load an indent file for the detected file type.
filetype indent on
so $HOME/.vim_runtime/shortcuts.vim

so $HOME/.vim_runtime/plugins/lightline.vim
so $HOME/.vim_runtime/plugins/fzf.vim
so $HOME/.vim_runtime/plugins/syntactic.vim
so $HOME/.vim_runtime/plugins/indent.vim

