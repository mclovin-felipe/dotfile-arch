call plug#begin()
Plug 'drewtempelmeyer/palenight.vim'
Plug 'psliwka/vim-smoothie'
Plug 'Yggdroot/indentLine'
Plug 'ghifarit53/tokyonight-vim'
Plug 'itchyny/lightline.vim'
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'
Plug 'webdevel/tabulous'
Plug 'mengelbrecht/lightline-bufferline'
Plug 'kyoz/purify', { 'rtp': 'vim' }
Plug 'preservim/nerdtree'
" Use release branch (recommend)
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'Chiel92/vim-autoformat'
Plug 'scrooloose/syntastic'
Plug 'tpope/vim-commentary'
" post install (yarn install | npm install) then load plugin only for editing supported files
Plug 'prettier/vim-prettier', {
  \ 'do': 'yarn install --frozen-lockfile --production',
  \ 'for': ['javascript', 'typescript', 'css', 'less', 'scss', 'json', 'graphql', 'markdown', 'vue', 'svelte', 'yaml', 'html'] }
Plug 'sheerun/vim-polyglot'
Plug 'jiangmiao/auto-pairs'
Plug 'ryanoasis/vim-devicons'
Plug 'alvan/vim-closetag'
Plug 'prettier/vim-prettier', { 'do': 'yarn install' }
Plug 'honza/vim-snippets'
Plug 'godlygeek/tabular'
call plug#end()
so ~/.vim_runtime/config.vim
