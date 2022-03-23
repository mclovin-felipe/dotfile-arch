-- You will need to install language servers `npm i -g vscode-langservers-extracted` and `npm install -g typescript typescript-language-server`

require("plugins")
require("options")
require("setup/spelling")
require("mappings")
require'lspconfig'.pyright.setup{}
require'lspconfig'.tsserver.setup{}
require'lspconfig'.gopls.setup{}
require'lspconfig'.clangd.setup{}
